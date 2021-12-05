import { Expose, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { BaseResponseDto } from '../../utils/base-response-dto';
import { GlassDto } from '../glasses/glass.dto';
import { UnitDto } from '../units/unit.dto';
import { ShallowIngredientDto } from '../ingredients/ingredient.dto';

export class DrinkDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name!: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsUrl()
  url!: string;

  @Expose()
  @IsDefined()
  @Type(() => GlassDto)
  glass!: GlassDto;

  @Expose()
  @IsDefined()
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => DrinkIngredientDto)
  drinkIngredients!: DrinkIngredientDto[];
}

export class DrinkIngredientDto {
  @Expose()
  @IsDefined()
  @Type(() => ShallowIngredientDto)
  ingredient!: ShallowIngredientDto;

  @Expose()
  @IsDefined()
  @IsNumber()
  @Min(0)
  amount!: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  upperRangeAmount?: number;

  @Expose()
  @IsOptional()
  @Type(() => UnitDto)
  unit?: UnitDto;
}
