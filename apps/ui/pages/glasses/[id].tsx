import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { GlassDto, UpdateGlassDto } from '@mixologic/common';

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

async function fetchGlass(id: number) {
  return fetchDto(GlassDto, `glasses/${id}`);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['glass', +(context.query.id ?? 0)];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    return serializeForDehydration(async () => await fetchGlass(queryKey[1]));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useGlass = (id: number) => {
  const queryKey: [string, number] = ['glass', id];
  return useQuery(queryKey, ({ queryKey }) => fetchGlass(queryKey[1]));
};

const resolver = classValidatorResolver(UpdateGlassDto);

export default function Glass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const router = useRouter();
  const id = router.query.id as string;

  const queryResult = useGlass(+id);
  const mutation = useMutation<Response, Error, UpdateGlassDto>(
    (updateGlassDto) => submitMutation(updateGlassDto, `glasses/${id}`, 'PATCH')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  if (queryResult.isError) return 'Oops, an error occurred';

  const onSubmit = (updateGlassDto: UpdateGlassDto) =>
    mutation.mutate(updateGlassDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Glass</FormHeader>
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
            submit={true}
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
          />
          {!shouldAnimateLoading && mutation.isSuccess ? (
            <SuccessMessage label="Glass" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
