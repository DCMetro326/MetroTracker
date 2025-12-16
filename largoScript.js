// downtownLargoScript.js

const T = window.YardTools;

const right = document.getElementById("grid");


// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Track 42: 8 trains
T.buildRightRow(right, 8, "42");

// Track 43: 5 trains
T.buildRightRow(right, 5, "43");

// Track 41: 6 trains
T.buildRightRow(right, 6, "41");

// Track 44: 2 trains
T.buildRightRow(right, 2, "44");

// Track 45: 3 trains
T.buildRightRow(right, 3, "45");


// ===================================================
// TRACK MAP (handles zero-padding 41/42/43 from API)
// ===================================================

const map = {};

function addTrack(num) {
    const n = num.toString();
    map[n] = n;                    // "42"
    map[n.padStart(2, "0")] = n;   // "42" → "42"
}

addTrack(41);
addTrack(42);
addTrack(43);


// ===================================================
// LOAD WMATA DATA FOR THIS YARD
// ===================================================

T.loadWMATA("Downtown Largo", map);
