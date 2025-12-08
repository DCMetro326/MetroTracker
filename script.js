const grid = document.getElementById("grid");
const rowMap = {};   // rowMap[trackNumber] = array of cells/spacers

const TOTAL_COLS = 16;   // doubled from 8


// ----------------------------------------------------
// Build a right-aligned row with N real rectangles
// ----------------------------------------------------
function addRowRightAligned(realCount, rowNumber) {
    const cells = [];

    // Invisible left-side spacers
    const leftSpacerCount = TOTAL_COLS - realCount;
    for (let i = 0; i < leftSpacerCount; i++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        grid.appendChild(spacer);
        cells.push(spacer);
    }

    // Real cells on the RIGHT side
    for (let i = 0; i < realCount; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Row number at far right
    const label = document.createElement("div");
    label.className = "row-number";
    label.textContent = rowNumber;
    grid.appendChild(label);

    rowMap[rowNumber] = cells;
}


// ----------------------------------------------------
// BUILD ALL ROWS
// (Counts are doubled because grid width doubled)
// ----------------------------------------------------

addRowRightAligned(8, 20);   // was 4, now doubled
addRowRightAligned(10, 19);  // was 5 → 10
addRowRightAligned(10, 18);  // was 5 → 10
addRowRightAligned(6, 17);   // was 3 → 6

// Rows 16–1 each have full width = 16 rectangles
for (let r = 16; r >= 1; r--) {
    addRowRightAligned(16, r);
}


// ----------------------------------------------------
// Place one text label in the rightmost empty cell
// ----------------------------------------------------
function assignTrainToTrack(text, trackNumber) {
    const cells = rowMap[trackNumber];
    if (!cells) return;

    for (let i = cells.length - 1; i >= 0; i--) {
        let c = cells[i];
        if (c.classList.contains("cell") && c.textContent.trim() === "") {
            c.textContent = text;
            return;
        }
    }
    console.warn("Track", trackNumber, "has no empty rectangles left.");
}


// ----------------------------------------------------
// Load the yard file, parse consist data
// ----------------------------------------------------
async function loadYardData() {
    try {
        const res = await fetch("LINK_HERE");
        const rawText = await res.text();
        const data = JSON.parse(rawText);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) {
            console.error("Missing CurrentConsists section.");
            return;
        }

        for (const item of consists) {

            // Only Greenbelt Yard
            if (item.LocationName?.trim() !== "Greenbelt Yard")
                continue;

            // Track number
            const trackNumber = parseInt(item.TrackName?.trim());
            if (isNaN(trackNumber)) continue;

            const cars = item.Cars?.trim();
            if (!cars) continue;

            // First split at periods
            const segments = cars.split(".");

            for (let segment of segments) {
                segment = segment.trim();
                if (!segment) continue;

                // Now split at "-" so each car goes in its own box
                const carParts = segment.split("-");

                for (const car of carParts) {
                    assignTrainToTrack(car.trim(), trackNumber);
                }
            }
        }

    } catch (err) {
        console.error("Error loading file:", err);
    }
}


// ----------------------------------------------------
// Auto-execute after page loads
// ----------------------------------------------------
loadYardData();
