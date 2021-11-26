import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { UnitDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

export const fetchUnits = () => fetchDtos(UnitDto, 'units');

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['units'], () => {
    return serializeForDehydration(fetchUnits);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const useUnits = () => {
  return useQuery(['units'], () => fetchUnits());
};

export default function Index() {
  const queryResult = useUnits();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <Table
      title="Units"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={queryResult.data}
      createPathname="/units/create"
      editPathname="/units"
    />
  );
}
