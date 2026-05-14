import { InvoiceItemDto } from 'src/invoicing/dto/invoice-item-dto/create-invoice-item.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { InvoiceItemService } from 'src/invoicing/services/invoice-item/invoice-item.service';
export declare class InvoiceItemController {
    private invoiceItemService;
    constructor(invoiceItemService: InvoiceItemService);
    create(createInvoiceItemDto: InvoiceItemDto, req: any): Promise<InvoiceItem>;
    updateInvoiceItem(updateInvoiceItemDto: InvoiceItemDto, id: string, req: any): Promise<{
        Message: string;
    }>;
    getInvoiceItems(req: any): Promise<(import("mongoose").Document<unknown, {}, InvoiceItem> & InvoiceItem & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteInvoiceItem(req: any, id: string): Promise<{
        Message: string;
    }>;
}
