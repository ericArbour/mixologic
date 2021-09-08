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
} from 'class-validator';
import { IsGreaterThan } from '../../utils/is-greater-than';

export class CreateCocktailDto {
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

  @ArrayMinSize(2)
  cocktailIngredients!: CreateCocktailIngredientDto[];
}

export class CreateCocktailIngredientDto {
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
  @IsGreaterThan('amount', {
    message: 'upperRangeAmount must be larger than amount',
  })
  upperRangeAmount?: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  unitId!: number;
}
