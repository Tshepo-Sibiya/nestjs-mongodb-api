import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { Model } from 'mongoose';
import { InvoiceItemDto } from 'src/invoicing/dto/invoice-item-dto/create-invoice-item.dto';
import { User } from 'src/user/schemas/user.schema';
export declare class InvoiceItemService {
    private invoiceItemModel;
    constructor(invoiceItemModel: Model<InvoiceItem>);
    createInvoiceItem(user: User, createInvoiceItemDto: InvoiceItemDto): Promise<InvoiceItem>;
    deleteInvoiceItem(id: string, userId: string): Promise<{
        Message: string;
    }>;
    updateInvoiceItem(user: User, id: string, updateInvoiceItemDto: InvoiceItemDto): Promise<{
        Message: string;
    }>;
    getInvoiceItems(userId: string): Promise<(import("mongoose").Document<unknown, {}, InvoiceItem> & InvoiceItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
