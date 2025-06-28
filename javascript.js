// Default Configurations 
let currentColor = '#8AC686'
const DEFAULT_SIZE = 16;
const MAX_SIZE = 64;
let currentSize = DEFAULT_SIZE;
const modes = {
    COLOR: 'color',
    RAINBOW: 'rainbow',
    ERASER: 'eraser',
    CLEAR: 'clear'
};
let currentMode = modes.COLOR;

// DOM Elements
const grid = document.querySelector(".grid");
const colorModeButton = document.querySelector('#color-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');
const eraserButton = document.querySelector('#erase-mode');
const clearButton = document.querySelector('#clear-mode');
const sizeSlider = document.querySelector('#size-slider');
const sizeValue = document.getElementById('size-value');
const colorPicker = document.querySelector('#drawing-color');

// initialize
function initializeGrid() {
    grid.innerHTML = '';
    // To refactor cell-size
    grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    
    for (let i = 0; i < currentSize * currentSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.backgroundColor = 'white';
        grid.appendChild(cell);
    }
    
    setupCellEventListeners();
}

function setupCellEventListeners() {
    // grid functionality :- mouseDown -> mouseover -> mouseup
    cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((cell) => {
        cell.addEventListener("mousedown", () => {
            isMouseDown = true;

            if (currentMode === modes.RAINBOW) {
                cell.style.backgroundColor = getRainbowColor();
            }
            else if (currentMode === modes.COLOR) {
                cell.style.backgroundColor = currentColor;
            }
            else if (currentMode === modes.ERASER) {
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
                else if (currentMode === modes.ERASER) {
                    cell.style.backgroundColor = "white"; 
                }
            }

        });

    });
}

// Event Handlers
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

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

sizeSlider.addEventListener('input', (e) => {
        currentSize = e.target.value;
        sizeValue.textContent = `${currentSize} × ${currentSize}`;
        initializeGrid();
});

clearButton.addEventListener("click", () => {
    clearGrid();
})

document.addEventListener("mouseleave", () => {
    isMouseDown = false;
});

// Helper functions
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

// ClearGrid ()
function clearGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
    
}

let isMouseDown = false;
    document.addEventListener("mouseup", () => {
        isMouseDown = false;
});

initializeGrid();




