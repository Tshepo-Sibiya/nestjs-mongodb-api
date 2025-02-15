import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceAccountDetailsController } from './invoice-account-details.controller';

describe('InvoiceAccountDetailsController', () => {
  let controller: InvoiceAccountDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceAccountDetailsController],
    }).compile();

    controller = module.get<InvoiceAccountDetailsController>(InvoiceAccountDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
