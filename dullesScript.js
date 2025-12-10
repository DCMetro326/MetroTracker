// dullesScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE — Shuttle Tracks SH1–SH5 (3 trains each)
// ===================================================

const shuttles = ["Sh1", "Sh2", "Sh3", "Sh4", "Sh5"];
shuttles.forEach(sh => T.buildLeftRow(left, 3, sh));


// ===================================================
// RIGHT SIDE — 16 → 7 (6 trains) and 6 → 1 (4 trains)
// ===================================================

// Tracks 16 → 7 : 6 trains each
for (let t = 16; t >= 7; t--) {
    T.buildRightRow(right, 6, t.toString());
}

// Tracks 6 → 1 : 4 trains each
for (let t = 6; t >= 1; t--) {
    T.buildRightRow(right, 4, t.toString());
}


// ===================================================
// TRACK MAP — numeric, zero-padded, shuttle tracks
// ===================================================

const map = {};

// Numeric tracks 1–16
for (let i = 1; i <= 16; i++) {
    const normal  = i.toString();            // "7"
    const padded2 = normal.padStart(2, "0"); // "07"
    const padded3 = normal.padStart(3, "0"); // "007"

    map[normal]  = normal;
    map[padded2] = normal;
    map[padded3] = normal;
}

// Shuttle tracks: SH1–SH5 (case-insensitive)
shuttles.forEach(sh => {
    map[sh.toUpperCase()] = sh;   // "SH1" → "Sh1"
});


// ===================================================
// LOAD WMATA DATA FOR THIS YARD
// ===================================================

T.loadWMATA("Dulles Yard", map);
