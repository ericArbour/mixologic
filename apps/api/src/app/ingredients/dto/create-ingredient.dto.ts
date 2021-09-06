import {
  IsDefined,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';

export class CreateIngredientDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;

  @IsDefined()
  @IsInt()
  @IsPositive()
  ingredientTypeId!: number;
}
