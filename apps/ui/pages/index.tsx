import { Fragment, useState } from 'react';
import { DrinkDto } from '@mixologic/common';

import { Button, mixIngredientColors } from '../components';
import { useDrinks } from './drinks';

export default function Index() {
  const [shouldMix, setShouldMix] = useState(false);
  const queryResult = useDrinks();

  if (queryResult.isLoading || queryResult.isIdle) return 'Loading...';
  if (queryResult.isError) return 'Oops, an error occurred';

  return (
    <div>
      <h2>Search it, find it, mix it, drink it. Mixologic.</h2>
      <Button
        label={shouldMix ? 'Unmix' : 'Mix'}
        color="blue"
        onClick={() => {
          if (!shouldMix) {
            const mixAnimation = document.getElementById('mixAnimation');
            if (mixAnimation instanceof SVGAnimateElement) {
              mixAnimation.beginElement();
            }
          } else {
            const unmixAnimation = document.getElementById('unmixAnimation');
            if (unmixAnimation instanceof SVGAnimateElement) {
              unmixAnimation.beginElement();
            }
          }
          setShouldMix((shouldMix) => !shouldMix);
        }}
      />
      <ul className="flex flex-wrap">
        {queryResult.data
          .filter((drinkDto) => drinkDto.name === 'Paper Plane')
          .map((drinkDto) => {
            return (
              <li key={drinkDto.id} className="border">
                <p>{drinkDto.name}</p>
                <CoupeGlassSvg drinkIngredients={drinkDto.drinkIngredients} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

interface CoupeGlassSvgProps {
  drinkIngredients: DrinkDto['drinkIngredients'];
}

function CoupeGlassSvg({ drinkIngredients }: CoupeGlassSvgProps) {
  const mixedColor = mixIngredientColors(drinkIngredients);
  const mixedHex = `#${mixedColor}`;
  const regionPercent = Math.floor((1 / drinkIngredients.length) * 100);

  return (
    <svg
      viewBox="0 0 150 200"
      xmlSpace="preserve"
      height="400px"
      width="300px"
      style={{
        fillRule: 'nonzero',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <linearGradient id="liquid" x1="0%" y1="100%" x2="0%" y2="0%">
        {drinkIngredients.map((drinkIngredient, index) => {
          const colorHex = `#${drinkIngredient.ingredient.color}` ?? '#fff';
          const startPercent = index * regionPercent;
          const endPercent = (index + 1) * regionPercent;

          const separator =
            index === 0 ? null : (
              <>
                <stop
                  offset={`${startPercent}%`}
                  style={{ stopColor: '#000000', stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values={`#000000; ${mixedHex};`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin="mixAnimation.begin"
                  />
                  <animate
                    attributeName="stop-color"
                    values={`${mixedHex}; #000000;`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin="unmixAnimation.begin"
                  />
                </stop>
                <stop
                  offset={`${startPercent + 1}%`}
                  style={{ stopColor: '#000000', stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values={`#000000; ${mixedHex};`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin="mixAnimation.begin"
                  />
                  <animate
                    attributeName="stop-color"
                    values={`${mixedHex}; #000000;`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin="unmixAnimation.begin"
                  />
                </stop>
              </>
            );

          return (
            <Fragment key={drinkIngredient.ingredient.id}>
              {separator}
              <stop
                offset={`${index === 0 ? startPercent : startPercent + 1}%`}
                style={{ stopColor: colorHex, stopOpacity: 1 }}
              >
                <animate
                  attributeName="stop-color"
                  values={`${colorHex}; ${mixedHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin="indefinite"
                  id="mixAnimation"
                />
                <animate
                  attributeName="stop-color"
                  values={`${mixedHex}; ${colorHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin="indefinite"
                  id="unmixAnimation"
                />
              </stop>
              <stop
                offset={`${endPercent}%`}
                style={{ stopColor: colorHex, stopOpacity: 1 }}
              >
                <animate
                  attributeName="stop-color"
                  values={`${colorHex}; ${mixedHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin="mixAnimation.begin"
                />
                <animate
                  attributeName="stop-color"
                  values={`${mixedHex}; ${colorHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin="unmixAnimation.begin"
                />
              </stop>
            </Fragment>
          );
        })}
      </linearGradient>
      <g id="Layer 1">
        <path
          strokeWidth="5"
          fill="url(#liquid)"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          d="M30.3351+10L120+10C120+10+116.25+41.25+105+60C93.75+78.75+75+85+75+85C75+85+56.1662+78.75+45+60C33.8338+41.25+30.3351+10+30.3351+10Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
          d="M75+160L75.0418+85.1549"
          fill="#000000"
          opacity="1"
          stroke="#000000"
        />
        <path
          d="M40+190C40+190+57.5782+183.643+65+175C72.4218+166.357+75.0137+155.429+75.0137+155.429C75.0137+155.429+77.5992+166.357+85+175C92.4008+183.643+110+190+110+190L40+190Z"
          strokeLinejoin="round"
          stroke="#000000"
          fill="#000000"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="1"
        />
        <path
          strokeWidth="5"
          fill="#000000"
          strokeLinecap="round"
          stroke="#000000"
          strokeLinejoin="round"
          opacity="1"
          d="M75.0362+95.2223C75.0362+95.2223+76.3442+89.5965+80+85C83.6558+80.4035+89.6593+76.8362+89.6593+76.8362C89.6593+76.8362+82.3231+79.9882+75+80C67.6769+80.0118+60.367+76.8836+60.367+76.8836C60.367+76.8836+66.3327+80.4153+70+85C73.6673+89.5847+75.0362+95.2223+75.0362+95.2223Z"
        />
      </g>
    </svg>
  );
}
