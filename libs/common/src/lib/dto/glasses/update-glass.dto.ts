import { PartialType } from '../../utils/partial-type.helper';
import { CreateGlassDto } from './create-glass.dto';

export class UpdateGlassDto extends PartialType(CreateGlassDto) {}
