import { Coupon, GiftCertificate, Tax } from '@bigcommerce/checkout-sdk';
import React, { memo, Fragment, FunctionComponent } from 'react';

import { TranslatedString } from '../locale';

import OrderSummaryDiscount from './OrderSummaryDiscount';
import OrderSummaryPrice from './OrderSummaryPrice';

export interface OrderSummarySubtotalsProps {
    coupons: Coupon[];
    giftCertificates?: GiftCertificate[];
    discountAmount?: number;
    taxes?: Tax[];
    giftWrappingAmount?: number;
    shippingAmount?: number;
    handlingAmount?: number;
    storeCreditAmount?: number;
    subtotalAmount: number;
    onRemovedGiftCertificate?(code: string): void;
    onRemovedCoupon?(code: string): void;
}

const OrderSummarySubtotals: FunctionComponent<OrderSummarySubtotalsProps> = ({
    discountAmount,
    giftCertificates,
    giftWrappingAmount,
    subtotalAmount,
    handlingAmount,
    storeCreditAmount,
    coupons,
    onRemovedGiftCertificate,
    onRemovedCoupon,
}) => {
    return (<Fragment>
        <OrderSummaryPrice
            amount={ subtotalAmount }
            className="cart-priceItem--subtotal"
            label={ <TranslatedString id="cart.subtotal_text" /> }
            testId="cart-subtotal"
        />

        { (coupons || [])
            .map((coupon, index) =>
                <OrderSummaryDiscount
                    amount={ coupon.discountedAmount }
                    code={ coupon.code }
                    key={ index }
                    label={ coupon.displayName }
                    onRemoved={ onRemovedCoupon }
                    testId="cart-coupon"
                />
        ) }

        { !!discountAmount && <OrderSummaryDiscount
            amount={ discountAmount }
            label={ <TranslatedString id="cart.discount_text" /> }
            testId="cart-discount"
        /> }

        { (giftCertificates || [])
            .map((giftCertificate, index) =>
                <OrderSummaryDiscount
                    amount={ giftCertificate.used }
                    code={ giftCertificate.code }
                    key={ index }
                    label={ <TranslatedString id="cart.gift_certificate_text" /> }
                    onRemoved={ onRemovedGiftCertificate }
                    remaining={ giftCertificate.remaining }
                    testId="cart-gift-certificate"
                />
        ) }

        { !!giftWrappingAmount && <OrderSummaryPrice
            amount={ giftWrappingAmount }
            label={ <TranslatedString id="cart.gift_wrapping_text" /> }
            testId="cart-gift-wrapping"
        /> }

        { !!handlingAmount && <OrderSummaryPrice
            amount={ handlingAmount }
            label={ <TranslatedString id="cart.handling_text" /> }
            testId="cart-handling"
        /> }

        { !!storeCreditAmount && <OrderSummaryDiscount
            amount={ storeCreditAmount }
            label={ <TranslatedString id="cart.store_credit_text" /> }
            testId="cart-store-credit"
        /> }
    </Fragment>);
};

export default memo(OrderSummarySubtotals);
