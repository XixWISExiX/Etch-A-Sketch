import {
  body,
  slider,
  sliderValue,
  clear,
  rainbowColor,
  blackColor,
  eraser,
  grid,
} from "./DOMref.js";

function application() {
  sliderButton();
  clearGridButton();
  drawingOptions();
  defaultGrid();
}

let drawing = (function () {
  let isRainbowColor = false;
  let isEraser = false;

  return {
    getIsRainbowColor: function () {
      return isRainbowColor;
    },
    setIsRainbowColor: function (value) {
      isRainbowColor = value;
    },
    getIsEraser: function () {
      return isEraser;
    },
    setIsEraser: function (value) {
      isEraser = value;
    },
  };
})();

function sliderButton() {
  slider.addEventListener("input", () => {
    sliderValue.textContent = `${slider.value} x ${slider.value} grid`;
    clearGrid();
    gridConstruction(slider.value);
    drawOnBlock();
  });
}

function clearGridButton() {
  clear[0].addEventListener("click", () => {
    makeEveryBlockWhiteInGrid();
  });
}

function drawingOptions() {
  rainbowColor[0].addEventListener("click", () => {
    drawing.setIsEraser(false);
    drawing.setIsRainbowColor(true);
    drawOnBlock();
  });
  blackColor[0].addEventListener("click", () => {
    drawing.setIsEraser(false);
    drawing.setIsRainbowColor(false);
    drawOnBlock();
  });
  eraser[0].addEventListener("click", () => {
    drawing.setIsEraser(true);
    drawing.setIsRainbowColor(false);
    drawOnBlock();
  });
}

function defaultGrid() {
  gridConstruction(16);
  drawOnBlock();
}

function clearGrid() {
  const gridElements = body.querySelectorAll(".gridContainer");
  gridElements.forEach((element) => element.parentNode.removeChild(element));
}

function makeEveryBlockWhiteInGrid() {
  const gridBlocks = document.querySelectorAll(".gridBlock");
  gridBlocks.forEach((gridBlock) => {
    gridBlock.style.backgroundColor = "white";
  });
}

function gridConstruction(numberOfGridRows) {
  const CONTAINER_SIZE = 650;
  let gridContainer = gridContainerContstruction();
  let blockInGridWidth = findOptimalBlockSize(CONTAINER_SIZE, numberOfGridRows);
  gridRowConstruction(gridContainer, numberOfGridRows, blockInGridWidth);
  let gridDimensions = blockInGridWidth * numberOfGridRows;
  adjustGridContainerDimensions(gridContainer, gridDimensions);
}

function gridContainerContstruction() {
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  grid[0].appendChild(gridContainer);
  return gridContainer;
}

function findOptimalBlockSize(containerWidth, numberOfGridRows) {
  return containerWidth / numberOfGridRows - 1;
}

function gridRowConstruction(
  gridContainer,
  numberOfGridRows,
  blockInGridWidth
) {
  for (let i = 0; i < numberOfGridRows; i++) {
    let rowGridContainer = addContainerToRow(gridContainer);
    gridColumnConstruction(
      rowGridContainer,
      numberOfGridRows,
      blockInGridWidth
    );
  }
}

function addContainerToRow(gridContainer) {
  const rowGridContainer = document.createElement("div");
  rowGridContainer.classList.add("rowGridContainer");
  gridContainer.appendChild(rowGridContainer);
  return rowGridContainer;
}

function gridColumnConstruction(
  rowGridContainer,
  numberOfGridRows,
  blockInGridWidth
) {
  for (let j = 0; j < numberOfGridRows; j++) {
    let gridBlock = gridBlockConstruction(blockInGridWidth);
    rowGridContainer.appendChild(gridBlock);
  }
}

function gridBlockConstruction(blockInGridWidth) {
  const gridBlock = document.createElement("div");
  gridBlock.classList.add("gridBlock");
  gridBlock.style.width = `${blockInGridWidth}px`;
  gridBlock.style.height = `${blockInGridWidth}px`;
  gridBlock.style.borderTop = `solid black 1px`;
  gridBlock.style.borderLeft = `solid black 1px`;
  return gridBlock;
}

function adjustGridContainerDimensions(gridContainer, gridDimensions) {
  gridContainer.style.width = gridDimensions;
  gridContainer.style.height = gridDimensions;
  gridContainer.style.borderBottom = "solid black 1px";
  gridContainer.style.borderRight = "solid black 1px";
}

function drawOnBlock() {
  const gridBlocks = document.querySelectorAll(".gridBlock");
  let isMouseDown = false;
  gridBlocks.forEach((gridBlock) => {
    gridBlock.addEventListener("mousedown", () => {
      event.preventDefault();
      isMouseDown = true;
      changeGridBlock(gridBlock);
    });

    gridBlock.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    gridBlock.addEventListener("mouseover", () => {
      if (isMouseDown) {
        changeGridBlock(gridBlock);
      }
    });
  });
}

function changeGridBlock(gridBlock) {
  if (drawing.getIsRainbowColor()) {
    gridBlock.style.backgroundColor = getRandomRGBColor();
  } else if (drawing.getIsEraser()) {
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
