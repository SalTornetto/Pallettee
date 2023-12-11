generateColorPalette = () => {
  const input = document.getElementById("imageInput");
  const colorPalette = document.getElementById("colorPalette");
  const uploadedImage = document.getElementById("uploadedImage");
  // colorPalette.innerHTML = ''; // Clear previous color

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

pickColorFromImage = () => {
  const uploadedImage = document.getElementById("uploadedImage");
  const colorValue = document.getElementById("hex-code");

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

    // Remove the last clicked value
    const previousHexCode = document.getElementById("hex-code");
    if (previousHexCode) {
      previousHexCode.innerHTML = ""; // Clear the content
    }

    // Display the new hex code with a class for styling
    const hexCode = document.createElement("span");
    hexCode.innerText = hexColor;
    hexCode.classList.add("tabbed-hex"); // Add a class for styling
    colorValue.appendChild(hexCode);
  });
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
      case 'hex':
        codeElement = document.getElementById('hex-value');
        break;
      case 'rgb':
        codeElement = document.getElementById('rgb-value');
        break;
      case 'cmyk':
        codeElement = document.getElementById('cmyk-value');
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
  
