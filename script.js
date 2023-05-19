// TODO add a popup asking for the number of squares per side for the new grid (default size is 16x16) also set the limit for the user input to be 100
// TODO add RGB color

import { body } from "./DOMref.js";

function application() {
  grid();
  drawOnBlock();
}

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
    }
  }
  const gridWidth = 16 * 16 + 16;
  gridContainer[0].style.width = `${gridWidth}px`;
}

function drawOnBlock() {
  const gridBlocks = document.querySelectorAll(".gridBlock");
  let isMouseDown = false;
  gridBlocks.forEach((gridBlock) => {
    gridBlock.addEventListener("mousedown", () => {
      event.preventDefault();
      isMouseDown = true;
      gridBlock.style.backgroundColor = "black";
    });

    gridBlock.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    gridBlock.addEventListener("mouseover", () => {
      if (isMouseDown) {
        gridBlock.style.backgroundColor = "black";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", application);
