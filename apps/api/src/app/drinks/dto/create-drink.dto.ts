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
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsGreaterThan } from '../../utils/is-greater-than';

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

  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateDrinkIngredientDto)
  drinkIngredients!: CreateDrinkIngredientDto[];
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
