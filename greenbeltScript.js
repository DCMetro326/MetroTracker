import { buildLeftRow, buildRightRow, loadWMATA } from "./script.js";

const left = document.getElementById("leftGrid");
const right = document.getElementById("rightGrid");

buildLeftRow(left, 4, "1n");
buildLeftRow(left, 4, "2n");
buildLeftRow(left, 5, "3n");
buildLeftRow(left, 5, "4n");
buildLeftRow(left, 5, "5n");
buildLeftRow(left, 2, "5an");
buildLeftRow(left, 4, "6n");
buildLeftRow(left, 4, "7n");
buildLeftRow(left, 1, "P1");
buildLeftRow(left, 1, "P2");

buildRightRow(right, 4, 20);
buildRightRow(right, 5, 19);
buildRightRow(right, 5, 18);
buildRightRow(right, 3, 17);
for (let r = 16; r >= 1; r--) buildRightRow(right, 8, r);

const map = {
    "1N": "1n", "2N": "2n", "3N": "3n", "4N": "4n",
    "5N": "5n", "5AN": "5an", "6N": "6n", "7N": "7n",
    "P1":"P1","P2":"P2"
};

for (let i = 1; i <= 20; i++)
    map[i.toString()] = i;

loadWMATA("Greenbelt Yard", map);
