import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CategoryDto, UpdateCategoryDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ErrorMessage,
  Form,
  FormBody,
  FormHeader,
  FormSection,
  SuccessMessage,
  TextInput,
} from '../../components';
import { fetchDto, submitMutation, serializeForDehydration } from '../../utils';
import { useAnimateLoading } from '../../hooks';

async function fetchCategory(id: number) {
  return fetchDto(CategoryDto, `categories/${id}`);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['category', +(context.query.id ?? 0)];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    return serializeForDehydration(
      async () => await fetchCategory(queryKey[1])
    );
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useCategory = (id: number) => {
  const queryKey: [string, number] = ['category', id];
  return useQuery(queryKey, ({ queryKey }) => fetchCategory(queryKey[1]));
};

const resolver = classValidatorResolver(UpdateCategoryDto);

export default function Category() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryDto>({ resolver });
  const router = useRouter();
  const id = router.query.id as string;

  const queryResult = useCategory(+id);
  const mutation = useMutation<Response, Error, UpdateCategoryDto>(
    (updateCategoryDto) =>
      submitMutation(updateCategoryDto, `categories/${id}`, 'PATCH')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  if (queryResult.isError) return 'Oops, an error occurred';

  const onSubmit = (updateCategoryDto: UpdateCategoryDto) =>
    mutation.mutate(updateCategoryDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Edit Category</FormHeader>
      <FormBody>
        <TextInput
          label="Name"
          defaultValue={queryResult.data?.name}
          isLoading={queryResult.isLoading}
          {...register('name')}
          required
          error={errors.name?.message}
        />
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
            <SuccessMessage label="Category" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
