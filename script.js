import {
  body,
  slider,
  sliderValue,
  clear,
  rainbowColor,
  normalColor,
  eraser,
} from "./DOMref.js";

function application() {
  const DEFAULT_SIZE = 16;
  let isRanbowColor = false;
  let isEraser = false;
  slider.addEventListener("input", () => {
    sliderValue.textContent = `${slider.value} x ${slider.value} grid`;
    clearGrid();
    gridConstruction(slider.value);
    drawOnBlock(isRanbowColor);
  });
  clear[0].addEventListener("click", () => {
    cleanGrid();
  });
  rainbowColor[0].addEventListener("click", () => {
    isEraser = false;
    isRanbowColor = true;
    drawOnBlock(isRanbowColor, isEraser);
  });
  normalColor[0].addEventListener("click", () => {
    isEraser = false;
    isRanbowColor = false;
    drawOnBlock(isRanbowColor, isEraser);
  });
  eraser[0].addEventListener("click", () => {
    isEraser = true;
    isRanbowColor = false;
    drawOnBlock(isRanbowColor, isEraser);
  });
  gridConstruction(DEFAULT_SIZE);
  drawOnBlock(isRanbowColor, isEraser);
}

function cleanGrid() {
  const gridBlocks = document.querySelectorAll(".gridBlock");
  gridBlocks.forEach((gridBlock) => {
    gridBlock.style.backgroundColor = "white";
  });
}

function clearGrid() {
  const gridElements = document.querySelectorAll(".gridContainer");
  gridElements.forEach((element) => element.parentNode.removeChild(element));
}

function gridConstruction(blockWidth) {
  const grid = body.getElementsByClassName("grid");
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  grid[0].appendChild(gridContainer);

  let dimentions = 650 / blockWidth - 1;
  for (let i = 0; i < blockWidth; i++) {
    const rowGridContainer = document.createElement("div");
    rowGridContainer.classList.add("rowGridContainer");
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
  let gridDimentions = dimentions * blockWidth;
  gridContainer.style.width = gridDimentions;
  gridContainer.style.height = gridDimentions;
  gridContainer.style.borderBottom = "solid black 1px";
  gridContainer.style.borderRight = "solid black 1px";
}

function drawOnBlock(isRainbowColor, isEraser) {
  const gridBlocks = document.querySelectorAll(".gridBlock");
  let isMouseDown = false;
  gridBlocks.forEach((gridBlock) => {
    gridBlock.addEventListener("mousedown", () => {
      event.preventDefault();
      isMouseDown = true;
      changeBlock(gridBlock, isRainbowColor, isEraser);
    });

    gridBlock.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    gridBlock.addEventListener("mouseover", () => {
      if (isMouseDown) {
        changeBlock(gridBlock, isRainbowColor, isEraser);
      }
    });
  });
}

function changeBlock(gridBlock, isRainbowColor, isEraser) {
  if (isRainbowColor) {
    gridBlock.style.backgroundColor = getRandomRGBColor();
  } else if (isEraser) {
    gridBlock.style.backgroundColor = "white";
  } else {
    gridBlock.style.backgroundColor = "black";
  }
}

function getRandomRGBColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

document.addEventListener("DOMContentLoaded", application);
