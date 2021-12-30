import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { DrinkDto } from '@mixologic/common';

import { DrinkColor, Table, TextLink } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

export const fetchDrinks = () => fetchDtos(DrinkDto, 'drinks');

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['drinks'], () => {
    return serializeForDehydration(fetchDrinks);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const useDrinks = () => {
  return useQuery(['drinks'], () => fetchDrinks());
};

export default function Index() {
  const queryResult = useDrinks();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <Table
      title="Drinks"
      filterPlaceholder="name or glass"
      columns={[
        { field: 'name', displayName: 'Name' },
        {
          field: 'url',
          displayName: 'URL',
          valueFormatter: (x) => (
            <TextLink href={x.url} shouldOpenNewTab>
              Link
            </TextLink>
          ),
        },
        {
          field: 'glass',
          displayName: 'Glass',
          valueFormatter: (x) => x.glass.name,
        },
        {
          field: 'drinkIngredients',
          displayName: 'Color',
          valueFormatter: (x) => (
            <DrinkColor drinkIngredients={x.drinkIngredients} />
          ),
        },
      ]}
      rows={queryResult.data}
      createPathname="/drinks/create"
      editPathname="/drinks"
    />
  );
}
