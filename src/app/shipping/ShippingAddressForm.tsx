import { Address, Consignment, Country, CustomerAddress, FormField } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import {  isValidCustomerAddress, AddressSelect } from '../address';
import { connectFormik, ConnectFormikProps } from '../common/form';
import { Fieldset } from '../ui/form';
import { LoadingOverlay } from '../ui/loading';

import { SingleShippingFormValues } from './SingleShippingForm';

export interface ShippingAddressFormProps {
    addresses: CustomerAddress[];
    address?: Address;
    consignments: Consignment[];
    countries?: Country[];
    countriesWithAutocomplete: string[];
    googleMapsApiKey?: string;
    isLoading: boolean;
    formFields: FormField[];
    shouldShowSaveAddress?: boolean;
    onUseNewAddress(): void;
    onFieldChange(fieldName: string, value: string): void;
    onAddressSelect(address: Address): void;
}

class ShippingAddressForm extends Component<ShippingAddressFormProps & ConnectFormikProps<SingleShippingFormValues>> {
    render(): ReactNode {
        const {
            addresses,
            address: shippingAddress,
            onAddressSelect,
            onUseNewAddress,
            formFields,
            isLoading,
            formik: {
                values: {},
            },
        } = this.props;

        const hasAddresses = addresses && addresses.length > 0;
        const hasValidCustomerAddress = isValidCustomerAddress(shippingAddress, addresses, formFields);

        return (
            <Fieldset id="checkoutShippingAddress">
                { hasAddresses &&
                    <Fieldset id="shippingAddresses">
                        <LoadingOverlay isLoading={ isLoading }>
                            <AddressSelect
                                addresses={ addresses }
                                onSelectAddress={ onAddressSelect }
                                onUseNewAddress={ onUseNewAddress }
                                selectedAddress={ hasValidCustomerAddress ? shippingAddress : undefined }
                            />
                        </LoadingOverlay>
                    </Fieldset> }
            </Fieldset>
        );
    }
}

export default connectFormik(ShippingAddressForm);
