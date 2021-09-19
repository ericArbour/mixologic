import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

import { BaseResponseDto } from '../../utils/base-response-dto';

export class CategoryDto extends BaseResponseDto {
  @Expose()
  @IsDefined()
  @IsString()
  name!: string;
}
