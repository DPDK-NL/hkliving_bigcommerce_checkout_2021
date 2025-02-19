import { Checkout, ShopperCurrency, StoreCurrency } from '@bigcommerce/checkout-sdk';
import { FunctionComponent } from 'react';

import { withCheckout } from '../checkout';
import OrderSummary from '../order/OrderSummary';

import mapToCartSummaryProps from './mapToCartSummaryProps';
import withRedeemable from './withRedeemable';
import { RedeemableProps } from './Redeemable';

export type WithCheckoutCartSummaryProps = {
    checkout: Checkout;
    cartUrl: string;
    storeCurrency: StoreCurrency;
    shopperCurrency: ShopperCurrency;
    storeCreditAmount?: number;
} & RedeemableProps;

const CartSummary: FunctionComponent<WithCheckoutCartSummaryProps> = ({
    cartUrl,
    ...props
}) => (
    withRedeemable(OrderSummary)({
        ...props,
        cartUrl,
    })
);

export default withCheckout(mapToCartSummaryProps)(CartSummary);
