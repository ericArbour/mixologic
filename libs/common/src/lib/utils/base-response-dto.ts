import { Expose } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsOptional } from 'class-validator';

export class BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsInt()
  id!: number;

  @Expose()
  @IsDefined()
  @IsDateString()
  createdDate!: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  updatedDate?: Date;
}
