import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { UnitDto, UpdateUnitDto } from '@mixologic/common';

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

async function fetchUnit(id: number) {
  return fetchDto(UnitDto, `units/${id}`);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['unit', +(context.query.id ?? 0)];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    return serializeForDehydration(async () => await fetchUnit(queryKey[1]));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useUnit = (id: number) => {
  const queryKey: [string, number] = ['unit', id];
  return useQuery(queryKey, ({ queryKey }) => fetchUnit(queryKey[1]));
};

const resolver = classValidatorResolver(UpdateUnitDto);

export default function Unit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const router = useRouter();
  const id = router.query.id as string;

  const queryResult = useUnit(+id);
  const mutation = useMutation<Response, Error, UpdateUnitDto>(
    (updateUnitDto) => submitMutation(updateUnitDto, `units/${id}`, 'PATCH')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  if (queryResult.isError) return 'Oops, an error occurred';

  const onSubmit = (updateUnitDto: UpdateUnitDto) =>
    mutation.mutate(updateUnitDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Edit Unit</FormHeader>
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
            <SuccessMessage label="Unit" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
