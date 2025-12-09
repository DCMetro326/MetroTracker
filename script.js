const grid = document.getElementById("grid");
const rowMap = {};   // rowMap[trackNumber] = [cells/spacers...]
// Specialty track name → internal label mapping
const specialtyMap = {
    "1N": "1n",
    "2N": "2n",
    "3N": "3n",
    "4N": "4n",
    "5N": "5n",
    "5AN": "5an",
    "6N": "6n",
    "7N": "7n",
    "P1": "P1",
    "P2": "P2"
};


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

    // Row number label
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowNumber;
    grid.appendChild(label);

    rowMap[rowNumber] = cells;
}

// NEW — left-aligned specialty tracks
function addRowLeftAligned(cellCount, rowLabel) {
    const cells = [];

    // Visible rectangles
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Fill remaining space with invisible spacers so rows align
    const rightSpacerCount = 8 - cellCount;
    for (let i = 0; i < rightSpacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer);
    }

    // Row label
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowLabel;
    grid.appendChild(label);

    rowMap[rowLabel] = cells;
}

// ------------------------------------------
// ADD SPECIAL LEFT-SIDE TRACKS
// ------------------------------------------

addRowLeftAligned(4, "1n");
addRowLeftAligned(4, "2n");
addRowLeftAligned(5, "3n");
addRowLeftAligned(5, "4n");
addRowLeftAligned(5, "5n");
addRowLeftAligned(2, "5an");
addRowLeftAligned(4, "6n");
addRowLeftAligned(4, "7n");
addRowLeftAligned(1, "P1");
addRowLeftAligned(1, "P2");

// ------------------------------------------
// EXISTING RIGHT-SIDE TRACKS
// ------------------------------------------

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
        const data = JSON.parse(rawText);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) {
            console.error("Could not locate CurrentConsists section.");
            return;
        }

        for (const item of consists) {
            if (item.LocationName?.trim() !== "Greenbelt Yard")
                continue;

            let rawTrack = item.TrackName?.trim();
            if (!rawTrack) continue;
            
            // FIRST: check if it is a specialty track
            let trackKey = specialtyMap[rawTrack.toUpperCase()];
            
            if (!trackKey) {
                // Not a specialty track → try numeric
                let num = parseInt(rawTrack, 10);
                if (isNaN(num)) continue;
                trackKey = num;
            }
            
            let cars = item.Cars?.trim();
            if (!cars) continue;
            
            let carSegments = cars.split(".");
            
            // Assign cars to the correct track (numeric or special)
            for (const segment of carSegments) {
                assignTrainToTrack(segment, trackKey);
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
