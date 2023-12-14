//pantone.js 

fetch('../Code/FA2023/CPS 4301/Project/webflow/assets/pantone_colors.json').then((response) => response.json()).then((json) => {
     
//const obj = JSON.parse();
var pantone_array = json;


//Comparer Function    
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
    

//pantone_array.sort(GetSortOrder("hex")); //Pass the attribute to be sorted on 
//item = 2309; //last item in the pantone array
//console.log(pantone_array[item].name + ": " + pantone_array[item].hex + ": " + pantone_array[item].pantone);   
//pantone_array.sort(GetSortOrder("pantone")); //Pass the attribute to be sorted on 
//console.log(pantone_array[item].name + ": " + pantone_array[item].hex + ": " + pantone_array[item].pantone); 
//pantone_array.sort(GetSortOrder("name")); //Pass the attribute to be sorted on 
//console.log(pantone_array[item].name + ": " + pantone_array[item].hex + ": " + pantone_array[item].pantone); 
   
    


//Binary Search Function - im unsure if this will ever be used in our prject but it was hard to develop just in case

//Array must be sorted
pantone_array.sort(GetSortOrder("hex"));

function binarySearch(arr, searchHex) {
    var length = arr.length;
    var midPoint = Math.floor(length / 2);
    var newArr = arr;
    // console.log(arr);
    // console.log("array midpoint value: " + arr[midPoint]);

    if(((length == 1) && (arr[0].hex != searchHex)) || length == 0){
        console.log("DNE");
        return;
    }

    else if (arr[midPoint].hex > searchHex) {
        var newArr = arr.slice(0, midPoint);
        return binarySearch(newArr, searchHex);
    } 

    else if (arr[midPoint].hex < searchHex) {
        var newArr = arr.slice(midPoint, arr.length);
        return binarySearch(newArr, searchHex);
    } 

    else {
        console.log("FOUND IT: " + searchHex)
        return arr
    }
    
}//end binary search function

//binarySearch(pantone_array, "004b8d");//lowest
//binarySearch(pantone_array, "ffda29");//highest
//binarySearch(pantone_array, "000000");//test



// Comparing a search hex to the list and returning the closest value
//Steps
//take in a hex value
// compare the RGB1 to RGB2(the color being b=cmoared to) to create a distance from each color to the search target. If distance = 0 stop early
//store the local minimum distance and keep track of the index this value is at
// tranverse the entire list and return the closest named color

//-----------This fucntion WORKS. but it hosnelty isnt all that acurate. The best example ive found for the inacuracy is https://coolors.co/004b8d-104b8d-155187 where the middle color is teh once entered, the left is the result, and the right is probably the expected output
function closestPantoneSearch(searchHex) {
    //rgb1 = searchHex (the one the user is looking for)]
    //rgb2 = the given approxiamtion
    i=0;
    length = pantone_array.length;
    min = 10000;
    while (i < length){
        distance = colorDistance(searchHex, pantone_array[i].hex);
        if(distance === 0){
            return pantone_array[i];
            
        }
        else if (distance < min){
            min = distance;
            minIndex = i;
        }
        i++;
    }

     return pantone_array[minIndex];



}//end clsoest pantone search

function colorDistance(hex1, hex2){
    rgb1 = hexToRgb(hex1);
    rgb2 = hexToRgb(hex2);

    //distance = Math.sqrt(Math.pow(rgb2.r - rgb1.r, 2) + Math.pow(rgb2.g - rgb1.g, 2) + Math.pow(rgb2.b - rgb1.b, 2));
    
    //attempt at a weighted approache
    distance = Math.sqrt(Math.pow((rgb2.r - rgb1.r)*0.28, 2) + Math.pow((rgb2.g - rgb1.g)*0.58, 2) + Math.pow((rgb2.b - rgb1.b)*0.24, 2));
   

    //distance = Math.sqrt(Math.pow((rgb2.r - rgb1.r)*0.39, 2) + Math.pow((rgb2.g - rgb1.g)*0.59, 2) + Math.pow((rgb2.b - rgb1.b)*0.11, 2));

    return distance;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



// result1 = closestPantoneSearch("104b8d");//right
// console.log(result1.name + ": " + result1.hex);
// result1 = closestPantoneSearch("F3C349");//wrong
// console.log(result1.name + ": " + result1.hex);
// result1 = closestPantoneSearch("AC3F6F");//gets it correct
// console.log(result1.name + ": " + result1.hex);
// result1 = closestPantoneSearch("AC9B6F");//pretty good
// console.log(result1.name + ": " + result1.hex);



})//end fetch

//ensure that all your manipulations of the pantone arrays are done within the fetch fucnction otherwise they will throw errors