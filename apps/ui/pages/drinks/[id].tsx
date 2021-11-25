import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Controller, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { DrinkDto, UpdateDrinkDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ErrorMessage,
  Form,
  FormBody,
  FormHeader,
  FormSection,
  PlusIcon,
  RemoveButton,
  RequiredDot,
  Select,
  SuccessMessage,
  TextInput,
} from '../../components';
import { fetchDto, submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';
import { fetchGlasses, useGlasses } from '../glasses';
import { useIngredients } from '../ingredients';
import { useUnits } from '../units';

async function fetchDrink(id: number) {
  return fetchDto(DrinkDto, `drinks/${id}`);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['drink', +(context.query.id ?? 0)];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    return serializeForDehydration(async () => await fetchDrink(queryKey[1]));
  });
  await queryClient.prefetchQuery(['glasses'], () => {
    return serializeForDehydration(fetchGlasses);
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useDrink = (id: number) => {
  const queryKey: [string, number] = ['drink', id];
  return useQuery(queryKey, ({ queryKey }) => fetchDrink(queryKey[1]));
};

const resolver = classValidatorResolver(UpdateDrinkDto);

export default function Drink() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const router = useRouter();
  const id = router.query.id as string;

  const { data: drink, isLoading: isDrinkLoading, isError } = useDrink(+id);

  const { data: glasses, isLoading: isGlassesLoading } = useGlasses();
  const { data: ingredients, isLoading: isIngredientsLoading } =
    useIngredients();
  const { data: units, isLoading: isUnitsLoading } = useUnits();

  const mutation = useMutation<Response, Error, UpdateDrinkDto>(
    (updateDrinkDto) => submitMutation(updateDrinkDto, `drinks/${id}`, 'PATCH')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  if (isError) return 'Oops, an error occurred';

  const onSubmit = (updateDrinkDto: UpdateDrinkDto) =>
    mutation.mutate(updateDrinkDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Drink</FormHeader>
      <FormBody>
        <FormSection>
          <TextInput
            label="Name"
            defaultValue={drink?.name}
            isLoading={isDrinkLoading}
            {...register('name')}
            required
            error={errors.name?.message}
          />
          <TextInput
            label="URL"
            defaultValue={drink?.url}
            isLoading={isDrinkLoading}
            {...register('url')}
            required
            error={errors.url?.message}
          />
          <Controller
            name="glass"
            control={control}
            defaultValue={drink?.glass}
            render={({ field }) => (
              <Select
                label="Glass"
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                options={glasses}
                isLoading={isDrinkLoading || isGlassesLoading}
                required
                error={errors.glass?.message}
              />
            )}
          />
          <Controller
            name="drinkIngredients"
            control={control}
            defaultValue={drink?.drinkIngredients}
            render={({ field }) => {
              return (
                <div className="space-y-2">
                  <h3>
                    Ingredients
                    <RequiredDot />
                  </h3>
                  {field.value.map(
                    (
                      drinkIngredient: DrinkDto['drinkIngredients'][number],
                      index: number
                    ) => {
                      return (
                        <div
                          key={index}
                          className="shadow rounded-lg p-2 border border-gray-300 w-full relative"
                        >
                          <RemoveButton
                            onClick={() =>
                              field.onChange(
                                field.value.filter(
                                  (_: unknown, i: number) => i !== index
                                )
                              )
                            }
                          />
                          <div className="space-y-2">
                            <Select
                              label="Name"
                              id={`${field.name}[${index}].ingredient`}
                              value={drinkIngredient.ingredient}
                              onChange={(e) => {
                                field.onChange(field.value);
                              }}
                              options={ingredients}
                              isLoading={isIngredientsLoading}
                              required
                              error={errors.glass?.message}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <TextInput
                                label="Amount"
                                name={`${field.name}[${index}].amount`}
                                defaultValue={drinkIngredient.amount}
                                onChange={(e) => {
                                  field.onChange(field.value);
                                }}
                                required
                                error={errors.name?.message}
                              />
                              <TextInput
                                label="Upper Range Amount"
                                name={`${field.name}[${index}].upperRangeAmount`}
                                defaultValue={drinkIngredient.upperRangeAmount}
                                onChange={(e) => {
                                  field.onChange(field.value);
                                }}
                                error={errors.name?.message}
                              />
                            </div>
                            <Select
                              label="Unit"
                              id={`${field.name}[${index}].unit`}
                              value={drinkIngredient.unit}
                              onChange={(e) => {
                                field.onChange(field.value);
                              }}
                              options={units}
                              isLoading={isUnitsLoading}
                              required
                              error={errors.glass?.message}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                  <Button
                    label="Add Ingredient"
                    color="green"
                    icon={<PlusIcon className="-ml-1 mr-1" />}
                    small
                  />
                </div>
              );
            }}
          />
        </FormSection>
        <FormSection>
          <Button
            submit={true}
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
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
