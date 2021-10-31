import { PartialType } from '../../utils/partial-type.helper';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
