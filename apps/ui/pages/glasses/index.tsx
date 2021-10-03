import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { GlassDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos, serializeForDehydration } from '../../utils';

const fetchGlasses = () =>
  fetchDtos('http://localhost:4200/api/glasses', GlassDto);

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

const useGlasses = () => {
  return useQuery(['glasses'], () => fetchGlasses());
};

export default function Index() {
  const { isLoading, data } = useGlasses();

  if (isLoading) return 'Loading...';

  return (
    <Table
      title="Glasses"
      columns={[
        { field: 'name', displayName: 'Name' },
        { field: 'createdDate', displayName: 'Created' },
        { field: 'updatedDate', displayName: 'Updated' },
      ]}
      rows={data}
      createPathname="/glasses/create"
      editPathname="/glasses"
    />
  );
}