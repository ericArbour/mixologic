import { DrinkDto } from '@mixologic/common';
import { Fragment } from 'react';
import { mixIngredientColors } from '../drink-color';

interface CoupeGlassSvgProps {
  drinkIngredients: DrinkDto['drinkIngredients'];
  drinkIndex: number;
}

export function CoupeGlassSvg({
  drinkIngredients,
  drinkIndex,
}: CoupeGlassSvgProps) {
  const mixedColor = mixIngredientColors(drinkIngredients);
  const mixedHex = `#${mixedColor}`;
  const regionPercent = Math.floor((1 / drinkIngredients.length) * 100);

  return (
    <svg
      viewBox="0 0 150 200"
      xmlSpace="preserve"
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
      <linearGradient
        id={`liquid${drinkIndex}`}
        x1="0%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        {drinkIngredients.map((drinkIngredient, index) => {
          const colorHex = drinkIngredient.ingredient.color
            ? `#${drinkIngredient.ingredient.color}`
            : // This hex is the current background color which gives a colorless affect.
              // Ideally this should be read from a variable and not hard-coded.
              '#f3f4f6';
          const startPercent = index * regionPercent;
          const endPercent = (index + 1) * regionPercent;

          const separator =
            index === 0 ? null : (
              <>
                <stop
                  offset={`${startPercent}%`}
                  style={{ stopColor: 'currentColor', stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values={`currentColor; ${mixedHex};`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin={`mixAnimation${drinkIndex}.begin`}
                  />
                  <animate
                    attributeName="stop-color"
                    values={`${mixedHex}; currentColor;`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin={`unmixAnimation${drinkIndex}.begin`}
                  />
                </stop>
                <stop
                  offset={`${startPercent + 1}%`}
                  style={{ stopColor: 'currentColor', stopOpacity: 1 }}
                >
                  <animate
                    attributeName="stop-color"
                    values={`currentColor; ${mixedHex};`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin={`mixAnimation${drinkIndex}.begin`}
                  />
                  <animate
                    attributeName="stop-color"
                    values={`${mixedHex}; currentColor;`}
                    dur="1s"
                    repeatCount={1}
                    fill="freeze"
                    begin={`unmixAnimation${drinkIndex}.begin`}
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
                  begin={
                    index === 0
                      ? 'indefinite'
                      : `mixAnimation${drinkIndex}.begin`
                  }
                  id={index === 0 ? `mixAnimation${drinkIndex}` : undefined}
                />
                <animate
                  attributeName="stop-color"
                  values={`${mixedHex}; ${colorHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin={
                    index === 0
                      ? 'indefinite'
                      : `unmixAnimation${drinkIndex}.begin`
                  }
                  id={index === 0 ? `unmixAnimation${drinkIndex}` : undefined}
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
                  begin={`mixAnimation${drinkIndex}.begin`}
                />
                <animate
                  attributeName="stop-color"
                  values={`${mixedHex}; ${colorHex};`}
                  dur="1s"
                  repeatCount={1}
                  fill="freeze"
                  begin={`unmixAnimation${drinkIndex}.begin`}
                />
              </stop>
            </Fragment>
          );
        })}
      </linearGradient>
      <g id="Layer 1">
        <path
          strokeWidth="5"
          fill={`url(#liquid${drinkIndex})`}
          stroke="currentColor"
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
          fill="currentColor"
          opacity="1"
          stroke="currentColor"
        />
        <path
          d="M40+190C40+190+57.5782+183.643+65+175C72.4218+166.357+75.0137+155.429+75.0137+155.429C75.0137+155.429+77.5992+166.357+85+175C92.4008+183.643+110+190+110+190L40+190Z"
          strokeLinejoin="round"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="1"
        />
        <path
          strokeWidth="5"
          fill="currentColor"
          strokeLinecap="round"
          stroke="currentColor"
          strokeLinejoin="round"
          opacity="1"
          d="M75.0362+95.2223C75.0362+95.2223+76.3442+89.5965+80+85C83.6558+80.4035+89.6593+76.8362+89.6593+76.8362C89.6593+76.8362+82.3231+79.9882+75+80C67.6769+80.0118+60.367+76.8836+60.367+76.8836C60.367+76.8836+66.3327+80.4153+70+85C73.6673+89.5847+75.0362+95.2223+75.0362+95.2223Z"
        />
      </g>
    </svg>
  );
}
