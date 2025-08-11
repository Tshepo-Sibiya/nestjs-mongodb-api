import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountDetailsService } from './bank-account-details.service';


describe('BankAccountDetailsService', () => {
  let service: BankAccountDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAccountDetailsService],
    }).compile();

    service = module.get<BankAccountDetailsService>(BankAccountDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
