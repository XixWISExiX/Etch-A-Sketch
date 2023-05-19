// TODO add a popup asking for the number of squares per side for the new grid (default size is 16x16) also set the limit for the user input to be 100
// TODO add RGB color

import { body } from "./DOMref.js";

function application() {
  const slider = document.getElementById("slider");
  const sliderValue = document.getElementById("sliderValue");
  slider.addEventListener("input", () => {
    sliderValue.textContent = slider.value;
    console.log("Value: " + slider.value);
    clearGrid(slider.value);
    gridConstruction(slider.value);
    drawOnBlock();
  });
  gridConstruction(slider.value);
  drawOnBlock();
}

function clearGrid(blockWidth) {
  //   body.remove("gridContainer");
  //   const grid = body.getElementsByClassName("grid");
  //   const gridContainer = grid[0].getElementsByClassName("gridContainer");
  //   grid[0].removeChild(gridContainer[0]);
  const gridElements = document.querySelectorAll(".gridContainer");
  gridElements.forEach((element) => element.parentNode.removeChild(element));
}

function gridConstruction(blockWidth) {
  //   const gridContainer = body.getElementsByClassName("gridContainer");
  const grid = body.getElementsByClassName("grid");
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  grid[0].appendChild(gridContainer);

  let borderSize = 1 / blockWidth;
  let dimentions = 650 / blockWidth - borderSize;
  for (let i = 0; i < blockWidth; i++) {
    const rowGridContainer = document.createElement("div");
    rowGridContainer.classList.add("rowGridContainer");
    // rowGridContainer.style.borderRight = `solid black 1px`;
    gridContainer.appendChild(rowGridContainer);
    for (let j = 0; j < blockWidth; j++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("gridBlock");
      newDiv.style.width = `${dimentions}px`;
      newDiv.style.height = `${dimentions}px`;
      newDiv.style.borderTop = `solid black 1px`;
      newDiv.style.borderLeft = `solid black 1px`;
      rowGridContainer.appendChild(newDiv);
    }
  }
  let gridDimentions = dimentions * blockWidth + 20;
  console.log(gridDimentions);
  gridContainer.style.width = gridDimentions;
  gridContainer.style.height = gridDimentions;
  gridContainer.style.borderBottom = "solid black 1px";
  gridContainer.style.borderRight = "solid black 1px";

  const gridWidth = blockWidth * blockWidth + parseInt(blockWidth);
  console.log(dimentions);
  //   gridContainer.style.width = `${gridWidth}px`;
  //   gridContainer.style.height = `${gridWidth}px`;
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
