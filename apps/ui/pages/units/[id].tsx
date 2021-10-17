import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { UnitDto, UpdateUnitDto } from '@mixologic/common';

import { Button, CheckIcon, ErrorIcon, TextInput } from '../../components';
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
    <form
      className="w-full max-w-sm mx-auto px-5 py-10 bg-white rounded-lg shadow dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
        Unit
      </div>
      <div className="grid max-w-xl grid-cols-2 gap-8 m-auto">
        <div className="col-span-2">
          <TextInput
            label="Name"
            defaultValue={queryResult.data?.name}
            isLoading={queryResult.isLoading}
            {...register('name')}
            required
            error={errors.name?.message}
          />
        </div>
        <div className="col-span-2 text-right">
          <Button
            submit={true}
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
          />
        </div>
        {!shouldAnimateLoading && mutation.isSuccess ? (
          <div className="col-span-2">
            <CheckIcon className="-mt-1 mr-1 inline text-green-500" />
            Unit saved
          </div>
        ) : !shouldAnimateLoading && mutation.isError ? (
          <div className="col-span-2">
            <p>
              <ErrorIcon className="mr-1 inline-block -mt-1" />
              An error occurred:
            </p>
            <p>{mutation.error.message}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
