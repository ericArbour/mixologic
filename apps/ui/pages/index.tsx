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
      <svg
        viewBox="0 0 600 800"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlSpace="preserve"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          fillRule: 'nonzero',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          color: 'red',
        }}
        height="400px"
        width="300px"
      >
        <linearGradient id="solids" x1="0%" y1="100%" x2="0%" y2="0%">
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
          <stop offset="25%" style={{ stopColor: '#c43019', stopOpacity: 1 }}>
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
              values="25%; 0;"
              dur="1s"
              repeatCount={1}
              fill="freeze"
              begin="mixAnimation.begin"
            />
            <animate
              attributeName="offset"
              values="0; 25%;"
              dur="1s"
              repeatCount={1}
              fill="freeze"
              begin="unmixAnimation.begin"
            />
          </stop>
          <stop offset="25%" style={{ stopColor: '#e75200', stopOpacity: 1 }}>
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
          <stop offset="50%" style={{ stopColor: '#e75200', stopOpacity: 1 }}>
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
          <stop offset="50%" style={{ stopColor: '#fb431f', stopOpacity: 1 }}>
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
          <stop offset="75%" style={{ stopColor: '#fb431f', stopOpacity: 1 }}>
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
          <stop offset="75%" style={{ stopColor: '#fff7ba', stopOpacity: 1 }}>
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
              values="75%; 100%;"
              dur="1s"
              repeatCount={1}
              fill="freeze"
              begin="mixAnimation.begin"
            />
            <animate
              attributeName="offset"
              values="100%; 75%;"
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
          <g opacity="1">
            <path
              d="M175+725C175+713.984+210.625+704.632+260.09+701.301C272.623+700.457+286.044+700+300+700C369.036+700+425+711.193+425+725C425+738.807+369.036+750+300+750C230.964+750+175+738.807+175+725Z"
              opacity="1"
            />
            <path
              d="M291.312+696.562C267.18+696.904+242.917+698.396+219.094+702.406C212.034+703.595+204.97+705.014+198.062+706.906C193.504+708.155+188.983+709.617+184.656+711.531C180.713+713.276+183.061+712.535+174.844+721.344C172.818+721.424+171.264+723.131+171.344+725.156C173.535+731.046+172.238+729.337+173.531+731.031C175.789+733.989+179.121+736.03+182.406+737.656C188.4+740.622+194.938+742.539+201.406+744.156C209.607+746.207+217.949+747.699+226.312+748.906C251.398+752.527+276.824+753.745+302.156+753.656C328.197+753.565+354.379+752.073+380.094+747.844C387.565+746.615+395.013+745.116+402.312+743.094C407.511+741.653+412.689+739.963+417.531+737.562C422.071+735.312+427.552+731.911+428.469+726.469C429.62+719.638+422.803+715.043+417.531+712.438C411.543+709.478+405.055+707.581+398.594+705.969C389.852+703.787+380.951+702.239+372.031+701C345.339+697.293+318.246+696.182+291.312+696.562ZM301.281+703.5C307.17+703.52+313.055+703.599+318.938+703.781C340.016+704.433+361.153+706.049+381.938+709.719C388.143+710.814+394.331+712.098+400.406+713.781C404.915+715.031+409.421+716.494+413.656+718.5C415.889+719.558+418.186+720.757+419.969+722.5C420.612+723.129+421.439+724.03+421.438+725C421.435+726.411+419.861+727.642+418.875+728.406C415.874+730.734+412.223+732.264+408.688+733.562C402.328+735.899+395.69+737.512+389.062+738.875C380.898+740.554+372.648+741.78+364.375+742.781C340.92+745.62+317.21+746.556+293.594+746.312C270.922+746.079+248.185+744.765+225.75+741.406C215.132+739.816+204.467+737.833+194.25+734.469C190.861+733.353+187.481+732.089+184.344+730.375C182.723+729.489+181.087+728.481+179.812+727.125C179.419+726.706+179.805+727.11+178.656+724.844C178.654+724.788+178.63+724.742+178.625+724.688C178.786+724.169+178.886+723.728+179+723.562C179.652+722.612+180.576+721.862+181.5+721.188C185.395+718.345+190.143+716.624+194.688+715.156C202.232+712.719+210.043+711.064+217.844+709.688C227.941+707.906+238.134+706.649+248.344+705.719C265.929+704.116+283.616+703.44+301.281+703.5Z"
              opacity="1"
            />
          </g>
          <path
            d="M474.938+96.3438C473.508+96.3712+472.159+97.2138+471.594+98.625C466.547+111.237+461.117+123.716+455.594+136.125C447.402+154.528+438.842+172.758+429.719+190.719C414.593+220.497+398.062+249.897+376.469+275.531C365.901+288.076+354.208+299.82+341.25+309.906C337.317+312.968+333.268+315.885+329.062+318.562C327.714+319.421+326.359+320.274+324.969+321.062C324.147+321.529+323.288+321.913+322.562+322.531C321.451+323.477+320.438+324.624+319.406+325.656C317.584+327.479+315.76+329.302+313.938+331.125C308.469+336.594+302.999+342.062+297.531+347.531C296.174+348.888+296.174+351.112+297.531+352.469C298.888+353.826+301.112+353.826+302.469+352.469C308.98+345.959+315.489+339.447+322+332.938C323.563+331.375+325.125+329.812+326.688+328.25C326.877+328.061+327.205+327.882+327.344+327.688C327.364+327.677+327.386+327.667+327.406+327.656C327.943+327.364+328.502+327.056+329.031+326.75C330.673+325.8+332.284+324.814+333.875+323.781C338.481+320.791+342.893+317.514+347.188+314.094C359.867+303.995+371.381+292.458+381.844+280.094C403.85+254.088+420.763+224.275+436.188+194.031C445.679+175.422+454.552+156.497+463.031+137.406C468.332+125.473+473.548+113.497+478.406+101.375C479.16+99.4934+478.257+97.3474+476.375+96.5938C475.905+96.4054+475.414+96.3346+474.938+96.3438Z"
            opacity="1"
          />
          <path
            opacity="1"
            d="M125.062+96.3438C124.586+96.3346+124.095+96.4053+123.625+96.5938C121.743+97.3473+120.84+99.4934+121.594+101.375C126.682+114.071+132.151+126.603+137.719+139.094C145.971+157.608+154.602+175.973+163.812+194.031C179.237+224.275+196.15+254.087+218.156+280.094C228.844+292.725+240.613+304.506+253.625+314.75C257.99+318.187+262.499+321.455+267.188+324.438C268.54+325.297+269.922+326.141+271.312+326.938C271.758+327.192+272.205+327.443+272.656+327.688C272.795+327.882+273.123+328.061+273.312+328.25C273.573+328.51+273.833+328.771+274.094+329.031C275.656+330.594+277.219+332.156+278.781+333.719C285.032+339.968+291.28+346.22+297.531+352.469C298.888+353.826+301.112+353.826+302.469+352.469C303.826+351.112+303.826+348.888+302.469+347.531C296.74+341.801+291.01+336.074+285.281+330.344C283.459+328.521+281.635+326.698+279.812+324.875C279.04+324.102+278.27+323.24+277.438+322.531C276.64+321.852+275.652+321.423+274.75+320.906C273.453+320.163+272.198+319.365+270.938+318.562C266.732+315.885+262.683+312.968+258.75+309.906C245.792+299.82+234.099+288.076+223.531+275.531C201.938+249.897+185.407+220.497+170.281+190.719C160.88+172.21+152.073+153.413+143.656+134.438C138.399+122.583+133.225+110.666+128.406+98.625C127.841+97.2138+126.492+96.3712+125.062+96.3438Z"
          />
          <path
            d="M290.969+71.5312C255.979+71.7922+220.879+73.2682+186.125+77.5C176.52+78.6696+166.932+80.0937+157.438+81.9688C150.378+83.3628+143.293+84.9729+136.5+87.375C132.806+88.6814+129.014+90.1988+125.875+92.5938C124.773+93.4346+124.657+94.1075+123.188+96.8438C122.025+97.5132+121.264+98.7562+121.344+100.188C121.482+100.342+121.493+100.383+121.625+100.531C121.825+101.809+122.69+102.839+123.906+103.25C129.019+109.412+127.053+108.695+130.438+110.344C131.018+110.627+131.689+110.931+132.281+111.188C133.29+111.626+134.312+112.023+135.344+112.406C136.47+112.825+137.606+113.224+138.75+113.594C147.08+116.285+155.729+118.01+164.344+119.5C175.228+121.383+186.202+122.772+197.188+123.906C234.308+127.739+271.73+128.908+309.031+128.625C344.026+128.359+379.149+126.872+413.906+122.625C424.07+121.383+434.217+119.869+444.25+117.812C451.133+116.402+458.029+114.797+464.625+112.344C465.655+111.961+466.68+111.532+467.688+111.094C472.013+109.213+477.917+106.11+478.531+100.844C479.25+94.6782+472.429+90.9633+467.688+88.9062C466.68+88.4691+465.655+88.0695+464.625+87.6875C463.5+87.27+462.361+86.8686+461.219+86.5C452.892+83.8132+444.266+82.08+435.656+80.5938C424.394+78.6497+413.025+77.2432+401.656+76.0938C364.914+72.3787+327.882+71.256+290.969+71.5312ZM300.688+78.4688C309.315+78.4832+317.941+78.5908+326.562+78.7812C356.133+79.4343+385.767+81.042+415.125+84.75C423.853+85.8524+432.587+87.1354+441.219+88.8438C447.219+90.0313+453.208+91.396+459.031+93.2812C462.417+94.3773+465.897+95.6226+468.906+97.5625C469.476+97.9298+471.381+99.1651+471.438+99.9688C471.467+100.392+470.787+100.949+470.531+101.188C469.524+102.125+468.308+102.838+467.094+103.469C462.265+105.976+456.875+107.454+451.625+108.781C442.285+111.142+432.749+112.761+423.219+114.125C412.327+115.683+401.398+116.834+390.438+117.781C353.49+120.975+316.32+121.783+279.25+121.156C260.952+120.847+242.633+120.134+224.375+118.875C209.797+117.87+195.235+116.536+180.75+114.594C173.403+113.609+166.085+112.468+158.812+111.031C153.199+109.922+147.595+108.66+142.125+106.969C138.553+105.864+134.916+104.609+131.688+102.688C130.818+102.17+131.68+102.71+128.656+99.8125C128.732+99.6309+128.857+99.3088+128.906+99.25C129.371+98.6915+129.939+98.2258+130.531+97.8125C132.743+96.2699+135.329+95.2153+137.844+94.2812C144.609+91.7688+151.715+90.1759+158.781+88.7812C179.96+84.6015+201.579+82.5365+223.094+81.0312C248.906+79.2254+274.805+78.4255+300.688+78.4688Z"
            opacity="1"
          />
          <path
            opacity="1"
            d="M300+346.531C298.081+346.531+296.531+348.081+296.531+350C296.518+441.667+296.371+533.333+296.344+625C296.344+627.027+297.973+628.656+300+628.656C302.027+628.656+303.656+627.027+303.656+625C303.629+533.333+303.482+441.667+303.469+350C303.469+348.081+301.919+346.531+300+346.531Z"
          />
          <path
            d="M300+625C300+625+299.413+654.744+275+675C250.587+695.256+202.348+706.023+202.348+706.023L402.127+706.696C402.127+706.696+350.532+695.424+325+675C299.468+654.576+300+625+300+625Z"
            opacity="1"
          />
          <g opacity="1">
            <path
              opacity="1"
              d="M291.507+700.063L291.507+325L299.67+351.79L307.832+325L307.832+700.063L291.507+700.063Z"
            />
            <path
              d="M292.312+321.781C291.346+321.706+290.347+321.965+289.469+322.375C288.979+322.604+288.718+323.152+288.406+323.594C288.267+323.791+288.205+324.053+288.125+324.281C287.773+325.291+287.937+326.894+287.938+327.938C287.938+328.426+287.937+328.918+287.938+329.406C287.938+329.895+287.937+330.387+287.938+330.875C287.938+331.363+287.937+331.824+287.938+332.312C287.938+333.289+287.937+334.273+287.938+335.25C287.938+336.715+287.968+338.191+287.969+339.656C287.969+341.121+287.968+342.566+287.969+344.031C287.978+366.008+287.96+387.992+287.969+409.969C287.998+479.805+288.028+549.633+288.031+619.469C288.032+638.515+288.03+657.579+288.031+676.625C288.031+681.509+288.031+686.398+288.031+691.281C288.031+693.235+288.031+695.171+288.031+697.125C288.031+697.452+288.031+698.321+288.031+699.094C287.944+699.407+287.844+699.721+287.844+700.062C287.844+702.089+289.473+703.719+291.5+703.719C292.648+703.719+291.604+703.282+292.656+703.719C293.127+703.914+293.677+703.719+294.188+703.719C294.698+703.719+295.209+703.719+295.719+703.719C297.037+703.719+298.338+703.719+299.656+703.719C300.967+703.719+302.283+703.719+303.594+703.719C304.691+703.719+305.809+703.719+306.906+703.719C307.084+703.719+307.656+703.823+307.812+703.719C308.942+702.966+310.2+702.365+311.219+701.469C311.463+701.254+311.394+700.848+311.469+700.531C311.61+699.932+311.5+699.206+311.5+698.594C311.5+696.64+311.5+694.704+311.5+692.75C311.5+690.308+311.5+687.848+311.5+685.406C311.499+677.104+311.501+668.802+311.5+660.5C311.5+655.616+311.5+650.727+311.5+645.844C311.499+639.983+311.501+634.142+311.5+628.281C311.492+552.585+311.468+476.884+311.438+401.188C311.43+382.141+311.445+363.077+311.438+344.031C311.435+339.148+311.408+334.29+311.406+329.406C311.406+328.918+311.406+328.426+311.406+327.938C311.406+326.761+311.605+324.363+310.844+323.469C310.423+322.975+310.016+322.376+309.406+322.156C308.538+321.843+307.537+321.823+306.625+321.969C306.08+322.056+305.655+322.505+305.219+322.844C305.014+323.002+304.901+323.228+304.75+323.438C304.146+324.274+303.823+325.884+303.531+326.844C303.385+327.323+303.24+327.802+303.094+328.281C302.842+329.11+302.596+329.921+302.344+330.75C302.025+331.797+301.693+332.86+301.375+333.906C301.025+335.058+300.694+336.192+300.344+337.344C300.122+338.072+299.878+338.803+299.656+339.531C299.435+338.805+299.222+338.07+299+337.344C298.55+335.869+298.106+334.413+297.656+332.938C297.324+331.85+296.988+330.744+296.656+329.656C296.46+329.015+296.258+328.392+296.062+327.75C295.918+327.277+295.769+326.786+295.625+326.312C295.353+325.42+294.844+323.307+294.062+322.75C293.516+322.361+292.981+321.833+292.312+321.781ZM295.062+348.906C295.167+349.25+295.27+349.593+295.375+349.938C295.828+351.427+296.185+353.557+297.594+354.438C297.927+354.646+298.275+354.845+298.656+354.938C299.154+355.058+299.679+355.129+300.188+355.062C300.674+354.999+301.161+354.795+301.594+354.562C302.118+354.282+302.499+353.802+302.812+353.312C303.178+352.741+303.363+351.871+303.562+351.219C303.788+350.48+304.025+349.739+304.25+349C304.252+350.281+304.251+351.563+304.25+352.844C304.243+369.936+304.225+387.032+304.219+404.125C304.198+456.38+304.193+508.62+304.188+560.875C304.184+591.642+304.159+622.421+304.156+653.188C304.155+663.443+304.157+673.682+304.156+683.938C304.156+688.092+304.178+692.25+304.156+696.406C303.657+696.406+303.155+696.406+302.656+696.406C300.09+696.406+297.535+696.407+294.969+696.406C294.969+696.157+294.969+695.906+294.969+695.656C294.969+693.214+294.969+690.786+294.969+688.344C294.969+677.6+294.968+666.869+294.969+656.125C294.97+628.288+294.995+600.431+295+572.594C295.01+517.409+295.008+462.216+295.031+407.031C295.039+388.962+295.055+370.913+295.062+352.844C295.063+351.532+295.062+350.218+295.062+348.906Z"
              opacity="1"
            />
          </g>
          <path
            d="M225.19+280.561C225.19+280.561+273.833+298.402+300.421+298.21C327.009+298.017+375+281.299+375+281.299C375+281.299+356.727+305.825+338+323C319.273+340.175+300.091+350+300.091+350C300.091+350+283.725+341.36+265+324C246.275+306.64+225.19+280.561+225.19+280.561Z"
            opacity="1"
          />
        </g>
        <g id="Liquid">
          <path
            fill="url(#solids)"
            opacity="1"
            d="M300+290C335+290+363.326+276.674+370+270C400+240+450+130+450+130C450+130+370+140+300+140C230+140+150+130+150+130C150+130+193.623+231.248+230+270C241.225+281.958+265+290+300+290Z"
          />
        </g>
      </svg>
    </div>
  );
}
