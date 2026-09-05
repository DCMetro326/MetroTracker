async function loadSystem() {
    const grid = document.getElementById("systemGrid");
    const status = document.getElementById("status");

    // Clear anything already on the page
    grid.innerHTML = "";

    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpecialTrain"
        );

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        const raw = await res.text();
        const data = JSON.parse(raw);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!Array.isArray(consists)) {
            throw new Error("CurrentConsists data was not found.");
        }

        /*
         * GROUP BY CONSIST ID
         *
         * Unlike the Mainline page, we do NOT filter by LocationName.
         * This means every train in CurrentConsists will be included.
         */
        const grouped = {};

        for (const item of consists) {
            const id = item.ConsistID;

            if (!id) {
                continue;
            }

            if (!grouped[id]) {
                grouped[id] = {
                    ConsistID: id,
                    DestCode: item.DestCode?.trim() || "",
                    TrainID: "",
                    ConsistLength: Number(item.ConsistLength) || 0,
                    Cars: [],
                    LocationName: item.LocationName?.trim() || "",
                    StateCode: item.StateCode?.trim() || "",
                    StateName: item.StateName?.trim() || "",
                    Operator: item.Operator?.trim() || ""
                };
            }

            /*
             * NEW CARS FORMAT:
             *
             * 7038,7039,7681,7680,7256,7257,7135,7134,101
             *
             * The final number is the TrainID.
             */

            const carNumbers = (item.Cars || "")
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);

            if (carNumbers.length > 0) {

                /*
                 * The last number is the three-digit TrainID.
                 */
                const possibleTrainID = carNumbers[carNumbers.length - 1];

                /*
                 * Only treat the last value as TrainID if it looks
                 * like a 3-digit number.
                 */
                if (/^\d{3}$/.test(possibleTrainID)) {
                    grouped[id].TrainID = possibleTrainID;
                    carNumbers.pop();
                }

                /*
                 * Pair the remaining car numbers.
                 *
                 * Example:
                 *
                 * 7038,7039,7681,7680
                 *
                 * becomes:
                 *
                 * 7038-7039
                 * 7681-7680
                 */
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

        /*
         * Convert object into an array.
         */
        const trains = Object.values(grouped);

        /*
         * SORT TRAINS
         *
         * First: Destination code
         * Second: Train ID
         */
        trains.sort((a, b) => {

            const destA = parseInt(a.DestCode) || 9999;
            const destB = parseInt(b.DestCode) || 9999;

            if (destA !== destB) {
                return destA - destB;
            }

            const trainA = parseInt(a.TrainID) || 9999;
            const trainB = parseInt(b.TrainID) || 9999;

            return trainA - trainB;
        });

        /*
         * SPECIAL TRAIN MAP
         */
        const specialTypes = window.specialTrainTypes || {};

        /*
         * BUILD EACH TRAIN
         */
        for (const train of trains) {

            /*
             * Number of paired car segments.
             *
             * ConsistLength is the number of individual cars,
             * so divide by two because each cell represents two cars.
             */
            let segmentCount = Math.ceil(
                train.ConsistLength / 2
            );

            /*
             * If the actual Cars array has more information,
             * make sure we don't lose it.
             */
            segmentCount = Math.max(
                segmentCount,
                train.Cars.length
            );

            /*
             * Keep the same 8-column appearance as the Mainline page.
             */
            segmentCount = Math.min(segmentCount, 8);

            /*
             * Add blank spaces before the cars so shorter trains
             * remain aligned to the right.
             */
            for (let i = 0; i < (8 - segmentCount); i++) {

                const spacer = document.createElement("div");

                spacer.className = "spacer";

                grid.appendChild(spacer);
            }

            /*
             * CREATE CAR CELLS
             */
            for (let i = 0; i < segmentCount; i++) {

                const cars = train.Cars[i] || "";

                const cell = document.createElement("div");

                cell.className = "cell";

                cell.textContent = cars;

                /*
                 * Check the individual car numbers against
                 * specialTrains.js.
                 */
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

                /*
                 * Apply special train CSS class.
                 */
                if (matchedType) {
                    cell.classList.add(
                        `special-${matchedType}`
                    );
                }

                grid.appendChild(cell);
            }

            /*
             * DESTINATION / TRAIN INFORMATION
             */
            const destCode = String(
                train.DestCode || ""
            ).trim();

            const destinationInfo =
                window.destinations?.[destCode];

            const label = document.createElement("div");

            label.className = "train-label";

            /*
             * DESTINATION
             */
            if (destinationInfo) {

                label.style.color =
                    destinationInfo.color || "inherit";

                const destCodeSpan =
                    document.createElement("span");

                destCodeSpan.textContent =
                    destCode;

                destCodeSpan.style.fontWeight = "bold";

                label.appendChild(destCodeSpan);

                const destinationText =
                    document.createElement("span");

                destinationText.textContent =
                    ` - ${destinationInfo.stationName} (${destinationInfo.displayName})`;

                label.appendChild(destinationText);

            } else {

                label.style.color = "gray";

                const destinationText =
                    document.createElement("span");

                destinationText.textContent =
                    `${destCode || "No Destination"} - Unknown Destination`;

                label.appendChild(destinationText);
            }

            /*
             * TRAIN ID
             */
            if (train.TrainID) {

                const trainId =
                    document.createElement("span");

                trainId.className = "train-id";

                trainId.textContent =
                    `Train ${train.TrainID}`;

                label.appendChild(trainId);
            }

            /*
             * LOCATION
             */
            if (train.LocationName) {

                const location =
                    document.createElement("span");

                location.className = "location";

                location.textContent =
                    `Location: ${train.LocationName}`;

                label.appendChild(location);
            }

            /*
             * STATE
             */
            if (train.StateName) {

                const state =
                    document.createElement("span");

                state.className = "state";

                state.textContent =
                    `(${train.StateName})`;

                label.appendChild(state);
            }

            /*
             * Add label to the grid.
             */
            grid.appendChild(label);
        }

        /*
         * UPDATE STATUS
         */
        status.textContent =
            `${trains.length} train${trains.length === 1 ? "" : "s"} loaded`;

    } catch (err) {

        console.error(
            "Error loading system consists:",
            err
        );

        status.textContent =
            "Unable to load train data.";

        const error =
            document.createElement("div");

        error.className = "error";

        error.textContent =
            "Error loading train data. Check the browser console for details.";

        grid.appendChild(error);
    }
}


/*
 * LOAD THE SYSTEM
 */
loadSystem();
