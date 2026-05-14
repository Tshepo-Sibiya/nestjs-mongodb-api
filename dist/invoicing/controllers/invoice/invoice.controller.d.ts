import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { InvoiceService } from 'src/invoicing/services/invoice/invoice.service';
import { Response } from 'express';
export declare class InvoiceController {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    create(createInvoiceDto: InvoiceDto, req: any): Promise<Invoice>;
    updateInvoice(updateInvoiceDto: UpdateInvoiceDto, id: string, req: any): Promise<{
        Message: string;
    }>;
    getInvoices(req: any): Promise<(import("mongoose").Document<unknown, {}, Invoice> & Invoice & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getInvoice(id: string, req: any): Promise<Invoice>;
    deleteInvoice(id: string, req: any): Promise<{
        Message: string;
    }>;
    generatePDF(req: any, id: string, res: Response): Promise<void>;
}
