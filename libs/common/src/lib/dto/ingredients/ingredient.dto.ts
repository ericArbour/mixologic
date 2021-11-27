import { Expose, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
  IsHexadecimal,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { BaseResponseDto } from '../../utils/base-response-dto';
import { CategoryDto } from '../categories/category.dto';

export class ShallowIngredientDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;

  @Expose()
  @IsOptional()
  @ValidateIf((o) => o.color !== '')
  @IsString()
  @Length(6)
  @IsHexadecimal()
  color?: string;
}

export class IngredientDto extends ShallowIngredientDto {
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
