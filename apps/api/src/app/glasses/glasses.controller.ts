import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { GlassesService } from './glasses.service';
import { CreateGlassDto } from './dto/create-glass.dto';
import { UpdateGlassDto } from './dto/update-glass.dto';
import { Glass } from './entities/glass.entity';

@Controller('glasses')
export class GlassesController {
  constructor(private readonly glassesService: GlassesService) {}

  @Post()
  create(@Body() createGlassDto: CreateGlassDto) {
    return this.glassesService.create(createGlassDto);
  }

  @Get()
  findAll() {
    return this.glassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Glass['id']) {
    return this.glassesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Glass['id'],
    @Body() updateGlassDto: UpdateGlassDto
  ) {
    return this.glassesService.update(id, updateGlassDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: Glass['id']) {
    return this.glassesService.remove(id);
  }
}
