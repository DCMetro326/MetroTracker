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

        // GROUP BY CONSIST ID
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

        // SORT BY DESTCODE NUMERICALLY
        const sorted = Object.values(grouped).sort((a, b) => {
            const A = parseInt(a.DestCode) || 0;
            const B = parseInt(b.DestCode) || 0;
            return A - B;
        });

        // BUILD ROWS IN GRID
        sorted.forEach(consist => {
            // Count of boxes required = ConsistLength / 2
            let segmentCount = Math.ceil(consist.ConsistLength / 2);

            // If Cars[] has more segments, use that instead
            segmentCount = Math.max(segmentCount, consist.Cars.length);

            // 1) LEFT SPACERS TO RIGHT-ALIGN
            for (let i = 0; i < (8 - segmentCount); i++) {
                const spacer = document.createElement("div");
                spacer.className = "spacer";
                grid.appendChild(spacer);
            }

            // 2) CONSIST BOXES (cells)
            for (let i = 0; i < segmentCount; i++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = consist.Cars[i] || "";
                grid.appendChild(cell);
            }

            // 3) DESTINATION LABEL
            const lbl = document.createElement("div");
            lbl.className = "dest-label";
            lbl.textContent = consist.DestCode || "";
            grid.appendChild(lbl);
        });

    } catch (err) {
        console.error("Error loading Mainline:", err);
    }
}

loadMainline();
