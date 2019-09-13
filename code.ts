
figma.showUI(__html__, {
  width: 280,
  height: 390
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
      var shade = {
        r: Math.ceil(newShade[0] * 255),
        g: Math.ceil(newShade[1] * 255),
        b: Math.ceil(newShade[2] * 255)
      }
      shades.push(shade);
    }
  } else {
    //tints
    for (i = 0; i < steps; i++) {
      let diff = ((1 - hsl[2]) / steps) * i,
          newLightness = hsl[2] + diff,
          newShade = hsl2rgb(hsl[0], hsl[1],newLightness);
      var shade = {
        r: Math.ceil(newShade[0] * 255),
        g: Math.ceil(newShade[1] * 255),
        b: Math.ceil(newShade[2] * 255)
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
      var shade = {
        r: Math.ceil(newShade[0] * 255),
        g: Math.ceil(newShade[1] * 255),
        b: Math.ceil(newShade[2] * 255)
      }
      shades.push(shade);
    }
  } else {
    //saturate
    for (i = 0; i < steps; i++) {
      let diff = ((1 - hsl[1]) / steps) * i,
          newSat = hsl[1] + diff,
          newShade = hsl2rgb(hsl[0], newSat,hsl[2]);
      var shade = {
        r: Math.ceil(newShade[0] * 255),
        g: Math.ceil(newShade[1] * 255),
        b: Math.ceil(newShade[2] * 255)
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

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade = {
    r: Math.ceil(newShade[0] * 255),
    g: Math.ceil(newShade[1] * 255),
    b: Math.ceil(newShade[2] * 255),
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

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade1 = {
    r: Math.ceil(newShade1[0] * 255),
    g: Math.ceil(newShade1[1] * 255),
    b: Math.ceil(newShade1[2] * 255),
  }

  var complementaryShade2 = {
    r: Math.ceil(newShade2[0] * 255),
    g: Math.ceil(newShade2[1] * 255),
    b: Math.ceil(newShade2[2] * 255),
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

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade1 = {
    r: Math.ceil(newShade1[0] * 255),
    g: Math.ceil(newShade1[1] * 255),
    b: Math.ceil(newShade1[2] * 255),
  }

  var complementaryShade2 = {
    r: Math.ceil(newShade2[0] * 255),
    g: Math.ceil(newShade2[1] * 255),
    b: Math.ceil(newShade2[2] * 255),
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

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade1 = {
    r: Math.ceil(newShade1[0] * 255),
    g: Math.ceil(newShade1[1] * 255),
    b: Math.ceil(newShade1[2] * 255),
  }

  var complementaryShade2 = {
    r: Math.ceil(newShade2[0] * 255),
    g: Math.ceil(newShade2[1] * 255),
    b: Math.ceil(newShade2[2] * 255),
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

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade1 = {
    r: Math.ceil(newShade1[0] * 255),
    g: Math.ceil(newShade1[1] * 255),
    b: Math.ceil(newShade1[2] * 255),
  }

  var complementaryShade2 = {
    r: Math.ceil(newShade2[0] * 255),
    g: Math.ceil(newShade2[1] * 255),
    b: Math.ceil(newShade2[2] * 255),
  }

  var complementaryShade3 = {
    r: Math.ceil(newShade3[0] * 255),
    g: Math.ceil(newShade3[1] * 255),
    b: Math.ceil(newShade3[2] * 255),
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
        newSat1 = getRndInteger(hsl[1]* 100, 50)*.01,
        newSat2 = getRndInteger(hsl[1]* 100 - 30, 50)*.01,
        newSat3 = getRndInteger(hsl[1]* 100 - 30, 10)*.01,
        newSat4 = getRndInteger(hsl[1]* 100 - 30, 5)*.01,
        newLight1 = getRndInteger(hsl[2]* 100 + 10,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100,70)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,30)*.01,
        newLight4 = getRndInteger(hsl[2]* 100,10)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 70)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 50)*.01,
        newSat3 = getRndInteger(hsl[1]* 100,20)*.01,
        newSat4 = getRndInteger(hsl[1]* 100, 10)*.01,
        newLight1 = getRndInteger(hsl[2]* 100 ,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100 ,60)*.01,
        newLight3 = getRndInteger(hsl[2]* 100 ,50)*.01,
        newLight4 = getRndInteger(hsl[2]* 100 ,30)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 70)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 50)*.01,
        newSat3 = getRndInteger(hsl[1]* 100, 20)*.01,
        newSat4 = getRndInteger(hsl[1]* 100,10)*.01,
        newLight1 = getRndInteger(hsl[2]* 100,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100,70)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,30)*.01,
        newLight4 = getRndInteger(hsl[2]* 100,10)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 40)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 30)*.01,
        newSat3 = getRndInteger(hsl[1]* 100, 20)*.01,
        newSat4 = getRndInteger(hsl[1]* 100,10)*.01,
        newLight1 = getRndInteger(hsl[2]* 100,70)*.01,
        newLight2 = getRndInteger(hsl[2]* 100,50)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,30)*.01,
        newLight4 = getRndInteger(hsl[2]* 100,10)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 80)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 60)*.01,
        newSat3 = getRndInteger(hsl[1]* 100, 40)*.01,
        newSat4 = getRndInteger(hsl[1]* 100,30)*.01,
        newLight1 = getRndInteger(hsl[2]* 100,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100,80)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,50)*.01,
        newLight4 = getRndInteger(hsl[2]* 100,10)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 80)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 60)*.01,
        newSat3 = getRndInteger(hsl[1]* 100, 40)*.01,
        newSat4 = getRndInteger(hsl[1]* 100,30)*.01,
        newLight1 = getRndInteger(hsl[2]* 100,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100,50)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,30)*.01,
        newLight4 = getRndInteger(hsl[2]* 100,10)*.01,
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
        newSat1 = getRndInteger(hsl[1]* 100, 90)*.01,
        newSat2 = getRndInteger(hsl[1]* 100, 90)*.01,
        newSat3 = getRndInteger(hsl[1]* 100, 60)*.01,
        newSat4 = getRndInteger(hsl[1]* 100,10)*.01,
        newLight1 = getRndInteger(hsl[2] * 100+10,90)*.01,
        newLight2 = getRndInteger(hsl[2]* 100 + 10,90)*.01,
        newLight3 = getRndInteger(hsl[2]* 100,70)*.01,
        newLight4 = getRndInteger(hsl[2] * 100 - 10,10)*.01,
        newShade1 = hsl2rgb(newR1, newSat1, newLight1),
        newShade2 = hsl2rgb(newR2, newSat2, newLight2),
        newShade3 = hsl2rgb(newR3, newSat3, newLight3),
        newShade4 = hsl2rgb(newR4, newSat4, newLight4);
  }

  var currentShade = {
    r: Math.ceil(r * 255),
    g: Math.ceil(g * 255),
    b: Math.ceil(b * 255)
  }

  var complementaryShade1 = {
    r: Math.ceil(newShade1[0] * 255),
    g: Math.ceil(newShade1[1] * 255),
    b: Math.ceil(newShade1[2] * 255),
  }

  var complementaryShade2 = {
    r: Math.ceil(newShade2[0] * 255),
    g: Math.ceil(newShade2[1] * 255),
    b: Math.ceil(newShade2[2] * 255),
  }

  var complementaryShade3 = {
    r: Math.ceil(newShade3[0] * 255),
    g: Math.ceil(newShade3[1] * 255),
    b: Math.ceil(newShade3[2] * 255),
  }

  var complementaryShade4 = {
    r: Math.ceil(newShade4[0] * 255),
    g: Math.ceil(newShade4[1] * 255),
    b: Math.ceil(newShade4[2] * 255),
  }

  shades.push(currentShade, complementaryShade1, complementaryShade2, complementaryShade3,complementaryShade4);
  return shades;
}

