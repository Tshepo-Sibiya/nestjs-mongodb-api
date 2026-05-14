import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/invoicing/dto/customer-dto/update-customer.dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';
export declare class CustomerService {
    private customerModel;
    private userModel;
    constructor(customerModel: Model<Customer>, userModel: Model<User>);
    createCustomer(user: User, createCustomerDto: CreateCustomerDto): Promise<Customer>;
    updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto, userId: string): Promise<{
        Message: string;
    }>;
    getCustomersByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, Customer> & Customer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteCustomer(id: string, userId: string): Promise<{
        Message: string;
    }>;
}
