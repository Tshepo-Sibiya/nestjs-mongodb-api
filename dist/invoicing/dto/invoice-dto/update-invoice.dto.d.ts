import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { InvoiceStatus } from 'src/invoicing/enums/invoice-status.enum';
export declare class UpdateInvoiceDto {
    customerId: string;
    totalAmount: number;
    invoiceItems: InvoiceItem[];
    dueDate: Date;
    status: InvoiceStatus;
    notes?: string;
}
