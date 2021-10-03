import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { CategoryDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos } from '../../utils';

const fetchCategories = fetchDtos.bind(
  null,
  'http://localhost:4200/api/categories',
  CategoryDto
);

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
