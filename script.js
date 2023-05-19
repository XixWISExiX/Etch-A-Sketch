// TODO add a popup asking for the number of squares per side for the new grid (default size is 16x16) also set the limit for the user input to be 100
// TODO add RGB color

import { body } from "./DOMref.js";

// TODO abstract to functions for readability
function grid() {
  const gridContainer = body.getElementsByClassName("gridContainer");

  for (let i = 0; i < 16; i++) {
    const rowGridContainer = document.createElement("div");
    rowGridContainer.classList.add("rowGridContainer");
    gridContainer[0].appendChild(rowGridContainer);
    for (let j = 0; j < 16; j++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("gridBlock");
      rowGridContainer.appendChild(newDiv);
      //   gridContainer[0].appendChild(newDiv);
    }
  }
}
document.addEventListener("DOMContentLoaded", grid);
