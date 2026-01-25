// westFallsChurchScript.js

const T = window.YardTools;

const left  = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");


// ===================================================
// LEFT SIDE TRACKS
// ===================================================

// Tracks 6h,6g: 3 trains each
T.buildLeftRow(left, 3, "6h");
T.buildLeftRow(left, 3, "6g");

// Tracks 16-21: 4 trains each
for (let t = 16; t <= 21; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// Track T1: 4 trains?
T.buildLeftRow(left, 4, "T1");

// Tracks S1,S2,S3: 4 trains each?
T.buildLeftRow(left, 4, "S1");
T.buildLeftRow(left, 4, "S2");
T.buildLeftRow(left, 4, "S3");


// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Tracks 1c,1b,1a
T.buildRightRow(right, 5, "1c");
T.buildRightRow(right, 5, "1b");
T.buildRightRow(right, 6, "1a");

// Tracks 1-4: 6 trains each
for (let t = 1; t <= 4; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// Tracks 6e,6d,6c,6b,6a: 4 trains each
T.buildRightRow(right, 4, "6e");
T.buildRightRow(right, 4, "6d");
T.buildRightRow(right, 4, "6c");
T.buildRightRow(right, 4, "6b");
T.buildRightRow(right, 4, "6a");

// Track 6: 4 trains
T.buildRightRow(right, 4, "6");

// Track 7: 5 trains
T.buildRightRow(right, 5, "7");

// Tracks 8-10: 6 trains each
for (let t = 8; t <= 10; t++) {
    T.buildRightRow(right, 6, t.toString());
}

// Track 11: 7 trains
T.buildRightRow(right, 7, "11");


// ===================================================
// TRACK MAP
// ===================================================

const map = {};

// Numeric tracks 1–21
for (let i = 1; i <= 21; i++) {
    const normal = i.toString();            // "1"
    const padded2 = normal.padStart(2, "0"); // "01"

    map[normal] = normal;
    map[padded2] = normal;
}

// Special tracks
map["6A"] = "6a";
map["6B"] = "6b";
map["6C"] = "6c";
map["6D"] = "6d";
map["6E"] = "6e";
map["6G"] = "6g";
map["6H"] = "6h";
map["1A"] = "1a";
map["1B"] = "1b";
map["1C"] = "1c";
map["T1"] = "T1";
map["S1"] = "S1";
map["S2"] = "S2";
map["S3"] = "S3";


T.loadWMATA("West Falls Church Yard", map);
