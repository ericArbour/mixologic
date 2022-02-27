import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { IngredientDto, UpdateIngredientDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ColorPreview,
  ErrorMessage,
  Form,
  FormBody,
  FormHeader,
  FormSection,
  InputGroup,
  MultiSelect,
  SuccessMessage,
  TextInput,
} from '../../components';
import { fetchDto, submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';
import { fetchCategories, useCategories } from '../categories';
import { fetchIngredients, useIngredients } from '.';
import { IngredientFormValues } from './sharedTypes';

async function fetchIngredient(id: number) {
  return fetchDto(IngredientDto, `ingredients/${id}`);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const ingredientKey: [string, number] = [
    'ingredient',
    +(context.query.id ?? 0),
  ];
  await queryClient.prefetchQuery(ingredientKey, async ({ queryKey }) => {
    return serializeForDehydration(
      async () => await fetchIngredient(queryKey[1])
    );
  });
  await queryClient.prefetchQuery(['categories'], () => {
    return serializeForDehydration(fetchCategories);
  });
  await queryClient.prefetchQuery(['ingredients'], () => {
    return serializeForDehydration(fetchIngredients);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useIngredient = (id: number) => {
  const queryKey: [string, number] = ['ingredient', id];
  return useQuery(queryKey, ({ queryKey }) => fetchIngredient(queryKey[1]));
};

const resolver = classValidatorResolver(
  UpdateIngredientDto
) as Resolver<IngredientFormValues>;

export default function Ingredient() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientFormValues>({
    resolver,
  });

  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: ingredient,
    isLoading: isIngredientLoading,
    isError,
  } = useIngredient(+id);

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  const { data: ingredients, isLoading: isIngredientsLoading } =
    useIngredients();

  const mutation = useMutation<Response, Error, UpdateIngredientDto>(
    (updateIngredientDto) =>
      submitMutation(updateIngredientDto, `ingredients/${id}`, 'PATCH')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  if (isError) return <p>Oops, an error occurred</p>;

  const onSubmit = (updateIngredientDto: UpdateIngredientDto) =>
    mutation.mutate(updateIngredientDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Edit Ingredient</FormHeader>
      <FormBody>
        <FormSection>
          <TextInput
            label="Name"
            {...register('name')}
            defaultValue={ingredient?.name}
            isLoading={isIngredientLoading}
            required
            error={errors.name?.message}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={ingredient?.color}
            render={({ field }) => (
              <InputGroup>
                <TextInput
                  label="Color"
                  {...field}
                  defaultValue={field.value}
                  isLoading={isIngredientLoading}
                  error={errors.color?.message}
                />
                <ColorPreview color={field.value} />
              </InputGroup>
            )}
          />
          <Controller
            name="categories"
            control={control}
            defaultValue={ingredient?.categories}
            render={({ field }) => (
              <MultiSelect
                label="Categories"
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                options={categories}
                isLoading={isIngredientLoading || isCategoriesLoading}
                required
                error={errors.categories?.message}
              />
            )}
          />
          <Controller
            name="satisfiesIngredients"
            control={control}
            defaultValue={ingredient?.satisfiesIngredients}
            render={({ field }) => (
              <MultiSelect
                label="Satisfies Ingredients"
                id={field.name}
                value={field.value ?? []}
                onChange={field.onChange}
                options={ingredients}
                isLoading={isIngredientLoading || isIngredientsLoading}
                error={errors.satisfiesIngredients?.message}
              />
            )}
          />
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
            <SuccessMessage label="Ingredient" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
