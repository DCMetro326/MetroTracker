// downtownLargoScript.js

const T = window.YardTools;

const right = document.getElementById("grid");


// ===================================================
// GRID TRACKS
// ===================================================

// Track 42: 8 trains
T.buildRightRow(right, 8, "42");

// Track 43: 5 trains
T.buildRightRow(right, 5, "43");

// Track 41: 6 trains
T.buildRightRow(right, 6, "41");

// Track 44: 3 trains
T.buildRightRow(right, 3, "44");

// Track 45: 3 trains
T.buildRightRow(right, 3, "45");

// Track 1 (Platform): 4 trains
T.buildRightRow(right, 4, "1");

// Track 2 (Platform): 4 trains
T.buildRightRow(right, 4, "2");


// ===================================================
// TRACK MAP
// ===================================================

const map = {};

function addTrack(num) {
    const n = num.toString();
    map[n] = n;
    map[n.padStart(2, "0")] = n;
}

addTrack(41);
addTrack(42);
addTrack(43);
addTrack(44);
addTrack(45);
addTrack(1);
addTrack(2);


T.loadWMATA("Downtown Largo", map);
