import { Address } from '@graphprotocol/graph-ts';
import { ZERO_ADDRESS } from '@enzymefinance/subgraph-utils';
import { AggregatorProxyContract } from '../generated/AggregatorProxyContract';

export function unwrapAggregator(address: Address): Address {
  let aggregator = address;

  while (true) {
    let contract = AggregatorProxyContract.bind(aggregator);
    let result = contract.try_aggregator();
    if (result.reverted || result.value.equals(ZERO_ADDRESS) || result.value.equals(aggregator)) {
      break;
    }

    aggregator = result.value;
  }

  return aggregator;
}