import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CategoryDto } from '@mixologic/common';

import { Table } from '../../components';

async function fetchCategories() {
  const response = await fetch('http://localhost:4200/api/categories');
  const json = await response.json();
  if (!response.ok) throw new Error(json.error);

  const categoryDtos = plainToClass(CategoryDto, json as unknown[]);
  for (const categoryDto of categoryDtos) {
    await validateOrReject(categoryDto);
  }
  return categoryDtos;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categories'], async () => {
    const categories = await fetchCategories();
    return JSON.parse(JSON.stringify(categories));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useCategories = () => {
  return useQuery(['categories'], () => fetchCategories());
};

export default function Index() {
  const { isLoading, data } = useCategories();

  if (isLoading) return 'Loading...';

  return (
    <Table
      title="Ingredient Categories"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={data}
      createPathname="/categories/create"
      editPathname="/categories"
    />
  );
}
