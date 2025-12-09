// =========================================
// SHARED ENGINE — GLOBAL NAMESPACE
// =========================================

window.YardTools = {
    rowMap: {},

    // Store unassigned trains for popups
    unassigned: [],   // NEW ALERT FEATURE

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

    // ======================================
    // ASSIGN TRAIN (with overflow detection + highlight special trains)
    // ======================================
    assignTrain(track, train) {
        const cells = this.rowMap[track];
        if (!cells) return false;   // allow detection
    
        for (let i = cells.length - 1; i >= 0; i--) {
            if (cells[i].classList.contains("cell") &&
                cells[i].textContent.trim() === "") {
    
                // Place the train
                cells[i].textContent = train;
    
                // Check for special trains in this segment
                const specialTrains = ["1000","1001","2000","2001","4000","4001","7002","7003"];
                const segments = train.split("-"); // handle "1001-2000"
                if (segments.some(s => specialTrains.includes(s.trim()))) {
                    cells[i].style.backgroundColor = "#00BFFF"; // blue
                    cells[i].style.color = "white"; // for contrast
                }
    
                return true; // successfully assigned
            }
        }
    
        return false; // no room
    },


    // ======================================
    // NEW ALERT FUNCTION
    // ======================================
    showAlerts() {
        if (this.unassigned.length === 0) return;

        let msg = "⚠️ UNASSIGNED TRAINS FOUND\n\n";

        this.unassigned.forEach(item => {
            msg += `Cars: ${item.cars}\nTrackName: ${item.track}\nReason: ${item.reason}\n\n`;
        });

        alert(msg);
        this.unassigned = []; // clear after showing
    },

    // ======================================
    // WMATA LOADER WITH UNASSIGNED DETECTION
    // ======================================
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

                const trackName = item.TrackName?.trim();
                if (!trackName) continue;

                const upper = trackName.toUpperCase();
                const mapped = map[upper];

                const cars = item.Cars?.trim() || "(unknown cars)";

                // 1️⃣ TRACK NOT IN MAP → ALERT
                if (!mapped) {
                    this.unassigned.push({
                        track: trackName,
                        cars,
                        reason: "Track not defined for this yard"
                    });
                    continue;
                }

                // 2️⃣ TRY TO PLACE CARS IN CELLS
                const segments = cars.split(".");

                for (const seg of segments) {
                    const success = this.assignTrain(mapped, seg);

                    // 2️⃣ NO SPACE AVAILABLE → ALERT
                    if (!success) {
                        this.unassigned.push({
                            track: trackName,
                            cars: seg,
                            reason: `No room in track ${mapped}`
                        });
                    }
                }
            }

            // Show alerts at end
            this.showAlerts();

        } catch (err) {
            console.error(`Error loading WMATA data for ${yardName}:`, err);
        }
    }
};
