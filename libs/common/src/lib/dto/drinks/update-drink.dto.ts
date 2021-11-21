import { PartialType } from '../../utils/partial-type.helper';
import { CreateDrinkDto } from './create-drink.dto';

export class UpdateDrinkDto extends PartialType(CreateDrinkDto) {}
