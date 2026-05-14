import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer.dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { CustomerService } from 'src/invoicing/services/customer/customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto, req: any): Promise<Customer>;
    updateCustomer(req: any, id: string, updateCustomerDto: CreateCustomerDto): Promise<{
        Message: string;
    }>;
    getCustomersByUserId(req: any): Promise<(import("mongoose").Document<unknown, {}, Customer> & Customer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteCustomer(req: any, id: string): Promise<{
        Message: string;
    }>;
}
