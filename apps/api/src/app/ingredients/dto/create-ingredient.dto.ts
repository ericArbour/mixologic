import {
  IsDefined,
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsDefined()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientCategoryDto)
  ingredientCategories!: CreateIngredientCategoryDto[];
}

class CreateIngredientCategoryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsDefined()
  @IsInt()
  @IsPositive()
  categoryId!: number;
}
