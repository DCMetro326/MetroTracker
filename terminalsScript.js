// terminalsScript.js

const T = window.YardTools;

const shadyGrove = document.getElementById("shadyGrove");
const glenmont = document.getElementById("glenmont");
const huntington = document.getElementById("huntington");
const newCarrollton = document.getElementById("newCarrollton");
const mtVernonSq = document.getElementById("mtVernonSq");
const greenbelt = document.getElementById("greenbelt");
const branchAve = document.getElementById("branchAve");
const largo = document.getElementById("largo");
const franconia = document.getElementById("franconia");
const vienna = document.getElementById("vienna");
const ashburn = document.getElementById("ashburn");
const grosvenor = document.getElementById("grosvenor");
const silverSpring = document.getElementById("silverSpring");
const wiehle = document.getElementById("wiehle");


// ===================================================
// GRID TRACKS
// ===================================================

// Shady Grove
T.buildRightRow(shadyGrove, 4, "A1");
T.buildRightRow(shadyGrove, 4, "A2");

// Glenmont
T.buildRightRow(glenmont, 4, "B1");
T.buildRightRow(glenmont, 4, "B2");

// Huntington
T.buildRightRow(huntington, 4, "C1");
T.buildRightRow(huntington, 4, "C2");

// New Carrollton
T.buildRightRow(newCarrollton, 4, "D1");
T.buildRightRow(newCarrollton, 4, "D2");

// Mt Vernon Sq
T.buildRightRow(mtVernonSq, 4, "E1");
T.buildRightRow(mtVernonSq, 4, "E2");

// Greenbelt
T.buildRightRow(greenbelt, 4, "E1 ");
T.buildRightRow(greenbelt, 4, "E2 ");

// Branch Ave
T.buildRightRow(branchAve, 4, "F1");
T.buildRightRow(branchAve, 4, "F2");

// Downtown Largo
T.buildRightRow(largo, 4, "G1");
T.buildRightRow(largo, 4, "G2");
T.buildRightRow(largo, 6, "41");
T.buildRightRow(largo, 8, "42");
T.buildRightRow(largo, 5, "43");
T.buildRightRow(largo, 3, "44");
T.buildRightRow(largo, 3, "45");

// Franconia
T.buildRightRow(franconia, 4, "J1");
T.buildRightRow(franconia, 4, "J2");

// Vienna
T.buildRightRow(vienna, 4, "K1");
T.buildRightRow(vienna, 4, "K2");

// Ashburn
T.buildRightRow(ashburn, 4, "N1");
T.buildRightRow(ashburn, 4, "N2");
T.buildRightRow(ashburn, 4, "71");

// Grosvenor
T.buildRightRow(grosvenor, 4, "A1 ");
T.buildRightRow(grosvenor, 4, "A2 ");

// Silver Spring
T.buildRightRow(silverSpring, 4, "B1 ");
T.buildRightRow(silverSpring, 4, "B2 ");

// Wiehle
T.buildRightRow(wiehle, 4, "N1 ");
T.buildRightRow(wiehle, 4, "N2 ");


// ===================================================
// TRACK MAP
// ===================================================

const shadyGroveMap = {};
const glenmontMap = {};
const huntingtonMap = {};
const newCarrolltonMap = {};
const mtVernonSqMap = {};
const greenbeltMap = {};
const branchAveMap = {};
const largoMap = {};
const franconiaMap = {};
const viennaMap = {};
const ashburnMap = {};
const grosvenorMap = {};
const silverSpringMap = {};
const wiehleMap = {};

function addTrack(map, raw, mapped) {
    map[raw] = mapped;
    map[raw.padStart(2, "0")] = mapped;
}

// Shady Grove
addTrack(shadyGroveMap, "1", "A1");
addTrack(shadyGroveMap, "2", "A2");

// Glenmont
addTrack(glenmontMap, "1", "B1");
addTrack(glenmontMap, "2", "B2");

// Huntington
addTrack(huntingtonMap, "1", "C1");
addTrack(huntingtonMap, "2", "C2");

// New Carrollton
addTrack(newCarrolltonMap, "1", "D1");
addTrack(newCarrolltonMap, "2", "D2");

// Mt Vernon Sq
addTrack(mtVernonSqMap, "1", "E1");
addTrack(mtVernonSqMap, "2", "E2");

// Greenbelt
addTrack(greenbeltMap, "1", "E1 ");
addTrack(greenbeltMap, "2", "E2 ");

// Branch Ave
addTrack(branchAveMap, "1", "F1");
addTrack(branchAveMap, "2", "F2");

// Largo
addTrack(largoMap, "1", "G1");
addTrack(largoMap, "2", "G2");
addTrack(largoMap, "41", "41");
addTrack(largoMap, "42", "42");
addTrack(largoMap, "43", "43");
addTrack(largoMap, "44", "44");
addTrack(largoMap, "45", "45");

// Franconia
addTrack(franconiaMap, "1", "J1");
addTrack(franconiaMap, "2", "J2");

// Vienna
addTrack(viennaMap, "1", "K1");
addTrack(viennaMap, "2", "K2");

// Ashburn
addTrack(ashburnMap, "1", "N1");
addTrack(ashburnMap, "2", "N2");
addTrack(ashburnMap, "71", "71");

// Grosvenor
addTrack(grosvenorMap, "1", "A1 ");
addTrack(grosvenorMap, "2", "A2 ");

// Silver Spring
addTrack(silverSpringMap, "1", "B1 ");
addTrack(silverSpringMap, "2", "B2 ");

// Wiehle
addTrack(wiehleMap, "1", "N1 ");
addTrack(wiehleMap, "2", "N2 ");

T.clearCells();

T.loadWMATA("Shady Grove", shadyGroveMap, { clear: false });
T.loadWMATA("Glenmont", glenmontMap, { clear: false });
T.loadWMATA("Huntington", huntingtonMap, { clear: false });
T.loadWMATA("New Carrollton", newCarrolltonMap, { clear: false });
T.loadWMATA("Mt Vernon Sq", mtVernonSqMap, { clear: false });
T.loadWMATA("Greenbelt", greenbeltMap, { clear: false });
T.loadWMATA("Branch Ave", branchAveMap, { clear: false });
T.loadWMATA("Downtown Largo", largoMap, { clear: false });
T.loadWMATA("Franconia - Springfield", franconiaMap, { clear: false });
T.loadWMATA("Vienna", viennaMap, { clear: false });
T.loadWMATA("Ashburn", ashburnMap, { clear: false });
T.loadWMATA("Grosvenor - Strathmore", grosvenorMap, { clear: false });
T.loadWMATA("Silver Spring", silverSpringMap, { clear: false });
T.loadWMATA("Wiehle-Reston East", wiehleMap, { clear: false });


