import { BigInt } from '@graphprotocol/graph-ts';
import { Cron } from '../generated/schema';

export function ensureCron(): Cron {
  let cron = Cron.load('SINGLETON') as Cron;
  if (cron == null) {
    cron = new Cron('SINGLETON');
    cron.cron = BigInt.fromI32(-1);
    cron.primitives = new Array<string>();
    cron.derivatives = new Array<string>();
    cron.usdQuotedPrimitives = new Array<string>();
    cron.currencies = new Array<string>();
    cron.chainlinkAggregatorProxies = new Array<string>();
    cron.save();
  }

  return cron;
}
