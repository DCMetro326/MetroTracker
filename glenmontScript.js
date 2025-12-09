const grid = document.getElementById("grid");
const rowMap = {};

// ------------------------------------------------------
// Creates a right-aligned row: [spacers][cells]... [label]
// ------------------------------------------------------
function addRowRightAligned(cellCount, label) {
    const cells = [];

    // Left-side spacers so visible cells are right aligned
    const spacerCount = 8 - cellCount;
    for (let i = 0; i < spacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer);
    }

    // Visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Label
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
addRowRightAligned(4, "ER1");

// Y1 – Y3 → 5 trains each
for (let i = 1; i <= 3; i++) {
    addRowRightAligned(5, "Y" + i);
}

// Y4 → 6 trains each
addRowRightAligned(6, "Y4");

// Y5 – Y7 → 7 trains each
for (let i = 5; i <= 7; i++) {
    addRowRightAligned(7, "Y" + i);
}

// Y8 – Y11 → 6 trains each
for (let i = 8; i <= 11; i++) {
    addRowRightAligned(6, "Y" + i);
}

// ------------------------------------------------------
// Assign a train into the rightmost available box
// ------------------------------------------------------
function assignTrainToTrack(trainNumber, trackLabel) {
    const cells = rowMap[trackLabel];
    if (!cells) return;

    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains("cell") &&
            cells[i].textContent.trim() === "") {
            cells[i].textContent = trainNumber;
            return;
        }
    }
}

// ------------------------------------------------------
// MAP WMATA TRACK NAMES → Glenmont Yard Display Labels
// ------------------------------------------------------
const glenmontTrackMap = {
    "ER1": "ER1",
    "Y1": "Y1",
    "Y2": "Y2",
    "Y3": "Y3",
    "Y4": "Y4",
    "Y5": "Y5",
    "Y6": "Y6",
    "Y7": "Y7",
    "Y8": "Y8",
    "Y9": "Y9",
    "Y10": "Y10",
    "Y11": "Y11"
};

// ------------------------------------------------------
// LOAD WMATA DATA
// ------------------------------------------------------
async function loadGlenmontData() {
    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain"
        );
        const rawText = await res.text();
        const data = JSON.parse(rawText);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) {
            console.error("No CurrentConsists found");
            return;
        }

        for (const item of consists) {
            if (item.LocationName?.trim() !== "Glenmont Yard") continue;

            let trackName = item.TrackName?.trim();
            if (!trackName) continue;

            let mapped = glenmontTrackMap[trackName.toUpperCase()];
            if (!mapped) continue; // unknown track

            let cars = item.Cars?.trim();
            if (!cars) continue;

            let segments = cars.split(".");

            for (const seg of segments) {
                assignTrainToTrack(seg, mapped);
            }
        }

    } catch (err) {
        console.error("Error loading Glenmont yard data:", err);
    }
}

// auto-load
loadGlenmontData();
