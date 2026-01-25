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
addTrack(viennaMap, "1", "Vienna-1");
addTrack(viennaMap, "2", "Vienna-2");

// Shady Grove
addTrack(shadyGroveMap, "1", "Shady-1");
addTrack(shadyGroveMap, "2", "Shady-2");

// Greenbelt
addTrack(greenbeltMap, "1", "Greenbelt-1");
addTrack(greenbeltMap, "2", "Greenbelt-2");


T.loadWMATA("Vienna", viennaMap);
T.loadWMATA("Shady Grove", shadyGroveMap);
T.loadWMATA("Greenbelt", greenbeltMap);
