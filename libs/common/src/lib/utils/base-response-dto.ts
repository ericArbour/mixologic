import { Expose } from 'class-transformer';

export class BaseResponseDto {
  @Expose()
  id!: number;

  @Expose()
  createdDate!: Date;

  @Expose()
  updatedDate!: Date;
}
