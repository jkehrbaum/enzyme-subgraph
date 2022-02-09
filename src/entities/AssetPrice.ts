import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { Asset, AssetPrice } from '../generated/schema';
import { logCritical } from '../utils/logCritical';
import {
  updateDailyAssetPriceCandle,
  updateHourlyAssetPriceCandle,
  updateMonthlyAssetPriceCandle,
} from './AssetPriceCandle';

export function assetPriceId(asset: Asset, timestamp: BigInt): string {
  return asset.id + '/' + timestamp.toString();
}

export function useAssetPrice(id: string): AssetPrice {
  let price = AssetPrice.load(id) as AssetPrice;
  if (price == null) {
    logCritical('Asset price {} does not exist', [id]);
  }

  return price;
}

export function createAssetPrice(asset: Asset, current: BigDecimal, timestamp: BigInt): AssetPrice {
  let id = assetPriceId(asset, timestamp);
  let price = new AssetPrice(id);
  price.asset = asset.id;
  price.price = current;
  price.timestamp = timestamp;
  price.save();

  return price;
}

export function ensureAssetPrice(asset: Asset, current: BigDecimal, timestamp: BigInt): AssetPrice {
  let id = assetPriceId(asset, timestamp);
  let price = AssetPrice.load(id) as AssetPrice;

  if (price != null && !current.equals(price.price)) {
    price.price = current;
    price.save();
  }

  if (price == null) {
    price = createAssetPrice(asset, current, timestamp);
  }

  return price;
}

export function trackAssetPrice(asset: Asset, timestamp: BigInt, price: BigDecimal): AssetPrice {
  let current = ensureAssetPrice(asset, price, timestamp);

  // Skip updates within the same block.
  if (current.id == asset.price) {
    return current;
  }

  let hourly = updateHourlyAssetPriceCandle(asset, current);
  let daily = updateDailyAssetPriceCandle(asset, current);
  let monthly = updateMonthlyAssetPriceCandle(asset, current);

  // NOTE: It's important that we update the price references AFTER the candles have been updated.
  // Otherwise, we can't carry over the previous to the new candles.
  asset.price = current.id;
  asset.hourly = hourly.id;
  asset.daily = daily.id;
  asset.monthly = monthly.id;
  asset.save();

  return current;
}
