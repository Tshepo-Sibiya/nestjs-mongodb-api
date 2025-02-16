import { Test, TestingModule } from '@nestjs/testing';
import { AddressDetailsController } from './address-details.controller';

describe('AddressDetailsController', () => {
  let controller: AddressDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressDetailsController],
    }).compile();

    controller = module.get<AddressDetailsController>(AddressDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
