import { PartialType } from '../../utils/partial-type.helper';
import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}
