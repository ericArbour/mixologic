import { IsDefined, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateGlassDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  name!: string;
}
