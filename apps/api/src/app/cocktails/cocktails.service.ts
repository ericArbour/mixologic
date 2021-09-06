import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity';
import { Cocktail } from './entities/cocktail.entity';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    @InjectRepository(CocktailIngredient)
    private cocktailIngredientRepository: Repository<CocktailIngredient>
  ) {}

  async create(createCocktailDto: CreateCocktailDto) {
    const cocktail = this.cocktailRepository.create(createCocktailDto);
    const savedCocktail = await this.cocktailRepository.save(cocktail);

    const promises = createCocktailDto.cocktailIngredients.map(
      (cocktailIngredientDto) => {
        const cocktailIngredient = this.cocktailIngredientRepository.create({
          ...cocktailIngredientDto,
          cocktailId: savedCocktail.id,
        });

        return this.cocktailIngredientRepository.save(cocktailIngredient);
      }
    );
    const savedCocktailIngredients = await Promise.all(promises);

    savedCocktail.cocktailIngredients = savedCocktailIngredients;
    return savedCocktail;
  }

  findAll() {
    return this.cocktailRepository.find();
  }

  findOne(id: Cocktail['id']) {
    return this.cocktailRepository.findOne(id);
  }

  async update(id: Cocktail['id'], updateCocktailDto: UpdateCocktailDto) {
    const cocktail = await this.findOne(id);
    if (!cocktail) throw new NotFoundException('Cocktail not found');

    return this.cocktailRepository.save({ ...cocktail, ...updateCocktailDto });
  }

  remove(id: Cocktail['id']) {
    return this.cocktailRepository.softDelete(id);
  }
}
