// brentwoodScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE TRACKS
// ===================================================

// Tracks 7 → 9 : 4 trains each
for (let t = 7; t <= 9; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// 9a, 9b, 9c : 3 trains each
T.buildLeftRow(left, 3, "9a");
T.buildLeftRow(left, 3, "9b");
T.buildLeftRow(left, 3, "9c");

// Tracks 10 → 12 : 3 trains each
for (let t = 10; t <= 12; t++) {
    T.buildLeftRow(left, 3, t.toString());
}

// Track 13 : 2 trains
T.buildRightRow(right, 4, "13");

// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Tracks 1 → 5 : 4 trains each
for (let t = 1; t <= 5; t++) {
    T.buildRightRow(right, 4, t.toString());
}

// Track 6 : 5 trains
T.buildRightRow(right, 5, "6");

// Tracks 17 → 18 : 5 trains each
for (let t = 17; t <= 18; t++) {
    T.buildRightRow(right, 5, t.toString());
}

// Track 19 : 4 trains
T.buildRightRow(right, 4, "19");

// Tracks 20 → 21 : 3 trains each
for (let t = 20; t <= 21; t++) {
    T.buildRightRow(right, 3, t.toString());
}


// ===================================================
// TRACK MAP (numeric, zero-padded, alpha suffixes)
// ===================================================

const map = {};

// Numeric tracks 1–21
for (let i = 1; i <= 21; i++) {
    const normal  = i.toString();           // "7"
    const padded2 = normal.padStart(2, "0"); // "07"
    const padded3 = normal.padStart(3, "0"); // "007"

    map[normal]  = normal;
    map[padded2] = normal;
    map[padded3] = normal;
}

// Alpha suffix tracks
map["9A"] = "9a";
map["9B"] = "9b";
map["9C"] = "9c";


// ===================================================
// LOAD WMATA DATA FOR THIS YARD
// ===================================================

T.loadWMATA("Brentwood Yard", map);
