import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CategoryDto, UpdateCategoryDto } from '@mixologic/common';

import { Button } from '../../components';
import { TextInput } from '../../components';

async function fetchCategory(id: number) {
  const response = await fetch(`http://localhost:4200/api/categories/${id}`);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error);

  const categoryDto = plainToClass(CategoryDto, json);
  await validateOrReject(categoryDto);
  return categoryDto;
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const queryKey: [string, number] = ['category', +context.query.id];
  await queryClient.prefetchQuery(queryKey, async ({ queryKey }) => {
    const category = await fetchCategory(queryKey[1]);
    return JSON.parse(JSON.stringify(category));
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

/*
  Todos:
  1. Submit form.
*/

const resolver = classValidatorResolver(UpdateCategoryDto);

export default function Category() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const router = useRouter();
  const id = router.query.id as string;

  const { isLoading, data } = useCategory(+id);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center">
      <form
        className="flex w-full max-w-sm space-x-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
            Category
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
              <Button submit={true} label="Save" color="indigo" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
