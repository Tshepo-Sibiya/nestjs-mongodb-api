import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';
import { UserService } from 'src/user/services/user/user.service';
export declare class InvoiceService {
    private invoiceModel;
    private authService;
    private invoiceItemModel;
    private customerModel;
    constructor(invoiceModel: Model<Invoice>, authService: UserService, invoiceItemModel: Model<InvoiceItem>, customerModel: Model<Customer>);
    createInvoice(user: User, createInvoiceDto: InvoiceDto): Promise<Invoice>;
    getInvoiceById(id: string, userId: string): Promise<Invoice>;
    getInvoicesByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, Invoice> & Invoice & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteInvoice(id: string, userId: string): Promise<{
        Message: string;
    }>;
    updateInvoice(user: User, id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        Message: string;
    }>;
    formatDate(date: Date): string;
    generateInvoiceNumber(userId: any): Promise<string>;
    generatePDF(id: string, userId: string): Promise<string>;
}
