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
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsGreaterThan } from '../../utils/is-greater-than';

class CreateDrinkGlassDto {
  @IsDefined()
  @IsInt()
  @IsPositive()
  id!: number;
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
  @ValidateNested({ each: true })
  @Type(() => CreateDrinkGlassDto)
  glass!: CreateDrinkGlassDto;

  @IsDefined()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateDrinkIngredientDto)
  drinkIngredients!: CreateDrinkIngredientDto[];
}
