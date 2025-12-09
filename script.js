// get both grids
const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");

const rowMap = {}; // maps row label → array of cells

// ------------------------------------------------------
// BUILD FUNCTIONS
// ------------------------------------------------------

function addRowLeftAligned(cellCount, rowLabel) {
    const cells = [];

    // visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        leftGrid.appendChild(cell);
        cells.push(cell);
    }

    // fill up to 8 units
    for (let i = cellCount; i < 8; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        leftGrid.appendChild(spacer);
        cells.push(spacer);
    }

    // row label
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowLabel;
    leftGrid.appendChild(label);

    rowMap[rowLabel] = cells;
}

function addRowRightAligned(cellCount, rowNumber) {
    const cells = [];

    // left-side spacers
    for (let i = 0; i < 8 - cellCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        rightGrid.appendChild(spacer);
        cells.push(spacer);
    }

    // visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        rightGrid.appendChild(cell);
        cells.push(cell);
    }

    // row label
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowNumber;
    rightGrid.appendChild(label);

    rowMap[rowNumber] = cells;
}

// ------------------------------------------------------
// BUILD ALL ROWS IN ORDER
// ------------------------------------------------------

// SPECIAL TRACKS (left grid)
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

// SPECIAL NUMERIC (right grid)
addRowRightAligned(4, 20);
addRowRightAligned(5, 19);
addRowRightAligned(5, 18);
addRowRightAligned(3, 17);

// MAIN YARD 16 → 1
for (let r = 16; r >= 1; r--) {
    addRowRightAligned(8, r);
}

// ------------------------------------------------------
// ASSIGN TRAINS TO CELLS
// ------------------------------------------------------
function assignTrainToTrack(text, trackKey) {
    const cells = rowMap[trackKey];
    if (!cells) return;

    // fill rightmost available box
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains("cell") && cells[i].textContent === "") {
            cells[i].textContent = text;
            return;
        }
    }
}

// ------------------------------------------------------
// SPECIAL TRACK LOOKUP MAP
// ------------------------------------------------------
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

// ------------------------------------------------------
// LOAD REMOTE WMATA DATA
// ------------------------------------------------------
async function loadYardData() {
    try {
        const res = await fetch("https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain");
        const rawText = await res.text();
        const data = JSON.parse(rawText);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) return;

        for (const item of consists) {
            if (item.LocationName?.trim() !== "Greenbelt Yard") continue;

            let rawTrack = item.TrackName?.trim();
            if (!rawTrack) continue;

            let upper = rawTrack.toUpperCase();

            // specialty?
            let trackKey = specialtyMap[upper];

            // numeric?
            if (!trackKey) {
                let num = parseInt(rawTrack, 10);
                if (!isNaN(num)) trackKey = num;
            }

            if (!trackKey) continue;

            let cars = item.Cars?.trim();
            if (!cars) continue;

            let segments = cars.split(".");

            for (let seg of segments) {
                assignTrainToTrack(seg, trackKey);
            }
        }

    } catch (err) {
        console.error("Error loading yard data:", err);
    }
}

loadYardData();
