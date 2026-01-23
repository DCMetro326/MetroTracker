async function loadMainline() {
    const grid = document.getElementById("mainGrid");

    try {
        const res = await fetch(
            "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain"
        );
        const raw = await res.text();
        const data = JSON.parse(raw);

        const consists =
            data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

        if (!consists) return;

        // MAINLINE ONLY
        const mainline = consists.filter(
            c => c.LocationName?.trim() === "Mainline"
        );

        // GROUP BY CONSIST
        const grouped = {};
        for (const item of mainline) {
            const id = item.ConsistID;
            if (!grouped[id]) {
                grouped[id] = {
                    DestCode: item.DestCode?.trim() || "",
                    ConsistLength: Number(item.ConsistLength) || 0,
                    Cars: []
                };
            }

            const segments = item.Cars?.split(".").map(s => s.trim()) || [];
            grouped[id].Cars.push(...segments);
        }

        // SORT BY DEST CODE
        const sorted = Object.values(grouped).sort((a, b) => {
            const A = parseInt(a.DestCode) || 0;
            const B = parseInt(b.DestCode) || 0;
            return A - B;
        });

        // SPECIAL TRAIN MAP
        const specialTypes = window.specialTrainTypes || {};

        // BUILD ROWS
        sorted.forEach(consist => {
            let segmentCount = Math.ceil(consist.ConsistLength / 2);
            segmentCount = Math.max(segmentCount, consist.Cars.length);

            
            for (let i = 0; i < (8 - segmentCount); i++) {
                const spacer = document.createElement("div");
                spacer.className = "spacer";
                grid.appendChild(spacer);
            }

            for (let i = 0; i < segmentCount; i++) {
                const cars = consist.Cars[i] || "";
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = cars;

                const segments = cars.split("-").map(s => s.trim());

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

            const destCode = consist.DestCode || "";

            const destCodeString = String(destCode).trim();

            // Check if the DestCode exists in the destinations data
            const destinationInfo = window.destinations[destCodeString];

            if (destinationInfo) {
                const lbl = document.createElement("div");
                lbl.className = "dest-label";

                const destCodeSpan = document.createElement("span");
                destCodeSpan.textContent = destCodeString;

                // Set the text and color as specified in the destinations.js
                lbl.appendChild(destCodeSpan);
                lbl.innerHTML += ` - ${destinationInfo.stationName} (${destinationInfo.displayName})`;
                lbl.style.color = destinationInfo.color;  // Apply the color

                grid.appendChild(lbl);
            } else {
                // Destination not found
                const lbl = document.createElement("div");
                lbl.className = "dest-label";
                lbl.textContent = `${destCodeString} - Unknown Destination`;
                lbl.style.color = "gray";
                grid.appendChild(lbl);
            }
        });

    } catch (err) {
        console.error("Error loading Mainline consists:", err);
    }
}

loadMainline();
