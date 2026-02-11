/**
 * ============================================
 * SHOWCASE DINÁMICO
 * ============================================
 * - Lee content.json del directorio padre
 * - Genera el contenido con animaciones explosivas
 * - Templates predefinidos que cambian completamente el look
 * - Red interactiva integrada
 * ============================================
 */

// ============================================
// CONFIGURACIÓN DE TEMPLATES (PRESETS COMPLETOS)
// Cada template tiene una personalidad visual completamente diferente
// ============================================
const TEMPLATES = {
    // ========== SOLAR: Energético y radiante ==========
    solar: {
        name: 'Solar',
        description: 'Energético y radiante',
        primary: '#f59e0b',
        primaryHover: '#d97706',
        secondary: '#fbbf24',
        network: {
            lineColor: '#f59e0b',
            glowColor: '#fbbf24',
            gridDensity: 40,
            interactionRadius: 150,
            interactionType: 'repel'
        },
        styles: {
            cards: {
                bgOpacity: 0.04,
                borderRadius: 20,
                shadow: true,
                hoverScale: 1.03,
                padding: 2.5,
                gap: 2
            },
            buttons: { borderRadius: 12, hoverScale: 1.05 },
            sections: {
                heroOpacity: 1,
                servicesOpacity: 0.7,
                benefitsOpacity: 1,
                contactOpacity: 0.7,
                padding: 6
            },
            texts: {
                titleOpacity: 1,
                paragraphOpacity: 0.7,
                titleSize: 2.5,
                bodySize: 1
            },
            general: {
                networkOpacity: 0.5,
                navbarBlur: 20,
                navbarOpacity: 0.8,
                containerWidth: 1200
            },
            animations: { transitionSpeed: 0.4, hoverLift: 10 },
            effects: { glowIntensity: 0.4, borderOpacity: 0.08 }
        },
        layout: {
            services: 'grid',       // grid 2x2
            benefits: 'grid',
            team: 'grid',
            columns: 2
        }
    },

    // ========== OCÉANO: Ultra espacioso y fluido ==========
    ocean: {
        name: 'Océano',
        description: 'Espacioso y fluido',
        primary: '#0ea5e9',
        primaryHover: '#0284c7',
        secondary: '#38bdf8',
        network: {
            lineColor: '#0ea5e9',
            glowColor: '#7dd3fc',
            gridDensity: 25,
            interactionRadius: 220,
            interactionType: 'wave'
        },
        styles: {
            cards: {
                bgOpacity: 0.08,
                borderRadius: 32,
                shadow: true,
                hoverScale: 1.05,
                padding: 3.5,
                gap: 3
            },
            buttons: { borderRadius: 24, hoverScale: 1.08 },
            sections: {
                heroOpacity: 1,
                servicesOpacity: 0.5,
                benefitsOpacity: 0.3,
                contactOpacity: 0.6,
                padding: 8
            },
            texts: {
                titleOpacity: 1,
                paragraphOpacity: 0.8,
                titleSize: 3,
                bodySize: 1.15
            },
            general: {
                networkOpacity: 0.7,
                navbarBlur: 30,
                navbarOpacity: 0.6,
                containerWidth: 1400
            },
            animations: { transitionSpeed: 0.6, hoverLift: 20 },
            effects: { glowIntensity: 0.7, borderOpacity: 0.15 }
        },
        layout: {
            services: 'carousel',   // Carrusel horizontal
            benefits: 'featured',   // Grande + pequeños
            team: 'carousel',
            columns: 1
        }
    },

    // ========== BOSQUE: Natural y orgánico ==========
    forest: {
        name: 'Bosque',
        description: 'Natural y orgánico',
        primary: '#10b981',
        primaryHover: '#059669',
        secondary: '#34d399',
        network: {
            lineColor: '#10b981',
            glowColor: '#6ee7b7',
            gridDensity: 55,
            interactionRadius: 100,
            interactionType: 'glow'
        },
        styles: {
            cards: {
                bgOpacity: 0.06,
                borderRadius: 16,
                shadow: true,
                hoverScale: 1.02,
                padding: 2,
                gap: 1.5
            },
            buttons: { borderRadius: 8, hoverScale: 1.02 },
            sections: {
                heroOpacity: 0.8,
                servicesOpacity: 0.9,
                benefitsOpacity: 0.85,
                contactOpacity: 0.9,
                padding: 5
            },
            texts: {
                titleOpacity: 0.95,
                paragraphOpacity: 0.75,
                titleSize: 2.25,
                bodySize: 0.95
            },
            general: {
                networkOpacity: 0.35,
                navbarBlur: 15,
                navbarOpacity: 0.9,
                containerWidth: 1100
            },
            animations: { transitionSpeed: 0.5, hoverLift: 6 },
            effects: { glowIntensity: 0.25, borderOpacity: 0.12 }
        },
        layout: {
            services: 'list',       // Lista vertical
            benefits: 'grid',
            team: 'grid',
            columns: 3
        }
    },

    // ========== ATARDECER: Ultra vibrante y dramático ==========
    sunset: {
        name: 'Atardecer',
        description: 'Vibrante y dramático',
        primary: '#f43f5e',
        primaryHover: '#e11d48',
        secondary: '#fb923c',
        network: {
            lineColor: '#f43f5e',
            glowColor: '#fda4af',
            gridDensity: 30,
            interactionRadius: 250,
            interactionType: 'attract'
        },
        styles: {
            cards: {
                bgOpacity: 0.12,
                borderRadius: 28,
                shadow: true,
                hoverScale: 1.08,
                padding: 3,
                gap: 2.5
            },
            buttons: { borderRadius: 50, hoverScale: 1.1 },
            sections: {
                heroOpacity: 1,
                servicesOpacity: 0.85,
                benefitsOpacity: 0.9,
                contactOpacity: 0.8,
                padding: 7
            },
            texts: {
                titleOpacity: 1,
                paragraphOpacity: 0.8,
                titleSize: 3.5,
                bodySize: 1.1
            },
            general: {
                networkOpacity: 0.65,
                navbarBlur: 25,
                navbarOpacity: 0.7,
                containerWidth: 1300
            },
            animations: { transitionSpeed: 0.35, hoverLift: 18 },
            effects: { glowIntensity: 0.8, borderOpacity: 0.2 }
        },
        layout: {
            services: 'featured',   // 1 grande + resto
            benefits: 'carousel',
            team: 'carousel',
            columns: 2
        }
    },

    // ========== VIOLETA: Premium y elegante ==========
    purple: {
        name: 'Violeta',
        description: 'Premium y elegante',
        primary: '#8b5cf6',
        primaryHover: '#7c3aed',
        secondary: '#c4b5fd',
        network: {
            lineColor: '#8b5cf6',
            glowColor: '#ddd6fe',
            gridDensity: 45,
            interactionRadius: 180,
            interactionType: 'repel'
        },
        styles: {
            cards: {
                bgOpacity: 0.05,
                borderRadius: 24,
                shadow: true,
                hoverScale: 1.04,
                padding: 2.75,
                gap: 2
            },
            buttons: { borderRadius: 16, hoverScale: 1.06 },
            sections: {
                heroOpacity: 1,
                servicesOpacity: 0.65,
                benefitsOpacity: 0.7,
                contactOpacity: 0.6,
                padding: 6.5
            },
            texts: {
                titleOpacity: 1,
                paragraphOpacity: 0.75,
                titleSize: 2.75,
                bodySize: 1.05
            },
            general: {
                networkOpacity: 0.55,
                navbarBlur: 22,
                navbarOpacity: 0.75,
                containerWidth: 1250
            },
            animations: { transitionSpeed: 0.45, hoverLift: 12 },
            effects: { glowIntensity: 0.55, borderOpacity: 0.1 }
        },
        layout: {
            services: 'grid',
            benefits: 'list',
            team: 'grid',
            columns: 4
        }
    },

    // ========== MINIMAL: Ultra limpio, casi sin efectos ==========
    minimal: {
        name: 'Minimal',
        description: 'Ultra limpio y simple',
        primary: '#525252',
        primaryHover: '#404040',
        secondary: '#737373',
        network: {
            lineColor: '#525252',
            glowColor: '#a3a3a3',
            gridDensity: 80,
            interactionRadius: 80,
            interactionType: 'glow'
        },
        styles: {
            cards: {
                bgOpacity: 0.02,
                borderRadius: 8,
                shadow: false,
                hoverScale: 1.01,
                padding: 1.75,
                gap: 1
            },
            buttons: { borderRadius: 4, hoverScale: 1.02 },
            sections: {
                heroOpacity: 0.5,
                servicesOpacity: 0.4,
                benefitsOpacity: 0.35,
                contactOpacity: 0.4,
                padding: 4
            },
            texts: {
                titleOpacity: 0.85,
                paragraphOpacity: 0.55,
                titleSize: 2,
                bodySize: 0.9
            },
            general: {
                networkOpacity: 0.2,
                navbarBlur: 40,
                navbarOpacity: 0.95,
                containerWidth: 1000
            },
            animations: { transitionSpeed: 0.2, hoverLift: 3 },
            effects: { glowIntensity: 0.1, borderOpacity: 0.04 }
        },
        layout: {
            services: 'list',
            benefits: 'minimal',    // Solo iconos
            team: 'grid',
            columns: 1
        }
    }
};

