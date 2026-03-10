(function () {
    'use strict';

    let container;
    let keyboard;
    let keyMap = {};
    let fullLayout = true;

    const wait = setInterval(() => {
        if (document.body) {
            clearInterval(wait);
            init();
        }
    }, 100);

    function init() {
        container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "120px";
        container.style.left = "120px";
        container.style.zIndex = "9999999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "8px";
        container.style.cursor = "move";

        document.body.appendChild(container);

        const style = document.createElement('style');
        style.textContent = `
            .key.active {
                background: white !important;
                color: black !important;
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);

        createToggle();
        loadLayout();
        enableDrag();

        // Keyboard events
        document.addEventListener("keydown", e => {
            const k = mapKey(e);
            if (keyMap[k]) keyMap[k].classList.add("active");
        });

        document.addEventListener("keyup", e => {
            const k = mapKey(e);
            if (keyMap[k]) keyMap[k].classList.remove("active");
        });

        // Mouse events
        document.addEventListener("mousedown", e => {
            const btn = e.button;
            let label = '';
            if (btn === 0) label = 'LMB';
            else if (btn === 2) label = 'RMB';
            else if (btn === 1) label = 'MMB';
            if (label && keyMap[label]) keyMap[label].classList.add('active');
        });

        document.addEventListener("mouseup", e => {
            const btn = e.button;
            let label = '';
            if (btn === 0) label = 'LMB';
            else if (btn === 2) label = 'RMB';
            else if (btn === 1) label = 'MMB';
            if (label && keyMap[label]) keyMap[label].classList.remove('active');
        });

        container.addEventListener('contextmenu', e => e.preventDefault());
    }

    function createToggle() {
        const btn = document.createElement("div");
        btn.textContent = "🔁";
        btn.className = "toggle-btn";
        btn.style.background = "rgba(0,0,0,.7)";
        btn.style.color = "white";
        btn.style.padding = "6px 10px";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.width = "fit-content";

        btn.onclick = () => {
            fullLayout = !fullLayout;
            loadLayout();
        };

        container.appendChild(btn);
    }

    function loadLayout() {
        if (keyboard) keyboard.remove();
        keyMap = {};

        keyboard = fullLayout
            ? buildFullKeyboard()
            : buildCompactKeyboard();

        container.appendChild(keyboard);
    }

    function createKey(label, width = 40) {
        const k = document.createElement("div");
        k.textContent = label;
        k.dataset.key = label;

        k.style.minWidth = width + "px";
        k.style.height = "40px";
        k.style.background = "rgba(50,50,50,.9)";
        k.style.color = "white";
        k.style.display = "flex";
        k.style.alignItems = "center";
        k.style.justifyContent = "center";
        k.style.borderRadius = "6px";
        k.style.fontSize = "12px";
        k.style.transition = "0.08s";

        k.classList.add("key");
        keyMap[label] = k;
        return k;
    }

    function buildFullKeyboard() {
        const hud = document.createElement("div");
        hud.style.display = "flex";
        hud.style.flexDirection = "column";
        hud.style.gap = "3px";
        hud.style.background = "rgba(20,20,20,.85)";
        hud.style.padding = "10px";
        hud.style.borderRadius = "10px";

        const layout = [
            ['ESC', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12'],
            ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACK'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
            ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
            ['CTRL', 'ALT', 'SPACE', 'ALT', 'CTRL'],
            ['', '', '←', '↑', '↓', '→']
        ];

        layout.forEach(r => {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.gap = "3px";

            r.forEach(label => {
                if (!label) {
                    const spacer = document.createElement("div");
                    spacer.style.width = "10px";
                    row.appendChild(spacer);
                    return;
                }

                let width = 40;
                if (['TAB', 'CAPS', 'SHIFT', 'CTRL', 'ALT', 'BACK', 'ENTER'].includes(label))
                    width = 60;
                if (label === "SPACE") width = 200;

                const k = createKey(label, width);
                row.appendChild(k);
            });

            hud.appendChild(row);
        });

        // Mouse row at the bottom for full layout
        const mouseRow = document.createElement("div");
        mouseRow.style.display = "flex";
        mouseRow.style.gap = "3px";
        mouseRow.style.marginTop = "3px";
        mouseRow.appendChild(createKey("LMB", 60));
        mouseRow.appendChild(createKey("RMB", 60));
        hud.appendChild(mouseRow);

        return hud;
    }

    function buildCompactKeyboard() {
        const hud = document.createElement("div");
        hud.style.display = "flex";
        hud.style.flexDirection = "column";
        hud.style.gap = "6px";
        hud.style.background = "rgba(0,0,0,.6)";
        hud.style.padding = "12px";
        hud.style.borderRadius = "12px";

        function row(center = false) {
            const r = document.createElement("div");
            r.style.display = "flex";
            r.style.gap = "6px";
            if (center) r.style.justifyContent = "center";
            return r;
        }

        // Top row: LMB, W, RMB
        let r1 = row(true);
        r1.appendChild(createKey("LMB", 60)); // wider for visibility
        r1.appendChild(createKey("W"));       // standard width
        r1.appendChild(createKey("RMB", 60));

        let r2 = row();
        r2.appendChild(createKey("A"));
        r2.appendChild(createKey("S"));
        r2.appendChild(createKey("D"));

        let r3 = row();
        r3.appendChild(createKey("Q"));
        r3.appendChild(createKey("E"));

        let r4 = row();
        r4.appendChild(createKey("SHIFT", 100));

        let r5 = row();
        r5.appendChild(createKey("SPACE", 150));

        hud.appendChild(r1);
        hud.appendChild(r2);
        hud.appendChild(r3);
        hud.appendChild(r4);
        hud.appendChild(r5);

        return hud;
    }

    function mapKey(e) {
        if (e.key === " ") return "SPACE";
        if (e.key === "Shift") return "SHIFT";
        if (e.key === "Control") return "CTRL";
        if (e.key === "Alt") return "ALT";
        if (e.key === "Enter") return "ENTER";
        if (e.key === "Tab") return "TAB";
        if (e.key === "Backspace") return "BACK";
        if (e.key.startsWith('Arrow')) return e.key.toUpperCase();
        return e.key.length === 1 ? e.key.toUpperCase() : e.key.toUpperCase();
    }

    function enableDrag() {
        let drag = false, ox = 0, oy = 0;

        container.addEventListener("mousedown", e => {
            if (e.target.closest('.key') || e.target.closest('.toggle-btn')) return;
            drag = true;
            const rect = container.getBoundingClientRect();
            ox = e.clientX - rect.left;
            oy = e.clientY - rect.top;
        });

        document.addEventListener("mousemove", e => {
            if (!drag) return;
            container.style.left = (e.clientX - ox) + "px";
            container.style.top = (e.clientY - oy) + "px";
        });

        document.addEventListener("mouseup", () => drag = false);
    }
})();
