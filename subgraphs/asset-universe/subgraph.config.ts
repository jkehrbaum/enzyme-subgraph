import {
  Configurator,
  Contexts,
  DataSourceUserDeclaration,
  SdkUserDeclaration,
  Template,
} from '@enzymefinance/subgraph-cli';

interface Variables {
  wethTokenAddress: string;
  startBlock: number;
  releaseConfiguration: {
    v2?: {
      fundDeployer: string;
      derivativePriceFeed: string;
      primitivePriceFeed: string;
      aavePriceFeed: string;
      alphaHomoraV1PriceFeed: string;
      compoundPriceFeed: string;
      curvePriceFeed: string;
      idlePriceFeed: string;
      lidoStethPriceFeed: string;
      stakehoundEthPriceFeed: string;
      synthetixPriceFeed: string;
      uniswapV2PoolPriceFeed: string;
      wdgldPriceFeed: string;
    };
    v3?: {
      fundDeployer: string;
      derivativePriceFeed: string;
      primitivePriceFeed: string;
      aavePriceFeed: string;
      alphaHomoraV1PriceFeed: string;
      compoundPriceFeed: string;
      curvePriceFeed: string;
      idlePriceFeed: string;
      lidoStethPriceFeed: string;
      stakehoundEthPriceFeed: string;
      synthetixPriceFeed: string;
      uniswapV2PoolPriceFeed: string;
      wdgldPriceFeed: string;
      yearnVaultV2PriceFeed: string;
    };
    v4?: {
      fundDeployer: string;
      valueInterpreter: string;
    };
  };
  testnetConfiguration?: {
    treasuryController: string;
  };
}

const name = 'enzymefinance/asset-universe';

const mainnet: Variables = {
  wethTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  startBlock: 11636534,
  releaseConfiguration: {
    v2: {
      fundDeployer: '0x9134C9975244b46692Ad9A7Da36DBa8734Ec6DA3',
      derivativePriceFeed: '0xCFb6F4C08856986d13839B1907b5c645EE95388F',
      primitivePriceFeed: '0xfB3A9655F5feA18caC92021E83550F829ae6F7F7',
      aavePriceFeed: '0x3996D53013f562FD6D5B777Ab0Ee681802698e0D',
      alphaHomoraV1PriceFeed: '0x5f2E2E7FfbcAeE69d570D531A00228322632231E',
      compoundPriceFeed: '0xC80bD25cd46e49277CcB56E751704A6316Af30aD',
      curvePriceFeed: '0x884D909EA86EC61128a4cFE1B455d5B440cdE9C8',
      idlePriceFeed: '0x08ecd9e1378dc0262df826c07d3d64c728a46829',
      lidoStethPriceFeed: '0x4F3Da46BF999C6b3005C1465672009fBF99e7b9f',
      stakehoundEthPriceFeed: '0xe2b19fa2d662f4eea51d394b71ce7281214840c5',
      synthetixPriceFeed: '0x2180341339010C237FF8e3dd1fF24063FB18C4D0',
      uniswapV2PoolPriceFeed: '0x9177A3354EE50bffBcC42C4c6baC27ed63979097',
      wdgldPriceFeed: '0x45919dcDECcA3C7a0D29f959E6b78a605a17A3A2',
    },
    v3: {
      fundDeployer: '0x7e6d3b1161DF9c9c7527F68d651B297d2Fdb820B',
      derivativePriceFeed: '0x2E45f9B3fd5871cCaf4eB415dFCcbDD126F57C4f',
      primitivePriceFeed: '0x1fad8faf11E027f8630F394599830dBeb97004EE',
      aavePriceFeed: '0x4e49a272dC42E26C8772de366aaa93d1AC816794',
      alphaHomoraV1PriceFeed: '0x1a8b4f6D469Ee775d5982C4d4AAb46677c2C92d4',
      compoundPriceFeed: '0x6d7F71Cc3109D4132Ad6124D84e72E353b979880',
      curvePriceFeed: '0xc106f1B01017c854a9cd2D88Db733408236DD809',
      idlePriceFeed: '0x13c2263e534BD27149d96b8Cb9961ea1beB560Ef',
      lidoStethPriceFeed: '0x11D8d414724281BD702838BA16C8F15F7C473e9a',
      stakehoundEthPriceFeed: '0xd3C515EAD7Bcc7451cd920e066C4a1849B827dfD',
      synthetixPriceFeed: '0x4158F02ac2fF0f0E7959A768D06619B685aBF0C8',
      uniswapV2PoolPriceFeed: '0x37FFB1842eF012d83A6FFdc92A6353044Ae0e3e8',
      wdgldPriceFeed: '0x76b548553d4E729c81e8ae8Ab826795bd88BA9E7',
      yearnVaultV2PriceFeed: '0x7B768DD670B6f0d4AFC270cb413A8F7ca1889BD7',
    },
    v4: {
      fundDeployer: '0x0000000000000000000000000000000000000000',
      valueInterpreter: '0x0000000000000000000000000000000000000000',
    },
  },
};

