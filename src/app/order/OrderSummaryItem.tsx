import classNames from 'classnames';
import { isNumber } from 'lodash';
import React, { memo, FunctionComponent, ReactNode } from 'react';

import { ShopperCurrency } from '../currency';

export interface OrderSummaryItemProps {
    id: string | number;
    amount: number;
    quantity: number;
    name: string;
    amountAfterDiscount?: number;
    image?: ReactNode;
    description?: ReactNode;
    productOptions?: OrderSummaryItemOption[];
    sku?: string;
}

export interface OrderSummaryItemOption {
    testId: string;
    content: ReactNode;
}

const OrderSummaryItem: FunctionComponent<OrderSummaryItemProps> = ({
    amount,
    amountAfterDiscount,
    name,
    quantity,
    description,
    sku,
}) => (
    <div className="product" data-test="cart-item">
        <div className="product-column product-body">
            <h5
                className="product-title optimizedCheckout-contentPrimary"
                data-test="cart-item-product-title"
            >
                { `${quantity} x ${name}` }
            </h5>
            <ul
                className="product-options optimizedCheckout-contentSecondary"
                data-test="cart-item-product-options"
            >
                { sku && <li className="product-option">{ sku }</li> }
            </ul>
            { description && <div
                className="product-description optimizedCheckout-contentSecondary"
                data-test="cart-item-product-description"
            >
                { description }
            </div> }
        </div>

        <div className="product-column product-actions">
            <div
                className={ classNames(
                    'product-price',
                    'optimizedCheckout-contentPrimary',
                    { 'product-price--beforeDiscount': isNumber(amountAfterDiscount) && amountAfterDiscount !== amount }
                ) }
                data-test="cart-item-product-price"
            >
                <ShopperCurrency amount={ amount } />
            </div>

            { isNumber(amountAfterDiscount) && amountAfterDiscount !== amount && <div
                className="product-price"
                data-test="cart-item-product-price--afterDiscount"
            >
                <ShopperCurrency amount={ amountAfterDiscount } />
            </div> }
        </div>
    </div>
);

export default memo(OrderSummaryItem);
