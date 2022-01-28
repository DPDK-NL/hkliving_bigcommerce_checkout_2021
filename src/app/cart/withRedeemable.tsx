import React, { ComponentType, FunctionComponent } from 'react';

import { OrderSummaryProps, OrderSummarySubtotalsProps } from '../order';

import mapToOrderSummarySubtotalsProps from './mapToOrderSummarySubtotalsProps';
import { WithCheckoutCartSummaryProps } from './CartSummary';

export default function withRedeemable(
    OriginalComponent: ComponentType<OrderSummaryProps & OrderSummarySubtotalsProps>
): FunctionComponent<
    WithCheckoutCartSummaryProps &
    { headerLink?: any }
> {
    return props => {
        const {
            checkout,
            storeCurrency,
            shopperCurrency,
            headerLink,
            onRemovedCoupon,
            onRemovedGiftCertificate,
            storeCreditAmount,
        } = props;

        return (
            <OriginalComponent
                { ...mapToOrderSummarySubtotalsProps(checkout) }
                headerLink={ headerLink }
                lineItems={ checkout.cart.lineItems }
                onRemovedCoupon={ onRemovedCoupon }
                onRemovedGiftCertificate={ onRemovedGiftCertificate }
                shopperCurrency={ shopperCurrency }
                storeCreditAmount={ storeCreditAmount }
                storeCurrency={ storeCurrency }
                total={ checkout.outstandingBalance }
            />
        );
    };
}