// ============================================
// CLASE PRINCIPAL
// ============================================
class Showcase {
    content = null;
    currentTemplate = 'solar';
    currentEffect = 'repel';
    gridDensity = 40;
    networkMesh = null;

    static async create() {
        const instance = new Showcase();
        await instance.init();
        return instance;
    }

    async init() {
        // Cargar contenido
        await this.loadContent();

        // Aplicar template y estilos
        this.applyTemplate(this.currentTemplate);

        // Inicializar red
        this.initNetwork();

        // Configurar controles
        this.setupControls();

        // Iniciar animaciones
        this.startAnimations();

        // Configurar interacciones
        this.setupInteractions();

        // Escuchar mensajes del editor (verificando origen)
        globalThis.addEventListener('message', (event) => {
            if (event.origin !== globalThis.location.origin) return;
            if (event.data.type === 'update-content') {
                this.updateContent(event.data.content);
            } else if (event.data.type === 'change-template') {
                this.applyTemplate(event.data.template);
            }
        });
    }

    setupInteractions() {
        const cardSelector = '.service-card, .benefit-item, .benefit-main, .benefit-small, .team-card';

        // Click effects
        document.addEventListener('click', (e) => {
            const card = e.target.closest(cardSelector);
            if (!card) return;
            const section = card.closest('section');
            if (!section) return;

            // Legacy expand support
            if (section.classList.contains('interaction-expand') && !document.querySelector('.card-expanded')) {
                this.expandCard(card);
                return;
            }

            // New effects system: click triggers
            if (section.dataset.clickExpand !== undefined && !document.querySelector('.card-expanded')) {
                this.expandCard(card);
            }
            if (section.dataset.clickShake !== undefined) {
                card.classList.remove('effect-shake');
                void card.offsetWidth;
                card.classList.add('effect-shake');
                card.addEventListener('animationend', () => card.classList.remove('effect-shake'), { once: true });
            }
        });

        // Dblclick effects
        document.addEventListener('dblclick', (e) => {
            const card = e.target.closest(cardSelector);
            if (!card) return;
            const section = card.closest('section');
            if (!section) return;

            if (section.dataset.dblclickFlip !== undefined) {
                card.classList.toggle('flipped');
            }
            if (section.dataset.dblclickExpand !== undefined && !document.querySelector('.card-expanded')) {
                this.expandCard(card);
            }
        });
    }

