import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceAccountDetailsService } from './invoice-account-details.service';

describe('InvoiceAccountDetailsService', () => {
  let service: InvoiceAccountDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceAccountDetailsService],
    }).compile();

    service = module.get<InvoiceAccountDetailsService>(InvoiceAccountDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
