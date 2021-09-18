import { Expose } from 'class-transformer';

import { BaseResponseDto } from '../../utils/base-response-dto';

export class CategoryDto extends BaseResponseDto {
  @Expose()
  name!: string;
}
