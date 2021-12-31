import { QueryClient, useMutation } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateDrinkDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ErrorMessage,
  Form,
  FormBody,
  FormCard,
  FormHeader,
  FormSection,
  InputGroup,
  PlusIcon,
  RemoveButton,
  RequiredDot,
  Select,
  SuccessMessage,
  TextInput,
} from '../../components';
import { submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';
import { convertEventToNumber, nullToUndefined } from '../../utils';
import { fetchGlasses, useGlasses } from '../glasses';
import { fetchIngredients, useIngredients } from '../ingredients';
import { fetchUnits, useUnits } from '../units';
import { DrinkFormValues } from './sharedTypes';

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['glasses'], () => {
    return serializeForDehydration(fetchGlasses);
  });
  await queryClient.prefetchQuery(['ingredients'], () => {
    return serializeForDehydration(fetchIngredients);
  });
  await queryClient.prefetchQuery(['units'], () => {
    return serializeForDehydration(fetchUnits);
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const resolver = classValidatorResolver<
  CreateDrinkDto,
  DrinkFormValues,
  unknown
>(CreateDrinkDto);

export default function CreateDrink() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DrinkFormValues>({
    resolver,
    defaultValues: {
      drinkIngredients: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'drinkIngredients',
    keyName: 'key',
  });

  const { data: glasses, isLoading: isGlassesLoading } = useGlasses();
  const { data: ingredients, isLoading: isIngredientsLoading } =
    useIngredients();
  const { data: units, isLoading: isUnitsLoading } = useUnits();

  const mutation = useMutation<Response, Error, CreateDrinkDto>(
    (createDrinkDto) => submitMutation(createDrinkDto, 'drinks')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (createDrinkDto: CreateDrinkDto) =>
    mutation.mutate(createDrinkDto);

  // @ts-expect-error - react-hook-form doesn't allow both nested and array level
  const arrayLevelErrors = errors.drinkIngredients?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Create Drink</FormHeader>
      <FormBody>
        <FormSection>
          <TextInput
            label="Name"
            defaultValue=""
            {...register('name')}
            required
            error={errors.name?.message}
          />
          <TextInput
            label="URL"
            defaultValue=""
            {...register('url')}
            required
            error={errors.url?.message}
          />
          <Controller
            name="glass"
            control={control}
            render={({ field }) => (
              <Select
                label="Glass"
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                options={glasses}
                isLoading={isGlassesLoading}
                required
                error={errors.glass?.message}
              />
            )}
          />
          <FormSection>
            <h3>
              Ingredients
              <RequiredDot />
            </h3>
            {arrayLevelErrors ? (
              <ErrorMessage>{arrayLevelErrors}</ErrorMessage>
            ) : null}
            {fields.map((item, index) => {
              return (
                <FormCard key={item.key}>
                  <RemoveButton onClick={() => remove(index)} />
                  <FormSection>
                    <Controller
                      name={`drinkIngredients.${index}.ingredient`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Ingredient"
                          id={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          options={ingredients}
                          isLoading={isIngredientsLoading}
                          required
                          error={
                            errors.drinkIngredients?.[index]?.ingredient
                              ?.message
                          }
                        />
                      )}
                    />
                    <InputGroup>
                      <Controller
                        name={`drinkIngredients.${index}.amount`}
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            label="Amount"
                            defaultValue={nullToUndefined(field.value)}
                            {...field}
                            onChange={(e) =>
                              field.onChange(convertEventToNumber(e))
                            }
                            required
                            error={
                              errors.drinkIngredients?.[index]?.amount?.message
                            }
                          />
                        )}
                      />
                      <Controller
                        name={`drinkIngredients.${index}.upperRangeAmount`}
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            label="Upper Range Amount"
                            defaultValue={nullToUndefined(field.value)}
                            {...field}
                            onChange={(e) =>
                              field.onChange(convertEventToNumber(e))
                            }
                            error={
                              errors.drinkIngredients?.[index]?.upperRangeAmount
                                ?.message
                            }
                          />
                        )}
                      />
                    </InputGroup>
                    <Controller
                      name={`drinkIngredients.${index}.unit`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Unit"
                          id={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          options={units}
                          isLoading={isUnitsLoading}
                          error={
                            errors.drinkIngredients?.[index]?.unit?.message
                          }
                        />
                      )}
                    />
                  </FormSection>
                </FormCard>
              );
            })}
            <Button
              label="Add Ingredient"
              color="green"
              icon={<PlusIcon className="-ml-1 mr-1" />}
              onClick={() =>
                append(
                  {
                    ingredient: null,
                    amount: null,
                    upperRangeAmount: null,
                    unit: null,
                  },
                  { shouldFocus: false }
                )
              }
              small
            />
          </FormSection>
        </FormSection>
        <FormSection>
          <Button
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
            submit
            full
          />
          {!shouldAnimateLoading && mutation.isSuccess ? (
            <SuccessMessage label="Drink" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
