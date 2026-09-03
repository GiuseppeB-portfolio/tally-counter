/**
 * Tally — Counter App
 * Interfaccia creata interamente via DOM manipulation, in JavaScript puro.
 */

const STORAGE_KEY = 'tally-counter-state';
const STEP_OPTIONS = [1, 2, 5, 10, 25];
const DEFAULT_STATE = { value: 0, step: 1 };

/* ---------- Persistenza ---------- */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    const value = Number.isFinite(parsed.value) ? parsed.value : 0;
    const step = STEP_OPTIONS.includes(parsed.step) ? parsed.step : 1;
    return { value, step };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage non disponibile (es. modalità privata): l'app funziona comunque,
    // semplicemente non ricorderà il valore al refresh.
  }
}

/* ---------- Formattazione display ---------- */

function formatValue(value) {
  const sign = value < 0 ? '-' : '';
  const digits = String(Math.abs(value)).padStart(4, '0');
  return sign + digits;
}

/* ---------- Costruzione interfaccia ---------- */

function buildUI(root) {
  const state = loadState();

  const device = document.createElement('div');
  device.className = 'device';

  // Targhetta superiore del dispositivo
  const label = document.createElement('div');
  label.className = 'device__label';
  const brand = document.createElement('span');
  brand.className = 'device__brand';
  brand.textContent = 'Tally';
  const model = document.createElement('span');
  model.className = 'device__model';
  model.textContent = 'Mod. 01 — Contatore';
  label.append(brand, model);

  // Display digitale
  const display = document.createElement('div');
  display.className = 'display';
  const ghost = document.createElement('div');
  ghost.className = 'display__ghost';
  ghost.setAttribute('aria-hidden', 'true');
  ghost.textContent = '8888';
  const valueEl = document.createElement('div');
  valueEl.className = 'display__value';
  valueEl.id = 'counter-value';
  valueEl.setAttribute('role', 'status');
  valueEl.setAttribute('aria-live', 'polite');
  display.append(ghost, valueEl);

  // Pulsanti + / -
  const controls = document.createElement('div');
  controls.className = 'controls';

  const minusBtn = document.createElement('button');
  minusBtn.type = 'button';
  minusBtn.className = 'btn btn--minus';
  minusBtn.textContent = '−';
  minusBtn.setAttribute('aria-label', 'Diminuisci il contatore');

  const plusBtn = document.createElement('button');
  plusBtn.type = 'button';
  plusBtn.className = 'btn btn--plus';
  plusBtn.textContent = '+';
  plusBtn.setAttribute('aria-label', 'Aumenta il contatore');

  controls.append(minusBtn, plusBtn);

  // Riga secondaria: selezione step + reset
  const subrow = document.createElement('div');
  subrow.className = 'subrow';

  const stepper = document.createElement('div');
  stepper.className = 'stepper';
  const stepLabel = document.createElement('label');
  stepLabel.className = 'stepper__label';
  stepLabel.textContent = 'Passo';
  stepLabel.htmlFor = 'step-select';
  const stepSelect = document.createElement('select');
  stepSelect.id = 'step-select';
  STEP_OPTIONS.forEach((opt) => {
    const optionEl = document.createElement('option');
    optionEl.value = String(opt);
    optionEl.textContent = `±${opt}`;
    stepSelect.appendChild(optionEl);
  });
  stepper.append(stepLabel, stepSelect);

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'reset-btn';
  resetBtn.textContent = 'Reset';
  resetBtn.title = 'Riporta il contatore a 0';

  subrow.append(stepper, resetBtn);

  device.append(label, display, controls, subrow);

  const footnote = document.createElement('p');
  footnote.className = 'footnote';
  footnote.innerHTML =
    'Usa i pulsanti oppure le frecce <strong>↑</strong> / <strong>↓</strong> della tastiera. Il valore viene salvato automaticamente.';

  root.append(device, footnote);

  return { valueEl, minusBtn, plusBtn, stepSelect, resetBtn, state };
}

/* ---------- Avvio applicazione ---------- */

function init() {
  const root = document.getElementById('app');
  const { valueEl, minusBtn, plusBtn, stepSelect, resetBtn, state } = buildUI(root);

  let { value, step } = state;
  stepSelect.value = String(step);

  function render({ pulse = false } = {}) {
    valueEl.textContent = formatValue(value);
    if (pulse) {
      valueEl.classList.remove('is-pulsing');
      // forza il reflow per poter ripetere l'animazione a click ravvicinati
      void valueEl.offsetWidth;
      valueEl.classList.add('is-pulsing');
    }
  }

  function persist() {
    saveState({ value, step });
  }

  function increment() {
    value += step;
    render({ pulse: true });
    persist();
  }

  function decrement() {
    value -= step;
    render({ pulse: true });
    persist();
  }

  function reset() {
    value = 0;
    render({ pulse: true });
    persist();
  }

  plusBtn.addEventListener('click', increment);
  minusBtn.addEventListener('click', decrement);
  resetBtn.addEventListener('click', reset);

  stepSelect.addEventListener('change', () => {
    step = Number(stepSelect.value);
    persist();
  });

  document.addEventListener('keydown', (event) => {
    if (event.target && event.target.tagName === 'SELECT') return;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      decrement();
    }
  });

  render();
}

document.addEventListener('DOMContentLoaded', init);
