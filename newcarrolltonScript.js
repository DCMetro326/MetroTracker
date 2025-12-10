// newCarrolltonScript.js

const T = window.YardTools;

const left = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE TRACKS
// ===================================================

// Tracks 1 → 2 : 4 trains each
for (let t = 1; t <= 2; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// Tracks 6 & 6A : 3 trains each?
T.buildLeftRow(left, 3, "6");
T.buildLeftRow(left, 3, "6A");

// Tracks 17 → 21 : 4 trains each
for (let t = 17; t <= 21; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// Tracks S1 & S2 : 3 trains each?
T.buildLeftRow(left, 3, "S1");
T.buildLeftRow(left, 3, "S2");


// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Track 7 → 5 trains
T.buildRightRow(right, 5, "7");

// Tracks 8 → 9 : 6 trains each
for (let t = 8; t <= 9; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// Track 10 → 7 trains
T.buildRightRow(right, 7, "10");

// Track 11 → 8 trains
T.buildRightRow(right, 8, "11");

// Track 12 → 7 trains
T.buildRightRow(right, 7, "12");

// Track 13 → 6 trains
T.buildRightRow(right, 6, "13");

// Tracks 14 → 16 : 5 trains each
for (let t = 14; t <= 16; t++) {
    T.buildRightRow(right, 5, t.toString());
}


// ===================================================
// TRACK MAP (supports numeric & zero-padded formats)
// ===================================================

const map = {};

// Auto-generate mapping for 1–21
for (let i = 1; i <= 21; i++) {
    const normal = i.toString();            // "7"
    const padded2 = normal.padStart(2, "0"); // "07"

    map[normal] = normal;
    map[padded2] = normal;
}

// Add suffix tracks explicitly
map["6A"] = "6a";
map["S1"] = "S1";
map["S2"] = "S2";

// ===================================================
// LOAD WMATA DATA FOR NEW CARROLLTON
// ===================================================

T.restoreState();
T.loadWMATA("New Carrollton Yard", map);
