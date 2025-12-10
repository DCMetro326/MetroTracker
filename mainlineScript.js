async function loadMainline() {
    const grid = document.getElementById("main-grid");

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

        // BUILD ROWS
        Object.values(grouped).forEach(consist => {
            let segmentCount = Math.ceil(consist.ConsistLength / 2);

            // fallback if Cars array gives clearer size
            segmentCount = Math.max(segmentCount, consist.Cars.length);

            //
            // 1) Add spacer cells on the LEFT to right-align the consist
            //
            for (let i = 0; i < (8 - segmentCount); i++) {
                const spacer = document.createElement("div");
                spacer.className = "spacer";
                grid.appendChild(spacer);
            }

            //
            // 2) Add the consist’s boxes (cells)
            //
            for (let i = 0; i < segmentCount; i++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = consist.Cars[i] || "";
                grid.appendChild(cell);
            }

            //
            // 3) Add the DestCode label (right-side)
            //
            const lbl = document.createElement("div");
            lbl.className = "dest-label";
            lbl.textContent = consist.DestCode || "";
            grid.appendChild(lbl);
        });

    } catch (err) {
        console.error("Error loading Mainline consists:", err);
    }
}

loadMainline();
