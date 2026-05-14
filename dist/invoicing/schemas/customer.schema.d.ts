import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { InvoiceCustomerAddress } from './customer-address.schema';
export declare class Customer extends Document {
    name: string;
    email: string;
    phone: string;
    archived: boolean;
    address?: InvoiceCustomerAddress;
    user: User;
}
export declare const CustomerSchema: mongoose.Schema<Customer, mongoose.Model<Customer, any, any, any, mongoose.Document<unknown, any, Customer> & Customer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Customer, mongoose.Document<unknown, {}, mongoose.FlatRecord<Customer>> & mongoose.FlatRecord<Customer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
