// branchAveScript.js

const T = window.YardTools;

const left = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");

// ============================================
// LEFT SIDE ROWS
// ============================================

// 2n → 2 trains
T.buildLeftRow(left, 2, "2n");

// 1n → 2 trains
T.buildLeftRow(left, 2, "1n");


// ============================================
// RIGHT SIDE ROWS
// ============================================

// Tracks 15 → 11: 6 trains each
for (let t = 15; t >= 11; t--) {
    T.buildRightRow(right, 6, t.toString());
}

// Tracks 10 → 9: 7 trains each
for (let t = 10; t >= 9; t--) {
    T.buildRightRow(right, 7, t.toString());
}

// Tracks 8 → 6: 6 trains each
for (let t = 8; t >= 6; t--) {
    T.buildRightRow(right, 6, t.toString());
}

// Tracks 5 → 1: 5 trains each
for (let t = 5; t >= 1; t--) {
    T.buildRightRow(right, 5, t.toString());
}


// ============================================
// TRACK MAP (with padded numbers)
// ============================================

const map = {
    "1N":"1n",
    "2N":"2n"
};

// Auto-generate mapping for 1–15
for (let i = 1; i <= 15; i++) {
    const normal = i.toString();          // "1"
    const padded2 = normal.padStart(2, "0"); // "01"

    map[normal] = normal;
    map[padded2] = normal;
}


// ============================================
// LOAD WMATA DATA
// ============================================

T.loadWMATA("Branch Avenue Yard", map);
