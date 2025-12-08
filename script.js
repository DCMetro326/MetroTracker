const grid = document.getElementById("grid");

// Store rows so the train assignment function can find them
const rowMap = {};   // rowMap[trackNumber] = array of cell elements

// Adds a row with N right-aligned visible cells
function addRowRightAligned(cellCount, rowNumber) {
    const cells = [];

    // Invisible left spacers
    const leftSpacerCount = 8 - cellCount;
    for (let i = 0; i < leftSpacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer); // still keep in array for indexing
    }

    // Real visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Row number
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowNumber;
    grid.appendChild(label);

    rowMap[rowNumber] = cells;
}

// ----- BUILD ROWS -----

// New special rows (top)
addRowRightAligned(4, 20);
addRowRightAligned(5, 19);
addRowRightAligned(5, 18);
addRowRightAligned(3, 17);

// Main rows
for (let r = 16; r >= 1; r--) {
    addRowRightAligned(8, r);
}

// ----- FUNCTION TO ASSIGN TRAINS -----

function assignTrainToTrack(trainNumber, trackNumber) {
    const row = rowMap[trackNumber];
    if (!row) {
        console.error("Track", trackNumber, "not found.");
        return;
    }

    // find the rightmost empty real cell
    for (let i = row.length - 1; i >= 0; i--) {
        let cell = row[i];
        if (cell.classList.contains("cell") && cell.textContent.trim() === "") {
            cell.textContent = trainNumber;
            return;
        }
    }

    console.warn("No empty rectangles available in track", trackNumber);
}

// ----- TEST CALL -----
assignTrainToTrack("3140-3141", 20);
