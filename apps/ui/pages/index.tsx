import { DrinkDto } from '@mixologic/common';
import { useState } from 'react';
import { Button, CoupeGlassSvg } from '../components';
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
            <DrinkCard
              key={drinkDto.id}
              drinkDto={drinkDto}
              drinkIndex={index}
            />
          );
        })}
      </ul>
    </div>
  );
}

interface DrinkCardProps {
  drinkDto: DrinkDto;
  drinkIndex: number;
}

function DrinkCard({ drinkDto, drinkIndex }: DrinkCardProps) {
  const [shouldMix, setShouldMix] = useState(false);

  return (
    <li key={drinkDto.id} className="border flex flex-col w-48">
      <div>
        <p>{drinkDto.name}</p>
        <Button
          label={shouldMix ? 'Unmix' : 'Mix'}
          color="blue"
          onClick={() => {
            if (!shouldMix) {
              const mixAnimation = document.getElementById(
                `mixAnimation${drinkIndex}`
              );
              if (mixAnimation instanceof SVGAnimateElement) {
                mixAnimation.beginElement();
              }
            } else {
              const unmixAnimation = document.getElementById(
                `unmixAnimation${drinkIndex}`
              );
              if (unmixAnimation instanceof SVGAnimateElement) {
                unmixAnimation.beginElement();
              }
            }
            setShouldMix((shouldMix) => !shouldMix);
          }}
        />
      </div>
      <CoupeGlassSvg
        drinkIngredients={drinkDto.drinkIngredients}
        drinkIndex={drinkIndex}
      />
    </li>
  );
}
