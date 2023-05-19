const body = document.body;
const optionsBar = body.getElementsByClassName("optionsBar");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");
const clear = optionsBar[0].getElementsByClassName("clear");
const rainbowColor = optionsBar[0].getElementsByClassName("rainbowColor");
const blackColor = optionsBar[0].getElementsByClassName("blackColor");
const eraser = optionsBar[0].getElementsByClassName("eraser");
const grid = body.getElementsByClassName("grid");

export {
  body,
  slider,
  sliderValue,
  clear,
  rainbowColor,
  blackColor,
  eraser,
  grid,
};
