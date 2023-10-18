const red = "#c7493a";
const green = "#689775";

const light_blue = "#696cff";

const deep_blue = "#232333";
const blue = "#0c0032";
const gray = "#a6a7b8";

const Color2 = {
    color1: "#01011d", //background
    color2: "#04042e", // field background
    color3: "#3838aa", // button, ...
    color4: green, //  hover , active ...
    color5: "white", //text color
};
const Color1 = {
    color1: "#f0f8ff", //background
    color2: "#fff", // field background
    color3: "#696cff", // button, hover , active ...
    color4: gray, //text color
};
const Color3 = {
    color1: "#f0f8ff", //background
    color2: "#fff", // field background
    color3: "#696cff", // button, ...
    color4: "ed0b386d", //  hover , active ...
    color5: "red", //text color
};

let Colors = [
    {
        // cloundy day
        color1: "#f0f8ff", //background
        color2: "#fff", // field background
        color3: "#696cff", // button ...
        color4: "#0bb8ed29", // hover , active ...
        color5: "#696cff", //text color
    },
    {
        // little start
        color1 : "#01011d", //background
        color2 : "#080848",  // field background
        color3 : "#3838aa", // button, ...
        color4 : green, //  hover , active ...
        color5 : "white", //text color
        
    },
    {
        // fire on sky
        color1 : "#f0f8ff", //background
        color2 : "#fff",  // field background
        color3 : "#ed0b382d", // button, ...
        color4 : "#ed0b382d", //  hover , active ...
        color5 : "red", //text color
    },
    {
        // fire on sky
        color1 : "#f0f8ff", //background
        color2 : "#fff",  // field background
        color3 : "#696cff", // button, ...
        color4 : "#ed0b382d", //  hover , active ...
        color5 : "red", //text color
    }

];
export let Color = Colors[2];

export const setColor = (number) =>{
    Color = Colors[number];
};