    expandCard(originalCard) {
        // Find section config for expandConfig
        const section = originalCard.closest('section');
        const sectionId = section?.id;
        let ec = null;
        if (sectionId && this.content) {
            // Match section id to content key
            for (const key of ['services', 'benefits', 'team', 'about']) {
                if (this.content[key]?.config?.expandConfig) {
                    ec = this.content[key].config.expandConfig;
                    break;
                }
            }
        }
        // Defaults
        const maxWidth = ec?.maxWidth || 600;
        const padding = ec?.padding || 3;
        const borderStyle = ec?.borderStyle || 'neon';
        const borderRadius = ec?.borderRadius ?? 16;
        const iconScale = ec?.iconScale || 1.5;
        const iconPosition = ec?.iconPosition || 'top';
        const titleSize = ec?.titleSize || 1.6;
        const descSize = ec?.descSize || 1;
        const contentAlign = ec?.contentAlign || 'center';
        const bgColor = ec?.bgColor || '';
        const postEffect = ec?.postEffect || 'none';

        // Create Overlay
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        document.body.appendChild(overlay);

        // Clone Card
        const clone = originalCard.cloneNode(true);
        const rect = originalCard.getBoundingClientRect();

        // Set initial position to match original
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = '1000';
        clone.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

        document.body.appendChild(clone);

        // Force reflow
        clone.offsetWidth; // eslint-disable-line no-unused-expressions

        // Add expanded class
        clone.classList.add('card-expanded');

        // CSS variables for customization
        clone.style.setProperty('--expand-max-width', maxWidth + 'px');
        clone.style.setProperty('--expand-padding', padding + 'rem');
        clone.style.setProperty('--expand-border-radius', borderRadius + 'px');
        clone.style.setProperty('--expand-icon-scale', iconScale);

        // Border style
        clone.classList.add(`expand-border-${borderStyle}`);

        // Background
        if (bgColor) {
            clone.style.setProperty('--expand-bg', bgColor);
        }

        // Content alignment
        clone.style.textAlign = contentAlign;

        // Icon position layout
        if (iconPosition === 'left' || iconPosition === 'right') {
            clone.style.display = 'flex';
            clone.style.flexDirection = iconPosition === 'left' ? 'row' : 'row-reverse';
            clone.style.alignItems = 'center';
            clone.style.gap = '2rem';
        } else if (iconPosition === 'inline') {
            clone.style.display = 'flex';
            clone.style.flexDirection = 'row';
            clone.style.alignItems = 'center';
            clone.style.gap = '1rem';
            clone.style.flexWrap = 'wrap';
        }

        // Reset inline geometry to let CSS take over
        clone.style.top = '';
        clone.style.left = '';
        clone.style.width = '';
        clone.style.height = '';

        // Scale icons/images
        const icons = clone.querySelectorAll('.service-icon, .benefit-icon, .team-img-wrapper');
        icons.forEach(icon => {
            icon.style.transform = `scale(${iconScale})`;
            icon.style.transformOrigin = 'center center';
            icon.style.transition = 'transform 0.4s ease';
        });

        // Title size
        const titles = clone.querySelectorAll('h3, .card-title, .service-title, .benefit-title');
        titles.forEach(t => { t.style.fontSize = titleSize + 'rem'; });

        // Description size
        const descs = clone.querySelectorAll('p, .card-desc, .service-desc, .benefit-desc');
        descs.forEach(d => { d.style.fontSize = descSize + 'rem'; });

        // Post-expand animation
        if (postEffect !== 'none') {
            setTimeout(() => {
                clone.classList.add(`expand-post-${postEffect}`);
            }, 500);
        }

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'close-btn';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            closeExpanded();
        };
        clone.appendChild(closeBtn);

        // Close Logic
        const closeExpanded = () => {
            clone.style.opacity = '0';
            overlay.style.opacity = '0';
            setTimeout(() => {
                clone.remove();
                overlay.remove();
            }, 300);
        };

