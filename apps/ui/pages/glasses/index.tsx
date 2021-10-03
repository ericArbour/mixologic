import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { GlassDto } from '@mixologic/common';

import { Table } from '../../components';
import { fetchDtos } from '../../utils';

const fetchGlasses = fetchDtos.bind(
  null,
  'http://localhost:4200/api/glasses',
  GlassDto
);

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['glasses'], async () => {
    const glasses = await fetchGlasses();
    return JSON.parse(JSON.stringify(glasses));
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
