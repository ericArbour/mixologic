import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CategoryDto } from '@mixologic/common';

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
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useCategories(parseInt(id as string));

  if (isLoading) return 'Loading...';

  console.log(data);

  return (
    <div className="container flex flex-col mx-auto w-full items-center justify-center">
      {data.name}
    </div>
  );
}
