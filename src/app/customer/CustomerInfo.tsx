import { CheckoutSelectors, CustomerRequestOptions, CustomError } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent } from 'react';

import { withCheckout, CheckoutContextProps } from '../checkout';

import canSignOut from './canSignOut';

export interface CustomerInfoProps {
    onSignOut?(event: CustomerSignOutEvent): void;
    onSignOutError?(error: CustomError): void;
}

export interface CustomerSignOutEvent {
    isCartEmpty: boolean;
}

interface WithCheckoutCustomerInfoProps {
    email: string;
    methodId: string;
    isSignedIn: boolean;
    isSigningOut: boolean;
    signOut(options?: CustomerRequestOptions): Promise<CheckoutSelectors>;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps & WithCheckoutCustomerInfoProps> = ({
    email,
}) => {

    return (
        <div
            className="customerView"
            data-test="checkout-customer-info"
        >
            <div
                className="customerView-body optimizedCheckout-contentPrimary"
                data-test="customer-info"
            >
                { email }
            </div>

            <div className="customerView-actions" />
        </div>
    );
};

function mapToWithCheckoutCustomerInfoProps(
    { checkoutService, checkoutState }: CheckoutContextProps
): WithCheckoutCustomerInfoProps | null {
    const {
        data: { getBillingAddress, getCheckout, getCustomer },
        statuses: { isSigningOut },
    } = checkoutState;

    const billingAddress = getBillingAddress();
    const checkout = getCheckout();
    const customer = getCustomer();

    if (!billingAddress || !checkout || !customer) {
        return null;
    }

    const methodId = checkout.payments && checkout.payments.length === 1 ? checkout.payments[0].providerId : '';

    return {
        email: billingAddress.email || customer.email,
        methodId,
        isSignedIn: canSignOut(customer, checkout, methodId),
        isSigningOut: isSigningOut(),
        signOut: checkoutService.signOutCustomer,
    };
}

export default withCheckout(mapToWithCheckoutCustomerInfoProps)(CustomerInfo);
