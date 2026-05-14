import { InvoiceStatus } from "src/invoicing/enums/invoice-status.enum";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";
export declare class CreateQuoteDto {
    quoteNumber: string;
    customerId: string;
    totalAmount: number;
    invoiceItems: InvoiceItem[];
    issueDate: Date;
    dueDate: Date;
    expiryDate: Date;
    status: InvoiceStatus;
    notes?: string;
}
