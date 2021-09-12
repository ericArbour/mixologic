import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const categories = this.repository.create(createCategoryDto);
    return this.repository.save(categories);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: Category['id']) {
    return this.repository.findOne(id);
  }

  async update(id: Category['id'], updateCategoryDto: UpdateCategoryDto) {
    const categories = await this.findOne(id);
    if (!categories) throw new NotFoundException('Category not found');

    return this.repository.save({
      ...categories,
      ...updateCategoryDto,
    });
  }

  remove(id: Category['id']) {
    return this.repository.softDelete(id);
  }
}
