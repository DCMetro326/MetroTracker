async function loadSystem() {
    const grid = document.getElementById("systemGrid");

    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpecialTrain"
        );

        const raw = await res.text();
        const data = JSON.parse(raw);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) return;

        // GROUP BY CONSIST
        const grouped = {};

        for (const item of consists) {
            const id = item.ConsistID;

            if (!grouped[id]) {
                grouped[id] = {
                    DestCode: item.DestCode?.trim() || "",
                    TrainID: "",
                    ConsistLength: Number(item.ConsistLength) || 0,
                    Cars: []
                };
            }

            /*
             * Cars format:
             *
             * 7038,7039,7681,7680,7256,7257,7135,7134,101
             *
             * The final three-digit number is the TrainID.
             */
            const carNumbers = (item.Cars || "")
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);

            if (carNumbers.length > 0) {

                const possibleTrainID =
                    carNumbers[carNumbers.length - 1];

                // Remove the final three-digit TrainID
                if (/^\d{3}$/.test(possibleTrainID)) {
                    grouped[id].TrainID = possibleTrainID;
                    carNumbers.pop();
                }

                // Pair the cars
                for (let i = 0; i < carNumbers.length; i += 2) {
                    const first = carNumbers[i];
                    const second = carNumbers[i + 1];

                    if (second) {
                        grouped[id].Cars.push(`${first}-${second}`);
                    } else {
                        grouped[id].Cars.push(first);
                    }
                }
            }
        }

        // SORT BY DESTINATION CODE
        const sorted = Object.values(grouped).sort((a, b) => {
            const A = parseInt(a.DestCode) || 0;
            const B = parseInt(b.DestCode) || 0;

            if (A !== B) {
                return A - B;
            }

            const trainA = parseInt(a.TrainID) || 0;
            const trainB = parseInt(b.TrainID) || 0;

            return trainA - trainB;
        });

        // SPECIAL TRAIN MAP
        const specialTypes = window.specialTrainTypes || {};

        // BUILD ROWS
        sorted.forEach(consist => {

            let segmentCount =
                Math.ceil(consist.ConsistLength / 2);

            segmentCount = Math.max(
                segmentCount,
                consist.Cars.length
            );

            // Keep the same 8-column layout
            segmentCount = Math.min(segmentCount, 8);

            // Add spacers before shorter trains
            for (let i = 0; i < (8 - segmentCount); i++) {
                const spacer = document.createElement("div");
                spacer.className = "spacer";
                grid.appendChild(spacer);
            }

            // Car cells
            for (let i = 0; i < segmentCount; i++) {

                const cars = consist.Cars[i] || "";

                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = cars;

                // Check for special train types
                const segments = cars
                    .split("-")
                    .map(s => s.trim());

                let matchedType = null;

                outer:
                for (const type in specialTypes) {
                    for (const num of specialTypes[type]) {
                        if (segments.includes(num)) {
                            matchedType = type;
                            break outer;
                        }
                    }
                }

                if (matchedType) {
                    cell.classList.add(`special-${matchedType}`);
                }

                grid.appendChild(cell);
            }

            // DESTINATION LABEL
            const destCode = consist.DestCode || "";
            const destCodeString = String(destCode).trim();

            const destinationInfo =
                window.destinations?.[destCodeString];

            const lbl = document.createElement("div");
            lbl.className = "train-label";

            if (destinationInfo) {

                const destCodeSpan =
                    document.createElement("span");

                destCodeSpan.textContent =
                    destCodeString;

                lbl.appendChild(destCodeSpan);

                lbl.innerHTML +=
                    ` - ${destinationInfo.stationName} (${destinationInfo.displayName})`;

                lbl.style.color =
                    destinationInfo.color;

            } else {

                lbl.textContent =
                    `${destCodeString} - Unknown Destination`;

                lbl.style.color = "gray";
            }

            // THREE-DIGIT TRAIN ID
            if (consist.TrainID) {

                const trainIdSpan =
                    document.createElement("span");

                trainIdSpan.className = "train-id";

                trainIdSpan.textContent =
                    `T${consist.TrainID}`;

                lbl.appendChild(trainIdSpan);
            }

            grid.appendChild(lbl);
        });

    } catch (err) {
        console.error("Error loading system consists:", err);
    }
}

loadSystem();
