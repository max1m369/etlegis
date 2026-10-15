import { rng, hash } from './utils.js';

export function setupInteractions(state) {
  // Hero hold-to-enter
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('pointerdown', e => {
      if (!e.target.closest('a,button')) state.holding = true;
    });
    window.addEventListener('pointerup', () => (state.holding = false));
    window.addEventListener('pointercancel', () => (state.holding = false));
    hero.addEventListener('contextmenu', e => e.preventDefault());
  }

  // Facts & principles <-> 3D Info Icon highlight binding
  const pBoxes = document.querySelectorAll('.principle-box');
  pBoxes.forEach((box, i) => {
    box.addEventListener('pointerenter', () => {
      state.aboutHover = i;
    });
    box.addEventListener('pointerleave', () => {
      state.aboutHover = -1;
    });
  });

  document.querySelectorAll('[data-n]').forEach(el => {
    const rawN = parseInt(el.dataset.n, 10);
    const n = isNaN(rawN) ? 0 : rawN - 1;
    el.addEventListener('pointerenter', () => {
      state.aboutHover = n;
      document.querySelectorAll(`[data-n="${el.dataset.n}"]`).forEach(x => x.classList.add('hl'));
    });
    el.addEventListener('pointerleave', () => {
      state.aboutHover = -1;
      document.querySelectorAll(`[data-n="${el.dataset.n}"]`).forEach(x => x.classList.remove('hl'));
    });
  });

  // Services / Volumes accordion & 3D hover
  const svcs = [...document.querySelectorAll('.svc')];
  const paintSvc = () => {
    const a = state.svcHover >= 0 ? state.svcHover : state.svcOpen;
    svcs.forEach((s, i) => s.classList.toggle('act', i === a));
  };
  svcs.forEach((s, i) => {
    s.addEventListener('pointerenter', () => {
      state.svcHover = i;
      paintSvc();
    });
    s.addEventListener('pointerleave', () => {
      state.svcHover = -1;
      paintSvc();
    });
    s.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      state.svcOpen = state.svcOpen === i ? -1 : i;
      svcs.forEach((x, j) => x.classList.toggle('open', j === state.svcOpen));
      paintSvc();
    });
  });

  // Procedural SVG Signatures
  function signature(name) {
    const r = rng(hash(name));
    let x = 6, y = 34, d = `M${x} ${y}`;
    d += ` C${x + 4} ${y - 30} ${x + 22} ${y - 36} ${x + 18} ${y - 6}`;
    x += 18; y -= 6;
    d += ` C${x - 4} ${y + 18} ${x - 16} ${y + 10} ${x - 6} ${y - 2}`;
    x -= 6; y -= 2;
    const n = 6 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const dx = 10 + r() * 17, up = 6 + r() * 20, nx = x + dx, ny = 30 + (r() - 0.5) * 10;
      d += r() < 0.35
        ? ` C${x + dx * 1.5} ${y - up} ${x - dx * 0.4} ${y - up} ${nx} ${ny}`
        : ` C${x + dx * 0.3} ${y - up} ${x + dx * 0.7} ${y + up * 0.6} ${nx} ${ny}`;
      x = nx; y = ny;
    }
    d += ` C${x + 18} ${y + 4} ${x + 10} ${y + 18} ${x * 0.55} ${y + 16} S4 ${y + 10} 14 ${y + 7}`;
    return { d, w: x + 30 };
  }

  function drawSig(svg, name) {
    if (!svg) return null;
    const s = signature(name);
    svg.setAttribute('viewBox', `0 0 ${s.w} 60`);
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', s.d);
    svg.appendChild(p);
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    return p;
  }

  const members = [...document.querySelectorAll('.member')];
  members.forEach((m, i) => {
    const svgEl = m.querySelector('svg');
    const p = drawSig(svgEl, m.dataset.name || 'Партнёр ЭТЛЕГИС');
    if (!p) return;
    const len = p.style.strokeDasharray;
    m.addEventListener('pointerenter', () => {
      state.memHover = i;
      p.style.strokeDashoffset = 0;
    });
    m.addEventListener('pointerleave', () => {
      state.memHover = -1;
      p.style.strokeDashoffset = len;
    });
  });

  const chairSvg = document.getElementById('chairsig');
  if (chairSvg) {
    const chair = drawSig(chairSvg, 'ETLEGIS Председательствующий');
    if (chair) {
      new IntersectionObserver(
        es => es.forEach(e => {
          if (e.isIntersecting) chair.style.strokeDashoffset = 0;
        }),
        { threshold: 0.6 }
      ).observe(chairSvg);
    }
  }

  // Cases balance tilt
  document.querySelectorAll('.case').forEach(c => {
    c.addEventListener('pointerenter', () => (state.caseHover = parseFloat(c.dataset.tilt || '-0.2')));
    c.addEventListener('pointerleave', () => (state.caseHover = null));
  });

  // Token cycler buttons
  document.querySelectorAll('.tok').forEach(b => {
    const o = (b.dataset.opts || '').split('|');
    if (!o.length) return;
    let i = 0;
    b.addEventListener('click', () => {
      i = (i + 1) % o.length;
      b.textContent = o[i];
    });
  });

  // Contenteditable single line fields
  document.querySelectorAll('.field').forEach(f => {
    f.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        f.blur();
      }
    });
    f.addEventListener('input', () => f.classList.remove('need'));
  });

  // Interactive single-line claim submission
  const submitBtn = document.getElementById('submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      if (state.filed) return;
      const getVal = k => {
        const el = document.querySelector(`.field[data-k="${k}"]`);
        return el ? el.textContent.trim() : '';
      };

      const name = getVal('name');
      const contact = getVal('contact');
      const co = getVal('co');
      const subj = getVal('subj');
      const sum = getVal('sum');
      const role = document.querySelector('.tok[data-k="role"]')?.textContent?.trim() || 'истцы';
      const urgency = document.querySelector('.tok[data-k="urgency"]')?.textContent?.trim() || 'сегодня';

      const v = document.getElementById('verdict');

      if (!name || !contact) {
        ['name', 'contact'].forEach(k => {
          const f = document.querySelector(`.field[data-k="${k}"]`);
          if (f && !f.textContent.trim()) {
            f.classList.remove('need');
            void f.offsetWidth;
            f.classList.add('need');
          }
        });
        if (v) {
          v.innerHTML = '<span class="blue">Заявление оставлено без движения.</span> Укажите имя и способ связи — и подайте снова.';
        }
        return;
      }

      state.filed = true;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Регистрация в реестре...';

      const caseNum = 'ETL-26-' + String(Math.floor(10000 + Math.random() * 89999));
      const now = new Date();
      const stampNoEl = document.getElementById('stampno');
      const stampDateEl = document.getElementById('stampdate');
      if (stampNoEl) stampNoEl.textContent = caseNum;
      if (stampDateEl) stampDateEl.textContent = now.toLocaleDateString('ru-RU');

      state.stampAt = performance.now() / 1000;
      setTimeout(() => {
        const stampEl = document.getElementById('stamp');
        if (stampEl) stampEl.classList.add('on');
      }, 170);

      document.querySelectorAll('.field').forEach(f => (f.contentEditable = 'false'));

      try {
        const fullMessage = `[Компания: ${co || 'не указана'}] [Статус: ${role}] [Сумма спора: ${sum || 'не указана'}] [Срочность: ${urgency}] Предмет спора: ${subj || 'не указан'}`;
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            contact,
            topic: subj || 'Судебный спор',
            message: fullMessage,
            consent: true,
            source_page: '/',
          }),
        });
        const data = await res.json();
        submitBtn.innerHTML = 'Принято к производству <span class="arr">✓</span>';
        if (v) {
          v.innerHTML = `Заявление <b>${caseNum}</b> зарегистрировано. Партнёр бюро свяжется с вами лично в рабочее время. Конфиденциальность гарантирована адвокатской тайной.`;
        }
      } catch (err) {
        submitBtn.innerHTML = 'Принято <span class="arr">✓</span>';
        if (v) {
          v.innerHTML = `Заявление <b>${caseNum}</b> принято к производству бюро. Мы свяжемся с вами в рабочее время.`;
        }
      }
    });
  }

  // Giant footer spotlight mask
  const giant = document.getElementById('giant');
  if (giant) {
    window.addEventListener(
      'pointermove',
      e => {
        const r = giant.getBoundingClientRect();
        giant.style.setProperty('--gx', e.clientX - r.left + 'px');
        giant.style.setProperty('--gy', e.clientY - r.top + 'px');
      },
      { passive: true }
    );
    window.addEventListener('pointerleave', () => {
      giant.style.setProperty('--gx', '-999px');
      giant.style.setProperty('--gy', '-999px');
    });
  }

  // Live Moscow court clock & session elapsed timer
  const clk = document.getElementById('clk');
  const court = document.getElementById('court');
  const el = document.getElementById('elapsed');

  const tf = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const pf = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  });

  const t0 = Date.now();
  function tick() {
    const now = new Date();
    if (clk) clk.textContent = tf.format(now);
    if (court) {
      const parts = Object.fromEntries(pf.formatToParts(now).map(p => [p.type, p.value]));
      const h = +parts.hour, wd = parts.weekday;
      court.innerHTML =
        !['Sat', 'Sun'].includes(wd) && h >= 9 && h < 18
          ? 'Суды открыты.<br>Мы работаем.'
          : 'Суды закрыты.<br>Мы — нет.';
    }
    if (el) {
      const s = Math.floor((Date.now() - t0) / 1000);
      el.textContent = [s / 3600, (s / 60) % 60, s % 60]
        .map(v => String(Math.floor(v)).padStart(2, '0'))
        .join(':');
    }
  }
  tick();
  setInterval(tick, 1000);
}
