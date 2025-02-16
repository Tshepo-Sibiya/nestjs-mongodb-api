import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/user/schemas/user.schemas';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(InvoiceItem.name) private invoiceItemModel: Model<InvoiceItem>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
    ) { }



    async createInvoice(user: User, createInvoiceDto: InvoiceDto): Promise<Invoice> {
        try {


            const customer = await this.customerModel.findOne({ user: user._id, _id: createInvoiceDto.customerId }).exec();

            if (!customer) {
                throw new HttpException('Customer not found', 404);
            }

            const _assingedToCustomer = Object.assign(createInvoiceDto, { customer: customer._id });

            const _data = Object.assign(_assingedToCustomer, { user: user._id });

            _data.invoiceNumber = await this.generateInvoiceNumber(user._id);

            const _newInvoice = await this.invoiceModel.create(_data);

            return _newInvoice;

        } catch (error) {
            throw new NotFoundException('Error creating invoice: ' + error);
        }
    }


    async getInvoicesByUserId(userId: string) {
        try {
            const invoices = await this.invoiceModel.find({ user: userId }).populate('customer').exec();
            if (!invoices || invoices.length === 0) {
                console.log('No invoices found for current user!');
                return [];
            }
            return invoices;
        } catch (error) {
            throw new NotFoundException('Error retrieving invoices');
        }
    }

    async deleteInvoice(id: string, userId: string) {
        const deletedInvoice = await this.invoiceModel.findOneAndDelete({_id: id, user: userId}).exec();
        if (!deletedInvoice) {
            throw new NotFoundException('Invoice not found');
        }
        return { 'Message': 'Invoice successfully deleted' };
    }

    async updateInvoice(user: User, id: string, updateInvoiceDto: UpdateInvoiceDto) {
        try {

            const customer = await this.customerModel.findOne({ user: user._id, _id: updateInvoiceDto.customerId }).exec();

            if (!customer) {
                throw new NotFoundException('Customer not found');
            }

            const _assingedToCustomer = Object.assign(updateInvoiceDto, { customer: customer._id });

            const updatedInvoice = await this.invoiceModel.findOneAndUpdate({_id: id}, _assingedToCustomer, { new: true }).exec();
            if (!updatedInvoice) {
                throw new NotFoundException('No invoices found for this user');
            }
            return { 'Message': 'Invoice successfully updated' };
        } catch (error) {
            throw new NotFoundException('Error updating invoice: ' + error.message);
        }
    }

    async generateInvoiceNumber(userId: any): Promise<string> {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // MM
        const year = now.getFullYear(); // YYYY

        // Count invoices for the current user in the current month and year
        const invoiceCount = await this.invoiceModel.countDocuments({
            user: userId,
        });
        console.log('invoiceCount: ', invoiceCount);
        // Increment the count by 1 for the new invoice
        const increment = String(invoiceCount + 1).padStart(4, '0'); // 0000

        // Format the invoice number
        return `INV-${month}-${year}-${increment}`;
    }

    generatePDF(): string {
        const filePath = path.join(__dirname, '..', '..', 'Invoice.pdf');
      
        const doc = new PDFDocument({
          size: 'A4',             
          margins: {              
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
          }
        });
      
        // Stream the output to a file
        doc.pipe(fs.createWriteStream(filePath));
      
        // Add Image (Top Left, 50px x 50px)
        doc
          .image(
            '/Users/itdigitalsolutionssasfin/Documents/Tshepo Sibiya/Applications/APIs/nestjs-mongodb-demo/src/assets/image101.jpeg', 
            50, 50, 
            { 
              width: 100, 
              height: 100 
            }
          );
      
        // Add Text (Top Right)
        doc
          .font('Helvetica-Bold')
          .fontSize(14)
          .fillColor('#333333')
          .text('Company Name', 400, 50, {
            align: 'right'
          })
          .font('Helvetica')
          .fontSize(10)
          .text('Address Line 1\nAddress Line 2\nCity, State, Zip Code', 400, 70, {
            align: 'right'
          });
      
        // Add a Title with Styling
        // doc
        //   .font('Helvetica-Bold')
        //   .fontSize(24)
        //   .fillColor('#333333')
        //   .text('Complex PDF Example', {
        //     align: 'center',
        //     underline: true
        //   })
        //   .moveDown(1.5);
      
        // Draw a Line Under the Title
        doc
          .moveTo(50, 150)
          .lineTo(550, 150)
          .strokeColor('#aaaaaa')
          .lineWidth(1)
          .stroke();
      
        // Add Styled Text
        // doc
        //   .font('Helvetica')
        //   .fontSize(16)
        //   .fillColor('#555555')
        //   .text('This is a more complex example of using PDFKit to generate a styled PDF document.', {
        //     align: 'justify'
        //   })
        //   .moveDown(0.5);
      
        doc
          .font('Helvetica-Oblique')
          .fontSize(14)
          .fillColor('#777777')
          .text('You can easily style text, add images, and draw shapes.', {
            align: 'justify'
          })
          .moveDown(0.5);
      
        doc
          .font('Helvetica-Bold')
          .fontSize(18)
          .fillColor('#222222')
          .text('PDFKit is powerful!', {
            align: 'center'
          })
          .moveDown(1);
      
        // Draw a Rectangle with a Fill Color
        doc
          .rect(50, doc.y, 500, 100)
          .fillAndStroke('#f2f2f2', '#cccccc');
      
        // Add Text Inside the Rectangle
        doc
          .fillColor('#444444')
          .font('Helvetica')
          .fontSize(14)
          .text('This rectangle is drawn with custom colors and contains text inside.', 60, doc.y + 10, {
            width: 480,
            align: 'left'
          })
          .moveDown(2);
      
        // Footer
        doc
          .font('Helvetica-Oblique')
          .fontSize(10)
          .fillColor('#888888')
          .text('Generated using PDFKit in NestJS', 50, 750, {
            align: 'center'
          });
      
        // Finalize the PDF and end the stream
        doc.end();
      
        return filePath;
      }
      

}


