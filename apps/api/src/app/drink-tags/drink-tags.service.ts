import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinkTag } from './entities/drink-tag.entity';

@Injectable()
export class DrinkTagsService {
  constructor(
    @InjectRepository(DrinkTag)
    private repository: Repository<DrinkTag>
  ) {}

  findAll() {
    return this.repository.find();
  }
}
