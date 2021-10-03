import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { GlassDto, UpdateGlassDto } from '@mixologic/common';

import { Button, CheckIcon, ErrorIcon, TextInput } from '../../components';

async function fetchGlass(id: number) {
  const response = await fetch(`http://localhost:4200/api/glasses/${id}`);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error);

  const glassDto = plainToClass(GlassDto, json);
  await validateOrReject(glassDto);
  return glassDto;
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['glass', +context.query.id];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    const glass = await fetchGlass(queryKey[1]);
    return JSON.parse(JSON.stringify(glass));
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
  const [shouldAnimateLoading, setShouldAnimateLoading] = useState(false);

  const { isLoading, data } = useGlass(+id);
  const mutation = useMutation<Response, Error, UpdateGlassDto>(
    async (updateGlassDto) => {
      const response = await fetch(`http://localhost:4200/api/glasses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateGlassDto), // body data type must match "Content-Type" header
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
      }

      return response;
    }
  );

  useEffect(() => {
    if (mutation.isLoading) {
      setShouldAnimateLoading(true);
      setTimeout(() => {
        setShouldAnimateLoading(false);
      }, 500);
    }
  }, [mutation.isLoading]);

  const onSubmit = (updateGlassDto: UpdateGlassDto) =>
    mutation.mutate(updateGlassDto);

  return (
    <form
      className="w-full max-w-sm mx-auto px-5 py-10 bg-white rounded-lg shadow dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
        Glass
      </div>
      <div className="grid max-w-xl grid-cols-2 gap-8 m-auto">
        <div className="col-span-2">
          <TextInput
            label="Name"
            defaultValue={!isLoading && data.name}
            isLoading={isLoading}
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
            Glass saved
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
