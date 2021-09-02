import { toBigDecimal } from '../../../../utils';
import { ensureNetwork } from '../../entities/Network';
import { ensureProtocolFee } from '../../entities/ProtocolFee';
import {
  FeeBpsDefaultSet,
  FeeBpsOverrideSetForVault,
  FeePaidForVault,
  InitializedForVault,
  LastPaidSetForVault,
  ProtocolFeeTracker4Contract,
} from '../../generated/ProtocolFeeTracker4Contract';

export function handleInitializedForVault(event: InitializedForVault): void {
  let protocolFeeTrackerContract = ProtocolFeeTracker4Contract.bind(event.address);
  let rate = protocolFeeTrackerContract.getFeeBpsForVault(event.params.vaultProxy);

  let protocolFee = ensureProtocolFee(event.params.vaultProxy, event.address);
  protocolFee.rate = toBigDecimal(rate, 4);
  protocolFee.save();
}

export function handleFeeBpsDefaultSet(event: FeeBpsDefaultSet): void {
  let network = ensureNetwork(event);
  network.protocolFeeRate = toBigDecimal(event.params.nextFeeBpsDefault, 4);
  network.save();
}

export function handleFeeBpsOverrideSetForVault(event: FeeBpsOverrideSetForVault): void {
  let protocolFee = ensureProtocolFee(event.params.vaultProxy, event.address);
  protocolFee.rate = toBigDecimal(event.params.nextFeeBpsOverride, 4);
  protocolFee.save();
}

export function handleFeePaidForVault(event: FeePaidForVault): void {
  // tracked in VaultLib
}

export function handleLastPaidSetForVault(event: LastPaidSetForVault): void {
  let protocolFee = ensureProtocolFee(event.params.vaultProxy, event.address);
  protocolFee.lastPaid = event.params.nextTimestamp.toI32();
  protocolFee.save();
}