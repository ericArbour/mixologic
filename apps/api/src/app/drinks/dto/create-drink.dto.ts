import {
  IsDefined,
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsInt,
  IsNumber,
  IsPositive,
  ArrayMinSize,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
  ArrayMaxSize,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsGreaterThan } from '../../utils/is-greater-than';
import { CreateDrinkTagDto } from '../../drink-tags/dto/create-drink-tag.dto';

export class CreateDrinkDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;

  @IsDefined()
  @IsString()
  @IsUrl()
  url!: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  glassId!: number;

  @IsDefined()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateDrinkIngredientDto)
  drinkIngredients!: CreateDrinkIngredientDto[];

  @IsDefined()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  @ArrayUnique((createDrinkTagDto: CreateDrinkTagDto) => createDrinkTagDto.name)
  @ValidateNested({ each: true })
  @Type(() => CreateDrinkTagDto)
  drinkTags!: CreateDrinkTagDto[];
}

export class CreateDrinkIngredientDto {
  @IsDefined()
  @IsInt()
  @IsPositive()
  ingredientId!: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('amount')
  upperRangeAmount?: number;

  @IsDefined()
  @IsInt()
  @IsPositive()
  unitId!: number;
}
