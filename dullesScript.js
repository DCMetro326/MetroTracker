// dullesScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE
// ===================================================

// Shop Tracks SH1-SH5
const shops = ["Sh1", "Sh2", "Sh3", "Sh4", "Sh5"];
shops.forEach(sh => T.buildLeftRow(left, 4, sh));

// Tracks S1-S2 : 3 trains each?
T.buildLeftRow(left, 3, "S1");
T.buildLeftRow(left, 3, "S2");


// ===================================================
// RIGHT SIDE
// ===================================================

// Tracks 16-7 : 6 trains each
for (let t = 16; t >= 7; t--) {
    T.buildRightRow(right, 6, t.toString());
}

// Tracks 6-1 : 4 trains each
for (let t = 6; t >= 1; t--) {
    T.buildRightRow(right, 4, t.toString());
}


// ===================================================
// TRACK MAP
// ===================================================

const map = {};

// Numeric tracks 1–16
for (let i = 1; i <= 16; i++) {
    const normal  = i.toString();            // "1"
    const padded2 = normal.padStart(2, "0"); // "01"
    const padded3 = normal.padStart(3, "0"); // "001"

    map[normal]  = normal;
    map[padded2] = normal;
    map[padded3] = normal;
}

// SH1–SH5
shops.forEach(sh => {
    map[sh.toUpperCase()] = sh;
});

map["S1"] = "S1";
map["S2"] = "S2";


T.loadWMATA("Dulles Yard", map);
