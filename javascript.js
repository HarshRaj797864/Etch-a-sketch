const grid = document.querySelector(".grid");
const gridSize = 16
// Create cells
for (let i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");

    grid.appendChild(cell);

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
        cell.setAttribute("style", "background-color: red")
    });

    cell.addEventListener("mouseover", () => {
        if (isMouseDown === true) {
            cell.setAttribute("style", "background-color: red");
        }

    });

});

