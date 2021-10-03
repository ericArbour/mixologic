import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { CategoryDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

const fetchCategories = () =>
  fetchDtos(CategoryDto, 'http://localhost:4200/api/categories');

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categories'], () => {
    return serializeForDehydration(fetchCategories);
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
