import { Expose, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
  IsHexadecimal,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { BaseResponseDto } from '../../utils/base-response-dto';
import { CategoryDto } from '../categories/category.dto';

export class IngredientDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  color?: string;

  @Expose()
  @IsDefined()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories!: CategoryDto[];

  @Expose()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ShallowIngredientDto)
  satisfiesIngredients?: ShallowIngredientDto[];
}

export class ShallowIngredientDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  color?: string;
}
