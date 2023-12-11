//this is a temp file for the workspace of the color to shadow function

//function will take in a take in a hex value and darken it by a given amount (if no amount is specified it wwill default darken by 25%)

// function darkenColor(hex){
//     console.log("here");
//     darkenColor(hex, -25);
// }


//This fucntion is useful for dispalying shades of a color BUT DOES NOT ACURATLY DISPLAY THE SHADOW VERSION
//hex is the hex code of the orignal color, amount  is the percent the color will be darkened by (example 25 will darken by 25% --- 0.25 will darken by 0.25%)
// it doesnt m,atter if the hex value has a # in the front
//(if no amount is specified it w ill default darken by 25%)
function darkenColor(hex, amount){
    if(typeof amount === 'undefined'){
        amount = -25;
    }
    rgb = hexToRgb(hex);
if (amount<0){
    rgb.r = rgb.r + (amount*((rgb.r)/100));
    rgb.g = rgb.g + (amount*((rgb.g)/100));
    rgb.b = rgb.b + (amount*((rgb.b)/100));
}else{
    rgb.r = rgb.r + (amount*((255-rgb.r)/100));
    rgb.g = rgb.g + (amount*((255-rgb.g)/100));
    rgb.b = rgb.b + (amount*((255-rgb.b)/100));
}
    rgb.r > 255 && (rgb.r = 255);
    rgb.r < 0 && (rgb.r = 0);
    rgb.g > 255 && (rgb.g = 255);
    rgb.g < 0 && (rgb.g = 0);
    rgb.b > 255 && (rgb.b = 255);
    rgb.b < 0 && (rgb.b = 0);
    return rgbToHex(rgb.r, rgb.g, rgb.b)
    
}

// console.log(darkenColor("000000", 100));//black to white
// console.log(darkenColor("FFfFfF", -100));//white to black
// testHex = "01FF88"
// console.log(darkenColor(testHex, -100));
// console.log(darkenColor(testHex, -75));
// console.log(darkenColor(testHex, -50));
// console.log(darkenColor(testHex, -25));
// console.log(darkenColor(testHex, 25));
// console.log(darkenColor(testHex, 50));
// console.log(darkenColor(testHex, 75));
// console.log(darkenColor(testHex, 100));
//resuting pallette https://coolors.co/ffffff-bfffe1-80ffc3-40ffa5-01ff88-00bf66-007f44-003f21-000000 




//creating shadow colors taking in a hex and amount to darken by(default is XX), using HSB and scaling the B
function shadowColor(hex, amount){
    if(typeof amount === 'undefined'){
        amount = 15;
    }
    hsb = hexToHsb(hex);
    hsb.b-=amount;
    return hsbToHex(hsb);
}

//console.log(shadowColor("ad8380"));
//expected output: enter ad8380  return #94706d



// these are just routine conversions between Hex, RGB, and HSB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(rgb) {
    return (1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1);
  }

function hexToHsb(hex){
    return rgbToHsb(hexToRgb(hex));
}

function rgbToHsb(rgb)  {
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;
    const v = Math.max(rgb.r, rgb.g, rgb.b),
    n = v - Math.min(rgb.r, rgb.g, rgb.b);
    const h =
    n === 0 ? 0 : n && v === rgb.r ? (rgb.g - rgb.b) / n : v === rgb.g ? 2 + (rgb.b - rgb.r) / n : 4 + (rgb.r - rgb.g) / n;
    return {h: Math.round(60 * (h < 0 ? h + 6 : h)),s: Math.round(v && (n / v) * 100),b: Math.round(v * 100)};
}

function hsbToRgb(hsb){
    hsb.s /= 100;
    hsb.b /= 100;
    const k = (n) => (n + hsb.h / 60) % 6;
    const f = (n) => hsb.b * (1 - hsb.s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return {r: Math.round(255 * f(5)),g: Math.round(255 * f(3)),b: Math.round(255 * f(1))};
}
  
function hsbToHex(hsb){
    return rgbToHex(hsbToRgb(hsb));
}

//from hexToCmyk

