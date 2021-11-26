import { useMutation } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateIngredientDto } from '@mixologic/common';

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
import { useAnimateLoading } from '../../hooks';
import { submitMutation } from '../../utils';
import { useCategories } from '../categories';
import { useIngredients } from '.';
import { IngredientFormValues } from './sharedTypes';

const resolver = classValidatorResolver<
  CreateIngredientDto,
  IngredientFormValues,
  unknown
>(CreateIngredientDto);

export default function CreateIngredient() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientFormValues>({ resolver });

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const { data: ingredientsData, isLoading: isIngredientsLoading } =
    useIngredients();

  const mutation = useMutation<Response, Error, CreateIngredientDto>(
    (createIngredientDto) => submitMutation(createIngredientDto, 'ingredients')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (createIngredientDto: CreateIngredientDto) =>
    mutation.mutate(createIngredientDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Ingredient</FormHeader>
      <FormBody>
        <FormSection>
          <TextInput
            label="Name"
            defaultValue=""
            {...register('name')}
            required
            error={errors.name?.message}
          />
          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputGroup>
                <TextInput
                  label="Color"
                  {...field}
                  defaultValue={field.value}
                  error={errors.color?.message}
                />
                <ColorPreview color={field.value} />
              </InputGroup>
            )}
          />
          <Controller
            name="categories"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <MultiSelect
                label="Categories"
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                options={categoriesData}
                isLoading={isCategoriesLoading}
                required
                error={errors.categories?.message}
              />
            )}
          />
          <Controller
            name="satisfiesIngredients"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="Satisfies Ingredients"
                id={field.name}
                value={field.value ?? []}
                onChange={field.onChange}
                options={ingredientsData}
                isLoading={isIngredientsLoading}
                error={errors.satisfiesIngredients?.message}
              />
            )}
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
        </FormSection>
        {!shouldAnimateLoading && mutation.isSuccess ? (
          <SuccessMessage label="Ingredient" />
        ) : !shouldAnimateLoading && mutation.isError ? (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        ) : null}
      </FormBody>
    </Form>
  );
}
