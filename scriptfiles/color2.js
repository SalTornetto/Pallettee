generateColorPalette = () => {
    console.log('hello world');
    const input = document.getElementById('imageInput');
    const colorPalette = document.getElementById('colorPalette');
    const uploadedImage = document.getElementById('uploadedImage');
    //colorPalette.innerHTML = ''; // Clear previous colors
  
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
                //this is an array that has 4 values for every pixel
                // console.log("imageData:");
                // console.log(imageData);  
                const colorCount = 5; // Number of colors to extract
  
              
                const colorMap = groupRgba(imageData);
  
  
                let result = kmeans(colorMap, colorCount);
                
  console.log(result);
  // console.log(result.centroids[0]); 
  // console.log("||||||||||||||||||||||||||||||||||||");
  
                const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
  
                for (let i = 0; i < colorCount; i++) {
                    const hexColor = numbersToHex(result.centroids[i]);
                    console.log(typeof(hexColor));
                    const colorBox = document.createElement('div');
                    colorBox.className = 'colorBox';
                    colorBox.style.backgroundColor = "#"+hexColor;
                    colorBox.style.width = Math.round(100/colorCount)+"%";
                    colorBox.innerText = hexColor;
                    colorPalette.appendChild(colorBox); 

                }
                
            };
        };
  
        reader.readAsDataURL(input.files[0]);
    }
  };
  
  // function pickColorFromImage() {
  //   const uploadedImage = document.getElementById('uploadedImage');
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //   canvas.width = uploadedImage.width;
  //   canvas.height = uploadedImage.height;
  //   context.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);
  
  //   const colorPickerCanvas = document.createElement('canvas');
  //   colorPickerCanvas.width = 1;
  //   colorPickerCanvas.height = 1;
  //   const colorPickerContext = colorPickerCanvas.getContext('2d');
  
  //   document.body.appendChild(colorPickerCanvas);
  
  //   colorPickerCanvas.addEventListener('click', function (event) {
  //       const x = event.clientX - colorPickerCanvas.getBoundingClientRect().left;
  //       const y = event.clientY - colorPickerCanvas.getBoundingClientRect().top;
  
  //       const imageData = context.getImageData(x, y, 1, 1).data;
  //       const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  //       const hexColor = rgbToHexSAL(color);
  
  //       const colorBox = document.createElement('div');
  //       colorBox.className = 'colorBox';
  //       colorBox.style.backgroundColor = hexColor;
  //       colorBox.innerText = hexColor;
  
  //       const colorPalette = document.getElementById('colorPalette');
  //       colorPalette.appendChild(colorBox);
  
  //       document.body.removeChild(colorPickerCanvas);
  //   });
  
  //   colorPickerCanvas.style.position = 'absolute';
  //   colorPickerCanvas.style.left = '0';
  //   colorPickerCanvas.style.top = '0';
  //   colorPickerCanvas.style.pointerEvents = 'none';
  
  //   colorPickerContext.drawImage(uploadedImage, 0, 0, 1, 1);
  
  //   colorPickerCanvas.click();
  // }
  
  function rgbToHexSAL(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    console.log('Is this being called?')
    if (!match) return rgb;
  
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
  }
  
  function hexToRgb(hex) {
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
    return arr.map(num => Math.round(num).toString(16).padStart(2, '0')).join('').toUpperCase();
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
  // generateColorPalette = () => {
  //   const input = document.getElementById("imageInput");
  //   const colorPalette = document.getElementById("colorPalette");
  //   const uploadedImage = document.getElementById("uploadedImage");
  
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  
  //     reader.onload = function (e) {
  //       uploadedImage.src = e.target.result;
  
  //       const img = new Image();
  //       img.src = e.target.result;
  
  //       img.onload = function () {
  //         const canvas = document.createElement("canvas");
  //         const context = canvas.getContext("2d");
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         context.drawImage(img, 0, 0, img.width, img.height);
  
  //         const imageData = context.getImageData(
  //           0,
  //           0,
  //           img.width,
  //           img.height
  //         ).data;
  //         const colorCount = 10; // Number of colors to extract
  
  //         // Extract dominant colors using a simple algorithm
  //         const colorMap = {};
  //         for (let i = 0; i < imageData.length; i += 4) {
  //           const color = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${
  //             imageData[i + 2]
  //           })`;
  //           colorMap[color] = (colorMap[color] || 0) + 1;
  //         }
  
  //         const sortedColors = Object.keys(colorMap).sort(
  //           (a, b) => colorMap[b] - colorMap[a]
  //         );
  
  //         for (let i = 0; i < Math.min(colorCount, sortedColors.length); i++) {
  //           const hexColor = rgbToHex(sortedColors[i]);
  //         }
  
  //         // Set the flex-direction to column for vertical rectangles
  //         colorPalette.style.flexDirection = "column";
  //       };
  //     };
  
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };//end generate pallete method
  
  
  
  clearContent = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = "";
    }
  };
  
  
//   const hasSupport = () => ('EyeDropper' in window);
  
//   const imageElement = document.getElementById("uploadedImage");
  
//   imageElement.addEventListener("mouseover", () => {
//     if (hasSupport) {
//       const eyeDropper = new window.EyeDropper();
  
//       eyeDropper
//         .open()
//         .then((result) => {
//           const color = result.sRGBHex;
//           // Do something with the color
//         })
//         .catch((e) => {
//           console.error(e);
//         });
//     } else {
//       console.warn("No Support: This browser does not support the EyeDropper API yet!");
//     }
//   });
  
  pickColorFromImage = () => {
    const uploadedImage = document.getElementById("uploadedImage");
    const hexval = document.getElementById("hex-code");
    const rgbval = document.getElementById("rgb-code");
    const cmykval = document.getElementById("cmyk-code");
  
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
      clearContent("hex-code");
      clearContent("rgb-code");
      clearContent("cmyk-code");
  
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
    });
  };
  
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
  
  
  