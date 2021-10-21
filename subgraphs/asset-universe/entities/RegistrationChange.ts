import { ethereum } from '@graphprotocol/graph-ts';
import { Asset, Registration, RegistrationChange, Version } from '../generated/schema';
import { getRegistrationChangeCounter } from './Counter';

function registrationChangeId(registration: Registration, change: string, event: ethereum.Event): string {
  return registration.id + '/' + change + '/' + event.transaction.hash.toHex() + '/' + event.logIndex.toString();
}

export function recordRegistrationChange(
  version: Version,
  asset: Asset,
  registration: Registration,
  registrationDetailId: string,
  change: string,
  event: ethereum.Event,
): void {
  let id = registrationChangeId(registration, change, event);
  let record = new RegistrationChange(id);
  record.registration = registration.id;
  record.detail = registrationDetailId;
  record.change = change;
  record.version = version.id;
  record.asset = asset.id;
  record.timestamp = event.block.timestamp.toI32();
  record.block = event.block.number;
  record.transaction = event.transaction.hash;
  record.counter = getRegistrationChangeCounter();
  record.save();
}