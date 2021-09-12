import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

async function fetchCategories() {
  const response = await fetch('http://localhost:4200/api/categories');
  const json = await response.json();
  return json;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categories'], () => fetchCategories());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const useCategories = () => {
  return useQuery(['categories'], () => fetchCategories())
}

function Index() {
  const { isLoading, data } = useCategories();

  if (isLoading) return 'Loading...';
  return (
    <div>
      <h2>Categories</h2>
      <ul>{data.map(category => <li key={category.id}>{category.name}</li>)}</ul>
    </div>
  );
}

export default Index;
