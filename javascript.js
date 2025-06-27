const grid = document.querySelector(".grid");
const gridSize = 16
// Create cells
for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");

    grid.appendChild(cell);

}

// Default Configurations 
let currentColor = '#8AC686'
const modes = {
    COLOR: 'color',
    RAINBOW: 'rainbow'
};
let currentMode = modes.COLOR;

const colorPicker = document.querySelector('#drawing-color');
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

const colorModeButton = document.querySelector('#color-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');

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

function updateActiveModeButtons() {
    colorModeButton.classList.toggle('active', currentMode === modes.COLOR);
    rainbowModeButton.classList.toggle('active', currentMode === modes.RAINBOW);
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


let CELLS = document.querySelectorAll(".cell");
// Convert NodeList to Array to have more methods
let cells = Array.from(CELLS)

cells.forEach((cell) => {
    cell.addEventListener("mousedown", () => {
        isMouseDown = true;
        cell.style.backgroundColor = currentMode === modes.COLOR? currentColor : getRainbowColor();
    });

    cell.addEventListener("mouseover", () => {
        if (isMouseDown) {
            cell.style.backgroundColor = currentMode === modes.COLOR? currentColor : getRainbowColor();
        }

    });

});


