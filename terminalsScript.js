// terminalsScript.js

const T = window.YardTools;

const vienna = document.getElementById("vienna");
const shadyGrove = document.getElementById("shadyGrove");
const greenbelt = document.getElementById("greenbelt");


// ===================================================
// GRID TRACKS
// ===================================================

// Vienna
T.buildRightRow(vienna, 4, "Vienna1");
T.buildRightRow(vienna, 4, "Vienna2");

// Shady Grove
T.buildRightRow(shadyGrove, 4, "ShadyGrove1");
T.buildRightRow(shadyGrove, 4, "ShadyGrove2");

// Greenbelt
T.buildRightRow(greenbelt, 4, "Greenbelt1");
T.buildRightRow(greenbelt, 4, "Greenbelt2");


// ===================================================
// TRACK MAP
// ===================================================

const viennaMap = {};
const shadyGroveMap = {};
const greenbeltMap = {};

function addTrack(map, raw, mapped) {
    map[raw] = mapped;
    map[raw.padStart(2, "0")] = mapped;
}

// Vienna
addTrack(viennaMap, "1", "Vienna1");
addTrack(viennaMap, "2", "Vienna2");

// Shady Grove
addTrack(shadyGroveMap, "1", "ShadyGrove1");
addTrack(shadyGroveMap, "2", "ShadyGrove2");

// Greenbelt
addTrack(greenbeltMap, "1", "Greenbelt1");
addTrack(greenbeltMap, "2", "Greenbelt2");

T.clearCells();

T.loadWMATA("Vienna", viennaMap, { clear: false });
T.loadWMATA("Shady Grove", shadyGroveMap, { clear: false });
T.loadWMATA("Greenbelt", greenbeltMap, { clear: false });
