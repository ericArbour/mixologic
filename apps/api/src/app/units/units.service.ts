import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDto, UpdateUnitDto } from '@mixologic/common';

import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private repository: Repository<Unit>
  ) {}

  create(createUnitDto: CreateUnitDto) {
    const unit = this.repository.create(createUnitDto);
    return this.repository.save(unit);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: Unit['id']) {
    return this.repository.findOne(id);
  }

  async update(id: Unit['id'], updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Unit not found');

    return this.repository.save({ ...unit, ...updateUnitDto });
  }

  remove(id: Unit['id']) {
    return this.repository.softDelete(id);
  }
}
