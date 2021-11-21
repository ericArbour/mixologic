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
  Select,
  SuccessMessage,
  TextInput,
} from '../../components';
import { fetchDto, submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';
import { fetchGlasses, useGlasses } from '../glasses';

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
