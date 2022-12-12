import hsl from 'hsl-to-hex';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,

// to customize the default configuration.

interface boxinterface {
  hex: string;
}

function ColourBox(props: boxinterface) {
  return (
    <div>
      <p>{props.hex}</p>
      <div
        className='h-16 w-32 border border-black'
        style={{
          backgroundColor: `${props.hex}`,
        }}
      ></div>
    </div>
  );
}

export default function HomePage() {
  const [colour, changecolour] = useState<any>('#41ffca');
  const [complementaryColour, setComplementaryColour] = useState('#ff4176');
  const [splitComplementary1Colour, setSplitComplementary1Colour] =
    useState('#ff4176');
  const [splitComplementary2Colour, setSplitComplementary2Colour] =
    useState('#ff4176');
  const [tri1Colour, setTri1Colour] = useState('#000000');
  const [tri2Colour, setTri2Colour] = useState('#000000');

  const [monochrome, setMonochrome] = useState('#000000');
  const [analogousColours, setAnalogousColors] = useState([
    '#000000',
    '#000000',
    '#000000',
  ]);
  const [colourobject, setcolourobject] = useState<any>({
    hsl: {
      h: 163.26315789473682,
      s: 1,
      l: 0.6274509803921569,
      a: 1,
    },
    hex: '#41ffca',
    rgb: {
      r: 65,
      g: 255,
      b: 202,
      a: 1,
    },
    hsv: {
      h: 163.26315789473682,
      s: 0.7450980392156863,
      v: 1,
      a: 1,
    },
    oldHue: 164,
    source: 'hex',
  });

  const handleChangeComplete = (color: any, event: any) => {
    console.log(color);
    changecolour(color.hex);
    setcolourobject(color);
  };

  useEffect(() => {
    console.log(colour);
    runColourCheck();
  }, [colour]);

  function runColourCheck() {
    if (colourobject) {
      const originalHue = colourobject.hsl.h;
      const originalSat = 100 * colourobject.hsl.s;
      console.log('originalSat', originalSat);
      const originalLum = 100 * colourobject.hsl.l;
      console.log('originalLum', originalLum);

      console.log(originalHue);

      const complementaryHue = (originalHue + 180) % 360;

      console.log('complementaryHue', complementaryHue);

      const complHex = hsl(complementaryHue, originalSat, originalLum);
      console.log('complHex', complHex);
      setComplementaryColour(complHex);

      const splitcomplementary1Hue = (originalHue + 150) % 360;
      const splitcomplementary2Hue = (originalHue + 210) % 360;

      setSplitComplementary1Colour(
        hsl(splitcomplementary1Hue, originalSat, originalLum)
      );

      setSplitComplementary2Colour(
        hsl(splitcomplementary2Hue, originalSat, originalLum)
      );

      setTri1Colour(hsl((originalHue + 120) % 360, originalSat, originalLum));
      setTri2Colour(hsl((originalHue + 240) % 360, originalSat, originalLum));

      setAnalogousColors([
        hsl((originalHue + 30) % 360, originalSat, originalLum),
        hsl((originalHue + 60) % 360, originalSat, originalLum),
        hsl((originalHue + 90) % 360, originalSat, originalLum),
      ]);

      setMonochrome(hsl(originalHue, 0, originalLum));
    }
  }

  useEffect(() => {
    runColourCheck();
  }, []);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='mx-auto px-4 sm:px-8 md:px-32'>
          <div className='mx-auto flex flex-col py-8 md:flex-row md:gap-x-5 md:py-16'>
            <div className='md:my-auto'>
              <h1>Colour Picker</h1>
              <p>
                This software allows you to pick colours and view related
                colours!
              </p>
            </div>
            <SketchPicker
              color={colour}
              onChangeComplete={handleChangeComplete}
            />
          </div>
          <div>
            <h2>Complementary</h2>
            <ColourBox hex={complementaryColour} />
          </div>
          <div>
            <h2>Split-complementary</h2>
            <div className='gap-x-3 gap-y-3 md:flex md:flex-row md:flex-wrap md:gap-y-0'>
              <ColourBox hex={splitComplementary1Colour} />
              <ColourBox hex={splitComplementary2Colour} />
            </div>
          </div>
          <div>
            <h2>Triadic</h2>
            <div className='gap-x-3 gap-y-3 md:flex md:flex-row md:flex-wrap md:gap-y-0'>
              <ColourBox hex={tri1Colour} />
              <ColourBox hex={tri2Colour} />
            </div>
          </div>
          <div>
            <h2>Triadic</h2>
            <div className='gap-x-3 gap-y-3 md:flex md:flex-row md:flex-wrap md:gap-y-0'>
              <ColourBox hex={tri1Colour} />
              <ColourBox hex={tri2Colour} />
            </div>
          </div>
          <div>
            <h2>Analagous</h2>
            <div className='gap-x-3 gap-y-3 md:flex md:flex-row md:flex-wrap md:gap-y-0'>
              {analogousColours.map((eachColor, eachNumber) => (
                <ColourBox hex={eachColor} key={eachNumber} />
              ))}
            </div>
          </div>
          <div>
            <h2>Monochrome</h2>
            <div className='gap-x-3 gap-y-3 md:flex md:flex-row md:flex-wrap md:gap-y-0'>
              <ColourBox hex={monochrome} />
            </div>
          </div>
        </div>
        <div className='py-8'></div>
      </main>
    </Layout>
  );
}
