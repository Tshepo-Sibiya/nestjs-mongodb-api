import { Test, TestingModule } from '@nestjs/testing';
import { GymSessionService } from './gym-session.service';

describe('GymSessionService', () => {
  let service: GymSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymSessionService],
    }).compile();

    service = module.get<GymSessionService>(GymSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
