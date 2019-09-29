
figma.showUI(__html__, {
  width: 280,
  height: 405
});

//utilities
// https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428
function hsl2rgb(h, s, l) {
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
// https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#54071699
function rgb2hsl(r, g, b) {
  let a = Math.max(r, g, b), n = a - Math.min(r, g, b), f = (1 - Math.abs(a + a - n - 1));
  let h = n && ((a == r) ? (g - b) / n : ((a == g) ? 2 + (b - r) / n : 4 + (r - g) / n));
  return [60 * (h < 0 ? h + 6 : h), f ? n / f : 0, (a + a - n) / 2];
}
// https://www.figma.com/plugin-docs/editing-properties/
function clone(val) {
  const type = typeof val
  if (val === null) {
    return null
  } else if (type === 'undefined' || type === 'number' ||
    type === 'string' || type === 'boolean') {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}
// https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}





/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Palette Functions
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
//calculation with help from:
// https://stackoverflow.com/questions/22868182/uicolor-transition-based-on-progress-value
function blendPalette(prevR, prevG, prevB, r, g, b, steps) {
  let i = 0,
      shades = [];
  for (i = 1; i < steps; i++) {
    let factor = i / steps,
        newR = (1 -factor) * r + factor * prevR,
        newG = (1 -factor) * g + factor * prevG,
        newB = (1 -factor) * b + factor * prevB;

    let shade = {
      r: Math.round(newR * 255),
      g: Math.round(newG * 255),
      b: Math.round(newB * 255),
    }

    shades.push(shade);
  }
  return shades;
}


function tintsNshades(r, g, b, steps) {
  let i = 0,
      shades = [],
      hsl = rgb2hsl(r, g, b);

  if (steps < 0) {
    //shades
    for (i = 0; i > steps; i--) {
      let diff = (hsl[2] / steps) * i,
          newLightness = hsl[2] - diff,
          newShade = hsl2rgb(hsl[0], hsl[1],newLightness);
      let shade = {
        r: Math.round(newShade[0] * 255),
        g: Math.round(newShade[1] * 255),
        b: Math.round(newShade[2] * 255)
      }
      shades.push(shade);
    }
  } else {
    //tints
    for (i = 0; i < steps; i++) {
      let diff = ((1 - hsl[2]) / steps) * i,
          newLightness = hsl[2] + diff,
          newShade = hsl2rgb(hsl[0], hsl[1],newLightness);
      let shade = {
        r: Math.round(newShade[0] * 255),
        g: Math.round(newShade[1] * 255),
        b: Math.round(newShade[2] * 255)
      }
      shades.push(shade);
    }
  }
  return shades;
}

function tones(r, g, b, steps) {
  let i = 0,
      shades = [],
      hsl = rgb2hsl(r, g, b);

  if (steps < 0) {
    //desaturate
    for (i = 0; i > steps; i--) {
      let diff = (hsl[1] / steps) * i,
          newSat = hsl[1] - diff,
          newShade = hsl2rgb(hsl[0], newSat,hsl[2]);
      let shade = {
        r: Math.round(newShade[0] * 255),
        g: Math.round(newShade[1] * 255),
        b: Math.round(newShade[2] * 255)
      }
      shades.push(shade);
    }
  } else {
    //saturate
    for (i = 0; i < steps; i++) {
      let diff = ((1 - hsl[1]) / steps) * i,
          newSat = hsl[1] + diff,
          newShade = hsl2rgb(hsl[0], newSat,hsl[2]);
      let shade = {
        r: Math.round(newShade[0] * 255),
        g: Math.round(newShade[1] * 255),
        b: Math.round(newShade[2] * 255)
      }
      shades.push(shade);
    }
  }
  return shades;
}

function complementaryPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      newR = 180 + hsl[0],
      newShade = hsl2rgb(newR, hsl[1], hsl[2]);

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade = {
    r: Math.round(newShade[0] * 255),
    g: Math.round(newShade[1] * 255),
    b: Math.round(newShade[2] * 255),
  }

  shades.push(currentShade, complementaryShade);
  return shades;
}

function splitComplementaryPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      newR1 = (180 + 15) + hsl[0],
      newR2 = (180 - 15) + hsl[0],
      newShade1 = hsl2rgb(newR1, hsl[1], hsl[2]),
      newShade2 = hsl2rgb(newR2, hsl[1], hsl[2]);

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade1 = {
    r: Math.round(newShade1[0] * 255),
    g: Math.round(newShade1[1] * 255),
    b: Math.round(newShade1[2] * 255),
  }

  let complementaryShade2 = {
    r: Math.round(newShade2[0] * 255),
    g: Math.round(newShade2[1] * 255),
    b: Math.round(newShade2[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2);
  return shades;
}

function triadicPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      newR1 = (180 + 45) + hsl[0],
      newR2 = (180 - 45) + hsl[0],
      newShade1 = hsl2rgb(newR1, hsl[1], hsl[2]),
      newShade2 = hsl2rgb(newR2, hsl[1], hsl[2]);

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade1 = {
    r: Math.round(newShade1[0] * 255),
    g: Math.round(newShade1[1] * 255),
    b: Math.round(newShade1[2] * 255),
  }

  let complementaryShade2 = {
    r: Math.round(newShade2[0] * 255),
    g: Math.round(newShade2[1] * 255),
    b: Math.round(newShade2[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2);
  return shades;
}

function analagousPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      newR1 = 30 + hsl[0],
      newR2 = hsl[0] - 30,
      newShade1 = hsl2rgb(newR1, hsl[1], hsl[2]),
      newShade2 = hsl2rgb(newR2, hsl[1], hsl[2]);

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade1 = {
    r: Math.round(newShade1[0] * 255),
    g: Math.round(newShade1[1] * 255),
    b: Math.round(newShade1[2] * 255),
  }

  let complementaryShade2 = {
    r: Math.round(newShade2[0] * 255),
    g: Math.round(newShade2[1] * 255),
    b: Math.round(newShade2[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2);
  return shades;
}

function tetradicPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      newR1 = 90 + hsl[0],
      newR2 = 180 + hsl[0],
      newR3 = 270 + hsl[0],
      newShade1 = hsl2rgb(newR1, hsl[1], hsl[2]),
      newShade2 = hsl2rgb(newR2, hsl[1], hsl[2]),
      newShade3 = hsl2rgb(newR3, hsl[1], hsl[2]);

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade1 = {
    r: Math.round(newShade1[0] * 255),
    g: Math.round(newShade1[1] * 255),
    b: Math.round(newShade1[2] * 255),
  }

  let complementaryShade2 = {
    r: Math.round(newShade2[0] * 255),
    g: Math.round(newShade2[1] * 255),
    b: Math.round(newShade2[2] * 255),
  }

  let complementaryShade3 = {
    r: Math.round(newShade3[0] * 255),
    g: Math.round(newShade3[1] * 255),
    b: Math.round(newShade3[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2, complementaryShade3);
  return shades;
}

function randomPalette(r, g, b) {
  let shades = [],
      hsl = rgb2hsl(r, g, b),
      kind = getRndInteger(1,8);
      // kind = 1

  //complementary
  if ( kind === 1 ) {
    var newR1 = getRndInteger(0,30) + hsl[0],
        newR2 = getRndInteger(170,190) + hsl[0],
        newR3 = getRndInteger(160,180) + hsl[0],
        newR4 = getRndInteger(180,200) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 50) * .01,
        newSat2 = getRndInteger(hsl[1] * 100 - 30, 50) * .01,
        newSat3 = getRndInteger(hsl[1] * 100 - 30, 10) * .01,
        newSat4 = getRndInteger(hsl[1] * 100 - 30, 5) * .01,
        newLight1 = getRndInteger(hsl[2] * 100 + 10,90) * .01,
        newLight2 = getRndInteger(hsl[2] * 100,70) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,30) * .01,
        newLight4 = getRndInteger(hsl[2] * 100,10) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  //analagous
  } else if ( kind === 2 ) {
    var newR1 = getRndInteger(0,20) + hsl[0],
        newR2 = getRndInteger(0,30) + hsl[0],
        newR3 = getRndInteger(0,-15) + hsl[0],
        newR4 = getRndInteger(0,-35) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 70) * .01,
        newSat2 = getRndInteger(hsl[1] * 100, 50) * .01,
        newSat3 = getRndInteger(hsl[1] * 100,20) * .01,
        newSat4 = getRndInteger(hsl[1] * 100, 10) * .01,
        newLight1 = getRndInteger(hsl[2] * 100 ,90) * .01,
        newLight2 = getRndInteger(hsl[2] * 100 ,60) * .01,
        newLight3 = getRndInteger(hsl[2] * 100 ,50) * .01,
        newLight4 = getRndInteger(hsl[2] * 100 ,30) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  //triadic
  } else if ( kind === 3 ) {
    var newR1 = getRndInteger(10,20) + hsl[0],
        newR2 = getRndInteger(20,45) + hsl[0],
        newR3 = getRndInteger(170,190) + hsl[0],
        newR4 = getRndInteger(180,200) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 70) * .01,
        newSat2 = getRndInteger(hsl[1] * 100, 50) * .01,
        newSat3 = getRndInteger(hsl[1] * 100, 20) * .01,
        newSat4 = getRndInteger(hsl[1] * 100,10) * .01,
        newLight1 = getRndInteger(hsl[2] * 100,90) * .01,
        newLight2 = getRndInteger(hsl[2] * 100,70) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,30) * .01,
        newLight4 = getRndInteger(hsl[2] * 100,10) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  } else if ( kind === 4 ) {
    //accent
    var newR1 = getRndInteger(10,40) + hsl[0],
        newR2 = getRndInteger(50,90) + hsl[0],
        newR3 = getRndInteger(70,100) + hsl[0],
        newR4 = getRndInteger(70,110) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 40)  *.01,
        newSat2 = getRndInteger(hsl[1] * 100, 30) * .01,
        newSat3 = getRndInteger(hsl[1] * 100, 20) * .01,
        newSat4 = getRndInteger(hsl[1] * 100,10) * .01,
        newLight1 = getRndInteger(hsl[2] * 100,70) * .01,
        newLight2 = getRndInteger(hsl[2] * 100,50) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,30) * .01,
        newLight4 = getRndInteger(hsl[2] * 100,10) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  } else if ( kind === 5 ) {
    //accent 90degrees negative
    var newR1 = getRndInteger(0,30) + hsl[0],
        newR2 = getRndInteger(-80,-100) + hsl[0],
        newR3 = getRndInteger(-90,-120) + hsl[0],
        newR4 = getRndInteger(-100,-120) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 80) * .01,
        newSat2 = getRndInteger(hsl[1] * 100, 60) * .01,
        newSat3 = getRndInteger(hsl[1] * 100, 40) * .01,
        newSat4 = getRndInteger(hsl[1] * 100,30) * .01,
        newLight1 = getRndInteger(hsl[2] * 100,90) * .01,
        newLight2 = getRndInteger(hsl[2] * 100,80) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,50) * .01,
        newLight4 = getRndInteger(hsl[2] * 100,10) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  } else if ( kind === 6 ) {
    //accent 90degrees positive
    var newR1 = getRndInteger(0,30) + hsl[0],
        newR2 = getRndInteger(80,100) + hsl[0],
        newR3 = getRndInteger(90,120) + hsl[0],
        newR4 = getRndInteger(100,120) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 80) * .01,
        newSat2 = getRndInteger(hsl[1] * 100, 60) * .01,
        newSat3 = getRndInteger(hsl[1] * 100, 40) * .01,
        newSat4 = getRndInteger(hsl[1] * 100,30) * .01,
        newLight1 = getRndInteger(hsl[2] * 100,90) * .01,
        newLight2 = getRndInteger(hsl[2] * 100,50) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,30) * .01,
        newLight4 = getRndInteger(hsl[2] * 100,10) * .01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  } else if ( kind === 7 ) {
    //accent 260ish
    var newR1 = getRndInteger(0,10) + hsl[0],
        newR2 = getRndInteger(240,250) + hsl[0],
        newR3 = getRndInteger(240,250) + hsl[0],
        newR4 = getRndInteger(230,260) + hsl[0],
        newSat1 = getRndInteger(hsl[1] * 100, 90) * .01,
        newSat2 = getRndInteger(hsl[1] * 100, 90) * .01,
        newSat3 = getRndInteger(hsl[1] * 100, 60) * .01,
        newSat4 = getRndInteger(hsl[1] * 100,10) * .01,
        newLight1 = getRndInteger(hsl[2] * 100 + 10,90) *.01,
        newLight2 = getRndInteger(hsl[2] * 100 + 10,90) * .01,
        newLight3 = getRndInteger(hsl[2] * 100,70) * .01,
        newLight4 = getRndInteger(hsl[2] * 100 - 10,10)  *.01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  }

  let currentShade = {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }

  let complementaryShade1 = {
    r: Math.round(newShade1[0] * 255),
    g: Math.round(newShade1[1] * 255),
    b: Math.round(newShade1[2] * 255),
  }

  let complementaryShade2 = {
    r: Math.round(newShade2[0] * 255),
    g: Math.round(newShade2[1] * 255),
    b: Math.round(newShade2[2] * 255),
  }

  let complementaryShade3 = {
    r: Math.round(newShade3[0] * 255),
    g: Math.round(newShade3[1] * 255),
    b: Math.round(newShade3[2] * 255),
  }

  let complementaryShade4 = {
    r: Math.round(newShade4[0] * 255),
    g: Math.round(newShade4[1] * 255),
    b: Math.round(newShade4[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2, complementaryShade3,complementaryShade4);
  return shades;
}




//UI functionality
figma.ui.onmessage = msg => {

  //showa message on init
  if (msg.type === 'hello') {
    figma.notify("🦄 Select an element containing a solid fill or background then click on 'Update' 💫")
  }
  //refresh the data to update the color palettes
  if (msg.type === 'update-color') {
    let defaultColor = {r: 0.7, g: 0.7, b: 0.7};

    interface colorData {
      color: string,
      r: number,
      g: number,
      b: number,
      steps: number
    }

    if (figma.currentPage.selection.length) {
      // console.log(msg);

      for (const node of figma.currentPage.selection) {
        //first check for a solid fill/bg then store the data
        let checkFills = {};
        if (node['fills']!== undefined) {
          node['fills'].forEach(x => {
            if ( x['type'] === 'SOLID') {
              checkFills = {type: 'FILL', color: x['color']}
            }
          });
        } else if (node['backgrounds'] !== undefined) {
          node['backgrounds'].forEach(x => {
            if ( x['type'] === 'SOLID') {
              checkFills = {type: 'BACKGROUND', color: x['color']}
            }
          });
        }

        //checkin it twice
        if (checkFills['type'] === 'FILL') {
          var color = checkFills['color'],
          colorData = {
            color: color,
            r:color['r'],
            g:color['g'],
            b:color['b'],
            steps: msg.customSteps
          }
        } else if (checkFills['type'] === 'BACKGROUND') {
          var color = checkFills['color'];
          colorData = {
            color: color,
            r:color['r'],
            g:color['g'],
            b:color['b'],
            steps: msg.customSteps
          }
        // set a default value
        } else {
          colorData = {
            color: `${defaultColor.r}, ${defaultColor.g}, ${defaultColor.b}`,
            r:defaultColor.r,
            g:defaultColor.g,
            b:defaultColor.b,
            steps: 8
          }
          figma.notify('❌ This plugin only works with elements containing solid fills/backgrounds. ❌')
        }
      }
    } else {
      colorData = {
        color: `${msg.prevR}, ${msg.prevG}, ${msg.prevB}`,
        r:msg.prevR,
        g:msg.prevG,
        b:msg.prevB,
        steps: msg.customSteps
      }
      // figma.notify('❌ No valid fill or background was found. Default color applied ❌')

    }
    // console.log(  blendPalette(msg.prevR,msg.prevG,msg.prevB,colorData.r, colorData.g, colorData.b, colorData.steps) )
  let colorObject = {
    palettes: {
      blend: blendPalette(msg.prevR,msg.prevG,msg.prevB,colorData.r, colorData.g, colorData.b, colorData.steps),
      random: randomPalette(colorData.r, colorData.g, colorData.b),
      tints: tintsNshades(colorData.r, colorData.g, colorData.b, colorData.steps),
      shades: tintsNshades(colorData.r, colorData.g, colorData.b, -colorData.steps),
      saturated: tones(colorData.r, colorData.g, colorData.b, colorData.steps),
      desaturated: tones(colorData.r, colorData.g, colorData.b, -colorData.steps),
      complementary: complementaryPalette(colorData.r, colorData.g, colorData.b),
      splitComplementary: splitComplementaryPalette(colorData.r, colorData.g, colorData.b),
      triadic: triadicPalette(colorData.r, colorData.g, colorData.b),
      analagous: analagousPalette(colorData.r, colorData.g, colorData.b),
      tetradic: tetradicPalette(colorData.r, colorData.g, colorData.b)
    },
    rgb: {
      r: colorData.r,
      g: colorData.g,
      b: colorData.b,
    },
    prevRgb: {
      r: msg.prevR,
      g: msg.prevG,
      b: msg.prevB,
    },
    prevSteps: msg.prevSteps
  }
  //limit the steps to under 30
  if (colorData.steps > 30) {
    figma.notify('❌Please keep steps under 30 ❌')
  } else {
    figma.ui.postMessage(colorObject);
  }
}

//change a selection's fill if a swatch is clicked
if (msg.type === 'change-color') {

  for (const node of figma.currentPage.selection) {

     //like before, we first check for a solid fill/bg then store it in an object
     let checkFills = {};

     if (node['fills']!== undefined) {
       node['fills'].forEach(function(x,index) {
         if ( x['type'] === 'SOLID') {
           checkFills = {type: 'FILL', color: x['color'], index: index}
         }
       });
     } else if (node['backgrounds'] !== undefined) {
       node['backgrounds'].forEach(function(x,index) {
         if ( x['type'] === 'SOLID') {
           checkFills = {type: 'BACKGROUND', color: x['color'], index: index}
         }
       });
     }

    //go round again and do the conditional
    if (checkFills['type']==='FILL' && "fills" in node) {
      let i = checkFills['index'],
          fills = clone(node.fills);
          fills[i].color.r = parseInt(msg.r) / 255;
          fills[i].color.g = parseInt(msg.g) / 255;
          fills[i].color.b = parseInt(msg.b) / 255;
      node.fills = fills;
    } else if (checkFills['type']==='BACKGROUND' && "backgrounds" in node){
      let i = checkFills['index'],
        fills = clone(node.backgrounds);
        fills[i].color.r = parseInt(msg.r) / 255;
        fills[i].color.g = parseInt(msg.g) / 255;
        fills[i].color.b = parseInt(msg.b) / 255;
      node.backgrounds = fills;
    } else {
      figma.notify('❌Make sure the element contains a solid fill or background before applying a swatch ❌');
    }
  }
}

//add a palette to the viewport on demand
if (msg.type === 'add-palette') {

  let swatches = [],
      viewport = figma.viewport.center,
      x = viewport.x,
      y = viewport.y,
      node =  figma.currentPage;

  msg.swatches.forEach(function(color, index) {
    let r = color[0] / 255,
        g = color[1] / 255,
        b = color[2] / 255,

        swatch = figma.createRectangle();
        swatch.fills = [{ type: 'SOLID', color: {r: r, g: g, b: b} }];
        swatch.x = (x - msg.swatches.length * 100/2) + (100 * index);
        swatch.y = y;
        swatches.push(swatch);
  });

  // let group = figma.group(swatches, node);

  // node.appendChild(swatches);
  // node.children[0].x = x;
  // node.children[0].y = y;
  figma.currentPage.selection = swatches;
  // figma.viewport.scrollAndZoomIntoView(swatches);
  }
}
