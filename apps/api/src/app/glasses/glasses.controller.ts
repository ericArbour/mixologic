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
  findOne(@Param('id') id: string) {
    return this.glassesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlassDto: UpdateGlassDto) {
    return this.glassesService.update(+id, updateGlassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.glassesService.remove(+id);
  }
}