const kovan: Variables = {
  wethTokenAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  startBlock: 27217130,
  releaseConfiguration: {
    // v2: {
    //   valueInterpreter: '0xFEE7aEE3907d1657fd2BdcBba8909AF40a144421',
    //   derivativePriceFeed: '0x1899F9e144A0D47cC1471e797C2b7930adf530b3',
    //   derivativePriceFeedBlock: 24710069,
    //   primitivePriceFeed: '0x1dbf40Fc502A61a09c38F5D0f4D07f42AC507606',
    //   primitivePriceFeedBlock: 24710056,
    // },
    // v3: {
    //   valueInterpreter: '0x92D1D329de7633B788bD4A9727192C2F498e2cA7',
    //   derivativePriceFeed: '0x5304c3f2c2433e5e37732B46604eEB39725a4883',
    //   derivativePriceFeedBlock: 24710610,
    //   primitivePriceFeed: '0x5A49D2a6420362bE3E396C59Fe9280c9f9588Ec3',
    //   primitivePriceFeedBlock: 24710598,
    // },
    // // TODO: Add v4 contracts.
  },
  testnetConfiguration: {
    treasuryController: '0xd5590aE02a9bD0011d15FdFea75b808A227bC383',
  },
};

export const contexts: Contexts<Variables> = {
  kovan: {
    name: `${name}-kovan`,
    network: 'kovan',
    variables: kovan,
  },
  mainnet: {
    name,
    network: 'mainnet',
    variables: mainnet,
  },
  local: {
    name,
    local: true,
    network: 'mainnet',
    variables: mainnet,
  },
};

export const templates: Template[] = [
  {
    template: 'templates/configuration.ts',
    destination: 'generated/configuration.ts',
  },
];

