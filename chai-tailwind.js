/* CHAI-TAILWIND CORE ENGINE */
(function () {
  "use strict";

  /* ── SCALE HELPERS ── */
  const spacing = n => `${n * 4}px`;
  const named = { none: '0', auto: 'auto', full: '100%', screen: '100vw', 'screen-h': '100vh', half: '50%' };
  const fw = { thin: '100', extralight: '200', light: '300', normal: '400', medium: '500', semibold: '600', bold: '700', extrabold: '800', black: '900' };
  const fs = { xs: '.75rem', sm: '.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem', '6xl': '3.75rem' };
  const lh = { none: '1', tight: '1.25', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' };
  const round = { none: '0', sm: '2px', base: '4px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px', '3xl': '24px', full: '9999px' };
  const shadow = {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,.05)',
    base: '0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06)',
    md: '0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06)',
    lg: '0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05)',
    xl: '0 20px 25px rgba(0,0,0,.1), 0 8px 10px rgba(0,0,0,.04)',
    '2xl': '0 25px 50px rgba(0,0,0,.25)',
    inner: 'inset 0 2px 4px rgba(0,0,0,.06)',
  };
  const displays = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden', 'table', 'table-cell', 'table-row', 'contents', 'flow-root'];
  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  const overflows = ['auto', 'hidden', 'visible', 'scroll', 'clip', 'x-auto', 'x-hidden', 'y-auto', 'y-hidden'];
  const cursors = ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'not-allowed', 'crosshair', 'grab', 'grabbing', 'zoom-in', 'zoom-out', 'col-resize', 'row-resize'];
  const transitions = {
    none: 'none',
    all: 'all .15s ease',
    base: 'color .15s ease, background-color .15s ease, border-color .15s ease, box-shadow .15s ease',
    colors: 'color .15s ease, background-color .15s ease, border-color .15s ease',
    opacity: 'opacity .15s ease',
    transform: 'transform .15s ease',
    fast: 'all .1s ease',
    slow: 'all .3s ease',
  };

  /* ── COLOR RESOLVER ── */
  const palette = {
    transparent: 'transparent', current: 'currentColor', white: '#ffffff', black: '#000000',
    slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827' },
    red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d' },
    orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12' },
    amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
    yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12' },
    lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314' },
    green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d' },
    teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' },
    cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63' },
    blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
    indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81' },
    violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95' },
    purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87' },
    pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843' },
    rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337' },
  };

  function resolveColor(str) {
    if (!str) return null;
    // hex shorthand: chai-bg-#f00
    if (str.startsWith('#')) return str;
    // rgb: chai-bg-rgb-255-0-0
    if (str.startsWith('rgb-')) { const p = str.slice(4).split('-'); return `rgb(${p[0]},${p[1]},${p[2]})`; }
    // hsl: chai-bg-hsl-200-80-50
    if (str.startsWith('hsl-')) { const p = str.slice(4).split('-'); return `hsl(${p[0]},${p[1]}%,${p[2]}%)`; }
    // named flat
    if (palette[str] && typeof palette[str] === 'string') return palette[str];
    // shade: red-500
    const dash = str.lastIndexOf('-');
    if (dash !== -1) {
      const name = str.slice(0, dash), shade = str.slice(dash + 1);
      if (palette[name] && palette[name][shade]) return palette[name][shade];
    }
    // CSS keyword fallback
    return str;
  }

  function resolveSize(val) {
    if (!val) return null;
    if (named[val]) return named[val];
    if (!isNaN(val)) return spacing(Number(val));
    // fractions: 1/2, 1/3
    if (val.includes('/')) { const [a, b] = val.split('/'); return `${(a / b * 100).toFixed(4)}%`; }
    return null;
  }

  /* ── PARSER ── */
  function parseClass(cls) {
    if (!cls.startsWith('chai-')) return null;
    const raw = cls.slice(5); // strip "chai-"
    const parts = raw.split('-');

    /* ── SPACING ── */
    // p, m, px, py, pt, pr, pb, pl, mx, my, mt, mr, mb, ml
    const spaceMap = {
      p: 'padding', m: 'margin',
      pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left',
      px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'],
      mt: 'margin-top', mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left',
      mx: ['margin-left', 'margin-right'], my: ['margin-top', 'margin-bottom'],
    };
    if (parts.length >= 2 && spaceMap[parts[0]]) {
      const val = resolveSize(parts.slice(1).join('-'));
      if (val !== null) {
        const prop = spaceMap[parts[0]];
        if (Array.isArray(prop)) return Object.fromEntries(prop.map(k => [k, val]));
        return { [prop]: val };
      }
    }

    /* ── GAP ── */
    if (parts[0] === 'gap' && parts.length === 2) {
      const v = resolveSize(parts[1]); if (v) return { gap: v };
    }
    if (parts[0] === 'gap' && parts[1] === 'x' && parts.length === 3) {
      const v = resolveSize(parts[2]); if (v) return { 'column-gap': v };
    }
    if (parts[0] === 'gap' && parts[1] === 'y' && parts.length === 3) {
      const v = resolveSize(parts[2]); if (v) return { 'row-gap': v };
    }

    /* ── COLORS (bg, text, border-color, outline-color) ── */
    if (parts[0] === 'bg') {
      const c = resolveColor(parts.slice(1).join('-')); if (c) return { 'background-color': c };
    }
    if (parts[0] === 'text' && parts.length >= 2) {
      // text-align keywords
      const alignKw = ['left', 'right', 'center', 'justify', 'start', 'end'];
      if (alignKw.includes(parts[1])) return { 'text-align': parts[1] };
      // text size
      const tsz = fs[parts.slice(1).join('-')]; if (tsz) return { 'font-size': tsz };
      // text color
      const c = resolveColor(parts.slice(1).join('-')); if (c) return { color: c };
    }
    if (parts[0] === 'border' && parts[1] === 'color') {
      const c = resolveColor(parts.slice(2).join('-')); if (c) return { 'border-color': c };
    }
    if (parts[0] === 'outline' && parts[1] === 'color') {
      const c = resolveColor(parts.slice(2).join('-')); if (c) return { 'outline-color': c };
    }
    if (parts[0] === 'accent') {
      const c = resolveColor(parts.slice(1).join('-')); if (c) return { 'accent-color': c };
    }
    if (parts[0] === 'caret') {
      const c = resolveColor(parts.slice(1).join('-')); if (c) return { 'caret-color': c };
    }
    if (parts[0] === 'decoration') {
      const c = resolveColor(parts.slice(1).join('-')); if (c) return { 'text-decoration-color': c };
    }
    if (parts[0] === 'ring') {
      const sz = parts.length === 1 ? '3px' : (parts[1] === '0' ? '0' : `${parts[1]}px`);
      const c = parts.length > 2 ? resolveColor(parts.slice(2).join('-')) : 'rgba(59,130,246,.5)';
      return { 'box-shadow': `0 0 0 ${sz} ${c || 'rgba(59,130,246,.5)'}` };
    }

    /* ── TYPOGRAPHY ── */
    if (parts[0] === 'font' && parts.length >= 2) {
      if (fw[parts.slice(1).join('-')]) return { 'font-weight': fw[parts.slice(1).join('-')] };
      const fss = fs[parts.slice(1).join('-')]; if (fss) return { 'font-size': fss };
      if (parts[1] === 'italic') return { 'font-style': 'italic' };
      if (parts[1] === 'not' && parts[2] === 'italic') return { 'font-style': 'normal' };
      if (parts[1] === 'sans') return { 'font-family': 'ui-sans-serif, system-ui, -apple-system, sans-serif' };
      if (parts[1] === 'serif') return { 'font-family': 'ui-serif, Georgia, Cambria, serif' };
      if (parts[1] === 'mono') return { 'font-family': 'ui-monospace, SFMono-Regular, Menlo, monospace' };
    }
    if (parts[0] === 'italic') return { 'font-style': 'italic' };
    if (parts[0] === 'not' && parts[1] === 'italic') return { 'font-style': 'normal' };
    if (parts[0] === 'underline') return { 'text-decoration': 'underline' };
    if (parts[0] === 'overline') return { 'text-decoration': 'overline' };
    if (parts[0] === 'line' && parts[1] === 'through') return { 'text-decoration': 'line-through' };
    if (parts[0] === 'no' && parts[1] === 'underline') return { 'text-decoration': 'none' };
    if (parts[0] === 'uppercase') return { 'text-transform': 'uppercase' };
    if (parts[0] === 'lowercase') return { 'text-transform': 'lowercase' };
    if (parts[0] === 'capitalize') return { 'text-transform': 'capitalize' };
    if (parts[0] === 'normal' && parts[1] === 'case') return { 'text-transform': 'none' };
    if (parts[0] === 'tracking') {
      const tMap = { tighter: '-.05em', tight: '-.025em', normal: '0', wide: '.025em', wider: '.05em', widest: '.1em' };
      if (tMap[parts[1]]) return { 'letter-spacing': tMap[parts[1]] };
      if (!isNaN(parts[1])) return { 'letter-spacing': `${parts[1]}em` };
    }
    if (parts[0] === 'leading') {
      if (lh[parts.slice(1).join('-')]) return { 'line-height': lh[parts.slice(1).join('-')] };
      if (!isNaN(parts[1])) return { 'line-height': parts[1] };
    }
    if (parts[0] === 'truncate') return { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' };
    if (parts[0] === 'whitespace') {
      const wsMap = { normal: 'normal', nowrap: 'nowrap', pre: 'pre', 'pre-line': 'pre-line', 'pre-wrap': 'pre-wrap', 'break-spaces': 'break-spaces' };
      if (wsMap[parts.slice(1).join('-')]) return { 'white-space': wsMap[parts.slice(1).join('-')] };
    }
    if (parts[0] === 'break') {
      if (parts[1] === 'words') return { 'overflow-wrap': 'break-word' };
      if (parts[1] === 'all') return { 'word-break': 'break-all' };
      if (parts[1] === 'keep') return { 'word-break': 'keep-all' };
      if (parts[1] === 'normal') return { 'overflow-wrap': 'normal', 'word-break': 'normal' };
    }

    /* ── SIZING ── */
    if ((parts[0] === 'w' || parts[0] === 'h' || parts[0] === 'min' || parts[0] === 'max') && parts.length >= 2) {
      const propMap = {
        w: 'width', h: 'height',
        'min-w': 'min-width', 'max-w': 'max-width', 'min-h': 'min-height', 'max-h': 'max-height'
      };
      const key = parts[0] === 'min' || parts[0] === 'max' ? `${parts[0]}-${parts[1]}` : parts[0];
      const valParts = parts[0] === 'min' || parts[0] === 'max' ? parts.slice(2) : parts.slice(1);
      const prop = propMap[key];
      if (prop) {
        const specialW = { prose: '65ch', xs: '20rem', sm: '24rem', md: '28rem', lg: '32rem', xl: '36rem', '2xl': '42rem', '3xl': '48rem', '4xl': '56rem', '5xl': '64rem', '6xl': '72rem', '7xl': '80rem' };
        const valStr = valParts.join('-');
        if (specialW[valStr]) return { [prop]: specialW[valStr] };
        const v = resolveSize(valStr); if (v) return { [prop]: v };
      }
    }

    /* ── BORDERS ── */
    if (parts[0] === 'border') {
      if (parts.length === 1) return { border: '1px solid currentColor' };
      if (parts[1] === 'none') return { border: 'none' };
      if (['t', 'r', 'b', 'l', 'x', 'y'].includes(parts[1])) {
        const sides = { t: ['top'], r: ['right'], b: ['bottom'], l: ['left'], x: ['left', 'right'], y: ['top', 'bottom'] };
        const width = parts[2] ? `${parts[2]}px` : '1px';
        const style = parts[3] || 'solid';
        return Object.fromEntries(sides[parts[1]].map(s => [`border-${s}`, `${width} ${style} currentColor`]));
      }
      if (!isNaN(parts[1])) return { border: `${parts[1]}px solid currentColor` };
      if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(parts[1])) return { 'border-style': parts[1] };
    }
    if (parts[0] === 'rounded') {
      if (parts.length === 1) return { 'border-radius': round.base };
      const key = parts.slice(1).join('-');
      if (round[key]) return { 'border-radius': round[key] };
      // side variants
      if (['t', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl'].includes(parts[1])) {
        const cornerMap = {
          t: ['top-left', 'top-right'], r: ['top-right', 'bottom-right'],
          b: ['bottom-left', 'bottom-right'], l: ['top-left', 'bottom-left'],
          tl: ['top-left'], tr: ['top-right'], br: ['bottom-right'], bl: ['bottom-left'],
        };
        const sz = round[parts.slice(2).join('-') || 'base'] || round.base;
        return Object.fromEntries(cornerMap[parts[1]].map(c => [`border-${c}-radius`, sz]));
      }
    }

    /* ── DISPLAY ── */
    for (const d of displays) {
      if (raw === d || raw === d.replace('-', '-')) {
        if (d === 'hidden') return { display: 'none' };
        return { display: d };
      }
    }

    /* ── POSITION ── */
    for (const p of positions) {
      if (raw === p) return { position: p };
    }
    // inset, top, right, bottom, left
    const insetMap = { inset: ['top', 'right', 'bottom', 'left'], 'inset-x': ['left', 'right'], 'inset-y': ['top', 'bottom'], top: ['top'], right: ['right'], bottom: ['bottom'], left: ['left'] };
    for (const [k, props] of Object.entries(insetMap)) {
      if (raw.startsWith(k + '-')) {
        const v = resolveSize(raw.slice(k.length + 1)); if (v) return Object.fromEntries(props.map(p => [p, v]));
      }
    }
    if (raw === 'inset-auto') return { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };

    /* ── Z-INDEX ── */
    if (parts[0] === 'z') {
      const zMap = { auto: 'auto', '0': '0', '10': '10', '20': '20', '30': '30', '40': '40', '50': '50' };
      if (parts[1] && (zMap[parts[1]] !== undefined || !isNaN(parts[1]))) return { 'z-index': parts[1] };
    }

    /* ── FLEX ── */
    if (parts[0] === 'flex') {
      if (parts.length === 1) return { display: 'flex' };
      const flexMap = {
        row: { 'flex-direction': 'row' }, 'row-reverse': { 'flex-direction': 'row-reverse' },
        col: { 'flex-direction': 'column' }, 'col-reverse': { 'flex-direction': 'column-reverse' },
        wrap: { 'flex-wrap': 'wrap' }, nowrap: { 'flex-wrap': 'nowrap' }, 'wrap-reverse': { 'flex-wrap': 'wrap-reverse' },
        '1': { flex: '1 1 0%' }, auto: { flex: '1 1 auto' }, initial: { flex: '0 1 auto' }, none: { flex: 'none' },
        grow: { 'flex-grow': '1' }, shrink: { 'flex-shrink': '1' }, 'grow-0': { 'flex-grow': '0' }, 'shrink-0': { 'flex-shrink': '0' },
      };
      const k = parts.slice(1).join('-');
      if (flexMap[k]) return flexMap[k];
    }
    if (parts[0] === 'grow') return { 'flex-grow': parts[1] || '1' };
    if (parts[0] === 'shrink') return { 'flex-shrink': parts[1] || '1' };
    if (parts[0] === 'basis') { const v = resolveSize(parts.slice(1).join('-')); if (v) return { 'flex-basis': v }; }
    if (parts[0] === 'order') { if (!isNaN(parts[1])) return { order: parts[1] }; }

    /* ── JUSTIFY & ALIGN ── */
    if (parts[0] === 'justify') {
      const jMap = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly', stretch: 'stretch' };
      if (jMap[parts[1]]) return { 'justify-content': jMap[parts[1]] };
    }
    if (parts[0] === 'items') {
      const aMap = { start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch' };
      if (aMap[parts[1]]) return { 'align-items': aMap[parts[1]] };
    }
    if (parts[0] === 'self') {
      const sMap = { auto: 'auto', start: 'flex-start', end: 'flex-end', center: 'center', stretch: 'stretch', baseline: 'baseline' };
      if (sMap[parts[1]]) return { 'align-self': sMap[parts[1]] };
    }
    if (parts[0] === 'content') {
      const cMap = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly', stretch: 'stretch', normal: 'normal' };
      if (cMap[parts[1]]) return { 'align-content': cMap[parts[1]] };
    }

    /* ── GRID ── */
    if (parts[0] === 'grid') {
      if (parts.length === 1) return { display: 'grid' };
      if (parts[1] === 'cols') {
        if (!isNaN(parts[2])) return { 'grid-template-columns': `repeat(${parts[2]}, minmax(0, 1fr))` };
        if (parts[2] === 'none') return { 'grid-template-columns': 'none' };
      }
      if (parts[1] === 'rows') {
        if (!isNaN(parts[2])) return { 'grid-template-rows': `repeat(${parts[2]}, minmax(0, 1fr))` };
        if (parts[2] === 'none') return { 'grid-template-rows': 'none' };
      }
      if (parts[1] === 'flow') {
        const fMap = { row: 'row', col: 'column', dense: 'row dense', 'row-dense': 'row dense', 'col-dense': 'column dense' };
        if (fMap[parts.slice(2).join('-')]) return { 'grid-auto-flow': fMap[parts.slice(2).join('-')] };
      }
    }
    if (parts[0] === 'col' && parts[1] === 'span') {
      if (!isNaN(parts[2])) return { 'grid-column': `span ${parts[2]} / span ${parts[2]}` };
    }
    if (parts[0] === 'row' && parts[1] === 'span') {
      if (!isNaN(parts[2])) return { 'grid-row': `span ${parts[2]} / span ${parts[2]}` };
    }

    /* ── OVERFLOW ── */
    for (const o of overflows) {
      if (raw === `overflow-${o}`) {
        if (o.startsWith('x-')) return { 'overflow-x': o.slice(2) };
        if (o.startsWith('y-')) return { 'overflow-y': o.slice(2) };
        return { overflow: o };
      }
    }

    /* ── OPACITY ── */
    if (parts[0] === 'opacity' && !isNaN(parts[1])) {
      return { opacity: String(Number(parts[1]) / 100) };
    }

    /* ── SHADOW ── */
    if (parts[0] === 'shadow') {
      const key = parts.slice(1).join('-') || 'base';
      if (shadow[key]) return { 'box-shadow': shadow[key] };
    }

    /* ── CURSOR ── */
    for (const c of cursors) {
      if (raw === `cursor-${c}`) return { cursor: c };
    }

    /* ── USER SELECT ── */
    if (parts[0] === 'select') {
      const selMap = { none: 'none', text: 'text', all: 'all', auto: 'auto' };
      if (selMap[parts[1]]) return { 'user-select': selMap[parts[1]] };
    }

    /* ── POINTER EVENTS ── */
    if (parts[0] === 'pointer' && parts[1] === 'events') {
      if (parts[2] === 'none') return { 'pointer-events': 'none' };
      if (parts[2] === 'auto') return { 'pointer-events': 'auto' };
    }

    /* ── VISIBILITY ── */
    if (raw === 'visible') return { visibility: 'visible' };
    if (raw === 'invisible') return { visibility: 'hidden' };

    /* ── TRANSITIONS ── */
    if (parts[0] === 'transition') {
      const k = parts.slice(1).join('-') || 'base';
      if (transitions[k]) return { transition: transitions[k] };
    }
    if (parts[0] === 'duration' && !isNaN(parts[1])) return { 'transition-duration': `${parts[1]}ms` };
    if (parts[0] === 'ease') {
      const eMap = { linear: 'linear', in: 'ease-in', out: 'ease-out', 'in-out': 'ease-in-out' };
      const k = parts.slice(1).join('-');
      if (eMap[k]) return { 'transition-timing-function': eMap[k] };
    }
    if (parts[0] === 'delay' && !isNaN(parts[1])) return { 'transition-delay': `${parts[1]}ms` };

    /* ── TRANSFORM ── */
    if (raw === 'transform') return { transform: 'translateX(var(--tw-translate-x,0)) translateY(var(--tw-translate-y,0)) rotate(var(--tw-rotate,0)) scaleX(var(--tw-scale-x,1)) scaleY(var(--tw-scale-y,1))' };
    if (parts[0] === 'scale' && !isNaN(parts[1])) return { transform: `scale(${Number(parts[1]) / 100})` };
    if (parts[0] === 'rotate' && !isNaN(parts[1])) return { transform: `rotate(${parts[1]}deg)` };
    if (parts[0] === 'translate' && parts[1] === 'x') { const v = resolveSize(parts.slice(2).join('-')); if (v) return { transform: `translateX(${v})` }; }
    if (parts[0] === 'translate' && parts[1] === 'y') { const v = resolveSize(parts.slice(2).join('-')); if (v) return { transform: `translateY(${v})` }; }
    if (parts[0] === 'skew' && parts[1] === 'x' && !isNaN(parts[2])) return { transform: `skewX(${parts[2]}deg)` };
    if (parts[0] === 'skew' && parts[1] === 'y' && !isNaN(parts[2])) return { transform: `skewY(${parts[2]}deg)` };
    if (raw === 'origin-center') return { 'transform-origin': 'center' };
    if (raw === 'origin-top') return { 'transform-origin': 'top' };
    if (raw === 'origin-bottom') return { 'transform-origin': 'bottom' };
    if (raw === 'origin-left') return { 'transform-origin': 'left' };
    if (raw === 'origin-right') return { 'transform-origin': 'right' };

    /* ── MISC ── */
    if (raw === 'sr-only') return { position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', 'white-space': 'nowrap', 'border-width': '0' };
    if (raw === 'not-sr-only') return { position: 'static', width: 'auto', height: 'auto', padding: '0', margin: '0', overflow: 'visible', clip: 'auto', 'white-space': 'normal' };
    if (raw === 'isolate') return { isolation: 'isolate' };
    if (raw === 'isolation-auto') return { isolation: 'auto' };
    if (parts[0] === 'aspect') { if (parts[1] === 'square') return { 'aspect-ratio': '1/1' }; if (parts[1] === 'video') return { 'aspect-ratio': '16/9' }; }
    if (parts[0] === 'object') {
      const ofMap = { contain: 'contain', cover: 'cover', fill: 'fill', none: 'none', 'scale-down': 'scale-down' };
      if (ofMap[parts[1]]) return { 'object-fit': ofMap[parts[1]] };
      const opMap = { top: 'top', bottom: 'bottom', left: 'left', right: 'right', center: 'center' };
      if (opMap[parts[1]]) return { 'object-position': opMap[parts[1]] };
    }

    return null; // unrecognized
  }

  /* ── APPLIER ── */
  function applyChaiClasses(root) {
    const els = (root || document).querySelectorAll('*');
    els.forEach(el => {
      const toRemove = [];
      el.classList.forEach(cls => {
        if (!cls.startsWith('chai-')) return;
        const styles = parseClass(cls);
        if (styles) {
          Object.entries(styles).forEach(([prop, val]) => {
            el.style.setProperty(prop, val);
          });
          toRemove.push(cls);
        }
      });
      toRemove.forEach(c => el.classList.remove(c));
    });
  }

  /* ── PUBLIC API ── */
  window.ChaiTailwind = {
    apply: applyChaiClasses,
    parse: parseClass,
    version: '1.0.0',
  };

  /* ── AUTO-INIT ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyChaiClasses());
  } else {
    applyChaiClasses();
  }

  /* ── MUTATION OBSERVER (watch dynamic changes) ── */
  const obs = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) applyChaiClasses(node);
      });
      if (m.type === 'attributes' && m.attributeName === 'class') {
        applyChaiClasses(m.target.parentElement || document);
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  });

})();

