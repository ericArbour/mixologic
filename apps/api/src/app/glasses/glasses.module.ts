import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlassesService } from './glasses.service';
import { GlassesController } from './glasses.controller';
import { Glass } from './entities/glass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Glass])],
  controllers: [GlassesController],
  providers: [GlassesService],
})
export class GlassesModule {}
