const grid = document.querySelector(".grid");
const gridSize = 16
// Create cells
for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");

    grid.appendChild(cell);

}

let CELLS = document.querySelectorAll(".cell");
// Convert NodeList to Array to have more methods
let cells = Array.from(CELLS)

// Default Configurations 
let currentColor = '#8AC686'
const modes = {
    COLOR: 'color',
    RAINBOW: 'rainbow',
    ERASER: 'eraser',
    CLEAR: 'clear'
};
let currentMode = modes.COLOR;

const colorPicker = document.querySelector('#drawing-color');
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

const colorModeButton = document.querySelector('#color-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');
const eraserButton = document.querySelector('#erase-mode');
const clearButton = document.querySelector('#clear-mode');

colorModeButton.addEventListener("click", () => {
    currentMode = modes.COLOR;
    colorPicker.disabled = false;
    updateActiveModeButtons();
});

rainbowModeButton.addEventListener("click", () => {
    currentMode = modes.RAINBOW;
    colorPicker.disabled = true;
    updateActiveModeButtons();
});

eraserButton.addEventListener("click", () => {
    currentMode = modes.ERASER;
    colorPicker.disabled = true;
    updateActiveModeButtons();
})

function clearGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
    currentMode = modes.COLOR;
}

clearButton.addEventListener("click", () => {
    clearGrid();
})

function updateActiveModeButtons() {
    colorModeButton.classList.toggle('active', currentMode === modes.COLOR);
    rainbowModeButton.classList.toggle('active', currentMode === modes.RAINBOW);
    eraserButton.classList.toggle('active', currentMode === modes.ERASER);
}

updateActiveModeButtons();

function getRainbowColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}

let isMouseDown = false;
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

cells.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
        isMouseDown = true;
         
        if (currentMode === modes.RAINBOW) {
            cell.style.backgroundColor = getRainbowColor();
        }
        else if (currentMode === modes.COLOR) {
            cell.style.backgroundColor = currentColor;
        }
        else {
            cell.style.backgroundColor = "white"; 
        }
    });

    cell.addEventListener("mouseover", () => {
        if (isMouseDown) {
            if (currentMode === modes.RAINBOW) {
                cell.style.backgroundColor = getRainbowColor();
            }
            else if (currentMode === modes.COLOR) {
                cell.style.backgroundColor = currentColor;
            }
            else {
                cell.style.backgroundColor = "white"; 
            }
        }

    });

});


