// Source: https://stackoverflow.com/questions/59980341/can-i-compare-number-variables-with-class-validator

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CreateDrinkIngredientDto } from '../drinks/dto/create-drink.dto';

export function IsGreaterThan(
  relatedPropertyName: keyof CreateDrinkIngredientDto,
  validationOptions?: ValidationOptions
) {
  return function (dto: CreateDrinkIngredientDto, propertyName: string) {
    registerDecorator({
      name: 'isGreaterThan',
      target: dto.constructor,
      propertyName: propertyName,
      constraints: [relatedPropertyName],
      options: {
        message: `${propertyName} must be larger than ${relatedPropertyName}`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const relatedPropertyName = args
            .constraints[0] as keyof CreateDrinkIngredientDto;
          const dto = args.object as CreateDrinkIngredientDto;
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
