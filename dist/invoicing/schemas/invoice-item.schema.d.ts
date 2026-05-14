import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type InvoiceItemDocument = InvoiceItem & Document;
export declare class InvoiceItem extends Document {
    description: string;
    price: number;
    archived: boolean;
    taxable: boolean;
    user: User;
}
export declare const InvoiceItemSchema: mongoose.Schema<InvoiceItem, mongoose.Model<InvoiceItem, any, any, any, mongoose.Document<unknown, any, InvoiceItem> & InvoiceItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, InvoiceItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<InvoiceItem>> & mongoose.FlatRecord<InvoiceItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
