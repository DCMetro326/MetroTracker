// alexandriaScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE TRACKS
// ===================================================

// Tracks 1-6: 5 trains each
for (let t = 1; t <= 6; t++) {
    T.buildLeftRow(left, 5, t.toString());
}

// Special left tracks
T.buildLeftRow(left, 2, "6a");
T.buildLeftRow(left, 1, "6b");
T.buildLeftRow(left, 1, "6c");
T.buildLeftRow(left, 2, "6d");
T.buildLeftRow(left, 4, "S1");
T.buildLeftRow(left, 4, "S2");


// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Tracks 10-15: 4 trains each
for (let t = 10; t <= 15; t++) {
    T.buildRightRow(right, 4, t.toString());
}

// Track 16: 5 trains
T.buildRightRow(right, 5, "16");

// Tracks 17-18: 6 trains each
for (let t = 17; t <= 18; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// Track 19: 8 trains
T.buildRightRow(right, 8, "19");

// Tracks 20-22: 7 trains each
for (let t = 20; t <= 22; t++) {
    T.buildRightRow(right, 7, t.toString());
}

// Track 23: 6 trains
T.buildRightRow(right, 6, "23");

// Track 24: 5 trains
T.buildRightRow(right, 5, "24");

// Tracks 25-26: 4 trains each
for (let t = 25; t <= 26; t++) {
    T.buildRightRow(right, 4, t.toString());
}


// ===================================================
// TRACK MAP
// ===================================================

const map = {};

// Numeric tracks 1–26
for (let i = 1; i <= 26; i++) {
    const normal  = i.toString();          // "1"
    const padded2 = normal.padStart(2, "0"); // "01"

    map[normal]  = normal;
    map[padded2] = normal;
}

// Special Tracks
map["6A"] = "6a";
map["6B"] = "6b";
map["6C"] = "6c";
map["6D"] = "6d";
map["S1"] = "S1";
map["S2"] = "S2";


T.loadWMATA("Alexandria Yard", map);
