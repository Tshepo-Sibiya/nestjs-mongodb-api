import { Test, TestingModule } from '@nestjs/testing';
import { GymSessionController } from './gym-session.controller';

describe('GymSessionController', () => {
  let controller: GymSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymSessionController],
    }).compile();

    controller = module.get<GymSessionController>(GymSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
