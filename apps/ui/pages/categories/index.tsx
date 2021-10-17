import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { CategoryDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

const fetchCategories = () => fetchDtos(CategoryDto, 'categories');

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
  const queryResult = useCategories();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <Table
      title="Ingredient Categories"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={queryResult.data}
      createPathname="/categories/create"
      editPathname="/categories"
    />
  );
}
