import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceSettingsService } from './invoice-settings.service';

describe('InvoiceSettingsService', () => {
  let service: InvoiceSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceSettingsService],
    }).compile();

    service = module.get<InvoiceSettingsService>(InvoiceSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
