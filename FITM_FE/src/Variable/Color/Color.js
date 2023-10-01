const red = "#c7493a";
const green = "#689775";

const light_blue = "#696cff";

const deep_blue = "#232333"
const blue = "#0c0032"
const gray = "#a6a7b8"
const Color2 = {
    color1 : "#01011d", //background
    color2 : "#04042e",  // field background
    color3 : "#3838aa", // button, ...
    color4 : green, //  hover , active ...
    color5 : "white", //text color
    
}
const Color1 = {
    color1 : "#f0f8ff", //background
    color2 : "#fff",  // field background
    color3 : "#696cff", // button, hover , active ...
    color4 : gray, //text color
}
const Color3 = {
    color1 : "#000", //background
    color2 : deep_blue,  // field background
    color3 : red, // button, hover , active ...
    color4 : "#fff", //text color
}
export let Color = Color2;
export const setColor = (color) =>{
    Color = color;
}

