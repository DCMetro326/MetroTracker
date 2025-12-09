// =========================================
// SHARED ENGINE — NO MODULES
// Everything is inside YardTools global namespace
// =========================================

window.YardTools = {
    rowMap: {},

    buildLeftRow(grid, cellCount, label) {
        const { rowMap } = this;
        const cells = [];

        const lbl = document.createElement("div");
        lbl.className = "row-number";
        lbl.textContent = label;
        grid.appendChild(lbl);

        for (let i = 0; i < cellCount; i++) {
            const c = document.createElement("div");
            c.className = "cell";
            grid.appendChild(c);
            cells.push(c);
        }

        for (let i = cellCount; i < 8; i++) {
            const s = document.createElement("div");
            s.className = "spacer";
            grid.appendChild(s);
            cells.push(s);
        }

        rowMap[label] = cells;
    },

    buildRightRow(grid, cellCount, label) {
        const { rowMap } = this;
        const cells = [];

        for (let i = 0; i < 8 - cellCount; i++) {
            const spacer = document.createElement("div");
            spacer.className = "spacer";
            grid.appendChild(spacer);
            cells.push(spacer);
        }

        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            grid.appendChild(cell);
            cells.push(cell);
        }

        const lbl = document.createElement("div");
        lbl.className = "row-number";
        lbl.textContent = label;
        grid.appendChild(lbl);

        rowMap[label] = cells;
    },

    assignTrain(track, train) {
        const cells = this.rowMap[track];
        if (!cells) return;

        for (let i = cells.length - 1; i >= 0; i--) {
            if (cells[i].classList.contains("cell") &&
                cells[i].textContent.trim() === "") {
                cells[i].textContent = train;
                return;
            }
        }
    },

    async loadWMATA(yardName, map) {
        try {
            const res = await fetch(
                "https://gis.wmata.com/proxy/proxy.ashx?https://gispro.wmata.com/RpmSpecialTrains/api/SpcialTrain"
            );
            const raw = await res.text();
            const data = JSON.parse(raw);

            const consists =
                data?.DataTable?.["diffgr:diffgram"]?.DocumentElement?.CurrentConsists;

            if (!consists) return;

            for (const item of consists) {
                if (item.LocationName?.trim() !== yardName) continue;

                const track = item.TrackName?.trim();
                if (!track) continue;

                const mapped = map[track.toUpperCase()];
                if (!mapped) continue;

                const cars = item.Cars?.trim();
                if (!cars) continue;

                cars.split(".").forEach(seg =>
                    this.assignTrain(mapped, seg)
                );
            }
        } catch (err) {
            console.error(`Error loading WMATA data for ${yardName}:`, err);
        }
    }
};
