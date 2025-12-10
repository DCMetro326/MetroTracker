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
    // ASSIGN TRAIN (with overflow detection + external special train list)
    // ======================================
    assignTrain(track, train) {
        const cells = this.rowMap[track];
        if (!cells) return false;
    
        for (let i = cells.length - 1; i >= 0; i--) {
            if (cells[i].classList.contains("cell") &&
                cells[i].textContent.trim() === "") {
    
                // Place train text
                cells[i].textContent = train;

                // NEW — save after each assignment
                this.saveState();
    
                // Load special train mapping
                const types = window.specialTrainTypes || {};
    
                // Break train pair ("1001-2000")
                const segments = train.split("-").map(s => s.trim());
    
                // Detect which type applies
                let matchedType = null;
    
                outer:
                for (let type in types) {
                    for (let num of types[type]) {
                        if (segments.includes(num)) {
                            matchedType = type;
                            break outer;
                        }
                    }
                }
    
                // Apply CSS class if matched
                if (matchedType) {
                    cells[i].classList.add(`special-${matchedType}`);
                }
    
                return true;
            }
        }
    
        return false;
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

            // CLEAR THE GRID BEFORE NEW DATA FILLS IT
            this.clearCells();

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
    },

    // ======================================
    // SAVE CURRENT GRID STATE (text + classes)
    // ======================================
    saveState() {
        const state = {};
    
        for (const [track, cells] of Object.entries(this.rowMap)) {
            state[track] = cells.map(c => ({
                text: c.textContent.trim(),
                classes: Array.from(c.classList)
                    .filter(cls => cls !== "cell" && cls !== "spacer")
            }));
        }
    
        localStorage.setItem("yardState", JSON.stringify(state));
    },
    
    
    // ======================================
    // RESTORE PREVIOUS GRID STATE
    // (text + CSS classes)
    // ======================================
    restoreState() {
        const saved = localStorage.getItem("yardState");
        if (!saved) return;
    
        const state = JSON.parse(saved);
    
        for (const [track, savedCells] of Object.entries(state)) {
            const cells = this.rowMap[track];
            if (!cells) continue;
    
            savedCells.forEach((info, i) => {
                const cell = cells[i];
                if (!cell) return;
    
                if (cell.classList.contains("cell")) {
                    cell.textContent = info.text;
    
                    // remove old special classes
                    cell.classList.forEach(cls => {
                        if (cls !== "cell") cell.classList.remove(cls);
                    });
    
                    // restore special classes
                    info.classes.forEach(cls => cell.classList.add(cls));
                }
            });
        }
    },

    // ======================================
    // CLEAR TEXT + SPECIAL CLASSES (but keep grid structure)
    // ======================================
    clearCells() {
        for (const cells of Object.values(this.rowMap)) {
            cells.forEach(cell => {
                if (cell.classList.contains("cell")) {
                    cell.textContent = "";
    
                    // Remove all special classes, keep only "cell"
                    cell.className = "cell";
                }
            });
        }
    }



};
