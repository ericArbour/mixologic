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
  IsHexadecimal,
  ValidateIf,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(35)
  name!: string;

  @IsOptional()
  @ValidateIf((o) => o.color !== '')
  @IsString()
  @Length(6)
  @IsHexadecimal()
  color?: string;

  @IsDefined()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientCategoryDto)
  categories!: CreateIngredientCategoryDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientCategoryDto)
  satisfiesIngredients?: CreateSatisfiesIngredientDto[];
}

class CreateIngredientCategoryDto {
  @IsDefined()
  @IsInt()
  @IsPositive()
  id!: number;
}

class CreateSatisfiesIngredientDto {
  @IsDefined()
  @IsInt()
  @IsPositive()
  id!: number;
}
