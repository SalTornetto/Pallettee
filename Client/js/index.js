

let palette1 = "FF000000FF000000FF";
let palette2 = "FF000000FF000000FF757575";
let palette3 = "FF00FF5555556666666666666666666666666666666666666666666666666666666666666";
let palette4 = "";
let palette5 = "FF000000FF000000FF757575FF000000FF000000FF757575000000"

displayPalette(palette1);

//document.getElementById("colorPallete").innerHTML = " ";


function displayPalette(palette){
    let size = palette.length;
    var text = ""; 
    let output = "";
    let actions = "";

    for (let i = 0; i < Math.floor(size/6); i++) { 
        for (let j = 0; j < 6; j++) {
            text += palette.charAt((i*6)+j); 
        }
            //output += "<td id = color" + i+1 + " style='background-color: #" + text + "'> </td>";
            console.log(i);
            output += '<td id = color'+ i +'> <input type="color" id="colorPicker'+i+'" onchange=clickColor('+ i + ',"' + palette +'") value="#'+ text +'" style="width:101%; height:250pt;" </td>';
            //actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" onclick=modifyColor('+ i + ',"' + palette +'") href="#">Modify Color</a></div></div></td>';
            actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" onclick=copyHEX('+ i + ',"' + palette +'") href="#">Copy HEX</a></div></div></td>';
            //actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a><br><a class="text-dark" type=color onchange="clickColor(0, -1, -1, 5)" href="#">Modify Color</a></div></div></td>';
            text = "";   
    }

    if((size/6)<9){
        actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=addColor("'+palette+'") href="#">Add Color</a></div></div></td>';
    }

    document.getElementById("colorPalette").innerHTML = output;
    document.getElementById("colorActions").innerHTML = actions;
    
}


function addColor(palette){
    displayPalette(palette + "FFFFFF");
}

function deleteColor(colorID, palette){
    let size = palette.length;
    text="";
    for (let i = 0; i < Math.floor(size/6); i++) { 
        if (i != colorID){
            for (let j = 0; j < 6; j++) {
                text += palette.charAt((i*6)+j); 
            }
        }
    }
    displayPalette(text);
}

function modifyColor(colorID, palette){  
}

function copyHEX(colorID, palette){
    navigator.clipboard.writeText(palette.substring((colorID*6),(colorID*6)+6));
    alert("Copied the text");
}

function clickColor(colorID, palette){
    let size = palette.length;
    let output = "";
    let i = 0;
    temp = document.getElementById("colorPicker"+colorID).value;
    while(i<(size)){
        console.log("i:"+i);
        console.log("colorID:"+colorID);
        if (i == colorID){
            output += temp.substring(1,7);
            i++;
        }
        if(i != colorID){
            output += palette.substring((i*6),(i*6)+6);
            i++;  
        }   
    }
    displayPalette(output);

}



// Version 1 of this function - just reads every character in the palette sequentially. Not good for edditing a col
// function displayPalette(palette){
//     let size = palette.length;
//     var text = ""; 
//     let output = "";

//     for (let i = 0; i < Math.floor(size/6); i++) { 
//         for (let j = 0; j < 6; j++) {
//             text += palette.charAt((i*6)+j); 
//         }
//             output += "<td id = color" + i+1 + " style='background-color: #" + text + "'> </td>";
//             text = "";   
//     }
//     console.log(output);
//     document.getElementById("colorPalette").innerHTML = output;
//     //console.log((size+1)/6);
// }

 // <td bgcolor: rgb(255,255,255) ></td>