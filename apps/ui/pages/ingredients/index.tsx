import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { IngredientDto } from '@mixologic/common';

import { ColorPreview, Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

export const fetchIngredients = () => fetchDtos(IngredientDto, 'ingredients');

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

export const useIngredients = () => {
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
        {
          field: 'color',
          displayName: 'Color',
          valueFormatter: (x) => (
            <ColorPreview color={x.color} className="h-6 w-12" />
          ),
        },
        {
          field: 'categories',
          displayName: 'Categories',
          valueFormatter: (x) =>
            x.categories.map((category) => category.name).join(', '),
        },
      ]}
      rows={queryResult.data}
      createPathname="/ingredients/create"
      editPathname="/ingredients"
    />
  );
}
