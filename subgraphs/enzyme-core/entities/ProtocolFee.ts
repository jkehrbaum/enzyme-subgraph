import { Address, BigDecimal } from '@graphprotocol/graph-ts';
import { ProtocolFee } from '../generated/schema';

export function protocolFeeId(vaultAddress: Address, protocolFeeTrackerAddress: Address): string {
  return vaultAddress.toHex() + '/' + protocolFeeTrackerAddress.toHex();
}

export function ensureProtocolFee(vaultAddress: Address, protocolFeeTrackerAddress: Address): ProtocolFee {
  let id = protocolFeeId(vaultAddress, protocolFeeTrackerAddress);

  let protocolFee = new ProtocolFee(id) as ProtocolFee;

  if (protocolFee) {
    return protocolFee;
  }

  protocolFee = new ProtocolFee(id);
  protocolFee.vault = vaultAddress.toHex();
  protocolFee.feeTracker = protocolFeeTrackerAddress;
  protocolFee.rate = BigDecimal.fromString('0');
  protocolFee.lastPaid = 0;
  protocolFee.save();

  return protocolFee;
}
