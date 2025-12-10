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

        // ------------------------------
        // FILTER TO MAINLINE ONLY
        // ------------------------------
        const mainlineConsists = consists.filter(
            c => c.LocationName?.trim() === "Mainline"
        );

        // ------------------------------
        // GROUP BY CONSISTID
        // ------------------------------
        const byConsist = {};

        for (const item of mainlineConsists) {
            const id = item.ConsistID;

            if (!byConsist[id]) {
                byConsist[id] = {
                    DestCode: item.DestCode?.trim() || "",
                    Cars: [],
                    ConsistLength: Number(item.ConsistLength) || 0
                };
            }

            // Split cars by "." into segments
            const segments = item.Cars?.split(".").map(s => s.trim()) || [];
            byConsist[id].Cars.push(...segments);
        }

        // ------------------------------
        // BUILD A ROW PER CONSIST
        // ------------------------------
        Object.values(byConsist).forEach(consist => {
            const row = document.createElement("div");
            row.className = "consist-row";

            // Create 1 cell per car segment (or however many ConsistLength says)
            const carCount = Math.max(consist.ConsistLength, consist.Cars.length);

            for (let i = 0; i < carCount; i++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = consist.Cars[i] || "";
                row.appendChild(cell);
            }

            // DESTINATION LABEL
            const dest = document.createElement("div");
            dest.className = "dest-label";
            dest.textContent = consist.DestCode || "--";

            row.appendChild(dest);
            grid.appendChild(row);
        });

    } catch (err) {
        console.error("Error loading mainline:", err);
    }
}

loadMainline();
