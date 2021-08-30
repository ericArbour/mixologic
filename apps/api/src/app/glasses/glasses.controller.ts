import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { GlassesService } from './glasses.service';
import { CreateGlassDto } from './dto/create-glass.dto';
import { UpdateGlassDto } from './dto/update-glass.dto';
import { Glass } from './entities/glass.entity';
import { UpdateResult } from 'typeorm';

@Controller('glasses')
export class GlassesController {
  constructor(private readonly glassesService: GlassesService) {}

  @Post()
  create(@Body() createGlassDto: CreateGlassDto): Promise<Glass> {
    return this.glassesService.create(createGlassDto);
  }

  @Get()
  findAll(): Promise<Glass[]> {
    return this.glassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Glass | undefined> {
    return this.glassesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGlassDto: UpdateGlassDto,
  ): Promise<Glass> {
    return this.glassesService.update(+id, updateGlassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.glassesService.remove(+id);
  }
}
