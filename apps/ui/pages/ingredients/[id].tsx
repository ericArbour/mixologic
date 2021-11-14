import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm, useController, FieldError } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { IngredientDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ErrorMessage,
  Form,
  FormBody,
  FormHeader,
  FormSection,
  MultiSelect,
  SuccessMessage,
  TextInput,
} from '../../components';
import { fetchDto, submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';
import { fetchCategories, useCategories } from '../categories';

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

const resolver = classValidatorResolver<IngredientDto, IngredientDto, unknown>(
  IngredientDto
);

export default function Ingredient() {
  const router = useRouter();
  const id = router.query.id as string;
  const queryResult = useIngredient(+id);

  if (queryResult.isLoading || queryResult.isIdle) return <p>Loading...</p>;
  if (queryResult.isError) return <p>Oops, an error occurred</p>;

  return <IngredientForm ingredient={queryResult.data} />;
}

interface IngredientFormProps {
  ingredient: IngredientDto;
}

function IngredientForm({ ingredient }: IngredientFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: ingredient,
  });

  const {
    field: { onChange, value, name },
  } = useController({
    name: 'categories',
    control,
    defaultValue: [],
  });

  const { data, isLoading } = useCategories();

  const mutation = useMutation<Response, Error, IngredientDto>(
    (updateIngredientDto) =>
      submitMutation(
        updateIngredientDto,
        `ingredients/${ingredient.id}`,
        'PATCH'
      )
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (updateIngredientDto: IngredientDto) =>
    mutation.mutate(updateIngredientDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Ingredient</FormHeader>
      <FormBody>
        <FormSection>
          <TextInput
            label="Name"
            {...register('name')}
            required
            error={errors.name?.message}
          />
          <MultiSelect
            label="Categories"
            id={name}
            value={value}
            onChange={onChange}
            options={data}
            isLoading={isLoading}
            required
            // @ts-expect-error blah
            error={errors.categories?.message}
          />
        </FormSection>
        <FormSection>
          <Button
            submit
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
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
