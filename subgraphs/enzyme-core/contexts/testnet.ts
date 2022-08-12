import { Context } from '@enzymefinance/subgraph-cli';
import { Variables } from '../subgraph.config';
import { getEnvironment } from '@enzymefinance/environment/all';
import { Deployment, Version } from '@enzymefinance/environment';

const testnetDeployment = getEnvironment(Deployment.TESTNET, Version.SULU);

export const testnet: Context<Variables> = {
  name: 'enzymefinance/enzyme-core-testnet',
  network: 'matic',
  variables: {
    block: 25731749,
    wethTokenAddress: testnetDeployment.namedTokens.weth.id,
    chainlinkAggregatorAddresses: {
      audUsd: '0x062Df9C4efd2030e243ffCc398b652e8b8F95C6f',
      btcEth: '0x19b0F0833C78c0848109E3842D34d2fDF2cA69BA',
      btcusd: '0xc907E116054Ad103354f2D350FD2514433D57F6f',
      chfusd: '0xc76f762CedF0F78a439727861628E0fdfE1e70c2',
      ethUsd: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
      eurUsd: '0x73366Fe0AA0Ded304479862808e02506FE556a98',
      gbpUsd: '0x099a2540848573e94fb1Ca0Fa420b00acbBc845a',
      jpyUsd: '0xD647a6fC9BC6402301583C91decC5989d8Bc382D',
    },
    external: {
      curveMinterAddress: '0x0000000000000000000000000000000000000000',
      cvxLockerV2Address: '0x0000000000000000000000000000000000000000',
      cvxAddress: '0x0000000000000000000000000000000000000000',
    },
    persistent: {
      dispatcherAddress: testnetDeployment.contracts.Dispatcher,
      externalPositionFactoryAddress: testnetDeployment.contracts.ExternalPositionFactory,
      sharesSplitterFactoryAddress: testnetDeployment.contracts.SharesSplitterFactory,
    },
    releases: {
      v2: {
        adapterBlacklistAddress: '0x0000000000000000000000000000000000000000',
        adapterWhitelistAddress: '0x0000000000000000000000000000000000000000',
        aggregatedDerivativePriceFeedAddress: '0x0000000000000000000000000000000000000000',
        assetBlacklistAddress: '0x0000000000000000000000000000000000000000',
        assetWhitelistAddress: '0x0000000000000000000000000000000000000000',
        buySharesCallerWhitelistAddress: '0x0000000000000000000000000000000000000000',
        chainlinkPriceFeedAddress: '0x0000000000000000000000000000000000000000',
        comptrollerLibAddress: '0x0000000000000000000000000000000000000000',
        entranceRateBurnFeeAddress: '0x0000000000000000000000000000000000000000',
        entranceRateDirectFeeAddress: '0x0000000000000000000000000000000000000000',
        feeManagerAddress: '0x0000000000000000000000000000000000000000',
        fundActionsWrapperAddress: '0x0000000000000000000000000000000000000000',
        fundDeployerAddress: '0x0000000000000000000000000000000000000000',
        guaranteedRedemptionAddress: '0x0000000000000000000000000000000000000000',
        integrationManagerAddress: '0x0000000000000000000000000000000000000000',
        investorWhitelistAddress: '0x0000000000000000000000000000000000000000',
        managementFeeAddress: '0x0000000000000000000000000000000000000000',
        maxConcentrationAddress: '0x0000000000000000000000000000000000000000',
        minMaxInvestmentAddress: '0x0000000000000000000000000000000000000000',
        performanceFeeAddress: '0x0000000000000000000000000000000000000000',
        policyManagerAddress: '0x0000000000000000000000000000000000000000',
        valueInterpreterAddress: '0x0000000000000000000000000000000000000000',
        vaultLibAddress: '0x0000000000000000000000000000000000000000',
      },
      v3: {
        adapterBlacklistAddress: '0x0000000000000000000000000000000000000000',
        adapterWhitelistAddress: '0x0000000000000000000000000000000000000000',
        aggregatedDerivativePriceFeedAddress: '0x0000000000000000000000000000000000000000',
        assetBlacklistAddress: '0x0000000000000000000000000000000000000000',
        assetWhitelistAddress: '0x0000000000000000000000000000000000000000',
        buySharesCallerWhitelistAddress: '0x0000000000000000000000000000000000000000',
        chainlinkPriceFeedAddress: '0x0000000000000000000000000000000000000000',
        comptrollerLibAddress: '0x0000000000000000000000000000000000000000',
        entranceRateBurnFeeAddress: '0x0000000000000000000000000000000000000000',
        entranceRateDirectFeeAddress: '0x0000000000000000000000000000000000000000',
        feeManagerAddress: '0x0000000000000000000000000000000000000000',
        fundActionsWrapperAddress: '0x0000000000000000000000000000000000000000',
        fundDeployerAddress: '0x0000000000000000000000000000000000000000',
        guaranteedRedemptionAddress: '0x0000000000000000000000000000000000000000',
        integrationManagerAddress: '0x0000000000000000000000000000000000000000',
        investorWhitelistAddress: '0x0000000000000000000000000000000000000000',
        managementFeeAddress: '0x0000000000000000000000000000000000000000',
        maxConcentrationAddress: '0x0000000000000000000000000000000000000000',
        minMaxInvestmentAddress: '0x0000000000000000000000000000000000000000',
        performanceFeeAddress: '0x0000000000000000000000000000000000000000',
        policyManagerAddress: '0x0000000000000000000000000000000000000000',
        valueInterpreterAddress: '0x0000000000000000000000000000000000000000',
        vaultLibAddress: '0x0000000000000000000000000000000000000000',
      },
      v4: {
        addressListRegistryAddress: testnetDeployment.contracts.AddressListRegistry,
        allowedAdapterIncomingAssetsPolicyAddress: testnetDeployment.contracts.AllowedAdapterIncomingAssetsPolicy,
        allowedAdaptersPolicyAddress: testnetDeployment.contracts.AllowedAdaptersPolicy,
        allowedAssetsForRedemptionPolicyAddress: testnetDeployment.contracts.AllowedAssetsForRedemptionPolicy,
        allowedDepositRecipientsPolicyAddress: testnetDeployment.contracts.AllowedDepositRecipientsPolicy,
        allowedExternalPositionTypesPolicyAddress: testnetDeployment.contracts.AllowedExternalPositionTypesPolicy,
        allowedSharesTransferRecipientsPolicyAddress: testnetDeployment.contracts.AllowedSharesTransferRecipientsPolicy,
        comptrollerLibAddress: testnetDeployment.contracts.ComptrollerLib,
        convexCurveLpStakingAdapterAddress: testnetDeployment.contracts.ConvexCurveLpStakingAdapter,
        cumulativeSlippageTolerancePolicyAddress: testnetDeployment.contracts.CumulativeSlippageTolerancePolicy,
        curveLiquidityAdapterAddress: testnetDeployment.contracts.CurveLiquidityAdapter,
        entranceRateBurnFeeAddress: testnetDeployment.contracts.EntranceRateBurnFee,
        entranceRateDirectFeeAddress: testnetDeployment.contracts.EntranceRateDirectFee,
        exitRateBurnFeeAddress: testnetDeployment.contracts.ExitRateBurnFee,
        exitRateDirectFeeAddress: testnetDeployment.contracts.ExitRateDirectFee,
        externalPositionManagerAddress: testnetDeployment.contracts.ExternalPositionManager,
        feeManagerAddress: testnetDeployment.contracts.FeeManager,
        fundDeployerAddress: testnetDeployment.contracts.FundDeployer,
        gasRelayPaymasterFactoryAddress: testnetDeployment.contracts.GasRelayPaymasterFactory,
        integrationManagerAddress: testnetDeployment.contracts.IntegrationManager,
        managementFeeAddress: testnetDeployment.contracts.ManagementFee,
        minAssetBalancesPostRedemptionPolicyAddress: testnetDeployment.contracts.MinAssetBalancesPostRedemptionPolicy,
        minMaxInvestmentPolicyAddress: testnetDeployment.contracts.MinMaxInvestmentPolicy,
        minSharesSupplyFeeAddress: testnetDeployment.contracts.MinSharesSupplyFee,
        onlyRemoveDustExternalPositionPolicyAddress: testnetDeployment.contracts.OnlyRemoveDustExternalPositionPolicy,
        onlyUntrackDustOrPricelessAssetsPolicyAddress:
          testnetDeployment.contracts.OnlyUntrackDustOrPricelessAssetsPolicy,
        performanceFeeAddress: testnetDeployment.contracts.PerformanceFee,
        policyManagerAddress: testnetDeployment.contracts.PolicyManager,
        protocolFeeReserveLibAddress: testnetDeployment.contracts.ProtocolFeeReserveLib,
        protocolFeeTrackerAddress: testnetDeployment.contracts.ProtocolFeeTracker,
        unpermissionedActionsWrapperAddress: testnetDeployment.contracts.UnpermissionedActionsWrapper,
        valueInterpreterAddress: testnetDeployment.contracts.ValueInterpreter,
        vaultLibAddress: testnetDeployment.contracts.VaultLib,
      },
    },
  },
};
