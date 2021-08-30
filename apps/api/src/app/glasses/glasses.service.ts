import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateGlassDto } from './dto/create-glass.dto';
import { UpdateGlassDto } from './dto/update-glass.dto';
import { Glass } from './entities/glass.entity';

@Injectable()
export class GlassesService {
  constructor(
    @InjectRepository(Glass)
    private repository: Repository<Glass>,
  ) {}

  create(createGlassDto: CreateGlassDto): Promise<Glass> {
    const glass = this.repository.create(createGlassDto);
    return this.repository.save(glass);
  }

  findAll(): Promise<Glass[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Glass | undefined> {
    return this.repository.findOne(id);
  }

  async update(id: number, updateGlassDto: UpdateGlassDto): Promise<Glass> {
    const glass = await this.findOne(id);
    if (!glass) throw new NotFoundException('Glass not found');

    return this.repository.save({ ...glass, ...updateGlassDto });
  }

  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
