import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
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

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);
    if (!unit) throw new NotFoundException('Unit not found');

    return this.repository.save({ ...unit, ...updateUnitDto });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
