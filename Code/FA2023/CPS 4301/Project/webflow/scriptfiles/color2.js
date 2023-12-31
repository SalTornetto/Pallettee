generateColorPalette = () => {
    const input = document.getElementById('imageInput');
    const colorPalette = document.getElementById('colorPalette');
    const uploadedImage = document.getElementById('uploadedImage');
    colorPalette.innerHTML = ''; // Clear previous colors
  
    if (input.files && input.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
  
            const img = new Image();
            img.src = e.target.result;
  
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
  
                const imageData = context.getImageData(0, 0, img.width, img.height).data;        


                const colorCount = 5; // Number of colors to extract
  
              
                const colorMap = groupRgba(imageData);
  
                let result = kmeans(colorMap, colorCount);
   
                const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
  

                for (let i = 0; i < colorCount; i++) {
                    const hexColor = numbersToHex(result.centroids[i]);
                    const colorBox = document.createElement('div');
                    colorBox.className = 'colorBox';
                    colorBox.style.backgroundColor = "#"+hexColor;
                    colorBox.style.width = Math.round(100/colorCount)+"%";
                    colorBox.innerText = hexColor;
                    rgb = hexToRgb("#"+hexColor);
                    rgbColor = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`;
                    cmykColor = rgbToCmyk(rgbColor);
                    colorBox.addEventListener('click', function () {
                      setColorSquare('#'+hexColor);
                      setCardColorHex('#'+hexColor);
                    });
                    //console.log(colorBox.style.backgroundColor);
                    //colorBox.onclick.apply(setCardColorHex('#'+hexColor, rgbColor, cmykColor));
                    //console.log(hexToRgb(hexColor));
                    colorPalette.appendChild(colorBox); 
                }
                
                
            };
        };
  
        reader.readAsDataURL(input.files[0]);
    }

  };
  
  
  function rgbToHexSAL(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
  
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
  }
  
//   function hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//       r: parseInt(result[1], 16),
//       g: parseInt(result[2], 16),
//       b: parseInt(result[3], 16)
//     } : null;
//   }

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function rgbToHexSAL(rgb) {
    return (1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1);
  }
  
  function integerToHex(number) {
    return (number < 16 ? '0' : '') + number.toString(16).toUpperCase();
  }
  
  function numbersToHex(arr) {
    return arr.map(num => Math.round(num).toString(16).padStart(2, '0')).join('');
  }
  
  function groupRgba(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 4) {
      result.push(rgbaToHex(arr[i], arr[i+1], arr[i+2], arr[i+3]));
    }
    return result;
  }
  
  
  // this fucntion assumes a white background of #FFFFFF
  function rgbaToHex(r, g, b, a){
    a = Math.round(a/255);
    //Color = Color * alpha + Background * (1 - alpha);
    r = r * a + 255 * (1-a);
    g = g * a + 255 * (1-a);
    b = b * a + 255 * (1-a);
    return [r, g, b];
  }
  
  
  
  
  clearContent = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = "";
    }
  };
  
  //temperarily comented out thius code to reduce lag
  // const hasSupport = () => ('EyeDropper' in window);
  
  // const imageElement = document.getElementById("uploadedImage");
  
  // imageElement.addEventListener("mouseover", () => {
  //   if (hasSupport) {
  //     const eyeDropper = new window.EyeDropper();
  
  //     eyeDropper
  //       .open()
  //       .then((result) => {
  //         const color = result.sRGBHex;
  //         // Do something with the color
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //   } else {
  //     console.warn("No Support: This browser does not support the EyeDropper API yet!");
  //   }
  // });
  
  pickColorFromImage = () => {
    const uploadedImage = document.getElementById("uploadedImage");
    // const hexval = document.getElementById("hex-code");
    // const rgbval = document.getElementById("rgb-code");
    // const cmykval = document.getElementById("cmyk-code");
  
    uploadedImage.addEventListener("click", function (event) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
      context.drawImage(
        uploadedImage,
        0,
        0,
        uploadedImage.width,
        uploadedImage.height
      );
  
      const x = event.offsetX;
      const y = event.offsetY;
      const pixelData = context.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixelData);
      const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      const cmykColor = rgbToCmyk(pixelData);

      setColorSquare(hexColor);
      setCardColor(hexColor, rgbColor, cmykColor);
      
    });
  };


// function setCardColor(hexColor, rgbColor, cmykColor,pantoneColor){
function setCardColor(hexColor, rgbColor, cmykColor){
  const hexval = document.getElementById("hex-code");
  const rgbval = document.getElementById("rgb-code");
  const cmykval = document.getElementById("cmyk-code");
  const pantoneval = document.getElementById("pantone-code");
  const pantonenam = document.getElementById("pantone-name");

  clearContent("hex-code");
  clearContent("rgb-code");
  clearContent("cmyk-code");
  clearContent("pantone-code");
  clearContent("pantone-name");

  // Display the new hex code with a class for styling
  const hexCode = document.createElement("span");
  hexCode.innerText = hexColor;
  hexval.appendChild(hexCode);

  // Display the new rgb code
  const rgbCode = document.createElement("span");
  rgbCode.innerText = rgbColor;
  rgbval.appendChild(rgbCode);

  // Display the new cmyk code
  const cmykCode = document.createElement("span");
  cmykCode.innerText = cmykColor;
  cmykval.appendChild(cmykCode);

  //display the new pantone color
  pantone = closestPantoneSearch(hexColor.slice(1)); //remove the # sign
  const pantoneCode = document.createElement("span");
  const pantoneName = document.createElement("span");
  let formattedPantone = pantone.name.replace(/(^| |-)([a-z])/g, (p2) => {
    return p2.toUpperCase();})
    formattedPantone = formattedPantone.replace(/-/g, " ");

  pantoneCode.innerText = pantone.pantone;
  pantoneval.appendChild(pantoneCode);
  pantonenam.appendChild(pantoneName);
  pantoneName.innerText = formattedPantone;
  pantoneColor = pantone.pantone;
}


function setCardColorHex(hexColor){
    rgb = hexToRgb(hexColor);
    rgbColor = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`;
    rgbData = [rgb.r,rgb.g,rgb.b,255]
    cmykColor = rgbToCmyk(rgbData);
    setCardColor(hexColor, rgbColor, cmykColor);
};

function setColorSquare(hex){
    colorSquare.innerHTML = '';
    colorSquareChild = document.createElement('div');
    colorSquareChild.className = 'color-square';
    colorSquareChild.style.backgroundColor = hex;
    colorSquare.appendChild(colorSquareChild);

}
  
  // Convert RGB to CMYK
  rgbToCmyk = (pixelData) => {
    const r = pixelData[0] / 255;
    const g = pixelData[1] / 255;
    const b = pixelData[2] / 255;
  
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);
  
    return `(${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)})`;
  };
  
  // Modify the rgbToHex function to directly accept pixelData
  rgbToHex = (pixelData) => {
    return `#${(
      "000000" +
      ((pixelData[0] << 16) | (pixelData[1] << 8) | pixelData[2]).toString(16)
    ).slice(-6)}`;
  };
  
  copyToClipboard = (codeType) => {
    let codeElement;
  
    switch (codeType) {
      case "hex-value":
        codeElement = document.getElementById("hex-code");
        break;
      case "rgb-value":
        codeElement = document.getElementById("rgb-code");
        break;
      case "cmyk-value":
        codeElement = document.getElementById("cmyk-code");
        break;
        case "pantone-value":
        codeElement = document.getElementById("pantone-code");
        // let pantoneCode = document.getElementById("pantone-code");
        // let pantoneName = document.getElementById("pantone-name");
        // console.log(pantoneCode);
        // console.log(pantoneName);
        // codeElement = pantoneCode + " " + pantoneName;
        break;
      default:
        return; // If codeType is not recognized, do nothing
    }
  
    if (codeElement) {
      const codeValue = codeElement.innerText;
  
      // Use navigator.clipboard.writeText for modern browsers
      navigator.clipboard
        .writeText(codeValue)
        .then(() => {
          // Provide user feedback (you can customize this part)
          alert(`Text copied to clipboard: ${codeValue}`);
        })
        .catch((err) => {
          console.error("Unable to copy to clipboard", err);
        });
    }
  };
  
  
  