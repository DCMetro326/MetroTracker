// glenmontScript.js

const T = window.YardTools;

const grid = document.getElementById("grid");

// ============================================
// GRID TRACKS
// ============================================

// ER1: 4 trains
T.buildRightRow(grid, 4, "ER1");

// Y1-Y3: 5 trains each
for (let i = 1; i <= 3; i++) {
    T.buildRightRow(grid, 5, "Y" + i);
}

// Y4: 6 trains
T.buildRightRow(grid, 6, "Y4");

// Y5-Y7: 7 trains each
for (let i = 5; i <= 7; i++) {
    T.buildRightRow(grid, 7, "Y" + i);
}

// Y8-Y11: 6 trains each
for (let i = 8; i <= 11; i++) {
    T.buildRightRow(grid, 6, "Y" + i);
}

// ============================================
// TRACK MAP
// ============================================

const map = {
    "ER1":"ER1",
    "Y1":"Y1",
    "Y2":"Y2",
    "Y3":"Y3",
    "Y4":"Y4",
    "Y5":"Y5",
    "Y6":"Y6",
    "Y7":"Y7",
    "Y8":"Y8",
    "Y9":"Y9",
    "Y10":"Y10",
    "Y11":"Y11"
};


T.loadWMATA("Glenmont Yard", map);