export const configure: Configurator<Variables> = (variables: Variables) => {
  const sources: DataSourceUserDeclaration[] = [];
  const sdks: SdkUserDeclaration[] = [
    {
      name: 'Protocol',
      abis: {
        AavePriceFeed: 'abis/v2/AavePriceFeed.json',
        AlphaHomoraV1PriceFeed: 'abis/v2/AlphaHomoraV1PriceFeed.json',
        CompoundPriceFeed: 'abis/v2/CompoundPriceFeed.json',
        CurvePriceFeed: 'abis/v2/CurvePriceFeed.json',
        LidoStethPriceFeed: 'abis/v2/LidoStethPriceFeed.json',
        StakehoundEthPriceFeed: 'abis/v2/StakehoundEthPriceFeed.json',
        SynthetixPriceFeed: 'abis/v2/SynthetixPriceFeed.json',
        UniswapV2PoolPriceFeed: 'abis/v2/UniswapV2PoolPriceFeed.json',
        YearnVaultV2PriceFeed: 'abis/v2/YearnVaultV2PriceFeed.json',
      },
      functions: (abis) => [
        abis.AavePriceFeed.getFunction('isSupportedAsset'),
        abis.AavePriceFeed.getFunction('getUnderlyingForDerivative'),
        abis.AlphaHomoraV1PriceFeed.getFunction('getWethToken'),
        abis.CurvePriceFeed.getFunction('getDerivativeInfo'),
        abis.CurvePriceFeed.getFunction('getAddressProvider'),
        abis.CompoundPriceFeed.getFunction('getTokenFromCToken'),
        abis.StakehoundEthPriceFeed.getFunction('getUnderlying'),
        abis.UniswapV2PoolPriceFeed.getFunction('getPoolTokenUnderlyings'),
      ],
    },
    {
      name: 'ERC20',
      abis: {
        ERC20: 'abis/ERC20.json',
      },
      functions: (abis) => [
        abis.ERC20.getFunction('symbol'),
        abis.ERC20.getFunction('name'),
        abis.ERC20.getFunction('decimals'),
      ],
    },
    {
      name: 'ERC20Bytes',
      abis: {
        ERC20Bytes: 'abis/ERC20Bytes.json',
      },
      functions: (abis) => [abis.ERC20Bytes.getFunction('symbol'), abis.ERC20Bytes.getFunction('name')],
    },
    {
      name: 'Curve',
      abis: {
        CurveRegistry: 'abis/CurveRegistry.json',
        ICurveAddressProvider: 'abis/v2/ICurveAddressProvider.json',
      },
      functions: (abis) => [
        abis.CurveRegistry.getFunction('get_n_coins'),
        abis.CurveRegistry.getFunction('get_gauges'),
        abis.CurveRegistry.getFunction('get_coins'),
        abis.CurveRegistry.getFunction('get_lp_token'),
        abis.ICurveAddressProvider.getFunction('get_registry'),
      ],
    },
  ];

  if (variables.releaseConfiguration.v2) {
    sources.push({
      name: 'AggregatedDerivativePriceFeed',
      version: 2,
      address: variables.releaseConfiguration.v2.derivativePriceFeed,
      block: variables.startBlock,
      events: (abi) => [abi.getEvent('DerivativeAdded'), abi.getEvent('DerivativeRemoved')],
    });

    sources.push({
      name: 'ChainlinkPriceFeed',
      version: 2,
      address: variables.releaseConfiguration.v2.primitivePriceFeed,
      block: variables.startBlock,
      events: (abi) => [
        abi.getEvent('PrimitiveAdded'),
        abi.getEvent('PrimitiveUpdated'),
        abi.getEvent('PrimitiveRemoved'),
        abi.getEvent('StalePrimitiveRemoved'),
      ],
    });
  }

  if (variables.releaseConfiguration.v3) {
    sources.push({
      name: 'AggregatedDerivativePriceFeed',
      version: 3,
      address: variables.releaseConfiguration.v3.derivativePriceFeed,
      block: variables.startBlock,
      events: (abi) => [abi.getEvent('DerivativeAdded'), abi.getEvent('DerivativeRemoved')],
    });

    sources.push({
      name: 'ChainlinkPriceFeed',
      version: 3,
      address: variables.releaseConfiguration.v3.primitivePriceFeed,
      block: variables.startBlock,
      events: (abi) => [
        abi.getEvent('PrimitiveAdded'),
        abi.getEvent('PrimitiveUpdated'),
        abi.getEvent('PrimitiveRemoved'),
        abi.getEvent('StalePrimitiveRemoved'),
      ],
    });
  }

  if (variables.releaseConfiguration.v4) {
    sources.push({
      name: 'ValueInterpreter',
      version: 4,
      address: variables.releaseConfiguration.v4.valueInterpreter,
      block: variables.startBlock,
      events: (abi) => [
        abi.getEvent('DerivativeAdded'),
        abi.getEvent('DerivativeRemoved'),
        abi.getEvent('PrimitiveAdded'),
        abi.getEvent('PrimitiveRemoved'),
        abi.getEvent('StalePrimitiveRemoved'),
      ],
    });
  }

  if (variables.testnetConfiguration) {
    sources.push({
      name: 'TestnetTreasuryController',
      address: variables.testnetConfiguration.treasuryController,
      block: variables.startBlock,
      events: (abi) => [abi.getEvent('TokenDeployed')],
    });
  }

  return { sdks, sources };
};
