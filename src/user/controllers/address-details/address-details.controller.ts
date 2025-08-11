import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressDetailsDto } from 'src/user/dto/address-details.dto';
import { AddressDetailsService } from 'src/user/services/address-details/address-details.service';

@Controller('address-details')
export class AddressDetailsController {
    constructor(private bankAcccountDetailsService: AddressDetailsService) {

    }
  
    @Get('/getAddressDetails')
    @UseGuards(AuthGuard())
    async getBankAccountDetails(@Req() req) {
      return this.bankAcccountDetailsService.GetUserAddressDetails(req.user._id);
    }
  
  
    @Post('/createOrUpdateAddressDetails')
    @UseGuards(AuthGuard())
    async createOrUpdateAddressDetails(
      @Body()
      addressDetails: AddressDetailsDto,
      @Req() req,
    ) {
      return this.bankAcccountDetailsService.createOrUpdateAddressDetails(req.user, addressDetails);
    }
  
}
