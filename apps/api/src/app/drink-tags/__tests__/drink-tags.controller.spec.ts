import { Test, TestingModule } from '@nestjs/testing';
import { DrinkTagsController } from '../drink-tags.controller';
import { DrinkTagsService } from '../drink-tags.service';

describe('DrinkTagsController', () => {
  let controller: DrinkTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkTagsController],
      providers: [DrinkTagsService],
    }).compile();

    controller = module.get<DrinkTagsController>(DrinkTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
