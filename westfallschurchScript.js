// westFallsChurchScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE
// ===================================================

// Lettered tracks
T.buildLeftRow(left, 3, "6H");
T.buildLeftRow(left, 3, "6G");

// Numeric 16 → 21 (4 trains each)
for (let t = 16; t <= 21; t++) {
    T.buildLeftRow(left, 4, t.toString());
}


// ===================================================
// RIGHT SIDE
// ===================================================

// Special 1-series
T.buildRightRow(right, 5, "1c");
T.buildRightRow(right, 5, "1b");
T.buildRightRow(right, 6, "1a");

// Tracks 1 → 4: 6 trains each
for (let t = 1; t <= 4; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// 6-series (lettered)
T.buildRightRow(right, 4, "6e");
T.buildRightRow(right, 4, "6d");
T.buildRightRow(right, 4, "6c");
T.buildRightRow(right, 4, "6b");
T.buildRightRow(right, 4, "6a");

// Track 6 (numeric): 4 trains
T.buildRightRow(right, 4, "6");

// Track 7: 5 trains
T.buildRightRow(right, 5, "7");

// Tracks 8 → 10: 6 trains each
for (let t = 8; t <= 10; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// Track 11: 7 trains
T.buildRightRow(right, 7, "11");


// ===================================================
// TRACK MAP — map incoming WMATA API names
// ===================================================

const map = {};

function addMap(entry) {
    map[entry.toUpperCase()] = entry;
}

// Left-side alpha tracks
["6H", "6G"].forEach(t => addMap(t));

// Left-side numeric tracks 16–21
for (let t = 16; t <= 21; t++) {
    const normal = t.toString();
    addMap(normal);
    addMap(normal.padStart(2, "0"));
    addMap(normal.padStart(3, "0"));
}

// Right-side alpha tracks
["1C","1B","1A","6E","6D","6C","6B","6A"].forEach(t => addMap(t));

// Numeric tracks 1–11
for (let t = 1; t <= 11; t++) {
    const norm  = t.toString();
    const p2    = norm.padStart(2, "0");
    const p3    = norm.padStart(3, "0");
    addMap(norm);
    addMap(p2);
    addMap(p3);
}


// ===================================================
// LOAD WMATA DATA FOR THIS YARD
// ===================================================

T.loadWMATA("West Falls Church Yard", map);
