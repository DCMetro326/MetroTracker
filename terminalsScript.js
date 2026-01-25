// terminalsScript.js

const T = window.YardTools;

const vienna = document.getElementById("vienna");
const shadyGrove = document.getElementById("shadyGrove");
const greenbelt = document.getElementById("greenbelt");


// ===================================================
// GRID TRACKS
// ===================================================

// Vienna
T.buildRightRow(vienna, 4, "1");
T.buildRightRow(vienna, 4, "2");

// Shady Grove
T.buildRightRow(shadyGrove, 4, "1");
T.buildRightRow(shadyGrove, 4, "2");

// Greenbelt
T.buildRightRow(greenbelt, 4, "1");
T.buildRightRow(greenbelt, 4, "2");


// ===================================================
// TRACK MAP
// ===================================================

const map = {};

function addTrack(num) {
    const n = num.toString();
    map[n] = n;
    map[n.padStart(2, "0")] = n;
}

addTrack(1);
addTrack(2);

// Platform check
function platformOnly(train) {
    return train.StateName === "Platform";
}

T.loadWMATA("Vienna", map, platformOnly);
T.loadWMATA("Shady Grove", map, platformOnly);
T.loadWMATA("Greenbelt", map, platformOnly);
