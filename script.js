const grid = document.getElementById("grid");
const rowMap = {};   // rowMap[trackNumber] = [cells/spacers...]

// ------------------------------------------
// BUILD THE GRID
// ------------------------------------------

function addRowRightAligned(cellCount, rowNumber) {
    const cells = [];

    // Left spacers (invisible)
    const leftSpacerCount = 8 - cellCount;
    for (let i = 0; i < leftSpacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer);
    }

    // Visible rectangles
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

// Special rows
addRowRightAligned(4, 20);
addRowRightAligned(5, 19);
addRowRightAligned(5, 18);
addRowRightAligned(3, 17);

// 16 → 1 rows
for (let r = 16; r >= 1; r--) {
    addRowRightAligned(8, r);
}


// ------------------------------------------
// FUNCTION: Assign a string into rightmost empty cell
// ------------------------------------------
function assignTrainToTrack(text, trackNumber) {
    const cells = rowMap[trackNumber];
    if (!cells) return;

    // Search from the rightmost end
    for (let i = cells.length - 1; i >= 0; i--) {
        const c = cells[i];
        if (c.classList.contains("cell") && c.textContent.trim() === "") {
            c.textContent = text;
            return;
        }
    }

    console.warn("Track", trackNumber, "has no empty rectangles left.");
}


// ------------------------------------------
// FUNCTION: Load remote yard file
// ------------------------------------------

async function loadYardData() {
    try {
        const res = await fetch("https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain");
        const rawText = await res.text();

        // Parse JSON-like text (it *is* JSON)
        const data = JSON.parse(rawText);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) {
            console.error("Could not locate CurrentConsists section.");
            return;
        }

        // Loop through each consist
        for (const item of consists) {
            if (item.LocationName?.trim() !== "Greenbelt Yard")
                continue;

            let trackName = item.TrackName?.trim();
            if (!trackName) continue;

            // TrackName is "04", "15", etc.
            let trackNumber = parseInt(trackName, 10);
            if (isNaN(trackNumber)) continue;

            let cars = item.Cars?.trim();
            if (!cars) continue;

            // Split cars by periods
            let carSegments = cars.split(".");

            // Place into rightmost slots
            for (const segment of carSegments) {
                assignTrainToTrack(segment, trackNumber);
            }
        }

    } catch (err) {
        console.error("Error loading yard file:", err);
    }
}


// ------------------------------------------
// AUTO-LOAD THE REMOTE FILE
// ------------------------------------------
loadYardData();
