// glenmontScript.js

// Use the shared engine
const T = window.YardTools;

// Get the grid container for Glenmont
const grid = document.getElementById("grid");

// ============================================
// BUILD GLENMONT YARD ROWS
// ============================================

// ER1 – 4 cells
T.buildRightRow(grid, 4, "ER1");

// Y1 – Y3 → 5 cells each
for (let i = 1; i <= 3; i++) {
    T.buildRightRow(grid, 5, "Y" + i);
}

// Y4 → 6 cells
T.buildRightRow(grid, 6, "Y4");

// Y5 – Y7 → 7 cells each
for (let i = 5; i <= 7; i++) {
    T.buildRightRow(grid, 7, "Y" + i);
}

// Y8 – Y11 → 6 cells each
for (let i = 8; i <= 11; i++) {
    T.buildRightRow(grid, 6, "Y" + i);
}

// ============================================
// TRACK NAME MAP (WMATA → display label)
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

// ============================================
// LOAD WMATA DATA
// ============================================

T.loadWMATA("Glenmont Yard", map);
