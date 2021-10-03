import { Expose, Transform } from 'class-transformer';
import { IsDate, IsDefined, IsInt, IsOptional } from 'class-validator';

export class BaseResponseDto {
  [k: string]: unknown;

  @Expose()
  @IsDefined()
  @IsInt()
  id!: number;

  @Expose()
  @IsDefined()
  @IsDate()
  @Transform((params) => new Date(params.value), {
    toClassOnly: true,
  })
  createdDate!: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  @Transform((params) => new Date(params.value), {
    toClassOnly: true,
  })
  updatedDate?: Date;
}