/* 
   PLAYGROUND RUNNER
   Guard: only runs on the main page, NOT inside the preview iframe
*/
if (document.getElementById('html-input')) {

  // Cache the engine source after first fetch so Run is instant on repeat clicks
  let _engineSrcCache = null;

  function _writePreview(engineSrc, code) {
    const frame = document.getElementById('preview-frame');
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(
      '<!DOCTYPE html><html><head>' +
      '<meta charset="UTF-8">' +
      '<style>body{margin:0;padding:1.5rem;font-family:sans-serif;box-sizing:border-box;}</style>' +
      '<script>' + engineSrc + '<' + '/script>' +
      '</head><body>' + code + '</body></html>'
    );
    doc.close();
  }

  function runPreview() {
    const code = document.getElementById('html-input').value;
    if (_engineSrcCache) {
      _writePreview(_engineSrcCache, code);
      return;
    }
    // Fetch only the engine IIFE part (everything before the playground runner guard)
    fetch('chai-tailwind.js')
      .then(function (res) { return res.text(); })
      .then(function (src) {
        // Strip everything from the PLAYGROUND RUNNER comment onwards
        // so the iframe only gets the clean engine IIFE
        const cutoff = src.indexOf('/* ═══════════════════════════════════\n   PLAYGROUND RUNNER');
        _engineSrcCache = cutoff !== -1 ? src.slice(0, cutoff) : src;
        _writePreview(_engineSrcCache, code);
      })
      .catch(function () {
        _writePreview('', code);
      });
  }

  // Expose globally so the onclick="runPreview()" button works
  window.runPreview = runPreview;

  /* ── AUTO-RUN on page load ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreview);
  } else {
    runPreview();
  }

  /* ── LIVE PREVIEW (debounced) ── */
  let _debounceTimer;
  document.getElementById('html-input').addEventListener('input', function () {
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(runPreview, 400);
  });

  /* ── Ctrl+Enter shortcut ── */
  document.getElementById('html-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearTimeout(_debounceTimer);
      runPreview();
    }
  });

} // end guard
