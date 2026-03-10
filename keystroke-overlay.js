(function () {
    'use strict';

    const waitForDOM = setInterval(() => {
        if (document.body && document.head) {
            clearInterval(waitForDOM);
            initHUD();
        }
    }, 100);

    function initHUD() {
        console.log('[Keystrokes HUD] Init triggered');

        const layout = [
            ['ESC', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12'],
            ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACK'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
            ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
            ['CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', 'FN', 'MENU', 'CTRL'],
            ['', '', '←', '↑', '↓', '→']
        ];

        const keyMap = {};

        const hud = document.createElement('div');
        hud.id = 'keyboardHud';
        document.body.appendChild(hud);

        const style = document.createElement('style');
        style.textContent = `
            #keyboardHud {
                position: fixed;
                top: 100px;
                left: 100px;
                display: flex;
                flex-direction: column;
                gap: 3px;
                background: rgba(20, 20, 20, 0.8);
                padding: 10px;
                border-radius: 10px;
                z-index: 999999999 !important;
                cursor: move;
                user-select: none;
                pointer-events: auto;
            }

            .row {
                display: flex;
                gap: 3px;
            }

            .key {
                min-width: 40px;
                height: 40px;
                background: rgba(50, 50, 50, 0.9);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                font-size: 12px;
                text-transform: uppercase;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }

            .key.active {
                background: white;
                color: black;
            }

            .key.wide { min-width: 60px; }
            .key.extra-wide { min-width: 100px; }
            .key.space { min-width: 240px; }
        `;
        document.head.appendChild(style);

        layout.forEach(rowKeys => {
            const row = document.createElement('div');
            row.className = 'row';
            rowKeys.forEach(label => {
                if (!label) {
                    const spacer = document.createElement('div');
                    spacer.style.width = '10px';
                    row.appendChild(spacer);
                    return;
                }
                const key = document.createElement('div');
                key.className = 'key';
                key.textContent = label;

                if (['TAB', 'CAPS', 'SHIFT', 'CTRL', 'ALT', 'BACK', 'ENTER'].includes(label)) key.classList.add('wide');
                if (['SPACE'].includes(label)) key.classList.add('space');
                if (['ESC', 'FN', 'MENU', 'WIN'].includes(label)) key.classList.add('extra-wide');

                row.appendChild(key);
                keyMap[label.toUpperCase()] = key;
            });
            hud.appendChild(row);
        });

        document.addEventListener('keydown', e => {
            const label = getKeyLabel(e);
            if (label && keyMap[label]) keyMap[label].classList.add('active');
        });

        document.addEventListener('keyup', e => {
            const label = getKeyLabel(e);
            if (label && keyMap[label]) keyMap[label].classList.remove('active');
        });

        function getKeyLabel(e) {
            if (e.code.startsWith('Arrow')) return e.key.toUpperCase();
            if (e.key === ' ') return 'SPACE';
            if (e.key === 'Meta') return 'WIN';
            if (e.key === 'Control') return 'CTRL';
            if (e.key === 'Alt') return 'ALT';
            if (e.key === 'Shift') return 'SHIFT';
            if (e.key === 'CapsLock') return 'CAPS';
            if (e.key === 'Enter') return 'ENTER';
            if (e.key === 'Tab') return 'TAB';
            if (e.key === 'Backspace') return 'BACK';
            return e.key.length === 1 ? e.key.toUpperCase() : e.key.toUpperCase();
        }

        // Drag to move
        let isDragging = false, offsetX = 0, offsetY = 0;
        hud.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - hud.getBoundingClientRect().left;
            offsetY = e.clientY - hud.getBoundingClientRect().top;
        });
        document.addEventListener('mousemove', e => {
            if (isDragging) {
                hud.style.left = `${e.clientX - offsetX}px`;
                hud.style.top = `${e.clientY - offsetY}px`;
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        console.log('[Keystrokes HUD] Ready!');
    }
})();
