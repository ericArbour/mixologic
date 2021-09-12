import {
  IsDefined,
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
  categories!: CreateIngredientCategoryDto[];
}

class CreateIngredientCategoryDto {
  @IsDefined()
  @IsInt()
  @IsPositive()
  id!: number;
}
