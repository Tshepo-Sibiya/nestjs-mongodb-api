import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import * as puppeteer from 'puppeteer';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private authService: UserService,
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

  async getInvoiceById(id: string, userId: string): Promise<Invoice> {
    try {
      const invoice = await this.invoiceModel.findOne({ _id: id, user: userId }).populate('customer').exec();
      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }
      return invoice;
    } catch (error) {
      throw new NotFoundException('Error retrieving invoice: ' + error.message);
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
    const deletedInvoice = await this.invoiceModel.findOneAndDelete({ _id: id, user: userId }).exec();
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

      const updatedInvoice = await this.invoiceModel.findOneAndUpdate({ _id: id }, _assingedToCustomer, { new: true }).exec();
      if (!updatedInvoice) {
        throw new NotFoundException('No invoices found for this user');
      }
      return { 'Message': 'Invoice successfully updated' };
    } catch (error) {
      throw new NotFoundException('Error updating invoice: ' + error.message);
    }
  }

  formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
  }


  async generateInvoiceNumber(userId: any,): Promise<string> {
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


  async generatePDF(id: string, userId: string): Promise<string> {

    let invoice = await this.getInvoiceById(id, userId);
    let user = await this.authService.getProfileDetails(userId);
    const imagePath = '/Users/itdigitalsolutionssasfin/Documents/Tshepo Sibiya/Applications/APIs/nestjs-mongodb-demo/src/assets/image101.jpeg';

    // Convert image to Base64
    const imageBase64 = fs.readFileSync(imagePath, 'base64');
    const imageSrc = `data:image/jpeg;base64,${imageBase64}`;
    // Define the HTML template for the invoice

    const htmlContent = `
      <html>
      <head>
        <style>
        body { 
          background-color: yellow;
          font-family: Arial, sans-serif; 
          margin: 20px; 
          position: relative; 
          min-height: 100vh; 
          padding: 30px; /* Adjust based on footer height */
        }
        h1 { color: #333; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .custom-table th, 
        .custom-table thead {
          background-color: yellow !important;
          color: purple;
          border: none;
        }
        .custom-table td {
          border: none;
        }
        .table thead th {
          background-color: yellow !important;
        }
        th { background-color: #f4f4f4; }
        .header { display: flex; align-items: center; }
        .logo { width: 100px; height: auto; margin-right: 20px; }
        .flex-container { display: flex; justify-content: space-between; margin-top: 20px; }
        .left, .right { width: 48%; }
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #f4f4f4;
          text-align: center;
          padding: 10px 0;
          font-size: 14px;
        }
        @media print {
          .footer {
          position: fixed;
          bottom: 0;
          }
        }
        </style>
      </head>
      <body>
      <div>
       <h2 style="color: purple;text-align:left;font-size: 20px">Invoice - ${invoice.invoiceNumber} </h2>
      </div>
      
       

        <div style="margin-bottom: 30px; padding-top: 20px;text-align:left">   
         <img src="${imageSrc}" class="logo" style="height: 160px;width: 160px;margin-bottom: 20px"/>
         <h2 style="font-size: 20px">${invoice.customer.name}</h2>
        </div>
        
        <hr>

        <div style="margin-bottom: 50px">
        <table style="border: none;" class="custom-table">
         <tr>
          <td style="border: none;">
          
            <table border="0" style="">
            <tr>
              <th>ISSUED TO:</th>
           
            </tr>
            <tr>
              <td>
              ${invoice.customer.name}
              </td>
            </tr>
              <tr>
              <td>
                 ${invoice.customer.email}
              </td>
            </tr>
             </table>
          </td>
          <td style="border: none;">
            <table class="custom-table" style="margin-left: 20px;">
            <tr>
              <th>INVOICE NO: ${invoice.invoiceNumber}</th>
            
            </tr>
            <tr>
              <td>DATE: ${this.formatDate(invoice.dueDate)}</td>
            </tr>
              <tr>
              <td>DUE DATE: ${this.formatDate(invoice.invoiceDate)}</td>
            </tr>
            </table>
           </td>
        </tr>

        
        </table>

        <hr>
        
        <p>
      
        
        </p>
        </div>
        <table class="custom-table" style="background-color: yellow !important">
        <thead style="background-color: yellow !important">
          <tr style="background-color: yellow;">
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${(Array.isArray(invoice?.invoiceItems) ? invoice.invoiceItems.map((item) => `
          <tr>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>R ${item.price}</td>
            <td>R ${item.quantity * item.price}</td>
          </tr>
          `).join('') : '<tr><td colspan="4">No items available</td></tr>')}
          <tr>
          <td colspan="5"></td>
          </tr>
         <tr>
          <td colspan="5"></td>
          </tr>
           <tr>
          <td colspan="5"><hr></td>
          </tr>
            <tr style="">
              <th style="text-align: right;" colspan="4">Sub Total: R 50000</th>
             </tr>
             <tr style="text-align: right;">
              <th style="text-align: right;" colspan="4">Total Due: R 50000</th>
             </tr>
                   <tr>
          <td colspan="5"><hr></td>
          </tr>
        </tbody>
        </table>

        <div class="footer" style="margin-top: 90px;">
         <table class="custom-table" style="margin-left: 20px;">
            <tr>
              <th>BANK DETAILS:</th>
            </tr>
            <tr>
              <td>${user.businessProfile.businessName}</td>
            </tr>
              <tr>
                <td></td>
            </tr>
            </table>
        &copy; 2025 ${user.businessProfile.businessName}. All Rights Reserved.
        </div>
      </body>
      </html>
      `;


    // Launch Puppeteer to generate the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(htmlContent);

    // Define the file path for the PDF
    const filePath = path.join(__dirname, 'invoices', `invoice-${invoice.invoiceNumber}.pdf`);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate the PDF and save it to the file path
    await page.pdf({ path: filePath, format: 'A4' });

    // Close the browser
    await browser.close();

    // Return the file path
    return filePath;
  }


}


