import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer..dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { CustomerService } from 'src/invoicing/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {

    }
    @Post('/createCustomer')
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.createCustomer(createCustomerDto);
    }

    // @Post('/createInvoice')
    // async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    //     return this.invoiceService.createInvoice(createInvoiceDto);
    // }

    @Patch('/updateCustomer/:id')
    async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: CreateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }

    @Get('/getCustomers')
    getCustomers() {

    }

    @Delete('/deleteCustomer')
    deleteCustomer() {

    }

}
