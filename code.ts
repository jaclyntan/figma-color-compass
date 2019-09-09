
figma.showUI(__html__);


function tintsNshades(r,g,b,steps) {
  var i = 0,
      shades = [];

  const diffR = (100 / steps) * .01,
        diffG = (100 / steps) * .01,
        diffB = (100 / steps) * .01;

  if ( steps < 0 ) {
    for (i = 0; i > steps; i--) {
      const newR = Math.ceil(r * (i * diffR)),
            newG = Math.ceil(g * (i * diffG)),
            newB = Math.ceil(b * (i * diffB));
      shades.push(newR + ',' + newG + ',' + newB);
    }
  } else {
    for (i = 0; i < steps; i++) {
      const newR = Math.ceil(r + ((i *diffR) * (255 - r))),
            newG = Math.ceil(g + ((i *diffG) * (255 - g))),
            newB = Math.ceil(b + ((i *diffB) * (255 - b)));

      console.log(g);
      shades.push(newR + ',' + newG + ',' + newB);
    }
  }

  return shades;
}


figma.ui.onmessage = msg => {
  if (msg.type === 'current-color') {
    for (const node of figma.currentPage.selection) {
      const color = node['fills'][0]['color'],
            r = Math.ceil(255 * color['r']),
            g = Math.ceil(255 * color['g']),
            b = Math.ceil(255 * color['b']);

      var colorObject = {
        shades: {
          tints: tintsNshades(r,g,b,5),
          shades: tintsNshades(r,g,b,-5),
        },
        rgb: {
          r: Math.ceil(255 * color['r']),
          g: Math.ceil(255 * color['g']),
          b: Math.ceil(255 * color['b']),
        }
      }
      figma.ui.postMessage(colorObject);
    }
  }

};
