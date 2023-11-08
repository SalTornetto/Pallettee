

let palette1 = "FF000000FF000000FF";
let palette2 = "FF000000FF000000FF757575";
let palette3 = "FF00FF5555556666666666666666666666666666666666666666666666666666666666666";
let plaette4 = "";

displayPalette(palette2);

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
            output += "<td id = color" + i+1 + " style='background-color: #" + text + "'> </td>";
            actions += '<td><div class=""><div class="text-center"><a class="text-dark" onclick=deleteColor('+ i + ',"' + palette +'") href="#">Delete Color</a></div></div></td>';
            text = "";   
    }
    console.log(output);
    console.log(actions);
    document.getElementById("colorPalette").innerHTML = output;
    document.getElementById("colorActions").innerHTML = actions;
    //console.log((size+1)/6);
}


function addColor(){

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

function modifyColor(){
    
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