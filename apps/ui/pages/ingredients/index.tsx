import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { IngredientDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

const fetchIngredients = () => fetchDtos(IngredientDto, 'ingredients');

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['ingredients'], () => {
    return serializeForDehydration(fetchIngredients);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useIngredients = () => {
  return useQuery(['ingredients'], () => fetchIngredients());
};

export default function Index() {
  const queryResult = useIngredients();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <Table
      title="Ingredients"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={queryResult.data}
      createPathname="/ingredients/create"
      editPathname="/ingredients"
    />
  );
}
