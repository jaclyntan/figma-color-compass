
figma.showUI(__html__, { width: 300, height: 400 });

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


//palette functions
function tintsNshades(r, g, b, steps) {
  let i = 0,
      shades = [],
      hsl = rgb2hsl(r, g, b);

  //tints
  if (steps < 0) {
    //shades
    for (i = 0; i > steps; i--) {
      let diff = ((1 - hsl[2]) / steps) * i,
          newLightness = Math.abs(hsl[2] - diff),
          newShade = hsl2rgb(hsl[0], hsl[1],newLightness);
          console.log(newLightness);
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
          newLightness = hsl[2]  + diff,
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

//UI function
// if (figma.currentPage.selection.length === 1) {
  figma.ui.onmessage = msg => {
    if (msg.type === 'hello') {
      figma.notify("Select an element with a fill then click on 'Update Color'.")
    }

    if (msg.type === 'update-color') {

      for (const node of figma.currentPage.selection) {
        const color = node['fills'][0]['color'],
              r = color['r'],
              g = color['g'],
              b = color['b'],
              steps = msg.customSteps;
        var colorObject = {
          shades: {
            tints: tintsNshades(r, g, b, steps),
            shades: tintsNshades(r, g, b, -steps),
          },
          rgb: {
            r: r,
            g: g,
            b: b,
          },
          complementary: complementaryPalette(r, g, b),
          splitComplementary: splitComplementaryPalette(r, g, b),
          triadic: triadicPalette(r, g, b),
          analagous: analagousPalette(r, g, b),
          tetradic: tetradicPalette(r, g, b)
        }

        if (steps > 20) {
          figma.notify('Please keep steps under 20.')
        } else {
          figma.ui.postMessage(colorObject);
        }

      }
    }

    if (msg.type === 'change-color') {
      for (const node of figma.currentPage.selection) {
        if ("fills" in node) {
          const fills = clone(node.fills);
          fills[0].color.r = parseInt(msg.r) / 255;
          fills[0].color.g = parseInt(msg.g) / 255;
          fills[0].color.b = parseInt(msg.b) / 255;
          node.fills = fills;
        }
      }
    }
  }
// } else {
//   figma.notify('Please select an element and restart the plugin.')
// }
