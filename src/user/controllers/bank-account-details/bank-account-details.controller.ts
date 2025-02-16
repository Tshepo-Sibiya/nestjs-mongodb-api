
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BankAccountDetailsDto } from 'src/user/dto/bank-account-details.dto';
import { BankAccountDetailsService } from 'src/user/services/bank-account-details/bank-account-details.service';

@Controller('bank-account-details')
export class BankAccountDetailsController{
  constructor(private bankAcccountDetailsService: BankAccountDetailsService) {

  }

  @Get('/getBankAccountDetails')
  @UseGuards(AuthGuard())
  async getBankAccountDetails(@Req() req) {
    return this.bankAcccountDetailsService.GetBankAcccountDetailsById(req.user._id);
  }


  @Post('/createOrUpdateBankAccountDetails')
  @UseGuards(AuthGuard())
  async createOrUpdateBankAccountDetails(
    @Body()
    accountDetails: BankAccountDetailsDto,
    @Req() req,
  ) {
    return this.bankAcccountDetailsService.createOrUpdateBankAccountDetails(req.user, accountDetails);
  }

}
