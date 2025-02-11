import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer..dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { CustomerService } from 'src/invoicing/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {

    }
    @Post('/createCustomer')
    @UseGuards(AuthGuard())
    async create(
        @Body() createCustomerDto: CreateCustomerDto,
        @Req() req,

    ): Promise<Customer> {
        return this.customerService.createCustomer(req.user, createCustomerDto);
    }


    @Patch('/updateCustomer/:id')
    @UseGuards(AuthGuard())
    async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: CreateCustomerDto) {
        return this.customerService.updateCustomer(id, updateCustomerDto);
    }

    @Post('/getUserCustomers/:id')
    @UseGuards(AuthGuard())
    getCustomersByUserId(@Param('id') id: string,) { 
        console.log('Its here...');
        console.log(id);
        return this.customerService.getCustomersByUserId(id);
    }

    @Delete('/deleteCustomer')
    deleteCustomer() {

    }

}
