import { Expose, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
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
  @MaxLength(20)
  name!: string;

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
  @Type(() => SatisfiesIngredientDto)
  satisfiesIngredients?: SatisfiesIngredientDto[];
}

class SatisfiesIngredientDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;
}
