const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");

const rowMap = {};

// ------------------------------
// Left-aligned specialized rows
// ------------------------------
function addRowLeftAligned(cellCount, label) {
    const cells = [];

    // Row label first (left)
    const lbl = document.createElement("div");
    lbl.className = "row-number";
    lbl.textContent = label;
    leftGrid.appendChild(lbl);

    // Visible cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        leftGrid.appendChild(cell);
        cells.push(cell);
    }

    // Fill remaining to 8
    for (let i = cellCount; i < 8; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        leftGrid.appendChild(spacer);
        cells.push(spacer);
    }

    rowMap[label] = cells;
}

// ------------------------------
// Right-aligned main rows
// ------------------------------
function addRowRightAligned(cellCount, label) {
    const cells = [];

    const spacerCount = 8 - cellCount;
    for (let i = 0; i < spacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        rightGrid.appendChild(spacer);
        cells.push(spacer);
    }

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        rightGrid.appendChild(cell);
        cells.push(cell);
    }

    const lbl = document.createElement("div");
    lbl.className = "row-number";
    lbl.textContent = label;
    rightGrid.appendChild(lbl);

    rowMap[label] = cells;
}

// ------------------------------
// Build Shady Grove Yard
// ------------------------------

// Left specialized
const leftTracks = ["1","2","3","4","5","6","7a","8a","9a","10"];
leftTracks.forEach(t => addRowLeftAligned(3, t));

// Right main
const rightTracks = [
    {label:"10B", cells:5},
    {label:"10A", cells:5},
    {label:"10", cells:5},
    {label:"11", cells:5},
    {label:"12", cells:6},
    {label:"13", cells:6},
    {label:"14", cells:7},
    {label:"15", cells:8},
    {label:"16", cells:7},
    {label:"17", cells:7},
    {label:"18", cells:7},
    {label:"19", cells:6},
    {label:"20", cells:5},
    {label:"21", cells:4}
];

rightTracks.forEach(t => addRowRightAligned(t.cells, t.label));

// ------------------------------
// Assign train to a track
// ------------------------------
function assignTrainToTrack(text, trackLabel) {
    const cells = rowMap[trackLabel];
    if (!cells) return;

    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains("cell") && cells[i].textContent.trim() === "") {
            cells[i].textContent = text;
            return;
        }
    }
}

// ------------------------------
// WMATA API mapping
// ------------------------------
const shadyGroveMap = {
    "1":"01","2":"02","3":"03","4":"04","5":"05","6":"06","7A":"7a","8A":"8a","9A":"9a","10":"10",
    "10B":"10B","10A":"10A","10":"10","11":"11","12":"12","13":"13","14":"14","15":"15","16":"16","17":"17","18":"18","19":"19","20":"20","21":"21"
};

// ------------------------------
// Load WMATA data
// ------------------------------
async function loadShadyGroveData() {
    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain"
        );
        const rawText = await res.text();
        const data = JSON.parse(rawText);

        const consists = data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;
        if (!consists) return;

        for (const item of consists) {
            if (item.LocationName?.trim() !== "Shady Grove Yard") continue;

            let trackName = item.TrackName?.trim();
            if (!trackName) continue;

            const mapped = shadyGroveMap[trackName.toUpperCase()];
            if (!mapped) continue;

            let cars = item.Cars?.trim();
            if (!cars) continue;

            const segments = cars.split(".");
            segments.forEach(seg => assignTrainToTrack(seg, mapped));
        }

    } catch(err) {
        console.error("Error loading Shady Grove data:", err);
    }
}

// Auto-load
loadShadyGroveData();
