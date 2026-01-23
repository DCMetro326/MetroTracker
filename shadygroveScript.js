// shadyGroveScript.js

const T = window.YardTools;

const left = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");

// ===================================================
// LEFT SIDE TRACKS
// ===================================================

// Tracks 1-3: 4 trains each
for (let t = 1; t <= 3; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// Track 4: 5 trains
T.buildLeftRow(left, 5, "4");

// Tracks 5-7: 4 trains each
for (let t = 5; t <= 7; t++) {
    T.buildLeftRow(left, 4, t.toString());
}

// Tracks 7a,8a,9a,10,S1,S2: 4 trains each
T.buildLeftRow(left, 4, "7a");
T.buildLeftRow(left, 4, "8a");
T.buildLeftRow(left, 4, "9a");
T.buildLeftRow(left, 4, "10");
T.buildLeftRow(left, 4, "S1");
T.buildLeftRow(left, 4, "S2");


// ===================================================
// RIGHT SIDE TRACKS
// ===================================================

// Cell List Test
const rightTracks = [
    {label:"10C", cells:5},
    {label:"10B", cells:5},
    {label:"10A", cells:5},
    {label:"10",  cells:5},
    {label:"11",  cells:5},
    {label:"12",  cells:6},
    {label:"13",  cells:6},
    {label:"14",  cells:7},
    {label:"15",  cells:8},
    {label:"16",  cells:7},
    {label:"17",  cells:7},
    {label:"18",  cells:7},
    {label:"19",  cells:6},
    {label:"20",  cells:5},
    {label:"21",  cells:4}
];

rightTracks.forEach(t => T.buildRightRow(right, t.cells, t.label));


// ===================================================
// TRACK MAP
// ===================================================

const map = {
    "1":"1",
    "2":"2",
    "3":"3",
    "4":"4",
    "5":"5",
    "6":"6",
    "7":"7",
    "07A":"7a",
    "08A":"8a",
    "09A":"9a",
    "10":"10",
    "S1":"S1",
    "S2":"S2",
    "10A":"10A",
    "10B":"10B",
    "10C":"10C",
    "11":"11",
    "12":"12",
    "13":"13",
    "14":"14",
    "15":"15",
    "16":"16",
    "17":"17",
    "18":"18",
    "19":"19",
    "20":"20",
    "21":"21"
};

// Numeric tracks 1–21
for (let i = 1; i <= 21; i++) {
    const normal = i.toString();           // "1"
    const padded2 = normal.padStart(2, "0"); // "01"

    map[normal] = i;
    map[padded2] = i;
}


T.loadWMATA("Shady Grove Yard", map);
