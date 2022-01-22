import { CoupeGlassSvg } from '../components';
import { useDrinks } from './drinks';

export default function Index() {
  const queryResult = useDrinks();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <div>
      <h2>Search it, find it, mix it, drink it. Mixologic.</h2>
      <ul className="flex flex-wrap">
        {queryResult.data.map((drinkDto, index) => {
          return (
            <li key={drinkDto.id} className="border">
              <p>{drinkDto.name}</p>
              <CoupeGlassSvg
                drinkIngredients={drinkDto.drinkIngredients}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
