import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountDetailsController } from './bank-account-details.controller';

describe('BankAccountDetailsController', () => {
  let controller: BankAccountDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountDetailsController],
    }).compile();

    controller = module.get<BankAccountDetailsController>(BankAccountDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
