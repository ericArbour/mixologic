import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { CategoryDto } from '@mixologic/common';
import { plainToClass } from 'class-transformer';


async function fetchCategories() {
  const response = await fetch('http://localhost:4200/api/categories');
  const categories: unknown[] = await response.json();
  return plainToClass(CategoryDto, categories);
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['categories'], async () => {
    const categories = await fetchCategories();
    return JSON.parse(JSON.stringify(categories));
  });

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