//UI functionality
figma.ui.onmessage = msg => {
  //showa message on init
  if (msg.type === 'hello') {
    figma.notify("🦄 Select an element with a fill or background then click on 'Update' 💫")
  }

  //refresh the data to update the color palettes
  if (msg.type === 'update-color') {
    if (figma.currentPage.selection.length) {
      for (const node of figma.currentPage.selection) {
        //check for a fill
        if (node['fills']!== undefined && node['fills'].length !== 0 ) {
          var color = node['fills'][0]['color'],
              r = color['r'],
              g = color['g'],
              b = color['b'],
              steps = msg.customSteps;
        //check for a bacgkground fill
        } else if (node['backgrounds'] !== undefined && node['backgrounds'].length !== 0 && node['fills'] === undefined) {
          var color = node['backgrounds'][0]['color'],
              r = color['r'],
              g = color['g'],
              b = color['b'],
              steps = msg.customSteps;
        // set a default value
        } else {
          var color = {r: 0.7, g: 0.7, b: 0.7},
          r = 0.8,
          g = 0.8,
          b = 0.8,
          steps = msg.customSteps;
        }
      }
    } else {
      var color = {r: 0.7, g: 0.7, b: 0.7},
          r = 0.8,
          g = 0.8,
          b = 0.8,
          steps = msg.customSteps;
    }
      var colorObject = {
        palettes: {
          random: randomPalette(r, g, b),
          tints: tintsNshades(r, g, b, steps),
          shades: tintsNshades(r, g, b, -steps),
          saturated: tones(r, g, b, steps),
          desaturated: tones(r, g, b, -steps),
          complementary: complementaryPalette(r, g, b),
          splitComplementary: splitComplementaryPalette(r, g, b),
          triadic: triadicPalette(r, g, b),
          analagous: analagousPalette(r, g, b),
          tetradic: tetradicPalette(r, g, b)
        },
        rgb: {
          r: r,
          g: g,
          b: b,
        }
      }
      //limit the steps to under 30
      if (steps > 30) {
        figma.notify('❌Please keep steps under 30 ❌')
      } else {
        figma.ui.postMessage(colorObject);
      }
}

//change a selection's fill if a swatch is clicked
if (msg.type === 'change-color') {
  for (const node of figma.currentPage.selection) {
    //if selection has a fill
    if (node['fills']!== undefined && node['fills'].length !== 0 && "fills" in node) {
      const fills = clone(node.fills);
            fills[0].color.r = parseInt(msg.r) / 255;
            fills[0].color.g = parseInt(msg.g) / 255;
            fills[0].color.b = parseInt(msg.b) / 255;
      if ( fills[0].color.r > 0 && fills[0].color.g > 0 && fills[0].color.b > 0 &&
        fills[0].color.r < 1 && fills[0].color.g < 1 && fills[0].color.b < 1) {
        node.fills = fills;
      } else {
        fills[0].color.r = 0;
        fills[0].color.g = 0;
        fills[0].color.b = 0;
      }
    //if selection has a fill or background
    } else if (node['backgrounds'] !== undefined && node['fills'] === undefined && "backgrounds" in node){
      const fills = clone(node.backgrounds);
            fills[0].color.r = parseInt(msg.r) / 255;
            fills[0].color.g = parseInt(msg.g) / 255;
            fills[0].color.b = parseInt(msg.b) / 255;

      if ( fills[0].color.r > 0 && fills[0].color.g > 0 && fills[0].color.b > 0 &&
        fills[0].color.r < 1 && fills[0].color.g < 1 && fills[0].color.b < 1) {
        node.backgrounds = fills;
      } else {
        fills[0].color.r = 0;
        fills[0].color.g = 0;
        fills[0].color.b = 0;
      }
    } else  {
      figma.notify('❌ Make sure your element has a fill or background first before applying a swatch. ❌');
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
    var r = color[0] / 255,
        g = color[1] / 255,
        b = color[2] / 255,
        swatch = figma.createRectangle();

        swatch.fills = [{ type: 'SOLID', color: {r: r, g: g, b: b} }];
        swatch.x = swatch.width * index;
        swatch.y = y;
        swatches.push(swatch);
  });

  // let group = figma.group(swatches, node);

  // node.appendChild(swatches);
  // node.children[0].x = x;
  // node.children[0].y = y;
  figma.currentPage.selection = swatches;
  figma.viewport.scrollAndZoomIntoView(swatches);
  }
}
