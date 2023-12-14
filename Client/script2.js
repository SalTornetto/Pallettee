//script2.js
//import kmeans from "./kmeans";



function generateColorPalette() {
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
                
                //this is an array that has 4 values for every pixel
                console.log("imageData:");
                console.log(imageData);

                // for (let j=0; j<imageData.length; j+=4){
                //     if (imageData[j]!=255){
                //         console.log('you tired');
                //     }
                // }
// console.log("||||||||||||||||||||||||||||||||||||");

// let result = kmeans(imageData, 2);

// console.log("||||||||||||||||||||||||||||||||||||");

                const colorCount = 5; // Number of colors to extract

                // Extract dominant colors using a simple algorithm
                //const colorMap = {};
                // for (let i = 0; i < imageData.length; i += 4) {
                //     const color = `[${imageData[i]}, ${imageData[i + 1]}, ${imageData[i + 2]}, ${imageData[i + 3]}]`;
                //     colorMap[color] = (colorMap[color] || 0) + 1;
                // }

                const colorMap = groupRgba(imageData);
                //console.log(colorMap);



//integerToHex(0-255);
                console.log("colorMap:");
                console.log(colorMap);

console.log("||||||||||||||||||||||||||||||||||||");

// let sample = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
//     [10,11,12]
// ];
// console.log(sample);

//let result = kmeans(sample, 2);

let result = kmeans(colorMap, colorCount);
console.log(result);
console.log(result.centroids[0]); 
console.log("||||||||||||||||||||||||||||||||||||");

                const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);

                // console.log("sortedMap:")
                // console.log(sortedColors); 

                for (let i = 0; i < colorCount; i++) {
                    const hexColor = numbersToHex(result.centroids[i]);
                    console.log(typeof(hexColor));
                    const colorBox = document.createElement('div');
                    colorBox.className = 'colorBox';
                    colorBox.style.backgroundColor = "#"+hexColor;
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




function integerToHex(number) {
    return (number < 16 ? '0' : '') + number.toString(16).toUpperCase();
  }
  
function numbersToHex(arr) {
    return arr.map(num => Math.round(num).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function groupRgba(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 4) {
        // tempArr=[];
        // for (let j = 0; j<4; j++){
        //     tempArr.push(arr[i+j]);

        // }
      //result.push(`[${arr[i]}, ${arr[i + 1]}, ${arr[i + 2]}, ${arr[i + 3]}]`);
      //result.push(arr[i]+","+arr[i + 1]+","+ arr[i + 2]+","+ arr[i + 3]);
    //   result.push(tempArr);
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

//console.log(rgbaToHex(0, 129, 255, 255));


// let palette1 = "FF000000FF000000FF";
// let palette2 = "FF000000FF000000FF757575";
// let palette3 = "FF00FF5555556666666666666666666666666666666666666666666666666666666666666";
// let palette4 = "";
// let palette5 = "FF000000FF000000FF757575FF000000FF000000FF757575000000";
// let palette6 = "00ff2a358fb6d1d1d1";

// displayPalette(palette6);

// //document.getElementById("colorPallete").innerHTML = " ";


// function displayPalette(palette){
//     let size = palette.length;
//     var text = ""; 
//     let output = "";
//     let actions = "";

//     for (let i = 0; i < Math.floor(size/6); i++) { 
//         for (let j = 0; j < 6; j++) {
//             text += palette.charAt((i*6)+j); 
//         }
//             //output += "<td id = color" + i+1 + " style='background-color: #" + text + "'> </td>";
//             console.log(i);
//             output += '<td id = color'+ i +'> <input type="color" id="colorPicker'+i+'" onchange=clickColor('+ i + ',"' + palette +'") value="#'+ text +'" style="width:101%; height:250pt;" </td>';
//             //actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" onclick=modifyColor('+ i + ',"' + palette +'") href="#">Modify Color</a></div></div></td>';
//             actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" onclick=copyHEX('+ i + ',"' + palette +'") href="#">Copy HEX</a></div></div></td>';
//             //actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" type=color onchange="clickColor(0, -1, -1, 5)" href="#">Modify Color</a></div></div></td>';
//             text = "";   
//     }

//     if((size/6)<9){
//         actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=addColor("'+palette+'") href="#">Add Color</a></div></div></td>';
//     }

//     document.getElementById("colorPalette").innerHTML = output;
//     document.getElementById("colorActions").innerHTML = actions;
    
// }


// function addColor(palette){
//     displayPalette(palette + "FFFFFF");
// }

// function deleteColor(colorID, palette){
//     let size = palette.length;
//     text="";
//     for (let i = 0; i < Math.floor(size/6); i++) { 
//         if (i != colorID){
//             for (let j = 0; j < 6; j++) {
//                 text += palette.charAt((i*6)+j); 
//             }
//         }
//     }
//     displayPalette(text);
// }

// function modifyColor(colorID, palette){  
// }

// function copyHEX(colorID, palette){
//     navigator.clipboard.writeText(palette.substring((colorID*6),(colorID*6)+6));
//     alert("Copied the text");
// }

// function clickColor(colorID, palette){
//     let size = palette.length;
//     let output = "";
//     let i = 0;
//     temp = document.getElementById("colorPicker"+colorID).value;
//     while(i<(size)){
//         console.log("i:"+i);
//         console.log("colorID:"+colorID);
//         if (i == colorID){
//             output += temp.substring(1,7);
//             i++;
//         }
//         if(i != colorID){
//             output += palette.substring((i*6),(i*6)+6);
//             i++;  
//         }   
//     }
//     displayPalette(output);

// }



// // Version 1 of this function - just reads every character in the palette sequentially. Not good for edditing a col
// // function displayPalette(palette){
// //     let size = palette.length;
// //     var text = ""; 
// //     let output = "";

// //     for (let i = 0; i < Math.floor(size/6); i++) { 
// //         for (let j = 0; j < 6; j++) {
// //             text += palette.charAt((i*6)+j); 
// //         }
// //             output += "<td id = color" + i+1 + " style='background-color: #" + text + "'> </td>";
// //             text = "";   
// //     }
// //     console.log(output);
// //     document.getElementById("colorPalette").innerHTML = output;
// //     //console.log((size+1)/6);
// // }

//  // <td bgcolor: rgb(255,255,255) ></td>

// function groupRgba(arr) {
//     const result = [];
//     for (let i = 0; i < arr.length; i += 4) {
//         tempArr=[];
//         for (let j = 0; j<4; j++){
//             tempArr.push(arr[i+j]);

//         }
//       //result.push(`[${arr[i]}, ${arr[i + 1]}, ${arr[i + 2]}, ${arr[i + 3]}]`);
//       //result.push(arr[i]+","+arr[i + 1]+","+ arr[i + 2]+","+ arr[i + 3]);
//       result.push(tempArr);
//     }
//     return result;
// }