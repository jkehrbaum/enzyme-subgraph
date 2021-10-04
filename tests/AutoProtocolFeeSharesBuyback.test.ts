import { ComptrollerLib, Dispatcher, FundDeployer, StandardToken } from '@enzymefinance/protocol';
import { providers, utils, Wallet } from 'ethers';
import { assertEvent } from './utils/assertions';
import { Deployment, fetchDeployment } from './utils/deployment';
import { waitForSubgraph } from './utils/subgraph';
import { fetchDeposit } from './utils/subgraph-queries/fetchDeposit';

describe('Auto PrototolFee Shares Buyback', () => {
  const ethereumNetwork = process.env.ETHEREUM_NETWORK;
  const jsonRpcProvider = process.env.JSONRPC_ENDPOINT;
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new providers.StaticJsonRpcProvider(jsonRpcProvider, ethereumNetwork);
  let signer = new Wallet(privateKey, provider);

  const subgraphStatusEndpoint = process.env.SUBGRAPH_STATUS_ENDPOINT;
  const subgraphEndpoint = process.env.SUBGRAPH_ENDPOINT;
  const subgraphName = process.env.SUBGRAPH_NAME;

  const deploymentEndpoint = process.env.DEPLOYMENT_ENDPOINT;

  let dispatcher: Dispatcher;
  let fundDeployerAddress: string;
  let fundDeployer: FundDeployer;

  let deployment: Deployment;
  let assets: string[];

  beforeAll(async () => {
    const deploymentWithAssets = await fetchDeployment(deploymentEndpoint);

    deployment = deploymentWithAssets.contracts;
    assets = deploymentWithAssets.assets;

    dispatcher = new Dispatcher(deployment.dispatcher, provider);
    fundDeployerAddress = await dispatcher.getCurrentFundDeployer();
    fundDeployer = new FundDeployer(fundDeployerAddress, signer);
  });

  it.only('should create a vault, deposit and redeem (with auto buyback of fee shares', async () => {
    const denominationAsset = new StandardToken(deployment.mlnToken, signer); // MLN

    // create fund

    const newFundArgs = {
      fundName: 'Autopay Protocol Fees Fund ' + Math.floor(Math.random() * 1000000),
      sharesActionTimelock: 0,
      feeManagerConfigData: '0x',
      policyManagerConfigData: '0x',
    };

    const fundCreated = await fundDeployer.createNewFund(
      signer,
      newFundArgs.fundName,
      denominationAsset,
      newFundArgs.sharesActionTimelock,
      newFundArgs.feeManagerConfigData,
      newFundArgs.policyManagerConfigData,
    );

    const comptrollerDeployedArgs = assertEvent(fundCreated, 'ComptrollerProxyDeployed', {
      creator: signer,
      comptrollerProxy: expect.any(String) as string,
      denominationAsset,
      sharesActionTimelock: newFundArgs.sharesActionTimelock,
      feeManagerConfigData: utils.hexlify(newFundArgs.feeManagerConfigData),
      policyManagerConfigData: utils.hexlify(newFundArgs.policyManagerConfigData),
    });

    const comptrollerProxy = new ComptrollerLib(comptrollerDeployedArgs.comptrollerProxy, signer);

    const fundCreatedArgs = assertEvent(fundCreated, 'NewFundCreated', {
      vaultProxy: expect.any(String) as string,
    });

    // set autopay protocol fees to true
    const autopaySet = await comptrollerProxy.setAutoProtocolFeeSharesBuyback(true);
    const autoPaySetArgs = assertEvent(autopaySet, 'AutoProtocolFeeSharesBuybackSet', {
      _nextAutoProtocolFeeSharesBuyback: expect(true),
    });

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, autopaySet.blockNumber);

    // buy shares
    const approveAmount = 10;
    const sharesToBuy = 10;
    const buySharesArgs = {
      comptrollerProxy,
      signer,
      buyer: signer.address,
      denominationAsset,
      investmentAmount: utils.parseEther(sharesToBuy.toString()),
      minSharesAmount: utils.parseEther(sharesToBuy.toString()),
    };

    await denominationAsset.approve.args(comptrollerProxy, utils.parseEther(approveAmount.toString())).send();

    const sharesBought = await comptrollerProxy.buyShares
      .args(buySharesArgs.investmentAmount, buySharesArgs.minSharesAmount)
      .send();

    assertEvent(sharesBought, 'SharesBought', {
      buyer: await signer.getAddress(),
      investmentAmount: buySharesArgs.investmentAmount,
    });

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, sharesBought.blockNumber);

    const investmentId = `${fundCreatedArgs.vaultProxy.toLowerCase()}/${buySharesArgs.buyer.toLowerCase()}`;
    const subgraphInvestment = await fetchDeposit(subgraphEndpoint, investmentId, sharesBought.blockNumber);

    expect(subgraphInvestment.shares).toEqual(sharesToBuy.toString());
    expect(subgraphInvestment.depositor.isDepositor).toBe(true);

    // Redeem

    const redeemed = await comptrollerProxy.redeemSharesInKind
      .args(signer, utils.parseEther(sharesToBuy.toString()).div(2), [], [])
      .gas(300000)
      .send();

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, redeemed.blockNumber);
  });

  it("should walkthrough a fund's lifecycle", async () => {
    const denominationAsset = new StandardToken(deployment.wethToken, signer); // WETH

    // create fund

    const newFundArgs = {
      fundName: 'Test Fund ' + Math.floor(Math.random() * 1000000),
      sharesActionTimelock: 0,
      feeManagerConfigData: '0x',
      policyManagerConfigData: '0x',
    };

    const fundCreated = await fundDeployer.createNewFund(
      signer,
      newFundArgs.fundName,
      denominationAsset,
      newFundArgs.sharesActionTimelock,
      newFundArgs.feeManagerConfigData,
      newFundArgs.policyManagerConfigData,
    );

    const comptrollerDeployedArgs = assertEvent(fundCreated, 'ComptrollerProxyDeployed', {
      creator: signer,
      comptrollerProxy: expect.any(String) as string,
      denominationAsset,
      sharesActionTimelock: newFundArgs.sharesActionTimelock,
      feeManagerConfigData: utils.hexlify(newFundArgs.feeManagerConfigData),
      policyManagerConfigData: utils.hexlify(newFundArgs.policyManagerConfigData),
    });

    const comptrollerProxy = new ComptrollerLib(comptrollerDeployedArgs.comptrollerProxy, signer);

    const fundCreatedArgs = assertEvent(fundCreated, 'NewFundCreated', {
      vaultProxy: expect.any(String) as string,
    });

    // buy shares
    const approveAmount = 10;
    const sharesToBuy = 1;
    const buySharesArgs = {
      comptrollerProxy,
      signer,
      buyer: signer.address,
      denominationAsset,
      investmentAmount: utils.parseEther(sharesToBuy.toString()),
      minSharesAmount: utils.parseEther(sharesToBuy.toString()),
    };

    await denominationAsset.approve.args(comptrollerProxy, utils.parseEther(approveAmount.toString())).send();

    const sharesBought = await comptrollerProxy.buyShares
      .args(buySharesArgs.investmentAmount, buySharesArgs.minSharesAmount)
      .send();

    assertEvent(sharesBought, 'SharesBought', {
      buyer: await signer.getAddress(),
      investmentAmount: buySharesArgs.investmentAmount,
    });

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, sharesBought.blockNumber);

    const investmentId = `${fundCreatedArgs.vaultProxy.toLowerCase()}/${buySharesArgs.buyer.toLowerCase()}`;
    const subgraphInvestment = await fetchDeposit(subgraphEndpoint, investmentId, sharesBought.blockNumber);

    expect(subgraphInvestment.shares).toEqual(sharesToBuy.toString());
    expect(subgraphInvestment.depositor.isDepositor).toBe(true);

    // Redeem

    const redeemed = await comptrollerProxy.redeemSharesInKind
      .args(signer, utils.parseEther(sharesToBuy.toString()).div(2), [], [])
      .gas(300000)
      .send();

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, redeemed.blockNumber);

    // buy more shares

    await denominationAsset.approve.args(comptrollerProxy, buySharesArgs.investmentAmount).send();

    const boughtMoreShares = await comptrollerProxy.buyShares
      .args(buySharesArgs.investmentAmount, buySharesArgs.minSharesAmount.mul(99).div(100))
      .send();

    await waitForSubgraph(subgraphStatusEndpoint, subgraphName, boughtMoreShares.blockNumber);
  });
});