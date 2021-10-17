import { IsDefined, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUnitDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name!: string;
}
