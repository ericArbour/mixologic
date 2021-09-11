import { Test, TestingModule } from '@nestjs/testing';
import { DrinkTagsService } from '../drink-tags.service';

describe('DrinkTagsService', () => {
  let service: DrinkTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinkTagsService],
    }).compile();

    service = module.get<DrinkTagsService>(DrinkTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