        overlay.onclick = closeExpanded;
    }

    updateContent(newContent) {
        this.content = newContent;
        this.applyStyles(this.currentTemplate);
        this.buildPage();
        this.startAnimations();
    }

    // ============================================
    // CARGAR CONTENIDO
    // ============================================
    async loadContent() {
        try {
            const response = await fetch('../content.json');
            if (!response.ok) throw new Error('No se pudo cargar content.json');
            this.content = await response.json();
        } catch (error) {
            console.error('Error:', error);
            this.content = this.getDefaultContent();
        }
    }

    getDefaultContent() {
        return {
            siteName: 'Showcase',
            hero: {
                title: 'Tu Título Aquí',
                subtitle: 'Descripción del proyecto',
                ctaPrimary: 'Acción Principal',
                ctaSecondary: 'Acción Secundaria',
                stats: []
            },
            services: { title: 'Servicios', items: [] },
            benefits: { title: 'Beneficios', items: [] },
            contact: { title: 'Contacto', subtitle: '' },
            footer: { copyright: '© 2026' },
            nav: { items: [], cta: 'CTA' }
        };
    }

    // ============================================
    // CONSTRUIR PÁGINA
    // ============================================
    buildPage() {
        const main = document.getElementById('mainContent');
        const c = this.content;

        main.innerHTML = `
            ${this.buildNavbar(c)}
            ${this.buildHero(c.hero)}
            ${c.services ? this.buildServices(c.services) : ''}
            ${c.about ? this.buildAbout(c.about) : ''}
            ${c.benefits ? this.buildBenefits(c.benefits) : ''}
            ${c.team ? this.buildTeam(c.team) : ''}
            ${c.contact ? this.buildContact(c.contact) : ''}
            ${this.buildFooter(c)}
        `;
    }

    buildNavbar(content) {
        const navItems = content.nav?.items || [];
        const branding = content.branding || { size: 40, navBehaviors: ['sticky'], logoPosition: 'left', logoEntrance: 'none' };

        // CSS Variables for all logo properties
        const root = document.documentElement.style;
        root.setProperty('--logo-size', `${branding.size || 40}px`);
        root.setProperty('--logo-border-radius', `${branding.logoBorderRadius ?? 0}%`);
        root.setProperty('--logo-opacity', `${(branding.logoOpacity ?? 100) / 100}`);
        root.setProperty('--logo-hover-scale', `${(branding.logoHoverScale ?? 110) / 100}`);
        root.setProperty('--logo-shrink-ratio', `${(branding.shrinkRatio ?? 70) / 100}`);
        root.setProperty('--logo-entrance-delay', `${branding.logoEntranceDelay ?? 200}ms`);
        root.setProperty('--logo-entrance-duration', `${branding.logoEntranceDuration ?? 800}ms`);
        root.setProperty('--logo-offset-x', `${branding.logoOffsetX ?? 0}px`);
        root.setProperty('--logo-offset-y', `${branding.logoOffsetY ?? 0}px`);

        let logoHtml;
        if (branding.logoUrl) {
            logoHtml = `<img src="${branding.logoUrl}" alt="${content.siteName}" class="brand-logo">`;
        } else {
            logoHtml = `
                <span class="brand-icon">☀️</span>
                <span class="brand-text">${content.siteName || 'Showcase'}</span>
            `;
        }

        // Build nav classes from behaviors
        const behaviors = branding.navBehaviors || ['sticky'];
        const navClasses = ['navbar'];
        if (behaviors.includes('sticky')) navClasses.push('navbar-sticky');
        if (behaviors.includes('shrink')) navClasses.push('navbar-shrinkable');
        if (behaviors.includes('auto-hide')) navClasses.push('navbar-auto-hide');
        if (behaviors.includes('scroll-reveal')) navClasses.push('navbar-scroll-reveal');

        // Logo position class
        const logoPos = branding.logoPosition || 'left';
        navClasses.push(`logo-${logoPos}`);

        // Logo hover effect class
        const logoHover = branding.logoHover || 'none';

        // Logo entrance + shadow data attrs
        const logoEntrance = branding.logoEntrance || 'none';
        const dataAttrs = [];
        if (logoEntrance !== 'none') dataAttrs.push(`data-logo-entrance="${logoEntrance}"`);
        if (branding.logoShadow && branding.logoShadow !== 'none') dataAttrs.push(`data-logo-shadow="${branding.logoShadow}"`);
        if (logoHover !== 'none') dataAttrs.push(`data-logo-hover="${logoHover}"`);
        if (branding.logoOverflow) dataAttrs.push('data-logo-overflow="true"');

        return `
            <nav class="${navClasses.join(' ')}" ${dataAttrs.join(' ')}>
                <div class="nav-brand">
                    ${logoHtml}
                </div>
                <ul class="nav-menu">
                    ${navItems.map(item => `
                        <li><a href="#${item.toLowerCase()}" class="nav-link">${item}</a></li>
                    `).join('')}
                </ul>
                <button class="nav-cta">${content.nav?.cta || 'Contactar'}</button>
            </nav>
        `;
    }

    buildHero(hero) {
        const statsHtml = hero.stats?.map((stat, i) => `
            <div class="stat-item" data-delay="${600 + i * 150}" data-target="${stat.number}">
                <span class="stat-number">0</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('') || '';

        // Dividir título para gradiente
        const words = hero.title.split(' ');
        let titleHtml;
        if (words.length > 2) {
            const normal = words.slice(0, -2).join(' ');
            const gradient = words.slice(-2).join(' ');
            titleHtml = `${normal} <span class="gradient-text">${gradient}</span>`;
        } else {
            titleHtml = `<span class="gradient-text">${hero.title}</span>`;
        }

        return `
            <section id="inicio" class="hero">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="badge-dot"></span>
                        Disponible ahora
                    </div>
                    <h1 class="hero-title">${titleHtml}</h1>
                    <p class="hero-subtitle">${hero.subtitle}</p>
                    <div class="hero-buttons">
                        ${hero.ctaPrimary ? `<button class="btn btn-primary">${hero.ctaPrimary}</button>` : ''}
                        ${hero.ctaSecondary ? `<button class="btn btn-secondary">${hero.ctaSecondary}</button>` : ''}
                    </div>
                    <div class="hero-stats">${statsHtml}</div>
                </div>
            </section>
        `;
    }

    getSectionClasses(config) {
        if (!config) return '';
        // Legacy class-based support
        const hover = config.hover ? `hover-${config.hover}` : '';
        const border = config.border ? `border-${config.border}` : '';
        const interaction = config.interaction ? `interaction-${config.interaction}` : '';
        const legacy = config.cardEffect ? `effect-${config.cardEffect}` : '';
        return `${hover} ${border} ${interaction} ${legacy}`;
    }

    /**
     * Build data attributes string from config.effects[] and config.background
     */
    getSectionDataAttrs(config) {
        if (!config) return '';
        const attrs = [];
        const styleVars = [];

        // Effects array
        if (config.effects && Array.isArray(config.effects)) {
            let hasOverflow = false;
            let maxDuration = 350;
            for (const fx of config.effects) {
                const pct = typeof fx.intensity === 'number' ? fx.intensity : 50;
                const dur = fx.duration || 350;
                if (dur > maxDuration) maxDuration = dur;

                for (const action of fx.actions) {
                    attrs.push(`data-${fx.trigger}-${action}="true"`);
                }

                // Map intensity (1-100) to concrete CSS var values
                if (fx.actions.includes('scale')) {
                    const s = 1 + (pct / 100) * 0.2; // 1.002 → 1.20
                    styleVars.push(`--effect-scale:${s.toFixed(3)}`);
                }
                if (fx.actions.includes('lift')) {
                    const l = -(pct / 100) * 40; // -0.4px → -40px
                    styleVars.push(`--effect-lift:${l.toFixed(1)}px`);
                }
                if (fx.actions.includes('glow')) {
                    const g = (pct / 100) * 50; // 0.5px → 50px
                    styleVars.push(`--effect-glow-spread:${g.toFixed(0)}px`);
                }

                if (fx.overflow) hasOverflow = true;
            }

            // Set transition once using the longest duration
            styleVars.push(`--effect-transition:${maxDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`);

            if (hasOverflow) {
                attrs.push('data-overflow-effects="true"');
            }
        }

        // Border
        if (config.border) {
            attrs.push(`data-border="${config.border}"`);
        }

        // Entrance
        if (config.entrance) {
            attrs.push(`data-entrance="${config.entrance}"`);
        }

        // Background
        if (config.background) {
            const bg = config.background;
            if (bg.type && bg.type !== 'none') {
                attrs.push(`data-bg-type="${bg.type}"`);
                if (bg.color1) {
                    styleVars.push(`--section-bg-color1:${bg.color1}`);
                    styleVars.push(`--section-bg-color2:${bg.color2 || bg.color1}`);
                    styleVars.push(`--section-bg-opacity:${bg.opacity ?? 1}`);
                }
                if (bg.opacity !== undefined) attrs.push(`data-bg-opacity="${bg.opacity}"`);
            }
        }

        // Merge all style vars into one style attribute
        if (styleVars.length > 0) {
            attrs.push(`style="${styleVars.join(';')}"`);
        }

        return attrs.join(' ');
    }

    buildServices(services) {
        const template = TEMPLATES[this.currentTemplate];
        const layout = services.config?.layout || template.layout?.services || 'grid';
        const columns = services.config?.columns || template.layout?.columns || 2;
        const classes = this.getSectionClasses(services.config);
        const dataAttrs = this.getSectionDataAttrs(services.config);

        let contentHtml = '';

        switch (layout) {
            case 'carousel':
                // Carrusel horizontal con scroll
                contentHtml = `
                    <div class="services-carousel ${classes}" data-layout="carousel">
                        <div class="carousel-track">
                            ${services.items.map((item, i) => `
                                <div class="carousel-slide service-card" data-delay="${i * 100}">
                                    <span class="card-icon">${item.icon}</span>
                                    <h3>${item.title}</h3>
                                    <p>${item.description}</p>
                                </div>
                            `).join('')}
                        </div>
                        <div class="carousel-nav">
                            <button class="carousel-btn prev" onclick="this.closest('.services-carousel').querySelector('.carousel-track').scrollBy(-350, 0)">←</button>
                            <button class="carousel-btn next" onclick="this.closest('.services-carousel').querySelector('.carousel-track').scrollBy(350, 0)">→</button>
                        </div>
                    </div>`;
                break;

            case 'list':
                // Lista vertical full width
                contentHtml = `
                    <div class="services-list" data-layout="list">
                        ${services.items.map((item, i) => `
                            <div class="service-list-item" data-delay="${i * 80}">
                                <span class="list-icon">${item.icon}</span>
                                <div class="list-content">
                                    <h3>${item.title}</h3>
                                    <p>${item.description}</p>
                                </div>
                                <span class="list-arrow">→</span>
                            </div>
                        `).join('')}
                    </div>`;
                break;

            case 'featured': {
                // Primera card grande, resto pequeñas
                const [first, ...rest] = services.items;
                contentHtml = `
                    <div class="services-featured" data-layout="featured">
                        <div class="featured-main service-card" data-delay="0">
                            <span class="card-icon">${first.icon}</span>
                            <h3>${first.title}</h3>
                            <p>${first.description}</p>
                        </div>
                        <div class="featured-secondary">
                            ${rest.map((item, i) => `
                                <div class="service-card small" data-delay="${(i + 1) * 100}">
                                    <span class="card-icon">${item.icon}</span>
                                    <h3>${item.title}</h3>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                break;
            }

            default: // grid
                contentHtml = `
                    <div class="services-grid ${classes}" data-layout="grid" style="--columns: ${columns}">
                        ${services.items.map((item, i) => `
                            <div class="service-card" data-delay="${i * 100}">
                                <span class="card-icon">${item.icon}</span>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>`;
        }

        return `
            <section id="servicios" class="services" ${dataAttrs}>
                <h2 class="section-title">${services.title}</h2>
                ${contentHtml}
            </section>
        `;
    }

    buildAbout(about) {
        return `
            <section id="nosotros" class="about">
                <div class="about-container">
                    <div class="about-content">
                        <h2 class="section-title about-title">${about.title}</h2>
                        <p class="about-description">${about.description}</p>
                        ${about.objective ? `<p class="about-objective"><strong>Objetivo:</strong> ${about.objective}</p>` : ''}
                        
                        <div class="about-cards">
                            <div class="about-card mission-card" data-delay="100">
                                <div class="about-card-icon">🎯</div>
                                <h3>${about.mission?.title || 'Misión'}</h3>
                                <p>${about.mission?.text || ''}</p>
                            </div>
                            <div class="about-card vision-card" data-delay="200">
                                <div class="about-card-icon">🔭</div>
                                <h3>${about.vision?.title || 'Visión'}</h3>
                                <p>${about.vision?.text || ''}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="about-video">
                        <div class="video-container">
                            <video autoplay loop muted playsinline>
                                <source src="video.webm" type="video/webm">
                                Tu navegador no soporta video.
                            </video>
                            <div class="video-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    buildBenefits(benefits) {
        const template = TEMPLATES[this.currentTemplate];
        const layout = benefits.config?.layout || template.layout?.benefits || 'grid';
        const columns = benefits.config?.columns || template.layout?.columns || 2;
        const classes = this.getSectionClasses(benefits.config);
        const dataAttrs = this.getSectionDataAttrs(benefits.config);

        let contentHtml = '';

        switch (layout) {
            case 'carousel':
                contentHtml = `
                    <div class="benefits-carousel ${classes}" data-layout="carousel">
                        <div class="carousel-track">
                            ${benefits.items.map((item, i) => `
                                <div class="carousel-slide benefit-item" data-delay="${i * 80}">
                                    <span class="benefit-icon">${item.icon}</span>
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                break;

            case 'list':
                contentHtml = `
                    <div class="benefits-list" data-layout="list">
                        ${benefits.items.map((item, i) => `
                            <div class="benefit-list-item" data-delay="${i * 60}">
                                <span class="list-icon">${item.icon}</span>
                                <div class="list-content">
                                    <h4>${item.title}</h4>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>`;
                break;

            case 'featured': {
                const [main, ...others] = benefits.items;
                contentHtml = `
                    <div class="benefits-featured" data-layout="featured">
                        <div class="benefit-main" data-delay="0">
                            <span class="benefit-icon">${main.icon}</span>
                            <h4>${main.title}</h4>
                            <p>${main.description}</p>
                        </div>
                        <div class="benefit-others">
                            ${others.map((item, i) => `
                                <div class="benefit-small" data-delay="${(i + 1) * 80}">
                                    <span class="benefit-icon">${item.icon}</span>
                                    <h4>${item.title}</h4>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                break;
            }

            case 'minimal':
                contentHtml = `
                    <div class="benefits-minimal" data-layout="minimal">
                        ${benefits.items.map((item, i) => `
                            <div class="benefit-minimal-item" data-delay="${i * 50}">
                                <span class="minimal-icon">${item.icon}</span>
                                <span class="minimal-title">${item.title}</span>
                            </div>
                        `).join('')}
                    </div>`;
                break;

            default: // grid
                contentHtml = `
                    <div class="benefits-grid ${classes}" data-layout="grid" style="--columns: ${columns}">
                        ${benefits.items.map((item, i) => `
                            <div class="benefit-item" data-delay="${i * 80}">
                                <span class="benefit-icon">${item.icon}</span>
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>`;
        }

        return `
            <section id="beneficios" class="benefits" ${dataAttrs}>
                <h2 class="section-title">${benefits.title}</h2>
                ${contentHtml}
            </section>
        `;
    }

    buildTeam(team) {
        const template = TEMPLATES[this.currentTemplate];
        const layout = team.config?.layout || template.layout?.team || 'grid';
        const columns = team.config?.columns || (layout === 'grid' ? 3 : (template.layout?.columns || 3));
        const classes = this.getSectionClasses(team.config);
        const dataAttrs = this.getSectionDataAttrs(team.config);

        const buildImgStyle = (item) => {
            const parts = [];
            if (item.imgPosition) parts.push(`object-position:${item.imgPosition}`);
            if (item.imgZoom && item.imgZoom !== 1) parts.push(`transform:scale(${item.imgZoom})`);
            return parts.length ? `style="${parts.join(';')}"` : '';
        };

        let contentHtml = '';

        if (layout === 'carousel') {
            contentHtml = `
                <div class="team-carousel ${classes}" data-layout="carousel">
                    <div class="carousel-track">
                        ${team.items.map((item, i) => `
                            <div class="carousel-slide team-card" data-delay="${i * 100}">
                                <div class="team-img-wrapper">
                                    <img src="${item.image}" alt="${item.name}" class="team-img" ${buildImgStyle(item)}>
                                </div>
                                <h3>${item.name}</h3>
                                <p>${item.role}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="carousel-nav">
                        <button class="carousel-btn prev" onclick="this.closest('.team-carousel').querySelector('.carousel-track').scrollBy(-300, 0)">←</button>
                        <button class="carousel-btn next" onclick="this.closest('.team-carousel').querySelector('.carousel-track').scrollBy(300, 0)">→</button>
                    </div>
                </div>`;
        } else {
            // grid (default)
            contentHtml = `
                <div class="team-grid ${classes}" data-layout="grid" style="--columns: ${columns}">
                    ${team.items.map((item, i) => `
                        <div class="team-card" data-delay="${i * 100}">
                            <div class="team-img-wrapper">
                                <img src="${item.image}" alt="${item.name}" class="team-img" ${buildImgStyle(item)}>
                            </div>
                            <h3>${item.name}</h3>
                            <p>${item.role}</p>
                        </div>
                    `).join('')}
                </div>`;
        }

        return `
            <section id="equipo" class="team" ${dataAttrs}>
                <h2 class="section-title">${team.title}</h2>
                ${contentHtml}
            </section>
        `;
    }

    buildContact(contact) {
        return `
            <section id="contacto" class="contact">
                <div class="contact-content">
                    <h2 class="section-title">${contact.title}</h2>
                    <p class="contact-text">${contact.subtitle || ''}</p>
                    <form class="contact-form" onsubmit="event.preventDefault(); alert('¡Gracias! Te contactaremos pronto.');">
                        <div class="form-row">
                            <input type="text" placeholder="Nombre completo" class="form-input" required>
                            <input type="email" placeholder="Correo electrónico" class="form-input" required>
                        </div>
                        <div class="form-row">
                            <input type="tel" placeholder="Teléfono" class="form-input">
                            <select class="form-input">
                                <option value="">Tipo de proyecto</option>
                                <option value="residencial">Residencial</option>
                                <option value="comercial">Comercial</option>
                                <option value="industrial">Industrial</option>
                            </select>
                        </div>
                        <textarea placeholder="Cuéntanos sobre tu proyecto..." class="form-input form-textarea"></textarea>
                        <button type="submit" class="btn btn-primary btn-full">Enviar Solicitud</button>
                    </form>
                </div>
            </section>
        `;
    }

    buildFooter(content) {
        return `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-brand">
                        <span class="brand-icon">☀️</span>
                        <span class="brand-text">${content.siteName || 'Showcase'}</span>
                    </div>
                    <p class="footer-text">${content.footer?.copyright || '© 2026'}</p>
                </div>
            </footer>
        `;
    }

    // ============================================
    // RED INTERACTIVA (simplificada)
    // ============================================
    initNetwork() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: null, y: null };
        this.time = 0;

        this.resizeCanvas();
        this.createGrid();
        this.setupNetworkEvents();
        this.animateNetwork();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createGrid() {
        this.nodes = [];
        if (!this.canvas) return;
        const spacing = this.gridDensity;
        const cols = Math.ceil(this.canvas.width / spacing) + 2;
        const rows = Math.ceil(this.canvas.height / spacing) + 2;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.nodes.push({
                    baseX: i * spacing,
                    baseY: j * spacing,
                    x: i * spacing,
                    y: j * spacing,
                    col: i,
                    row: j
                });
            }
        }
        this.cols = cols;
        this.rows = rows;
    }

    setupNetworkEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createGrid();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animateNetwork() {
        this.time += 0.01;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const baseTemplate = TEMPLATES[this.currentTemplate];
        const branding = this.content?.branding;
        // Merge custom network colors from branding over template defaults
        const template = {
            ...baseTemplate,
            network: {
                ...baseTemplate.network,
                ...(branding?.networkLineColor ? { lineColor: branding.networkLineColor } : {}),
                ...(branding?.networkGlowColor ? { glowColor: branding.networkGlowColor } : {})
            }
        };
        const interactionRadius = this.interactionRadius || 150;

        // Actualizar y dibujar nodos
        this.nodes.forEach((node, index) => {
            // Flotación base
            let targetX = node.baseX + Math.sin(this.time + node.col * 0.3) * 3;
            let targetY = node.baseY + Math.cos(this.time + node.row * 0.3) * 3;

            // Interacción con mouse
            if (this.mouse.x !== null) {
                const dx = node.baseX - this.mouse.x;
                const dy = node.baseY - this.mouse.y;
                const distance = Math.hypot(dx, dy);

                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    const angle = Math.atan2(dy, dx);

                    switch (this.currentEffect) {
                        case 'repel':
                            targetX = node.baseX + Math.cos(angle) * force * 40;
                            targetY = node.baseY + Math.sin(angle) * force * 40;
                            break;
                        case 'attract':
                            targetX = node.baseX - Math.cos(angle) * force * 30;
                            targetY = node.baseY - Math.sin(angle) * force * 30;
                            break;
                        case 'wave': {
                            const wave = Math.sin(distance * 0.05 - this.time * 3) * force * 25;
                            targetX = node.baseX + Math.cos(angle) * wave;
                            targetY = node.baseY + Math.sin(angle) * wave;
                            break;
                        }
                    }
                }
            }

            // Interpolación suave
            node.x += (targetX - node.x) * 0.1;
            node.y += (targetY - node.y) * 0.1;
        });

        // Dibujar conexiones
        this.nodes.forEach((node, index) => {
            // Horizontal
            if (node.col < this.cols - 1) {
                const rightIndex = index + this.rows;
                if (rightIndex < this.nodes.length) {
                    this.drawLine(node, this.nodes[rightIndex], template);
                }
            }
            // Vertical
            if (node.row < this.rows - 1) {
                const bottomIndex = index + 1;
                if (bottomIndex < this.nodes.length && this.nodes[bottomIndex].col === node.col) {
                    this.drawLine(node, this.nodes[bottomIndex], template);
                }
            }
        });

        // Dibujar nodos
        this.nodes.forEach(node => {
            let size = 2;
            let glowSize = 0;

            if (this.mouse.x !== null) {
                const dx = node.x - this.mouse.x;
                const dy = node.y - this.mouse.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 150) {
                    const proximity = 1 - (distance / 150);
                    size = 2 + proximity * 3;
                    glowSize = proximity * 15;
                }
            }

            // Glow
            if (glowSize > 0) {
                const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
                gradient.addColorStop(0, this.hexToRgba(template.network.glowColor, 0.6));
                gradient.addColorStop(1, 'transparent');
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }

            // Nodo
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = template.network.lineColor;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animateNetwork());
    }

    drawLine(node1, node2, template, baseOpacity = 0.5) {
        let opacity = baseOpacity;
        let lineWidth = 1;

        if (this.mouse.x !== null) {
            const midX = (node1.x + node2.x) / 2;
            const midY = (node1.y + node2.y) / 2;
            const distance = Math.hypot(midX - this.mouse.x, midY - this.mouse.y);

            if (distance < 150) {
                const proximity = 1 - (distance / 150);
                opacity = baseOpacity + proximity * 0.5;
                lineWidth = 1 + proximity * 1.5;
            }
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.hexToRgba(template.network.lineColor, opacity);
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(node2.x, node2.y);
        this.ctx.stroke();
    }

    hexToRgba(hex, alpha) {
        const r = Number.parseInt(hex.slice(1, 3), 16);
        const g = Number.parseInt(hex.slice(3, 5), 16);
        const b = Number.parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // ============================================
    // CONTROLES
    // ============================================
    setupControls() {
        const toggle = document.getElementById('templateToggle');
        const panel = document.getElementById('templatePanel');

        // Toggle panel
        toggle.addEventListener('click', () => {
            panel.classList.toggle('active');
        });

        // Click fuera cierra panel
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.template-selector')) {
                panel.classList.remove('active');
            }
        });

        // Template buttons
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyTemplate(btn.dataset.template);
            });
        });

        // Effect buttons
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentEffect = btn.dataset.effect;
            });
        });

        // Density slider
        const densitySlider = document.getElementById('densitySlider');
        const densityValue = document.getElementById('densityValue');

        densitySlider.addEventListener('input', (e) => {
            this.gridDensity = Number.parseInt(e.target.value, 10);
            densityValue.textContent = this.gridDensity;
            this.createGrid();
        });
    }

    applyTemplate(templateName) {
        this.currentTemplate = templateName;
        this.applyStyles(templateName);
        this.buildPage();
        this.startAnimations();

        // Efecto de transición visual
        this.createBurstEffect();
    }

    applyStyles(templateName) {
        const template = TEMPLATES[templateName];
        const root = document.documentElement;
        const s = template.styles;

        // ====== Colores principales ======
        root.style.setProperty('--primary', template.primary);
        root.style.setProperty('--primary-hover', template.primaryHover);
        root.style.setProperty('--secondary', template.secondary);
        root.style.setProperty('--primary-glow', this.hexToRgba(template.primary, s.effects.glowIntensity));

        // ====== Cards ======
        root.style.setProperty('--surface', `rgba(255, 255, 255, ${s.cards.bgOpacity})`);
        root.style.setProperty('--card-border-radius', `${s.cards.borderRadius}px`);
        root.style.setProperty('--card-hover-scale', s.cards.hoverScale);
        root.style.setProperty('--card-padding', `${s.cards.padding}rem`);
        root.style.setProperty('--card-gap', `${s.cards.gap}rem`);
        root.style.setProperty('--card-shadow', s.cards.shadow ? '0 25px 50px rgba(0,0,0,0.5)' : 'none');

        // ====== Buttons ======
        root.style.setProperty('--btn-border-radius', `${s.buttons.borderRadius}px`);
        root.style.setProperty('--btn-hover-scale', s.buttons.hoverScale);

        // ====== Sections (opacidades individuales) ======
        root.style.setProperty('--hero-opacity', s.sections.heroOpacity);
        root.style.setProperty('--services-opacity', s.sections.servicesOpacity);
        root.style.setProperty('--benefits-opacity', s.sections.benefitsOpacity);
        root.style.setProperty('--contact-opacity', s.sections.contactOpacity);
        root.style.setProperty('--section-padding', `${s.sections.padding}rem`);

        // ====== Texts (tamaños y opacidades) ======
        root.style.setProperty('--title-size', `${s.texts.titleSize}rem`);
        root.style.setProperty('--body-size', `${s.texts.bodySize}rem`);
        root.style.setProperty('--title-opacity', s.texts.titleOpacity);
        root.style.setProperty('--paragraph-opacity', s.texts.paragraphOpacity);

        // ====== General ======
        root.style.setProperty('--network-opacity', s.general.networkOpacity);
        root.style.setProperty('--navbar-blur', `${s.general.navbarBlur}px`);
        root.style.setProperty('--navbar-opacity', s.general.navbarOpacity);
        root.style.setProperty('--container-width', `${s.general.containerWidth}px`);

        // ====== Animations ======
        root.style.setProperty('--transition-normal', `${s.animations.transitionSpeed}s`);
        root.style.setProperty('--hover-lift', `${s.animations.hoverLift}px`);

        // ====== Effects ======
        root.style.setProperty('--glow-intensity', s.effects.glowIntensity);
        root.style.setProperty('--border', `rgba(255, 255, 255, ${s.effects.borderOpacity})`);

        // ====== Network config ======
        this.gridDensity = template.network.gridDensity;
        this.currentEffect = template.network.interactionType;
        this.interactionRadius = template.network.interactionRadius;
        this.createGrid();

        // Actualizar UI del panel
        const densityValue = document.getElementById('densityValue');
        const densitySlider = document.getElementById('densitySlider');
        if (densityValue) densityValue.textContent = this.gridDensity;
        if (densitySlider) densitySlider.value = this.gridDensity;

        // Actualizar botón de efecto activo
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.effect === this.currentEffect);
        });

        // ====== Global Style Overrides ======
        if (this.content?.styles) {
            const st = this.content.styles;
            if (st.primary) {
                root.style.setProperty('--primary', st.primary);
                root.style.setProperty('--primary-glow', this.hexToRgba(st.primary, s.effects.glowIntensity));
            }
            if (st.secondary) root.style.setProperty('--secondary', st.secondary);
            if (st.bgDark) root.style.setProperty('--bg-dark', st.bgDark);
        }

        // ====== Reconstruir página para aplicar nuevo layout ======
        this.buildPage();
        this.startAnimations();
    }

    createBurstEffect() {
        const template = TEMPLATES[this.currentTemplate];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${centerX}px;
                top: ${centerY}px;
                width: 8px;
                height: 8px;
                background: ${template.primary};
            `;
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 / 20) * i;
            const distance = 200 + Math.random() * 150;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    // ============================================
    // ANIMACIONES
    // ============================================
    startAnimations() {
        // Navbar
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Logo entrance animation
        const logoEntrance = navbar.dataset.logoEntrance;
        const brand = navbar.querySelector('.nav-brand');
        if (logoEntrance && brand) {
            brand.classList.add(`logo-entrance-${logoEntrance}`);
        }

        // Initial slide-in
        setTimeout(() => navbar.classList.add('animate-in'), 100);

        // --- Composable scroll behaviors ---
        let lastScrollY = 0;
        const isSticky = navbar.classList.contains('navbar-sticky');
        const isShrinkable = navbar.classList.contains('navbar-shrinkable');
        const isAutoHide = navbar.classList.contains('navbar-auto-hide');
        const isScrollReveal = navbar.classList.contains('navbar-scroll-reveal');

        // If sticky, force fixed positioning
        if (isSticky) {
            navbar.style.position = 'fixed';
        }

        // Scroll reveal: start hidden
        if (isScrollReveal) {
            navbar.classList.add('navbar-hidden');
        }

        if (isShrinkable || isAutoHide || isScrollReveal) {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                const heroHeight = document.querySelector('.hero')?.offsetHeight || 500;

                // Shrink
                if (isShrinkable) {
                    if (currentScrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }

                // Auto-hide
                if (isAutoHide) {
                    if (currentScrollY > lastScrollY && currentScrollY > 80) {
                        navbar.classList.add('navbar-hidden');
                    } else {
                        navbar.classList.remove('navbar-hidden');
                    }
                }

                // Scroll reveal
                if (isScrollReveal) {
                    if (currentScrollY > heroHeight * 0.8) {
                        navbar.classList.remove('navbar-hidden');
                    } else {
                        navbar.classList.add('navbar-hidden');
                    }
                }

                lastScrollY = currentScrollY;
            });
        }

        // Hero elements
        const heroElements = ['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-buttons'];
        heroElements.forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (el) setTimeout(() => el.classList.add('animate-in'), 200 + i * 150);
        });

        // Stats con conteo
        document.querySelectorAll('.stat-item').forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('animate-in');
                this.animateNumber(item);
                this.createStatBurst(item);
            }, 800 + i * 150);
        });

        // Scroll animations
        this.setupScrollAnimations();
    }

    animateNumber(item) {
        const target = item.dataset.target;
        const numberEl = item.querySelector('.stat-number');
        if (!target || !numberEl) return;

        const match = target.match(/^(\d+)(.*)$/);
        if (!match) {
            numberEl.textContent = target;
            return;
        }

        const endValue = Number.parseInt(match[1], 10);
        const suffix = match[2] || '';
        const duration = 2000;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            numberEl.textContent = Math.floor(eased * endValue) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    createStatBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const template = TEMPLATES[this.currentTemplate];

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: ${i % 2 === 0 ? template.primary : template.secondary};
            `;
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 / 8) * i;
            const distance = 50 + Math.random() * 30;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = Number.parseInt(entry.target.dataset.delay, 10) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Observar elementos - incluye todos los layouts
        document.querySelectorAll(`
            .section-title, 
            .service-card, 
            .benefit-item, 
            .contact-text, 
            .contact-form, 
            .about-card, 
            .about-description, 
            .about-video,
            .service-list-item,
            .benefit-list-item,
            .carousel-slide,
            .featured-main,
            .benefit-main,
            .benefit-small,
            .benefit-minimal-item,
            .team-card
        `).forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    Showcase.create();
});
