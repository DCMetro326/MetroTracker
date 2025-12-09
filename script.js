// =========================================
// SHARED ENGINE — script.js
// =========================================

export const rowMap = {};

export function buildLeftRow(grid, cellCount, label) {
    const cells = [];
    const lbl = document.createElement("div");
    lbl.className = "row-number";
    lbl.textContent = label;
    grid.appendChild(lbl);

    for (let i = 0; i < cellCount; i++) {
        const c = document.createElement("div");
        c.className = "cell";
        grid.appendChild(c);
        cells.push(c);
    }

    for (let i = cellCount; i < 8; i++) {
        const s = document.createElement("div");
        s.className = "spacer";
        grid.appendChild(s);
        cells.push(s);
    }

    rowMap[label] = cells;
}

export function buildRightRow(grid, cellCount, label) {
    const cells = [];

    for (let i = 0; i < 8 - cellCount; i++) {
        const s = document.createElement("div");
        s.className = "spacer";
        grid.appendChild(s);
        cells.push(s);
    }

    for (let i = 0; i < cellCount; i++) {
        const c = document.createElement("div");
        c.className = "cell";
        grid.appendChild(c);
        cells.push(c);
    }

    const lbl = document.createElement("div");
    lbl.className = "row-number";
    lbl.textContent = label;
    grid.appendChild(lbl);

    rowMap[label] = cells;
}

export function assignTrain(track, train) {
    const cells = rowMap[track];
    if (!cells) return;

    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains("cell") &&
            cells[i].textContent.trim() === "") 
        {
            cells[i].textContent = train;
            return;
        }
    }
}

// =========================================
// SHARED API LOADER
// =========================================
export async function loadWMATA(yardName, map) {
    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain"
        );
        const raw = await res.text();
        const data = JSON.parse(raw);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) return;

        for (const item of consists) {
            if (item.LocationName?.trim() !== yardName) continue;

            const track = item.TrackName?.trim();
            if (!track) continue;

            const mapped = map[track.toUpperCase()];
            if (!mapped) continue;

            const cars = item.Cars?.trim();
            if (!cars) continue;

            cars.split(".").forEach(seg => assignTrain(mapped, seg));
        }
    } catch (e) {
        console.error(`Error loading WMATA data for ${yardName}:`, e);
    }
}
