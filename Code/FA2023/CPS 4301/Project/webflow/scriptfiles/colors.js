function generateColorPalette() {
    const input = document.getElementById('imageInput');
    const colorPalette = document.getElementById('colorPalette');
    const uploadedImage = document.getElementById('uploadedImage');
    colorPalette.innerHTML = ''; // Clear previous color

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
                const colorCount = 8; // Number of colors to extract

                // Extract dominant colors using a simple algorithm
                const colorMap = {};
                for (let i = 0; i < imageData.length; i += 4) {
                    const color = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${imageData[i + 2]})`;
                    colorMap[color] = (colorMap[color] || 0) + 1;
                }

                const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);

                for (let i = 0; i < Math.min(colorCount, sortedColors.length); i++) {
                    const hexColor = rgbToHex(sortedColors[i]);
                    const colorBox = document.createElement('div');
                    colorBox.className = 'colorBox';
                    colorBox.style.backgroundColor = hexColor;
                    colorBox.innerText = hexColor;
                    colorPalette.appendChild(colorBox);
                }
            };
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function pickColorFromImage() {
    const uploadedImage = document.getElementById('uploadedImage');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    context.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);

    const colorPickerCanvas = document.createElement('canvas');
    colorPickerCanvas.width = 1;
    colorPickerCanvas.height = 1;
    const colorPickerContext = colorPickerCanvas.getContext('2d');

    document.body.appendChild(colorPickerCanvas);

    colorPickerCanvas.addEventListener('click', function (event) {
        const x = event.clientX - colorPickerCanvas.getBoundingClientRect().left;
        const y = event.clientY - colorPickerCanvas.getBoundingClientRect().top;

        const imageData = context.getImageData(x, y, 1, 1).data;
        const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        const hexColor = rgbToHex(color);

        const colorBox = document.createElement('div');
        colorBox.className = 'colorBox';
        colorBox.style.backgroundColor = hexColor;
        colorBox.innerText = hexColor;

        const colorPalette = document.getElementById('colorPalette');
        colorPalette.appendChild(colorBox);

        document.body.removeChild(colorPickerCanvas);
    });

    colorPickerCanvas.style.position = 'absolute';
    colorPickerCanvas.style.left = '0';
    colorPickerCanvas.style.top = '0';
    colorPickerCanvas.style.pointerEvents = 'none';

    colorPickerContext.drawImage(uploadedImage, 0, 0, 1, 1);

    colorPickerCanvas.click();
}

function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;

    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }

    return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
}