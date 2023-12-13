generateColorPalette = () => {
  const input = document.getElementById("imageInput");
  const colorPalette = document.getElementById("colorPalette");
  const uploadedImage = document.getElementById("uploadedImage");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      uploadedImage.src = e.target.result;

      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(
          0,
          0,
          img.width,
          img.height
        ).data;
        const colorCount = 10; // Number of colors to extract

        // Extract dominant colors using a simple algorithm
        const colorMap = {};
        for (let i = 0; i < imageData.length; i += 4) {
          const color = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${
            imageData[i + 2]
          })`;
          colorMap[color] = (colorMap[color] || 0) + 1;
        }

        const sortedColors = Object.keys(colorMap).sort(
          (a, b) => colorMap[b] - colorMap[a]
        );

        for (let i = 0; i < Math.min(colorCount, sortedColors.length); i++) {
          const hexColor = rgbToHex(sortedColors[i]);
        }

        // Set the flex-direction to column for vertical rectangles
        colorPalette.style.flexDirection = "column";
      };
    };

    reader.readAsDataURL(input.files[0]);
  }
};
clearContent = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = "";
  }
};


const hasSupport = () => ('EyeDropper' in window);

const imageElement = document.getElementById("uploadedImage");

imageElement.addEventListener("mouseover", () => {
  if (hasSupport) {
    const eyeDropper = new window.EyeDropper();

    eyeDropper
      .open()
      .then((result) => {
        const color = result.sRGBHex;
        // Do something with the color
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    console.warn("No Support: This browser does not support the EyeDropper API yet!");
  }
});

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


