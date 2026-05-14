export declare class InvoiceCustomerAddressDto {
    addressLineOne?: string;
    addressLineTwo?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
}
export declare class UpdateCustomerDto {
    name: string;
    email: string;
    phone?: string;
    archived?: boolean;
    address?: InvoiceCustomerAddressDto;
}
