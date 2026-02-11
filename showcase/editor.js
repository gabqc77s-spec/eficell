document.addEventListener('DOMContentLoaded', () => {
    const sectionsList = document.getElementById('sectionsList');
    const saveBtn = document.getElementById('saveBtn');
    const previewFrame = document.getElementById('previewFrame');
    const fileInput = document.getElementById('fileInput');

    let content = {};
    let currentUploadCallback = null;
    let history = [];
    let historyIndex = -1;

    // ============================================
    // SECTION ICONS & CONFIG
    // ============================================
    const SECTION_ICONS = {
        templates: '🎨',
        branding: '🏷️',
        styles: '🎭',
        hero: '🚀',
        services: '⚡',
        benefits: '💎',
        team: '👥',
        about: '📖',
        contact: '✉️',
        nav: '🧭',
        footer: '📝'
    };

    const COMMON_ICONS = [
        '⚡', '🔧', '📊', '🌱', '🌍', '🤝', '⚙️', '📚',
        '💚', '🎯', '🏆', '✨', '💡', '🔬', '🛡️', '🚀',
        '❤️', '🔥', '💎', '⭐', '🌟', '🎪', '🧩', '📈',
        '🌐', '🔋', '☀️', '💧', '🏗️', '🧪', '📱', '💻'
    ];

    // ============================================
    // TEMPLATES (matching showcase.js)
    // ============================================
    const TEMPLATE_DATA = {
        solar: { name: 'Solar', desc: 'Energético', color: '#f59e0b' },
        ocean: { name: 'Océano', desc: 'Fluido', color: '#0ea5e9' },
        forest: { name: 'Bosque', desc: 'Natural', color: '#10b981' },
        sunset: { name: 'Atardecer', desc: 'Vibrante', color: '#f43f5e' },
        purple: { name: 'Violeta', desc: 'Premium', color: '#8b5cf6' },
        minimal: { name: 'Minimal', desc: 'Limpio', color: '#525252' }
    };

    let selectedTemplate = 'solar';

    // ============================================
    // CONTENT LOADING & SAVING
    // ============================================
    async function loadContent() {
        try {
            const res = await fetch('../content.json');
            content = await res.json();
            pushHistory();
            renderSidebar();
        } catch (e) {
            console.error('Error loading content', e);
        }
    }

    function updatePreview() {
        if (previewFrame.contentWindow) {
            previewFrame.contentWindow.postMessage({
                type: 'update-content',
                content: content
            }, globalThis.location.origin);
        }
    }

    function sendTemplateChange(templateKey) {
        if (previewFrame.contentWindow) {
            previewFrame.contentWindow.postMessage({
                type: 'change-template',
                template: templateKey
            }, globalThis.location.origin);
        }
    }

    async function saveContent() {
        try {
            const res = await fetch('/api/save-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content, null, 4)
            });
            const data = await res.json();
            if (data.success) {
                saveBtn.textContent = '✅ Guardado!';
                setTimeout(() => { saveBtn.textContent = '💾 Guardar'; }, 2000);
            } else {
                alert('Error al guardar: ' + data.message);
            }
        } catch (e) {
            console.error('Error de red al guardar', e);
            alert('Error de red al guardar');
        }
    }

    // ============================================
    // HISTORY (Undo/Redo)
    // ============================================
    function pushHistory() {
        history = history.slice(0, historyIndex + 1);
        history.push(JSON.parse(JSON.stringify(content)));
        historyIndex = history.length - 1;
        if (history.length > 50) {
            history.shift();
            historyIndex--;
        }
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            content = JSON.parse(JSON.stringify(history[historyIndex]));
            updatePreview();
            renderSidebar();
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            content = JSON.parse(JSON.stringify(history[historyIndex]));
            updatePreview();
            renderSidebar();
        }
    }

    // ============================================
    // IMAGE UPLOAD
    // ============================================
    fileInput.addEventListener('change', async (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                const imageUrl = data.url.startsWith('/') ? data.url : '/' + data.url;
                if (currentUploadCallback) currentUploadCallback(imageUrl);
                pushHistory();
                updatePreview();
                renderSidebar();
            } else {
                alert('Error subiendo imagen: ' + data.message);
            }
        } catch (err) {
            console.error('Error subiendo imagen', err);
            alert('Error subiendo imagen');
        }
        fileInput.value = '';
    });

    function triggerUpload(callback) {
        currentUploadCallback = callback;
        fileInput.click();
    }

    // ============================================
    // HELPER: Create Elements
    // ============================================
    function createSelect(label, options, value, onChange) {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `<label>${label}</label>`;
        const select = document.createElement('select');
        select.className = 'form-control';
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.text = opt.charAt(0).toUpperCase() + opt.slice(1);
            option.selected = opt === value;
            select.appendChild(option);
        });
        select.onchange = (e) => {
            onChange(e.target.value);
            pushHistory();
        };
        div.appendChild(select);
        return div;
    }

    function createTextInput(label, value, onChange) {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `<label>${label}</label>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.value = value || '';
        input.oninput = (e) => {
            onChange(e.target.value);
            updatePreview();
        };
        input.onblur = () => pushHistory();
        div.appendChild(input);
        return div;
    }

    function createTextarea(label, value, rows, onChange) {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `<label>${label}</label>`;
        const textarea = document.createElement('textarea');
        textarea.className = 'form-control';
        textarea.rows = rows || 3;
        textarea.value = value || '';
        textarea.oninput = (e) => {
            onChange(e.target.value);
            updatePreview();
        };
        textarea.onblur = () => pushHistory();
        div.appendChild(textarea);
        return div;
    }

    function createColorInput(label, value, onChange) {
        const div = document.createElement('div');
        div.className = 'color-input-row';
        const lbl = document.createElement('label');
        lbl.textContent = label;
        const input = document.createElement('input');
        input.type = 'color';
        input.value = value || '#ffffff';
        input.oninput = (e) => {
            onChange(e.target.value);
            updatePreview();
        };
        input.onblur = () => pushHistory();
        div.appendChild(lbl);
        div.appendChild(input);
        return div;
    }

    function createIconPicker(currentIcon, onChange) {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        wrapper.innerHTML = '<label>Ícono</label>';

        const trigger = document.createElement('div');
        trigger.className = 'icon-picker-trigger';
        trigger.innerHTML = `${currentIcon || '✨'} <span>Cambiar</span>`;

        const grid = document.createElement('div');
        grid.className = 'icon-grid';

        COMMON_ICONS.forEach(icon => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = icon;
            btn.onclick = () => {
                onChange(icon);
                trigger.innerHTML = `${icon} <span>Cambiar</span>`;
                grid.classList.remove('open');
                pushHistory();
                updatePreview();
            };
            grid.appendChild(btn);
        });

        trigger.onclick = () => grid.classList.toggle('open');
        wrapper.appendChild(trigger);
        wrapper.appendChild(grid);
        return wrapper;
    }

    // ============================================
    // SECTION: Templates
    // ============================================
    function renderTemplatesSection(body) {
        const grid = document.createElement('div');
        grid.className = 'templates-grid';

        Object.entries(TEMPLATE_DATA).forEach(([key, tpl]) => {
            const card = document.createElement('div');
            card.className = 'template-card' + (key === selectedTemplate ? ' selected' : '');
            card.style.setProperty('--tpl-color', tpl.color);
            card.innerHTML = `
                <div class="template-card-dot" style="background:${tpl.color}; box-shadow:0 0 8px ${tpl.color}"></div>
                <div class="template-card-name">${tpl.name}</div>
                <div class="template-card-desc">${tpl.desc}</div>
            `;
            card.onclick = () => {
                selectedTemplate = key;
                sendTemplateChange(key);
                renderSidebar();
            };
            grid.appendChild(card);
        });

        body.appendChild(grid);
    }

    // ============================================
    // SECTION: Branding
    // ============================================
    function renderBrandingSection(section, body) {
        // === Logo Upload ===
        const logoContainer = document.createElement('div');
        logoContainer.className = 'form-group';
        logoContainer.innerHTML = '<label>Logo de la Marca</label>';
        const imgPreview = document.createElement('div');
        imgPreview.className = 'image-preview';
        imgPreview.style.height = '60px';

        if (section.logoUrl) {
            imgPreview.innerHTML = `<img src="${section.logoUrl}" style="height:100%; object-fit:contain;">`;
        } else {
            imgPreview.innerHTML = '<span>📷 Subir Logo</span>';
        }

        imgPreview.onclick = () => {
            triggerUpload((url) => {
                section.logoUrl = url;
                pushHistory();
                updatePreview();
                renderSidebar();
            });
        };
        logoContainer.appendChild(imgPreview);

        // Remove logo button
        if (section.logoUrl) {
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-delete-icon';
            removeBtn.textContent = '✕ Quitar Logo';
            removeBtn.style.cssText = 'margin-top:0.3rem; font-size:0.75rem; width:100%;';
            removeBtn.onclick = () => {
                section.logoUrl = '';
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            logoContainer.appendChild(removeBtn);
        }
        body.appendChild(logoContainer);

        // === Logo Appearance ===
        const appearLabel = document.createElement('label');
        appearLabel.className = 'config-label';
        appearLabel.textContent = '🎨 Apariencia del Logo';
        body.appendChild(appearLabel);

        // Position in navbar
        body.appendChild(createSelect('Posición en Navbar', ['left', 'center', 'right'], section.logoPosition || 'left', (val) => {
            section.logoPosition = val;
            updatePreview();
        }));

        // Protrude from navbar
        const protrudeLabel = document.createElement('label');
        protrudeLabel.className = 'action-checkbox';
        const protrudeCb = document.createElement('input');
        protrudeCb.type = 'checkbox';
        protrudeCb.checked = section.logoOverflow || false;
        protrudeCb.onchange = () => {
            section.logoOverflow = protrudeCb.checked;
            pushHistory();
            updatePreview();
        };
        protrudeLabel.appendChild(protrudeCb);
        protrudeLabel.appendChild(document.createTextNode(' 🔓 Sobresalir de la barra'));
        body.appendChild(protrudeLabel);

        // Vertical offset
        body.appendChild(buildSlider('Offset Vertical', section.logoOffsetY ?? 0, -150, 150, 1, 'px', (v) => { section.logoOffsetY = v; }));

        // Horizontal offset
        body.appendChild(buildSlider('Offset Horizontal', section.logoOffsetX ?? 0, -100, 100, 1, 'px', (v) => { section.logoOffsetX = v; }));

        // Size
        body.appendChild(buildSlider('Tamaño', section.size || 40, 16, 160, 2, 'px', (v) => { section.size = v; }));

        // Border Radius
        body.appendChild(buildSlider('Borde Redondeado', section.logoBorderRadius ?? 0, 0, 50, 1, '%', (v) => { section.logoBorderRadius = v; }));

        // Opacity
        body.appendChild(buildSlider('Opacidad', section.logoOpacity ?? 100, 10, 100, 5, '%', (v) => { section.logoOpacity = v; }));

        // Shadow
        body.appendChild(createSelect('Sombra', ['none', 'soft', 'strong', 'glow'], section.logoShadow || 'none', (val) => {
            section.logoShadow = val;
            updatePreview();
        }));

        // === Logo Animation ===
        const animLabel = document.createElement('label');
        animLabel.className = 'config-label';
        animLabel.textContent = '🎬 Animación del Logo';
        body.appendChild(animLabel);

        // Entrance type
        body.appendChild(createSelect('Entrada', ['none', 'spin-in', 'fade-scale', 'slide-down', 'bounce-in', 'flip-in', 'elastic'], section.logoEntrance || 'none', (val) => {
            section.logoEntrance = val;
            updatePreview();
        }));

        // Entrance delay
        body.appendChild(buildSlider('Delay Entrada', section.logoEntranceDelay ?? 200, 0, 2000, 100, 'ms', (v) => { section.logoEntranceDelay = v; }));

        // Entrance duration
        body.appendChild(buildSlider('Duración Entrada', section.logoEntranceDuration ?? 800, 200, 3000, 100, 'ms', (v) => { section.logoEntranceDuration = v; }));

        // Hover effect
        body.appendChild(createSelect('Efecto Hover', ['none', 'glow', 'pulse', 'spin', 'grow', 'shake', 'brightness'], section.logoHover || 'none', (val) => {
            section.logoHover = val;
            updatePreview();
        }));

        // Hover scale
        if (section.logoHover === 'grow' || !section.logoHover || section.logoHover === 'none') {
            // show hover scale for grow or as general option
        }
        body.appendChild(buildSlider('Escala Hover', section.logoHoverScale ?? 110, 100, 150, 5, '%', (v) => { section.logoHoverScale = v; }));

        // === Scroll Behavior ===
        const scrollLabel = document.createElement('label');
        scrollLabel.className = 'config-label';
        scrollLabel.textContent = '📜 Comportamiento al Scroll';
        body.appendChild(scrollLabel);

        // Shrink ratio (how much it shrinks)
        body.appendChild(buildSlider('Ratio Encogimiento', section.shrinkRatio ?? 70, 30, 100, 5, '%', (v) => { section.shrinkRatio = v; }));

        // === Network Grid Colors ===
        const netLabel = document.createElement('label');
        netLabel.className = 'config-label';
        netLabel.textContent = '🌐 Colores de la Red de Fondo';
        body.appendChild(netLabel);

        body.appendChild(createColorInput('Color Líneas', section.networkLineColor || '#f59e0b', (v) => { section.networkLineColor = v; }));
        body.appendChild(createColorInput('Color Brillo', section.networkGlowColor || '#fbbf24', (v) => { section.networkGlowColor = v; }));

        // === Nav Behaviors (composable) ===
        const navLabel = document.createElement('label');
        navLabel.className = 'config-label';
        navLabel.textContent = '🧭 Comportamientos de Navegación';
        body.appendChild(navLabel);

        if (!section.navBehaviors) section.navBehaviors = ['sticky'];

        const behaviors = [
            { key: 'sticky', label: '📌 Fijo al hacer scroll' },
            { key: 'shrink', label: '🔽 Encoger al bajar' },
            { key: 'auto-hide', label: '👁 Ocultar al bajar, mostrar al subir' },
            { key: 'scroll-reveal', label: '📜 Aparecer después del hero' }
        ];

        const behaviorContainer = document.createElement('div');
        behaviorContainer.className = 'nav-behaviors-list';

        behaviors.forEach(b => {
            const label = document.createElement('label');
            label.className = 'action-checkbox';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = section.navBehaviors.includes(b.key);
            cb.onchange = () => {
                if (cb.checked) {
                    if (!section.navBehaviors.includes(b.key)) section.navBehaviors.push(b.key);
                } else {
                    section.navBehaviors = section.navBehaviors.filter(x => x !== b.key);
                }
                pushHistory();
                updatePreview();
            };
            label.appendChild(cb);
            label.appendChild(document.createTextNode(' ' + b.label));
            behaviorContainer.appendChild(label);
        });

        body.appendChild(behaviorContainer);
    }

    // Helper: reusable slider builder
    function buildSlider(labelText, value, min, max, step, unit, onChange) {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `<label>${labelText}: <strong>${value}${unit}</strong></label>`;
        const sl = document.createElement('input');
        sl.type = 'range';
        sl.min = String(min);
        sl.max = String(max);
        sl.step = String(step);
        sl.value = String(value);
        sl.style.width = '100%';
        sl.oninput = (e) => {
            const v = Number(e.target.value);
            group.querySelector('strong').textContent = v + unit;
            onChange(v);
            updatePreview();
        };
        sl.onchange = () => pushHistory();
        group.appendChild(sl);
        return group;
    }

    // ============================================
    // SECTION: Styles
    // ============================================
    function renderStylesSection(section, body) {
        body.appendChild(createColorInput('Color Primario', section.primary, (v) => { section.primary = v; }));
        body.appendChild(createColorInput('Color Secundario', section.secondary, (v) => { section.secondary = v; }));
        body.appendChild(createColorInput('Fondo Oscuro', section.bgDark, (v) => { section.bgDark = v; }));
    }

    // ============================================
    // SECTION: Hero
    // ============================================
    function renderHeroSection(section, body) {
        body.appendChild(createTextInput('Título', section.title, (v) => { section.title = v; }));
        body.appendChild(createTextarea('Subtítulo', section.subtitle, 3, (v) => { section.subtitle = v; }));
        body.appendChild(createTextInput('Botón Primario', section.ctaPrimary, (v) => { section.ctaPrimary = v; }));
        body.appendChild(createTextInput('Botón Secundario', section.ctaSecondary, (v) => { section.ctaSecondary = v; }));

        // Stats
        if (section.stats && Array.isArray(section.stats)) {
            const statsLabel = document.createElement('label');
            statsLabel.textContent = 'Estadísticas';
            statsLabel.style.cssText = 'display:block; font-size:0.75rem; font-weight:500; color:var(--text-muted); margin:0.85rem 0 0.4rem;';
            body.appendChild(statsLabel);

            const statsGrid = document.createElement('div');
            statsGrid.className = 'stats-grid';

            section.stats.forEach((stat, i) => {
                const card = document.createElement('div');
                card.className = 'stat-card';

                const delBtn = document.createElement('button');
                delBtn.className = 'btn-delete-stat';
                delBtn.textContent = '✕';
                delBtn.type = 'button';
                delBtn.onclick = () => {
                    section.stats.splice(i, 1);
                    pushHistory();
                    updatePreview();
                    renderSidebar();
                };
                card.appendChild(delBtn);

                const numInput = document.createElement('input');
                numInput.type = 'text';
                numInput.className = 'form-control';
                numInput.value = stat.number || '';
                numInput.placeholder = 'Valor';
                numInput.style.marginBottom = '0.35rem';
                numInput.oninput = (e) => { stat.number = e.target.value; updatePreview(); };
                numInput.onblur = () => pushHistory();
                card.appendChild(numInput);

                const lblInput = document.createElement('input');
                lblInput.type = 'text';
                lblInput.className = 'form-control';
                lblInput.value = stat.label || '';
                lblInput.placeholder = 'Etiqueta';
                lblInput.style.fontSize = '0.78rem';
                lblInput.oninput = (e) => { stat.label = e.target.value; updatePreview(); };
                lblInput.onblur = () => pushHistory();
                card.appendChild(lblInput);

                statsGrid.appendChild(card);
            });

            body.appendChild(statsGrid);

            const addStatBtn = document.createElement('button');
            addStatBtn.className = 'btn-add';
            addStatBtn.textContent = '+ Agregar Estadística';
            addStatBtn.type = 'button';
            addStatBtn.style.marginTop = '0.5rem';
            addStatBtn.onclick = () => {
                section.stats.push({ number: '0', label: 'Nueva Stat' });
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            body.appendChild(addStatBtn);
        }
    }

    // ============================================
    // SECTION: About
    // ============================================
    function renderAboutSection(section, body) {
        body.appendChild(createTextarea('Descripción Principal', section.description, 4, (v) => { section.description = v; }));
        body.appendChild(createTextarea('Objetivo', section.objective, 2, (v) => { section.objective = v; }));

        // Mission
        const missionCard = document.createElement('div');
        missionCard.className = 'item-card';
        missionCard.style.marginTop = '0.75rem';
        const missionTitle = document.createElement('div');
        missionTitle.className = 'item-card-number';
        missionTitle.textContent = '🎯 Misión';
        missionCard.appendChild(missionTitle);
        missionCard.appendChild(createTextInput('Título', section.mission?.title, (v) => {
            if (!section.mission) section.mission = {};
            section.mission.title = v;
        }));
        missionCard.appendChild(createTextarea('Texto', section.mission?.text, 3, (v) => {
            if (!section.mission) section.mission = {};
            section.mission.text = v;
        }));
        body.appendChild(missionCard);

        // Vision
        const visionCard = document.createElement('div');
        visionCard.className = 'item-card';
        visionCard.style.marginTop = '0.5rem';
        const visionTitle = document.createElement('div');
        visionTitle.className = 'item-card-number';
        visionTitle.textContent = '🔭 Visión';
        visionCard.appendChild(visionTitle);
        visionCard.appendChild(createTextInput('Título', section.vision?.title, (v) => {
            if (!section.vision) section.vision = {};
            section.vision.title = v;
        }));
        visionCard.appendChild(createTextarea('Texto', section.vision?.text, 3, (v) => {
            if (!section.vision) section.vision = {};
            section.vision.text = v;
        }));
        body.appendChild(visionCard);
    }

    // ============================================
    // SECTION: Nav
    // ============================================
    function renderNavSection(section, body) {
        body.appendChild(createTextInput('Texto CTA', section.cta, (v) => { section.cta = v; }));

        if (section.items && Array.isArray(section.items)) {
            const label = document.createElement('label');
            label.textContent = 'Ítems del menú';
            label.style.cssText = 'display:block; font-size:0.75rem; font-weight:500; color:var(--text-muted); margin:0.5rem 0 0.4rem;';
            body.appendChild(label);

            const list = document.createElement('div');
            list.className = 'nav-items-list';

            section.items.forEach((item, i) => {
                const row = document.createElement('div');
                row.className = 'nav-item-row';

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                input.value = item;
                input.oninput = (e) => {
                    section.items[i] = e.target.value;
                    updatePreview();
                };
                input.onblur = () => pushHistory();

                const del = document.createElement('button');
                del.className = 'btn-icon btn-delete-icon';
                del.textContent = '✕';
                del.type = 'button';
                del.onclick = () => {
                    section.items.splice(i, 1);
                    pushHistory();
                    updatePreview();
                    renderSidebar();
                };

                row.appendChild(input);
                row.appendChild(del);
                list.appendChild(row);
            });

            body.appendChild(list);

            const addBtn = document.createElement('button');
            addBtn.className = 'btn-add';
            addBtn.textContent = '+ Agregar Ítem';
            addBtn.type = 'button';
            addBtn.onclick = () => {
                section.items.push('Nuevo');
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            body.appendChild(addBtn);
        }
    }

    // ============================================
    // SECTION: Contact
    // ============================================
    function renderContactSection(section, body) {
        body.appendChild(createTextInput('Título', section.title, (v) => { section.title = v; }));
        body.appendChild(createTextarea('Subtítulo', section.subtitle, 2, (v) => { section.subtitle = v; }));
    }

    // ============================================
    // SECTION: Footer
    // ============================================
    function renderFooterSection(section, body) {
        body.appendChild(createTextInput('Copyright', section.copyright, (v) => { section.copyright = v; }));
    }


    // ============================================
    // ITEM CARD BUILDER
    // ============================================
    function buildItemCard(section, key, item, index) {
        const card = document.createElement('div');
        card.className = 'item-card';

        // Header with number and controls
        const header = document.createElement('div');
        header.className = 'item-card-header';

        const number = document.createElement('span');
        number.className = 'item-card-number';
        number.textContent = `#${index + 1}`;
        header.appendChild(number);

        const controls = document.createElement('div');
        controls.className = 'item-controls';

        if (index > 0) {
            const upBtn = document.createElement('button');
            upBtn.textContent = '↑';
            upBtn.type = 'button';
            upBtn.title = 'Mover arriba';
            upBtn.onclick = () => {
                [section.items[index], section.items[index - 1]] = [section.items[index - 1], section.items[index]];
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            controls.appendChild(upBtn);
        }

        if (index < section.items.length - 1) {
            const downBtn = document.createElement('button');
            downBtn.textContent = '↓';
            downBtn.type = 'button';
            downBtn.title = 'Mover abajo';
            downBtn.onclick = () => {
                [section.items[index], section.items[index + 1]] = [section.items[index + 1], section.items[index]];
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            controls.appendChild(downBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn-delete-icon';
        deleteBtn.title = 'Eliminar';
        deleteBtn.onclick = () => {
            if (confirm('¿Eliminar este elemento?')) {
                section.items.splice(index, 1);
                pushHistory();
                updatePreview();
                renderSidebar();
            }
        };
        controls.appendChild(deleteBtn);
        header.appendChild(controls);
        card.appendChild(header);

        // Icon picker (if item has icon)
        if (item.icon !== undefined) {
            card.appendChild(createIconPicker(item.icon, (icon) => { item.icon = icon; }));
        }

        // Title / Name
        card.appendChild(createTextInput('Título', item.title || item.name || '', (v) => {
            if (item.title !== undefined) item.title = v;
            if (item.name !== undefined) item.name = v;
        }));

        // Description / Role
        card.appendChild(createTextInput('Descripción / Rol', item.description || item.role || '', (v) => {
            if (item.description !== undefined) item.description = v;
            if (item.role !== undefined) item.role = v;
        }));

        // Image preview + image controls (for team)
        if (item.image !== undefined) {
            const imgGroup = document.createElement('div');
            imgGroup.className = 'form-group';
            imgGroup.innerHTML = '<label>Imagen</label>';

            const imgPreview = document.createElement('div');
            imgPreview.className = 'image-preview';
            if (item.image) {
                const imgEl = document.createElement('img');
                imgEl.src = item.image;
                if (item.imgPosition) imgEl.style.objectPosition = item.imgPosition;
                if (item.imgZoom && item.imgZoom !== 1) imgEl.style.transform = `scale(${item.imgZoom})`;
                imgPreview.appendChild(imgEl);
            } else {
                imgPreview.innerHTML = '<span>📷 Subir Imagen</span>';
            }
            imgPreview.onclick = () => {
                triggerUpload((url) => { item.image = url; });
            };
            imgGroup.appendChild(imgPreview);

            // Image position sliders (X% / Y%)
            if (key === 'team' && item.image) {
                // Parse current position or default to 50% 50%
                const parsePos = (pos) => {
                    if (!pos) return [50, 50];
                    const parts = pos.replace(/%/g, '').split(' ');
                    return [parseFloat(parts[0]) || 50, parseFloat(parts[1]) || 50];
                };
                const [posX, posY] = parsePos(item.imgPosition);

                // X position
                const xGroup = document.createElement('div');
                xGroup.className = 'form-group';
                xGroup.innerHTML = `<label>Posición X: <strong>${posX.toFixed(0)}%</strong></label>`;
                const xSlider = document.createElement('input');
                xSlider.type = 'range';
                xSlider.min = '0';
                xSlider.max = '100';
                xSlider.step = '1';
                xSlider.value = posX;
                xSlider.style.width = '100%';
                xSlider.oninput = (e) => {
                    const x = e.target.value;
                    const curY = item.imgPosition ? parsePos(item.imgPosition)[1] : 50;
                    item.imgPosition = `${x}% ${curY}%`;
                    xGroup.querySelector('strong').textContent = x + '%';
                    const img = imgPreview.querySelector('img');
                    if (img) img.style.objectPosition = item.imgPosition;
                    updatePreview();
                };
                xSlider.onchange = () => pushHistory();
                xGroup.appendChild(xSlider);
                imgGroup.appendChild(xGroup);

                // Y position
                const yGroup = document.createElement('div');
                yGroup.className = 'form-group';
                yGroup.innerHTML = `<label>Posición Y: <strong>${posY.toFixed(0)}%</strong></label>`;
                const ySlider = document.createElement('input');
                ySlider.type = 'range';
                ySlider.min = '0';
                ySlider.max = '100';
                ySlider.step = '1';
                ySlider.value = posY;
                ySlider.style.width = '100%';
                ySlider.oninput = (e) => {
                    const y = e.target.value;
                    const curX = item.imgPosition ? parsePos(item.imgPosition)[0] : 50;
                    item.imgPosition = `${curX}% ${y}%`;
                    yGroup.querySelector('strong').textContent = y + '%';
                    const img = imgPreview.querySelector('img');
                    if (img) img.style.objectPosition = item.imgPosition;
                    updatePreview();
                };
                ySlider.onchange = () => pushHistory();
                yGroup.appendChild(ySlider);
                imgGroup.appendChild(yGroup);

                // Zoom slider
                const zoomGroup = document.createElement('div');
                zoomGroup.className = 'form-group';
                zoomGroup.innerHTML = `<label>Zoom: <strong>${(item.imgZoom || 1).toFixed(1)}x</strong></label>`;
                const zoomSlider = document.createElement('input');
                zoomSlider.type = 'range';
                zoomSlider.min = '0.5';
                zoomSlider.max = '2.5';
                zoomSlider.step = '0.1';
                zoomSlider.value = item.imgZoom || 1;
                zoomSlider.style.width = '100%';
                zoomSlider.oninput = (e) => {
                    item.imgZoom = parseFloat(e.target.value);
                    zoomGroup.querySelector('strong').textContent = item.imgZoom.toFixed(1) + 'x';
                    updatePreview();
                };
                zoomSlider.onchange = () => pushHistory();
                zoomGroup.appendChild(zoomSlider);
                imgGroup.appendChild(zoomGroup);
            }

            card.appendChild(imgGroup);
        }

        return card;
    }

    // ============================================
    // ITEMS SECTION RENDERER
    // ============================================
    function renderItemsSection(key, section, body) {
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-list';

        section.items.forEach((item, index) => {
            itemsContainer.appendChild(buildItemCard(section, key, item, index));
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add';
        addBtn.type = 'button';
        addBtn.textContent = '+ Agregar Elemento';
        addBtn.onclick = () => {
            const newItem = {};
            if (key === 'team') {
                newItem.name = 'Nuevo Miembro';
                newItem.role = 'Rol';
                newItem.image = '';
            } else {
                newItem.title = 'Nuevo Elemento';
                newItem.description = 'Descripción';
                newItem.icon = '✨';
            }
            section.items.push(newItem);
            pushHistory();
            updatePreview();
            renderSidebar();
        };

        body.appendChild(itemsContainer);
        body.appendChild(addBtn);
    }

    // ============================================
    // CONFIG ROW BUILDER (with effects builder)
    // ============================================

    const AVAILABLE_TRIGGERS = ['hover', 'click', 'dblclick'];
    const TRIGGER_LABELS = { hover: '🖱 Hover', click: '👆 Click', dblclick: '👆👆 DblClick' };
    const AVAILABLE_ACTIONS = ['scale', 'lift', 'glow', 'pulse', 'border-flow', 'blur-others', 'dim', 'slide-info', 'expand', 'shake', 'flip'];
    const ACTION_LABELS = {
        'scale': '📐 Escalar', 'lift': '⬆️ Elevar', 'glow': '✨ Brillo',
        'pulse': '💓 Pulso', 'border-flow': '🌊 Borde Fluido', 'blur-others': '🌫 Difuminar Otros',
        'dim': '🌑 Oscurecer Otros', 'slide-info': '📜 Deslizar Info',
        'expand': '🔲 Expandir', 'shake': '📳 Vibrar', 'flip': '🔄 Voltear'
    };
    const ENTRANCE_OPTIONS = ['none', 'fade-up', 'fade-down', 'scale-in', 'slide-left', 'slide-right', 'flip-in'];

    function buildConfigRow(key, section) {
        const configRow = document.createElement('div');
        configRow.className = 'config-row';

        // --- Layout ---
        configRow.appendChild(createSelect('Layout', ['grid', 'carousel', 'list', 'featured'], section.config?.layout || 'grid', (val) => {
            section.config.layout = val;
            updatePreview();
        }));

        // --- Columns ---
        configRow.appendChild(createSelect('Columnas', ['1', '2', '3', '4'], String(section.config?.columns || 2), (val) => {
            section.config.columns = Number.parseInt(val, 10);
            updatePreview();
        }));

        // --- Border ---
        configRow.appendChild(createSelect('Borde', ['none', 'solid', 'neon', 'gradient'], section.config?.border || 'none', (val) => {
            section.config.border = val;
            updatePreview();
        }));

        // --- Entrance ---
        configRow.appendChild(createSelect('Entrada', ENTRANCE_OPTIONS, section.config?.entrance || 'none', (val) => {
            section.config.entrance = val === 'none' ? undefined : val;
            updatePreview();
        }));

        // --- Background Control ---
        const bgDiv = document.createElement('div');
        bgDiv.className = 'bg-control';
        bgDiv.innerHTML = '<label class="config-label">🎨 Fondo de Sección</label>';

        if (!section.config.background) section.config.background = { type: 'none' };
        const bg = section.config.background;

        bgDiv.appendChild(createSelect('Tipo', ['none', 'solid', 'gradient'], bg.type || 'none', (val) => {
            bg.type = val;
            updatePreview();
            renderSidebar();
        }));

        if (bg.type !== 'none') {
            bgDiv.appendChild(createColorInput('Color 1', bg.color1 || '#1e1e2e', (v) => { bg.color1 = v; }));
            if (bg.type === 'gradient') {
                bgDiv.appendChild(createColorInput('Color 2', bg.color2 || '#2a1e3e', (v) => { bg.color2 = v; }));
            }
            const opGroup = document.createElement('div');
            opGroup.className = 'form-group';
            opGroup.innerHTML = `<label>Opacidad: <strong>${((bg.opacity ?? 1) * 100).toFixed(0)}%</strong></label>`;
            const opSlider = document.createElement('input');
            opSlider.type = 'range';
            opSlider.min = '0';
            opSlider.max = '1';
            opSlider.step = '0.05';
            opSlider.value = bg.opacity ?? 1;
            opSlider.style.width = '100%';
            opSlider.oninput = (e) => {
                bg.opacity = parseFloat(e.target.value);
                opGroup.querySelector('strong').textContent = (bg.opacity * 100).toFixed(0) + '%';
                updatePreview();
            };
            opSlider.onchange = () => pushHistory();
            opGroup.appendChild(opSlider);
            bgDiv.appendChild(opGroup);
        }
        configRow.appendChild(bgDiv);

        // --- Effects Builder ---
        const fxDiv = document.createElement('div');
        fxDiv.className = 'effects-builder';
        fxDiv.innerHTML = '<label class="config-label">⚡ Efectos</label>';

        if (!section.config.effects) section.config.effects = [];

        // Render existing effect pills with detail
        const pillsContainer = document.createElement('div');
        pillsContainer.className = 'effect-pills';

        section.config.effects.forEach((fx, i) => {
            const pill = document.createElement('div');
            pill.className = 'effect-pill';
            const triggerLabel = TRIGGER_LABELS[fx.trigger] || fx.trigger;
            const actionsLabel = fx.actions.map(a => ACTION_LABELS[a] || a).join(' + ');
            const dur = fx.duration || 350;
            const intens = fx.intensity ?? 50;
            const overflowIcon = fx.overflow ? '🔓' : '';
            pill.innerHTML = `
                <span class="pill-trigger">${triggerLabel}</span>
                <span class="pill-arrow">→</span>
                <span class="pill-actions">${actionsLabel}</span>
                <span class="pill-intensity">${intens}%</span>
                <span class="pill-duration">${dur}ms</span>
                ${overflowIcon ? `<span class="pill-overflow">${overflowIcon}</span>` : ''}
            `;
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'pill-remove';
            removeBtn.textContent = '✕';
            removeBtn.onclick = () => {
                section.config.effects.splice(i, 1);
                pushHistory();
                updatePreview();
                renderSidebar();
            };
            pill.appendChild(removeBtn);
            pillsContainer.appendChild(pill);
        });

        fxDiv.appendChild(pillsContainer);

        // Builder row
        const builderRow = document.createElement('div');
        builderRow.className = 'effect-builder-row';

        // Trigger select
        const triggerSel = document.createElement('select');
        triggerSel.className = 'form-control';
        AVAILABLE_TRIGGERS.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.text = TRIGGER_LABELS[t];
            triggerSel.appendChild(opt);
        });

        // Action checkboxes
        const actionCheckboxes = document.createElement('div');
        actionCheckboxes.className = 'action-checkboxes';
        AVAILABLE_ACTIONS.forEach(a => {
            const lbl = document.createElement('label');
            lbl.className = 'action-checkbox';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.value = a;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(' ' + (ACTION_LABELS[a] || a)));
            actionCheckboxes.appendChild(lbl);
        });

        // Intensity slider (continuous 1-100)
        const intensGroup = document.createElement('div');
        intensGroup.className = 'form-group';
        intensGroup.innerHTML = '<label>Intensidad: <strong>50%</strong></label>';
        const intensSlider = document.createElement('input');
        intensSlider.type = 'range';
        intensSlider.min = '1';
        intensSlider.max = '100';
        intensSlider.value = '50';
        intensSlider.style.width = '100%';
        intensSlider.oninput = () => {
            intensGroup.querySelector('strong').textContent = intensSlider.value + '%';
        };
        intensGroup.appendChild(intensSlider);

        // Duration slider (100-2000ms)
        const durGroup = document.createElement('div');
        durGroup.className = 'form-group';
        durGroup.innerHTML = '<label>Duración: <strong>350ms</strong></label>';
        const durSlider = document.createElement('input');
        durSlider.type = 'range';
        durSlider.min = '100';
        durSlider.max = '2000';
        durSlider.step = '50';
        durSlider.value = '350';
        durSlider.style.width = '100%';
        durSlider.oninput = () => {
            durGroup.querySelector('strong').textContent = durSlider.value + 'ms';
        };
        durGroup.appendChild(durSlider);

        // Overflow checkbox
        const overflowLabel = document.createElement('label');
        overflowLabel.className = 'action-checkbox';
        const overflowCb = document.createElement('input');
        overflowCb.type = 'checkbox';
        overflowLabel.appendChild(overflowCb);
        overflowLabel.appendChild(document.createTextNode(' 🔓 Sobresalir del contenedor'));

        // Add button
        const addFxBtn = document.createElement('button');
        addFxBtn.type = 'button';
        addFxBtn.className = 'btn-add';
        addFxBtn.textContent = '+ Agregar Efecto';
        addFxBtn.onclick = () => {
            const selectedActions = [];
            actionCheckboxes.querySelectorAll('input:checked').forEach(cb => selectedActions.push(cb.value));
            if (selectedActions.length === 0) return;
            section.config.effects.push({
                trigger: triggerSel.value,
                actions: selectedActions,
                intensity: Number(intensSlider.value),
                duration: Number(durSlider.value),
                overflow: overflowCb.checked
            });
            pushHistory();
            updatePreview();
            renderSidebar();
        };

        builderRow.appendChild(triggerSel);
        builderRow.appendChild(actionCheckboxes);
        builderRow.appendChild(intensGroup);
        builderRow.appendChild(durGroup);
        builderRow.appendChild(overflowLabel);
        builderRow.appendChild(addFxBtn);
        fxDiv.appendChild(builderRow);

        configRow.appendChild(fxDiv);

        // --- Expanded Card Customization ---
        const expandDiv = document.createElement('div');
        expandDiv.className = 'expand-config';
        expandDiv.innerHTML = '<label class="config-label">🔲 Tarjeta Expandida</label>';

        if (!section.config.expandConfig) {
            section.config.expandConfig = {
                maxWidth: 600,
                padding: 3,
                borderStyle: 'neon',
                borderRadius: 16,
                iconScale: 1.5,
                iconPosition: 'top',
                titleSize: 1.6,
                descSize: 1,
                contentAlign: 'center',
                bgColor: '',
                postEffect: 'none'
            };
        }
        const ec = section.config.expandConfig;

        // Layout sub-label
        const layoutLabel = document.createElement('label');
        layoutLabel.className = 'config-label';
        layoutLabel.style.fontSize = '0.75rem';
        layoutLabel.textContent = '📐 Diseño y Layout';
        expandDiv.appendChild(layoutLabel);

        // Max width
        expandDiv.appendChild(buildSlider('Ancho Máx', ec.maxWidth || 600, 300, 1200, 50, 'px', (v) => { ec.maxWidth = v; }));

        // Padding
        expandDiv.appendChild(buildSlider('Padding', ec.padding || 3, 1, 6, 0.5, 'rem', (v) => { ec.padding = v; }));

        // Border radius
        expandDiv.appendChild(buildSlider('Redondeo', ec.borderRadius ?? 16, 0, 40, 2, 'px', (v) => { ec.borderRadius = v; }));

        // Icon position
        expandDiv.appendChild(createSelect('Posición Ícono/Imagen', ['top', 'left', 'right', 'inline'], ec.iconPosition || 'top', (val) => {
            ec.iconPosition = val;
            updatePreview();
        }));

        // Content alignment
        expandDiv.appendChild(createSelect('Alineación Contenido', ['left', 'center', 'right'], ec.contentAlign || 'center', (val) => {
            ec.contentAlign = val;
            updatePreview();
        }));

        // Sizing sub-label
        const sizeLabel = document.createElement('label');
        sizeLabel.className = 'config-label';
        sizeLabel.style.fontSize = '0.75rem';
        sizeLabel.textContent = '📏 Tamaños';
        expandDiv.appendChild(sizeLabel);

        // Icon/image scale
        expandDiv.appendChild(buildSlider('Escala Ícono/Imagen', ec.iconScale || 1.5, 0.5, 4, 0.25, 'x', (v) => { ec.iconScale = v; }));

        // Title font size
        expandDiv.appendChild(buildSlider('Título', ec.titleSize || 1.6, 0.8, 3, 0.1, 'rem', (v) => { ec.titleSize = v; }));

        // Description font size
        expandDiv.appendChild(buildSlider('Descripción', ec.descSize || 1, 0.7, 2, 0.1, 'rem', (v) => { ec.descSize = v; }));

        // Appearance sub-label
        const appearLabel2 = document.createElement('label');
        appearLabel2.className = 'config-label';
        appearLabel2.style.fontSize = '0.75rem';
        appearLabel2.textContent = '✨ Apariencia';
        expandDiv.appendChild(appearLabel2);

        // Border style
        expandDiv.appendChild(createSelect('Borde', ['none', 'solid', 'neon', 'glow'], ec.borderStyle || 'neon', (val) => {
            ec.borderStyle = val;
            updatePreview();
        }));

        // Background color
        expandDiv.appendChild(createColorInput('Color Fondo', ec.bgColor || '#1e1e2e', (v) => { ec.bgColor = v; }));

        // Post-expand animation
        expandDiv.appendChild(createSelect('Efecto Post-Expansión', ['none', 'pulse', 'glow-pulse', 'shake-settle', 'float'], ec.postEffect || 'none', (val) => {
            ec.postEffect = val;
            updatePreview();
        }));

        configRow.appendChild(expandDiv);

        return configRow;
    }

    // ============================================
    // SECTION WRAPPER (creates accordion item)
    // ============================================
    function createSectionEl(key, title, renderFn, startActive) {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'section-item' + (startActive ? ' active' : '');

        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <span class="section-title">
                <span class="section-icon">${SECTION_ICONS[key] || '📄'}</span>
                ${title}
            </span>
            <span class="section-chevron">▼</span>
        `;
        header.onclick = () => sectionEl.classList.toggle('active');

        const body = document.createElement('div');
        body.className = 'section-body';
        renderFn(body);

        sectionEl.appendChild(header);
        sectionEl.appendChild(body);
        return sectionEl;
    }

    // ============================================
    // MAIN RENDER
    // ============================================
    function renderSidebar() {
        const scrollPos = sectionsList.scrollTop;
        // Track which sections were active
        const activeKeys = new Set();
        sectionsList.querySelectorAll('.section-item.active').forEach(el => {
            const title = el.querySelector('.section-title');
            if (title) activeKeys.add(title.textContent.trim());
        });

        sectionsList.innerHTML = '';

        // 1. Templates
        sectionsList.appendChild(createSectionEl('templates', 'Templates', (body) => {
            renderTemplatesSection(body);
        }, activeKeys.size === 0 || activeKeys.has(SECTION_ICONS.templates + '\n                Templates')));

        // 2. Branding
        if (!content.branding) {
            content.branding = { position: 'fixed', behavior: 'shrink', size: 40 };
        }
        sectionsList.appendChild(createSectionEl('branding', 'Branding', (body) => {
            renderBrandingSection(content.branding, body);
        }));

        // 3. Styles
        if (!content.styles) {
            content.styles = { primary: '#f59e0b', secondary: '#fbbf24', bgDark: '#1e1e2e' };
        }
        sectionsList.appendChild(createSectionEl('styles', 'Estilos', (body) => {
            renderStylesSection(content.styles, body);
        }));

        // 4. Nav
        if (content.nav) {
            sectionsList.appendChild(createSectionEl('nav', 'Navegación', (body) => {
                renderNavSection(content.nav, body);
            }));
        }

        // 5. Hero
        if (content.hero) {
            if (!content.hero.config) content.hero.config = {};
            sectionsList.appendChild(createSectionEl('hero', 'Hero', (body) => {
                renderHeroSection(content.hero, body);
            }));
        }

        // 6. Services
        if (content.services) {
            if (!content.services.config) content.services.config = {};
            sectionsList.appendChild(createSectionEl('services', 'Servicios', (body) => {
                body.appendChild(buildConfigRow('services', content.services));
                if (content.services.items && Array.isArray(content.services.items)) {
                    renderItemsSection('services', content.services, body);
                }
            }));
        }

        // 7. Benefits
        if (content.benefits) {
            if (!content.benefits.config) content.benefits.config = {};
            sectionsList.appendChild(createSectionEl('benefits', 'Beneficios', (body) => {
                body.appendChild(buildConfigRow('benefits', content.benefits));
                if (content.benefits.items && Array.isArray(content.benefits.items)) {
                    renderItemsSection('benefits', content.benefits, body);
                }
            }));
        }

        // 8. Team
        if (content.team) {
            if (!content.team.config) content.team.config = {};
            sectionsList.appendChild(createSectionEl('team', 'Equipo', (body) => {
                body.appendChild(buildConfigRow('team', content.team));
                if (content.team.items && Array.isArray(content.team.items)) {
                    renderItemsSection('team', content.team, body);
                }
            }));
        }

        // 9. About
        if (content.about) {
            if (!content.about.config) content.about.config = {};
            sectionsList.appendChild(createSectionEl('about', 'Nosotros', (body) => {
                renderAboutSection(content.about, body);
            }));
        }

        // 10. Contact
        if (content.contact) {
            if (!content.contact.config) content.contact.config = {};
            sectionsList.appendChild(createSectionEl('contact', 'Contacto', (body) => {
                renderContactSection(content.contact, body);
            }));
        }

        // 11. Footer
        if (content.footer) {
            sectionsList.appendChild(createSectionEl('footer', 'Footer', (body) => {
                renderFooterSection(content.footer, body);
            }));
        }

        sectionsList.scrollTop = scrollPos;
    }

    // ============================================
    // TOOLBAR BINDINGS
    // ============================================
    document.getElementById('btnUndo').onclick = undo;
    document.getElementById('btnRedo').onclick = redo;

    document.getElementById('btnExpandAll').onclick = () => {
        sectionsList.querySelectorAll('.section-item').forEach(el => el.classList.add('active'));
    };

    document.getElementById('btnCollapseAll').onclick = () => {
        sectionsList.querySelectorAll('.section-item').forEach(el => el.classList.remove('active'));
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            if (e.shiftKey) { redo(); } else { undo(); }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveContent();
        }
    });

    saveBtn.onclick = saveContent;
    loadContent();
});
