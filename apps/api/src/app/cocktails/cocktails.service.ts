import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Cocktail } from './entities/cocktail.entity';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private repository: Repository<Cocktail>
  ) {}

  create(createCocktailDto: CreateCocktailDto) {
    const cocktail = this.repository.create(createCocktailDto);
    return this.repository.save(cocktail);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateCocktailDto: UpdateCocktailDto) {
    const glass = await this.findOne(id);
    if (!glass) throw new NotFoundException('Glass not found');

    return this.repository.save({ ...glass, ...updateCocktailDto });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
