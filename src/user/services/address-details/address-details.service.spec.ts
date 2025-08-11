import { Test, TestingModule } from '@nestjs/testing';
import { AddressDetailsService } from './address-details.service';

describe('AddressDetailsService', () => {
  let service: AddressDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressDetailsService],
    }).compile();

    service = module.get<AddressDetailsService>(AddressDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
