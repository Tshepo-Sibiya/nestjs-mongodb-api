import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { InvoiceStatus } from 'src/invoicing/enums/invoice-status.enum';
export declare class InvoiceDto {
    invoiceNumber: string;
    customerId: string;
    totalAmount: number;
    invoiceItems: InvoiceItem[];
    dueDate: Date;
    invoiceDate: Date;
    status: InvoiceStatus;
    notes?: string;
}
