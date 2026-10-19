
const trainData = [
    ["3000", "", "To be preserved upon Retirement."],
    ["3001", "", "To be preserved upon Retirement."],
    ["3002", "", ""],
    ["3003", "", ""],
    ["3004", "", ""],
    ["3005", "", ""],
];

function createTrainCard(car) {
    const [number, retired, info] = car;

    const card = document.createElement("div");
    card.className = "car-card";

    // Retired cars
    if (retired.trim() !== "") {
        card.classList.add("retired");
    }

    const image = document.createElement("img");
    image.className = "car-image";
    image.src = `img/${number}.jpg`;
    image.alt = `Railcar ${number}`;
    image.loading = "lazy";

    // No image
    image.addEventListener("error", () => {
        image.style.visibility = "hidden";
    });

    const carNumber = document.createElement("div");
    carNumber.className = "car-number";
    carNumber.textContent = number;

    const carInfo = document.createElement("div");
    carInfo.className = "car-info";
    carInfo.textContent = info;

    card.append(image, carNumber, carInfo);

    return card;
}

// Seperate cars
function loadTrains() {
    const activeGrid = document.getElementById("activeCars");
    const retiredGrid = document.getElementById("retiredCars");

    activeGrid.replaceChildren();
    retiredGrid.replaceChildren();

    trainData.forEach(car => {
        const isRetired = car[1].trim() !== "";
        const card = createTrainCard(car);

        if (isRetired) {
            retiredGrid.appendChild(card);
        } else {
            activeGrid.appendChild(card);
        }
    });

    // Retired section
    document.getElementById("retiredSection").hidden =
        retiredGrid.children.length === 0;
}

document.addEventListener("DOMContentLoaded", loadTrains);
