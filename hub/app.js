/* Omega hub – language handling and the terminal banner.
   Shared by index.html and 404.html. */

const SUPPORTED_LANGS = ['de', 'en', 'fr', 'es', 'pt', 'zh'];
const FALLBACK_LANG   = 'en';
// Shared across hub and apps, so a language picked anywhere carries over
const LANG_KEY        = 'omega_lang';

const localeCache = new Map();
let currentLang = FALLBACK_LANG;
let strings = {};

function t(key, fallback = '') {
  const value = strings[key];
  if (value == null) return fallback;
  return value.replace('{year}', String(new Date().getFullYear()));
}

function readStoredLang() {
  try { return localStorage.getItem(LANG_KEY); } catch (_) { return null; }
}

function storeLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) { /* private mode */ }
}

function detectLang() {
  const stored = readStoredLang();
  if (SUPPORTED_LANGS.includes(stored)) return stored;
  for (const tag of navigator.languages || [navigator.language || '']) {
    const base = String(tag).toLowerCase().split('-')[0];
    if (SUPPORTED_LANGS.includes(base)) return base;
  }
  return FALLBACK_LANG;
}

async function loadLocale(lang) {
  if (localeCache.has(lang)) return localeCache.get(lang);
  const res = await fetch(`/hub/locales/${lang}.json`);
  if (!res.ok) {
    if (lang !== FALLBACK_LANG) return loadLocale(FALLBACK_LANG);
    throw new Error(`Locale ${lang} failed to load`);
  }
  const data = await res.json();
  localeCache.set(lang, data);
  return data;
}

function applyI18n() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n, el.textContent);
  });
  document.querySelectorAll('[data-i18n-content]').forEach(el => {
    el.setAttribute('content', t(el.dataset.i18nContent, el.getAttribute('content')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria, el.getAttribute('aria-label')));
  });

  const select = document.getElementById('lang-select');
  if (select) select.value = currentLang;
}

async function setLanguage(lang, { animate = false } = {}) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : FALLBACK_LANG;
  strings = await loadLocale(currentLang);
  applyI18n();
  runTerminal(animate);
}

/* ── Terminal ─────────────────────────────────────────── */

// Each step is a typed command followed by instantly printed output lines.
// Output parts are [text, className] pairs and are always inserted as text,
// never as HTML – the 404 script echoes the user-controlled URL path.
function terminalScript(name) {
  if (name === 'notfound') {
    const path = decodeURIComponentSafe(location.pathname);
    return [
      { cmd: `cd ${path}`, out: [[[`bash: cd: ${path}: ${t('notFoundError')}`, 'term-error']]] },
    ];
  }
  return [
    { cmd: 'whoami',       out: [[[t('greeting'), 'term-greeting']]] },
    { cmd: 'ls projects/', out: [[['omega-cv', 'term-cv'], ['  '], ['omega-garden', 'term-garden']]] },
  ];
}

function decodeURIComponentSafe(value) {
  try { return decodeURIComponent(value); } catch (_) { return value; }
}

const PROMPT = 'paul@omega:~$';
let terminalRun = 0;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function promptLine() {
  const line = el('div', 'term-line');
  line.append(el('span', 'term-prompt', PROMPT), ' ');
  const cmd = el('span', 'term-cmd');
  line.append(cmd);
  return { line, cmd };
}

function outputLine(parts) {
  const line = el('div', 'term-line term-out');
  parts.forEach(([text, className]) => line.append(el('span', className || null, text)));
  return line;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runTerminal(animate) {
  const body = document.getElementById('term-body');
  if (!body) return;

  // A newer run (e.g. a language switch mid-animation) cancels this one
  const run = ++terminalRun;
  const stale = () => run !== terminalRun;
  const steps = terminalScript(body.dataset.script);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const typed = animate && !reduceMotion;

  body.replaceChildren();
  const cursor = el('span', 'term-cursor');

  for (const step of steps) {
    const { line, cmd } = promptLine();
    body.append(line);

    if (typed) {
      line.append(cursor);
      await sleep(380);
      for (const ch of step.cmd) {
        if (stale()) return;
        cmd.textContent += ch;
        await sleep(45 + Math.random() * 55);
      }
      await sleep(320);
      if (stale()) return;
    } else {
      cmd.textContent = step.cmd;
    }

    step.out.forEach(parts => body.append(outputLine(parts)));
  }

  // Trailing prompt; a future interactive input field will live here
  const { line } = promptLine();
  line.append(cursor);
  body.append(line);
}

/* ── Init ─────────────────────────────────────────────── */

function bindEvents() {
  const select = document.getElementById('lang-select');
  if (!select) return;
  select.addEventListener('change', e => {
    storeLang(e.target.value);
    setLanguage(e.target.value).catch(err => console.warn(err));
  });
}

(async function init() {
  bindEvents();
  try {
    await setLanguage(detectLang(), { animate: true });
  } catch (err) {
    // The static German markup stays usable if locales cannot be fetched
    console.warn('Hub i18n failed', err);
  }
})();
