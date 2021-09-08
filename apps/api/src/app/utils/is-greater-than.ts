import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CreateCocktailIngredientDto } from '../cocktails/dto/create-cocktail.dto';

export function IsGreaterThan(
  relatedPropertyName: keyof CreateCocktailIngredientDto,
  validationOptions?: ValidationOptions
) {
  return function (dto: CreateCocktailIngredientDto, propertyName: string) {
    registerDecorator({
      name: 'isGreaterThan',
      target: dto.constructor,
      propertyName: propertyName,
      constraints: [relatedPropertyName],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const relatedPropertyName = args
            .constraints[0] as keyof CreateCocktailIngredientDto;
          const dto = args.object as CreateCocktailIngredientDto;
          const relatedValue = dto[relatedPropertyName];

          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value > relatedValue
          );
        },
      },
    });
  };
}
