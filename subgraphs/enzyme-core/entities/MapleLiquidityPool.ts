import { Address } from '@graphprotocol/graph-ts';
import { MapleSdk } from '../generated/contracts/MapleSdk';
import { MapleLiquidityPool } from '../generated/schema';
import { ensureAsset } from './Asset';

export function createMapleLiquidityPool(pool: Address, rewardsContract: Address | null = null): MapleLiquidityPool {
  let mapleLiquidityPool = new MapleLiquidityPool(pool.toHex());

  let poolContract = MapleSdk.bind(pool);
  let liquidityAsset = ensureAsset(poolContract.liquidityAsset());

  mapleLiquidityPool.liquidityAsset = liquidityAsset.id;
  mapleLiquidityPool.rewardsContract = rewardsContract ? rewardsContract : null;
  mapleLiquidityPool.save();

  return mapleLiquidityPool;
}

export function ensureMapleLiquidityPool(
  poolAddress: Address,
  rewardsContract: Address | null = null,
): MapleLiquidityPool {
  let pool = MapleLiquidityPool.load(poolAddress.toHex());

  if (pool != null) {
    if (rewardsContract) {
      pool.rewardsContract = rewardsContract;
      pool.save();
    }

    return pool;
  }

  pool = createMapleLiquidityPool(poolAddress, rewardsContract);

  return pool;
}
