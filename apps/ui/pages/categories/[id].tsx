import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { useForm } from 'react-hook-form';

import { CategoryDto } from '@mixologic/common';

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
  await queryClient.prefetchQuery(
    ['categories', context.query.id],
    async ({ queryKey }) => {
      console.log(queryKey);
      const category = await fetchCategory(queryKey[1]);
      return JSON.parse(JSON.stringify(category));
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useCategories = (id: number) => {
  return useQuery(['categories', id], ({ queryKey }) =>
    fetchCategory(queryKey[1] as number)
  );
};

export default function Category() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useCategories(parseInt(id as string));

  if (isLoading) return 'Loading...';

  const onSubmit = (data) => console.log(data);
  console.log(watch('name'));
  console.log(errors);

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
                defaultValue={data.name}
                {...register('name', { required: true })}
                required
                error={errors.name && 'This field is required'}
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
