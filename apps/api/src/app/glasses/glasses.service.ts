import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGlassDto, UpdateGlassDto } from '@mixologic/common';

import { Glass } from './entities/glass.entity';

@Injectable()
export class GlassesService {
  constructor(
    @InjectRepository(Glass)
    private repository: Repository<Glass>
  ) {}

  create(createGlassDto: CreateGlassDto) {
    const glass = this.repository.create(createGlassDto);
    return this.repository.save(glass);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: Glass['id']) {
    return this.repository.findOne(id);
  }

  async update(id: Glass['id'], updateGlassDto: UpdateGlassDto) {
    const glass = await this.findOne(id);
    if (!glass) throw new NotFoundException('Glass not found');

    return this.repository.save({ ...glass, ...updateGlassDto });
  }

  remove(id: Glass['id']) {
    return this.repository.softDelete(id);
  }
}
