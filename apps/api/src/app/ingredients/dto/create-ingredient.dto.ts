import {
  IsDefined,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class CreateIngredientDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  categories!: CreateCategoryDto[];
}
