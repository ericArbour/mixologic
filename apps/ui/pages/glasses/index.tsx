import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { GlassDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

export const fetchGlasses = () => fetchDtos(GlassDto, 'glasses');

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['glasses'], () => {
    return serializeForDehydration(fetchGlasses);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const useGlasses = () => {
  return useQuery(['glasses'], () => fetchGlasses());
};

export default function Index() {
  const queryResult = useGlasses();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <Table
      title="Glasses"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={queryResult.data}
      createPathname="/glasses/create"
      editPathname="/glasses"
    />
  );
}
