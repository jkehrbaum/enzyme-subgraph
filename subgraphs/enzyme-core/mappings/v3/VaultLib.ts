import { arrayDiff, arrayUnique, ZERO_ADDRESS } from '@enzymefinance/subgraph-utils';
import { ensureInvestor, ensureOwner } from '../../entities/Account';
import { ensureAsset } from '../../entities/Asset';
import { ensureInvestment, trackInvestmentBalance } from '../../entities/Investment';
import { trackVaultTotalSupply, useVault } from '../../entities/Vault';
import {
  AccessorSet,
  Approval,
  AssetWithdrawn,
  MigratorSet,
  OwnerSet,
  TrackedAssetAdded,
  TrackedAssetRemoved,
  Transfer,
  VaultLibSet,
} from '../../generated/VaultLib3Contract';

export function handleAccessorSet(event: AccessorSet): void {
  let vault = useVault(event.address.toHex());
  vault.comptroller = event.params.nextAccessor.toHex();
  vault.save();
}

export function handleAssetWithdrawn(event: AssetWithdrawn): void {}

export function handleMigratorSet(event: MigratorSet): void {
  let vault = useVault(event.address.toHex());
  vault.migrator = event.params.nextMigrator.toHex();
  vault.save();
}

export function handleOwnerSet(event: OwnerSet): void {
  let manager = ensureOwner(event.params.nextOwner, event);

  let vault = useVault(event.address.toHex());
  vault.owner = manager.id;
  vault.save();
}

export function handleTrackedAssetAdded(event: TrackedAssetAdded): void {
  let vault = useVault(event.address.toHex());
  let asset = ensureAsset(event.params.asset);

  vault.trackedAssets = arrayUnique<string>(vault.trackedAssets.concat([asset.id]));
  vault.save();
}

export function handleTrackedAssetRemoved(event: TrackedAssetRemoved): void {
  let vault = useVault(event.address.toHex());
  let asset = ensureAsset(event.params.asset);

  vault.trackedAssets = arrayDiff<string>(vault.trackedAssets, [asset.id]);
  vault.save();
}

export function handleVaultLibSet(event: VaultLibSet): void {}

export function handleApproval(event: Approval): void {}

export function handleTransfer(event: Transfer): void {
  let vault = useVault(event.address.toHex());
  trackVaultTotalSupply(vault);

  if (event.params.from.notEqual(ZERO_ADDRESS)) {
    let fromInvestor = ensureInvestor(event.params.from, event);
    let fromInvestment = ensureInvestment(fromInvestor, vault, event);
    trackInvestmentBalance(vault, fromInvestment);
  }

  if (event.params.to.notEqual(ZERO_ADDRESS)) {
    let toInvestor = ensureInvestor(event.params.to, event);
    let toInvestment = ensureInvestment(toInvestor, vault, event);
    trackInvestmentBalance(vault, toInvestment);
  }
}