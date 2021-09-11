import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrinkTagsService } from './drink-tags.service';
import { DrinkTagsController } from './drink-tags.controller';
import { DrinkTag } from './entities/drink-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrinkTag])],
  controllers: [DrinkTagsController],
  providers: [DrinkTagsService],
})
export class DrinkTagsModule {}
