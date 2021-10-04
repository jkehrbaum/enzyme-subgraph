import { DerivativeAdded, DerivativeRemoved } from '../../generated/contracts/AggregatedDerivativePriceFeed3Events';
import { createDerivativeRegistration, removeDerivativeRegistration } from '../../entities/Registration';
import { initializeCurrencies } from '../../utils/initializeCurrencies';
import { updateForDerivativeRegistration } from '../../utils/updateForRegistration';

export function handleDerivativeAdded(event: DerivativeAdded): void {
  initializeCurrencies(event);

  let registration = createDerivativeRegistration(event.params.derivative, 3, event);
  updateForDerivativeRegistration(registration, event);
}

export function handleDerivativeRemoved(event: DerivativeRemoved): void {
  initializeCurrencies(event);
  removeDerivativeRegistration(event.params.derivative, 3, event);
}