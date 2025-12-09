const grid = document.getElementById("grid");
const rowMap = {};

// ------------------------------------------------------
// Creates a right-aligned row: [spacer][spacer][cells][cells]… [label]
// ------------------------------------------------------
function addRowRightAligned(cellCount, label) {
    const cells = [];

    // Add spacers on the left (8 - cells)
    const spacerCount = 8 - cellCount;
    for (let i = 0; i < spacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer);
    }

    // Add visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Add row label
    const lbl = document.createElement("div");
    lbl.className = "row-number";
    lbl.textContent = label;
    grid.appendChild(lbl);

    rowMap[label] = cells;
}

// ------------------------------------------------------
// BUILD GLENMONT YARD TRACKS (in order top→bottom)
// ------------------------------------------------------

// ER1 → 2 trains
addRowRightAligned(2, "ER1");

// Y1 – Y4 → 5 trains each
for (let i = 1; i <= 4; i++) {
    addRowRightAligned(5, "Y" + i);
}

// Y6 – Y11 → 6 trains each
for (let i = 6; i <= 11; i++) {
    addRowRightAligned(6, "Y" + i);
}

// ------------------------------------------------------
// Assign trains (if WMATA JSON is added later)
// ------------------------------------------------------
function assignTrainToTrack(text, trackLabel) {
    const cells = rowMap[trackLabel];
    if (!cells) return;

    // fill from the rightmost cell backwards
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains("cell") && cells[i].textContent === "") {
            cells[i].textContent = text;
            return;
        }
    }
}
