import { Controller, Get } from '@nestjs/common';
import { DrinkTagsService } from './drink-tags.service';

@Controller('drink-tags')
export class DrinkTagsController {
  constructor(private readonly drinkTagsService: DrinkTagsService) {}

  @Get()
  findAll() {
    return this.drinkTagsService.findAll();
  }
}
