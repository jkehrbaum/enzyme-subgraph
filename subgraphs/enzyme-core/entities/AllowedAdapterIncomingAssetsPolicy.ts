import { Address, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { AllowedAdapterIncomingAssetsPolicy } from '../generated/schema';
import { policyId } from './Policy';

export function ensureAllowedAdapterIncomingAssetsPolicy(
  comptrollerAddress: Address,
  policyAddress: Address,
  event: ethereum.Event,
): AllowedAdapterIncomingAssetsPolicy {
  let id = policyId(comptrollerAddress, policyAddress);
  let policy = AllowedAdapterIncomingAssetsPolicy.load(id) as AllowedAdapterIncomingAssetsPolicy;

  if (policy) {
    return policy;
  }

  policy = new AllowedAdapterIncomingAssetsPolicy(id);
  policy.policy = policyAddress;
  policy.comptroller = comptrollerAddress.toHex();
  policy.assets = new Array<Bytes>();
  policy.createdAt = event.block.timestamp.toI32();
  policy.enabled = true;
  policy.settings = '';
  policy.save();

  return policy;
}
