import { useState } from 'react';

import { Button } from '../components';

export default function Index() {
  const [shouldMix, setShouldMix] = useState(false);
  console.log(shouldMix);
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
      <PaperPlaneCoupe />
    </div>
  );
}

function PaperPlaneCoupe() {
  return (
    <svg
      xmlSpace="preserve"
      viewBox="0 0 150 200"
      height="400px"
      width="300px"
      style={{
        fillRule: 'nonzero',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <metadata></metadata>
      <defs />
      <linearGradient id="liquid" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#c43019', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#c43019; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="indefinite"
            id="mixAnimation"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #c43019;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="indefinite"
            id="unmixAnimation"
          />
        </stop>
        <stop offset="30%" style={{ stopColor: '#c43019', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#c43019; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #c43019;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
          <animate
            attributeName="offset"
            values="30%; 0;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="offset"
            values="0; 30%;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="30%" style={{ stopColor: '#e75200', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#e75200; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #e75200;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="55%" style={{ stopColor: '#e75200', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#e75200; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #e75200;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="55%" style={{ stopColor: '#fb431f', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#fb431f; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #fb431f;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="80%" style={{ stopColor: '#fb431f', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#fb431f; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #fb431f;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="80%" style={{ stopColor: '#fff7ba', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#fff7ba; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #fff7ba;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
          <animate
            attributeName="offset"
            values="80%; 100%;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="offset"
            values="100%; 80%;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
        <stop offset="100%" style={{ stopColor: '#fff7ba', stopOpacity: 1 }}>
          <animate
            attributeName="stop-color"
            values="#fff7ba; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="stop-color"
            values="#f29f64; #fff7ba;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </stop>
      </linearGradient>
      <g id="Glass">
        <path
          stroke="#000000"
          fill="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M40+181.009C40+176.043+55.67+172.018+75+172.018C94.33+172.018+110+176.043+110+181.009C110+185.975+94.33+190+75+190C55.67+190+40+185.975+40+181.009Z"
          opacity="1"
          strokeWidth="5"
        />
        <path
          strokeWidth="5"
          stroke="#000000"
          opacity="1"
          strokeLinejoin="round"
          d="M75+175L75+90"
          fill="none"
          strokeLinecap="round"
        />
        <path
          strokeLinecap="round"
          fill="#000000"
          d="M51+185.002C51+185.002+61.8137+186.462+67.7515+175.843C73.6894+165.225+75+167.856+75+167.856C75+167.856+76.7988+165.168+82.7515+175.843C88.7043+186.519+98.5626+185.231+98.5626+185.231L51+185.002Z"
          opacity="1"
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          strokeWidth="5"
          strokeLinecap="round"
          opacity="1"
          fill="url(#liquid)"
          stroke="#000000"
          strokeLinejoin="round"
          d="M9.81853+20C9.81853+20+3.56853+43.75+19.8185+60C36.0685+76.25+74.8185+85+74.8185+85C74.8185+85+113.569+76.25+129.819+60C146.069+43.75+139.819+20+139.819+20"
        />
        <path
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeWidth="5"
          strokeLinejoin="round"
          d="M75+90C75+90+76.2559+87.5533+79.8624+85.1977C83.4689+82.8422+90.4261+80.5779+90.4261+80.5779C90.4261+80.5779+82.4325+82.9601+75+83C67.5675+83.0399+59.6961+80.7373+59.6961+80.7373C59.6961+80.7373+66.3858+82.9705+70.2118+85.2862C74.0378+87.6019+75+90+75+90Z"
          opacity="1"
        />
        <path
          strokeWidth="5"
          fill="#fff7ba"
          stroke="#000000"
          strokeLinejoin="round"
          opacity="1"
          strokeLinecap="round"
          d="M10+20C10+14.4772+39.1015+10+75+10C110.899+10+140+14.4772+140+20C140+25.5228+110.899+30+75+30C39.1015+30+10+25.5228+10+20Z"
        >
          <animate
            attributeName="fill"
            values="#fff7ba; #f29f64;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="mixAnimation.begin"
          />
          <animate
            attributeName="fill"
            values="#f29f64; #fff7ba;"
            dur="1s"
            repeatCount={1}
            fill="freeze"
            begin="unmixAnimation.begin"
          />
        </path>
      </g>
    </svg>
  );
}
