import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceSettingsController } from './invoice-settings.controller';

describe('InvoiceSettingsController', () => {
  let controller: InvoiceSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceSettingsController],
    }).compile();

    controller = module.get<InvoiceSettingsController>(InvoiceSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
