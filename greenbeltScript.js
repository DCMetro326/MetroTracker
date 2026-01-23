// greenbeltScript.js

const T = window.YardTools;

const left = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");

// Build left rows
T.buildLeftRow(left, 4, "1n");
T.buildLeftRow(left, 7, "2n");
T.buildLeftRow(left, 5, "3n");
T.buildLeftRow(left, 5, "4n");
T.buildLeftRow(left, 5, "5n");
T.buildLeftRow(left, 3, "5an");
T.buildLeftRow(left, 4, "6n");
T.buildLeftRow(left, 6, "7n");
T.buildLeftRow(left, 1, "P1");
T.buildLeftRow(left, 1, "P2");
T.buildLeftRow(left, 4, "S1");
T.buildLeftRow(left, 4, "S2");


// Build right rows
T.buildRightRow(right, 4, 20);
T.buildRightRow(right, 5, 19);
T.buildRightRow(right, 5, 18);
T.buildRightRow(right, 3, 17);

for (let r = 16; r >= 1; r--) {
    T.buildRightRow(right, 8, r);
}

// Mapping
const map = {
    "1N":"1n","2N":"2n","3N":"3n","4N":"4n","5N":"5n",
    "5AN":"5an","6N":"6n","7N":"7n",
    "P1":"P1","P2":"P2","S1":"S1","S2":"S2"
};

// numeric tracks 1–20
for (let i = 1; i <= 20; i++) {
    const normal = i.toString();        // "1"
    const padded = normal.padStart(2, "0"); // "01"

    map[normal] = i;     // "1" → 1
    map[padded] = i;     // "01" → 1 (FIXES THE PROBLEM)
}

T.loadWMATA("Greenbelt Yard", map);
