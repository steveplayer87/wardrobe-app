/* =========================================================
   衣櫥助手 — app.js
   Vanilla JS, no build step. State persists to localStorage.
   SEED_ITEMS comes from seed-items.js (loaded before this file).
   ========================================================= */

/* ---------------------------- Icons ---------------------------- */
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 4l8 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5.5" width="16" height="14.5" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M4 9.5h16" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.5v3M16 3.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  jump: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5.5" width="16" height="14.5" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M4 9.5h16" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.5v3M16 3.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9.5 15.5 12 13l2.5 2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wardrobe: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.5" y="3.5" width="15" height="17" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M12 3.5v17" stroke="currentColor" stroke-width="1.8"/><path d="M9.3 12v1.3M14.7 12v1.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  inspire: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5a5.5 5.5 0 0 1 3.2 10c-.6.4-1 1.1-1 1.9v.6H9.8v-.6c0-.8-.4-1.5-1-1.9a5.5 5.5 0 0 1 3.2-10Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.8 19h4.4M10.3 21h3.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="6" r="2" fill="var(--color-surface)" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="12" r="2" fill="var(--color-surface)" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="18" r="2" fill="var(--color-surface)" stroke="currentColor" stroke-width="1.6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.7"/><path d="M19 19 15.2 15.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  top: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 3.5 12 5l3-1.5 4 3-2.3 2.8L15 8v11.5a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V8l-1.7 1.3L5 6.5l4-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  bottom: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3.5h12l.8 8-2 8.5a1 1 0 0 1-1 .8h-1.6a1 1 0 0 1-1-.8L12 12l-1.2 8a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8l-2-8.5.8-8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.6 8.5h10.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  outer: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 3.5 12 5l3-1.5 4.5 3.3-2 3-2.5-1.3V20a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V8.5L6.5 9.8l-2-3L9 3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 6v14.6" stroke="currentColor" stroke-width="1.3"/></svg>`,
  shoes: `<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 17.5V13c1 .4 2 .2 2.7-.5l2-2c.6-.6 1.5-.8 2.3-.4l2.2 1c.7.3 1.5.2 2-.3l1-.9c.6-.5 1.5-.5 2 0l2.8 2.6c.7.6 1 1.6.7 2.4l-.2.6H3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  hat: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 15.5c0-4.5 3.3-8 7.5-8s7.5 3.5 7.5 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M2.5 15.5h19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  accessory: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 12v8.5M9.5 20.5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  custom: `<svg viewBox="0 0 24 24" fill="none"><path d="M11 3.5H6a2.5 2.5 0 0 0-2.5 2.5v5c0 .6.2 1.1.6 1.5l8 8a2 2 0 0 0 2.8 0l5-5a2 2 0 0 0 0-2.8l-8-8c-.4-.4-.9-.6-1.5-.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/></svg>`,
  retired: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l2.5-3.5h11L20 7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 11.5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  rack: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 4.5a1.6 1.6 0 1 1 1.3 2.5L12 8.2 4 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 8.2l8 5.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  basket: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 10h15l-1.4 8.4a1.5 1.5 0 0 1-1.5 1.3H7.4a1.5 1.5 0 0 1-1.5-1.3L4.5 10Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.5 10h17M8 10 9.5 5M16 10 14.5 5M12 13v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  undo: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 7 4 12l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12h8a6 6 0 0 1 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  redo: `<svg viewBox="0 0 24 24" fill="none"><path d="m15 7 5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 12h-8a6 6 0 0 0-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  shopping: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 8.5h12l1 11H5l1-11Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 13.5a4 4 0 0 0 5.7.1l2.1-2.1a4 4 0 0 0-5.7-5.7l-1.2 1.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 10.5a4 4 0 0 0-5.7-.1l-2.1 2.1a4 4 0 0 0 5.7 5.7l1.2-1.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none"><path d="M14.5 4.5 19.5 9.5 8.5 20.5H3.5v-5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  towel: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3.5h12a1 1 0 0 1 1 1V17H5V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 17v3M11 17v3.5M13 17v3M17 17v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  sheets: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7.5" width="18" height="11" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3 12.5h18" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 7.5V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1.5" stroke="currentColor" stroke-width="1.4"/></svg>`,
  toothbrush: `<svg viewBox="0 0 24 24" fill="none"><rect x="10.5" y="9" width="3" height="12" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="4" width="6" height="6" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M10 4V2M12 4V1.5M14 4V2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="5" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 6.5h8" stroke="currentColor" stroke-width="1.2"/><path d="M12 9v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 20h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};
function applyStaticIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });
}

/* ---------------------------- Constants ---------------------------- */
const STORAGE_KEY = 'wardrobeAppState_v2';
const FIXED_CATEGORIES = ['top', 'bottom', 'outer', 'shoes', 'hat', 'accessory'];
const CATEGORY_LABEL = { top: '上衣', bottom: '褲子', outer: '外套', shoes: '鞋子', hat: '帽子', accessory: '配件' };
const ASPECT_RATIOS = { '1:1': 1, '3:4': 0.75, '2:3': 2/3 };
const ASPECT_LABELS = { '1:1': '方形', '3:4': '直式', '2:3': '窄長' };
function getCategoryAspectKey(category) {
  return (state.profile.categoryAspect && state.profile.categoryAspect[category]) || (category === 'bottom' ? '3:4' : '1:1');
}
function getCategoryAspectRatio(category) {
  return ASPECT_RATIOS[getCategoryAspectKey(category)] || 1;
}
const MAIN_SLOTS = ['top', 'bottom', 'shoes'];
const EXTRA_SLOTS = ['outer', 'hat', 'accessory'];
const ALL_SLOTS = MAIN_SLOTS.concat(EXTRA_SLOTS);
const HOME_SLOT_RATIOS = { hat: 2.2, top: 1.08, bottom: 0.72, shoes: 2.2 };
const CONSUMABLE_DEFS = [
  { id: 'towelA', name: '浴巾 A', cycleDays: 7, icon: 'towel' },
  { id: 'towelB', name: '浴巾 B', cycleDays: 7, icon: 'towel' },
  { id: 'sheets', name: '床單枕頭套', cycleDays: 20, icon: 'sheets' },
  { id: 'toothbrush', name: '電動牙刷刷頭', cycleDays: 180, icon: 'toothbrush' },
  { id: 'razor', name: '刮鬍刀片', cycleDays: 120, icon: 'razor' },
];
const LENGTH_TAGS = ['長', '短'];
const CONSUMABLE_IMAGES = {
  towelA: 'assets/c-towel.jpg',
  towelB: 'assets/c-towel.jpg',
  sheets: 'assets/c-sheets.jpg',
  toothbrush: 'assets/c-toothbrush.jpg',
  razor: 'assets/c-razor.jpg',
};
function consumableImage(c) { return c.image || CONSUMABLE_IMAGES[c.id] || ''; }

/* ---------------------------- Category helpers ---------------------------- */
function allCategoryIds() { return FIXED_CATEGORIES.concat(state.customCategories.map(c => c.id)); }
function categoryLabel(id) {
  if (CATEGORY_LABEL[id]) return CATEGORY_LABEL[id];
  const c = state.customCategories.find(x => x.id === id);
  return c ? c.label : id;
}
function categoryIcon(id) { return ICONS[id] || ICONS.custom; }

/* ---------------------------- Utilities ---------------------------- */
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function daysBetween(a, b) {
  const d1 = new Date(a + 'T00:00:00');
  const d2 = new Date(b + 'T00:00:00');
  return Math.round((d2 - d1) / 86400000);
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function fmtDate(dateStr) {
  // display dates with "/" per the user's preference; storage stays ISO
  // (yyyy-mm-dd) since <input type="date"> requires that internally.
  return dateStr ? dateStr.replace(/-/g, '/') : '';
}
function fmtHeaderDate() {
  const d = new Date();
  const weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][d.getDay()];
  return `${d.getMonth()+1}月${d.getDate()}日・${weekday}`;
}
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('is-shown');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('is-shown'), 2200);
}

/* ---------------------------- Image compression ---------------------------- */
function readFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function compressImageFile(file, maxDim = 640, quality = 0.82) {
  const img = await readFileAsImage(file);
  let { width, height } = img;
  if (width > height) {
    if (width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
  } else {
    if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
  }
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  // Keep all new uploads opaque and white-backed. This avoids black alpha
  // rendering differences between iOS PWA surfaces and background images.
  return canvas.toDataURL('image/jpeg', quality);
}

/* ---------------------------- Photo adjust (crop/zoom/pan to a target ratio) ---------------------------- */
let photoAdjust = null; // { scale, x, y, baseScale, iw, ih, frameW, frameH, isPng, onApply }
function openPhotoAdjust(imgSrc, category, onApply) {
  const sourceSheet = document.querySelector('.modal-sheet.is-active')?.id;
  if (sourceSheet && sourceSheet !== 'modal-photo-adjust') modalReturnTo = sourceSheet;
  const ratio = getCategoryAspectRatio(category); // width / height
  const frame = document.getElementById('photoAdjustFrame');
  const frameW = Math.min(280, Math.max(220, (frame.parentElement?.clientWidth || 320) - 12));
  const frameH = Math.round(frameW / ratio);
  frame.style.width = frameW + 'px';
  frame.style.height = frameH + 'px';
  frame.style.backgroundColor = '#fff';
  const img = document.getElementById('photoAdjustImg');
  photoAdjust = { scale: 1, x: 0, y: 0, frameW, frameH, minScale: 0.5, maxScale: 2.5, isPng: imgSrc.startsWith('data:image/png'), onApply };
  img.onload = () => {
    const iw = img.naturalWidth, ih = img.naturalHeight;
    photoAdjust.iw = iw; photoAdjust.ih = ih;
    photoAdjust.baseScale = Math.max(frameW / iw, frameH / ih);
    photoAdjust.x = (frameW - iw * photoAdjust.baseScale) / 2;
    photoAdjust.y = (frameH - ih * photoAdjust.baseScale) / 2;
    applyPhotoAdjustTransform();
  };
  img.src = imgSrc;
  const slider = document.getElementById('photoZoomSlider');
  slider.min = 50;
  slider.max = 250;
  slider.value = 100;
  openModal('modal-photo-adjust');
}
function clampPhotoPosition(s) {
  const totalScale = s.baseScale * s.scale;
  const w = s.iw * totalScale, h = s.ih * totalScale;
  const centeredX = (s.frameW - w) / 2;
  const centeredY = (s.frameH - h) / 2;
  const minX = w >= s.frameW ? s.frameW - w : centeredX;
  const maxX = w >= s.frameW ? 0 : centeredX;
  const minY = h >= s.frameH ? s.frameH - h : centeredY;
  const maxY = h >= s.frameH ? 0 : centeredY;
  s.x = Math.min(maxX, Math.max(minX, s.x));
  s.y = Math.min(maxY, Math.max(minY, s.y));
}
function applyPhotoAdjustTransform() {
  const s = photoAdjust;
  if (!s || !s.iw) return;
  const img = document.getElementById('photoAdjustImg');
  const totalScale = s.baseScale * s.scale;
  const w = s.iw * totalScale, h = s.ih * totalScale;
  clampPhotoPosition(s);
  img.style.width = w + 'px';
  img.style.height = h + 'px';
  img.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
}
function setPhotoScale(nextScale, focusX, focusY) {
  const s = photoAdjust;
  if (!s || !s.iw) return;
  const oldTotal = s.baseScale * s.scale;
  const fx = focusX ?? s.frameW / 2;
  const fy = focusY ?? s.frameH / 2;
  const contentX = (fx - s.x) / oldTotal;
  const contentY = (fy - s.y) / oldTotal;
  s.scale = Math.min(s.maxScale, Math.max(s.minScale, nextScale));
  const newTotal = s.baseScale * s.scale;
  s.x = fx - contentX * newTotal;
  s.y = fy - contentY * newTotal;
  applyPhotoAdjustTransform();
  document.getElementById('photoZoomSlider').value = Math.round(s.scale * 100);
}
function wirePhotoAdjust() {
  const frame = document.getElementById('photoAdjustFrame');
  const pointers = new Map();
  let dragStart = null;
  let pinchStart = null;
  const pointFromEvent = e => { const rect = frame.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
  const distance = () => {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const midpoint = () => {
    const [a, b] = [...pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };
  frame.addEventListener('pointerdown', e => {
    if (!photoAdjust) return;
    pointers.set(e.pointerId, pointFromEvent(e));
    frame.setPointerCapture(e.pointerId);
    if (pointers.size === 1) dragStart = { x: e.clientX, y: e.clientY, ox: photoAdjust.x, oy: photoAdjust.y };
    if (pointers.size === 2) pinchStart = { distance: distance(), scale: photoAdjust.scale, midpoint: midpoint() };
  });
  frame.addEventListener('pointermove', e => {
    if (!photoAdjust || !pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, pointFromEvent(e));
    if (pointers.size >= 2 && pinchStart) {
      const ratio = distance() / Math.max(1, pinchStart.distance);
      const point = midpoint();
      setPhotoScale(pinchStart.scale * ratio, point.x, point.y);
      return;
    }
    if (pointers.size === 1 && dragStart) {
      photoAdjust.x = dragStart.ox + (e.clientX - dragStart.x);
      photoAdjust.y = dragStart.oy + (e.clientY - dragStart.y);
      applyPhotoAdjustTransform();
    }
  });
  const endPointer = e => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
    if (pointers.size === 0) dragStart = null;
  };
  frame.addEventListener('pointerup', endPointer);
  frame.addEventListener('pointercancel', endPointer);
  frame.addEventListener('pointerleave', e => { if (e.buttons === 0) endPointer(e); });
  document.getElementById('photoZoomSlider').addEventListener('input', e => {
    if (!photoAdjust) return;
    setPhotoScale(Number(e.target.value) / 100);
  });
  document.getElementById('btnPhotoAdjustApply').addEventListener('click', () => {
    const s = photoAdjust;
    if (!s || !s.iw) { toast('照片還沒載入完成，請稍候再按套用'); return; }
    const outW = 640, outH = Math.round(outW / (s.frameW / s.frameH));
    const scaleOut = outW / s.frameW;
    const totalScale = s.baseScale * s.scale;
    const canvas = document.createElement('canvas');
    canvas.width = outW; canvas.height = outH;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, outW, outH);
    const img = document.getElementById('photoAdjustImg');
    ctx.drawImage(img, s.x * scaleOut, s.y * scaleOut, s.iw * totalScale * scaleOut, s.ih * totalScale * scaleOut);
    let dataUrl;
    try {
      dataUrl = s.isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.86);
    } catch (err) {
      toast('照片儲存失敗，請重新選取照片');
      return;
    }
    const cb = s.onApply;
    photoAdjust = null;
    if (cb) cb(dataUrl);
    requestAnimationFrame(() => closeModal());
  });
}

/* ---------------------------- State ---------------------------- */
function defaultState() {
  return {
    profile: {
      name: '',
      avatar: '',
      cardImageScale: 72,
      weather: { city: '', latitude: null, longitude: null, timezone: 'auto', current: null, updatedAt: 0 },
      washThresholds: { bottom: 3, outer: 5, shoes: 8, hat: 8, accessory: 8 },
      categoryAspect: { top: '1:1', bottom: '3:4', outer: '1:1', shoes: '1:1', hat: '1:1', accessory: '1:1' },
    },
    items: JSON.parse(JSON.stringify(typeof SEED_ITEMS !== 'undefined' ? SEED_ITEMS : [])),
    customCategories: [],
    today: { date: todayStr(), top: null, bottom: null, shoes: null, outer: null, hat: null, accessory: null },
    ootdHistory: [],
    consumables: CONSUMABLE_DEFS.map(c => ({ id: c.id, name: c.name, cycleDays: c.cycleDays, icon: c.icon, startDate: todayStr(), history: [] })),
    activeTowel: 'towelA',
    laundry: { lastWashDate: todayStr(), cycleDays: 2, snoozedUntil: null, history: [] },
    wishlist: [],
    drafts: { addItem: null, wishlist: null },
  };
}
let state = loadState();
window.state = state; // exposed for easy debugging via Safari/Chrome devtools console

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    const profile = Object.assign({}, base.profile, parsed.profile || {});
    profile.washThresholds = Object.assign({}, base.profile.washThresholds, (parsed.profile && parsed.profile.washThresholds) || {});
    profile.categoryAspect = Object.assign({}, base.profile.categoryAspect, (parsed.profile && parsed.profile.categoryAspect) || {});
    profile.weather = Object.assign({}, base.profile.weather, (parsed.profile && parsed.profile.weather) || {});
    profile.cardImageScale = Math.min(100, Math.max(45, Number(profile.cardImageScale) || 72));
    profile.avatar = typeof profile.avatar === 'string' ? profile.avatar : '';
    return {
      profile,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      customCategories: Array.isArray(parsed.customCategories) ? parsed.customCategories : [],
      today: Object.assign({}, base.today, parsed.today || {}),
      ootdHistory: Array.isArray(parsed.ootdHistory) ? parsed.ootdHistory : [],
      consumables: Array.isArray(parsed.consumables) && parsed.consumables.length ? parsed.consumables : base.consumables,
      activeTowel: parsed.activeTowel === 'towelB' ? 'towelB' : 'towelA',
      laundry: Object.assign({}, base.laundry, parsed.laundry || {}),
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      drafts: Object.assign({}, base.drafts, parsed.drafts || {}),
    };
  } catch (e) {
    console.error('讀取資料失敗，改用預設狀態', e);
    return defaultState();
  }
}
function normalizeLoadedState() {
  state.items.forEach(item => {
    item.washHistory = Array.isArray(item.washHistory) ? item.washHistory : [];
    item.lastWashedDate = item.lastWashedDate || null;
    if (item.status === 'dirty' && !item.basketAt) item.basketAt = item.lastWornDate || todayStr();
    if (item.status === 'resting' && !item.restingSince) item.restingSince = item.lastWornDate || todayStr();
    if (item.status !== 'dirty') item.basketAt = item.basketAt || null;
    if (item.status !== 'resting') item.restingSince = item.restingSince || null;
  });
  state.wishlist = Array.isArray(state.wishlist) ? state.wishlist : [];
  state.profile = state.profile || {};
  state.profile.cardImageScale = Math.min(100, Math.max(45, Number(state.profile.cardImageScale) || 72));
  state.profile.avatar = typeof state.profile.avatar === 'string' ? state.profile.avatar : '';
  state.profile.weather = Object.assign({ city: '', latitude: null, longitude: null, timezone: 'auto', current: null, updatedAt: 0 }, state.profile.weather || {});
  state.drafts = Object.assign({ addItem: null, wishlist: null }, state.drafts || {});
}
normalizeLoadedState();

const HISTORY_LIMIT = 40;
let historyReady = false;
let historySnapshot = null;
let undoStack = [];
let redoStack = [];
let undoViews = [];
let redoViews = [];
let lastHistoryAt = 0;
let lastChangedView = 'home';
let activeView = 'home';
let applyingHistory = false;
function cloneState(value) { return JSON.parse(JSON.stringify(value)); }
function stateSignature(value) { return JSON.stringify(value); }
function updateHistoryControls() {
  const undo = document.getElementById('btnUndo');
  const redo = document.getElementById('btnRedo');
  if (undo) undo.disabled = undoStack.length === 0;
  if (redo) redo.disabled = redoStack.length === 0;
}
function pushHistory(before) {
  const now = Date.now();
  if (now - lastHistoryAt > 650 || !undoStack.length) {
    undoStack.push(cloneState(before));
    undoViews.push(lastChangedView);
    if (undoStack.length > HISTORY_LIMIT) { undoStack.shift(); undoViews.shift(); }
  }
  lastHistoryAt = now;
  redoStack = [];
  redoViews = [];
}
function saveState(options = {}) {
  const next = cloneState(state);
  if (historyReady && !applyingHistory && !options.skipHistory) {
    if (!historySnapshot || stateSignature(historySnapshot) !== stateSignature(next)) pushHistory(historySnapshot);
  }
  historySnapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateHistoryControls();
  } catch (e) {
    console.error(e);
    toast('儲存失敗，裝置空間可能不足');
  }
}
function replaceStateFromSnapshot(snapshot) {
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, cloneState(snapshot));
}
function activateView(view) {
  activeView = view;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('is-active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('is-active', v.id === 'view-' + view));
  const app = document.getElementById('app');
  const isHome = view === 'home';
  app.classList.toggle('is-home-view', isHome);
  document.body.classList.toggle('home-page', isHome);
  document.getElementById('mainScroll').scrollTop = 0;
}
function restoreHistoryView(view) {
  if (view && document.getElementById('view-' + view)) {
    forceCloseModal({ skipPersist: true });
    activateView(view);
  }
}
function undoState() {
  if (!undoStack.length) return;
  const target = undoStack.pop();
  const targetView = undoViews.pop() || activeView;
  redoStack.push(cloneState(state));
  redoViews.push(activeView);
  applyingHistory = true;
  replaceStateFromSnapshot(target);
  saveState({ skipHistory: true });
  applyingHistory = false;
  renderAll();
  renderAvatar();
  renderCardImageScale();
  updateHistoryControls();
  restoreHistoryView(targetView);
  toast('已復原上一步變更');
}
function redoState() {
  if (!redoStack.length) return;
  const target = redoStack.pop();
  const targetView = redoViews.pop() || activeView;
  undoStack.push(cloneState(state));
  undoViews.push(activeView);
  applyingHistory = true;
  replaceStateFromSnapshot(target);
  saveState({ skipHistory: true });
  applyingHistory = false;
  renderAll();
  renderAvatar();
  renderCardImageScale();
  updateHistoryControls();
  restoreHistoryView(targetView);
  toast('已重做下一步變更');
}

function ensureNewDay() {
  if (state.today.date === todayStr()) return;
  const hadAny = ALL_SLOTS.some(s => state.today[s]);
  if (hadAny) state.ootdHistory.push({ ...state.today });
  state.items.forEach(it => { it.wornToday = false; });
  const fresh = { date: todayStr() };
  ALL_SLOTS.forEach(s => { fresh[s] = null; });
  state.today = fresh;
  saveState();
}

/* ---------------------------- Wear / laundry logic ---------------------------- */
function findItem(id) { return state.items.find(i => i.id === id); }
function getThreshold(category) {
  const t = state.profile.washThresholds || {};
  const v = t[category];
  if (v === null) return Infinity; // "無" — never mark dirty from wear count alone
  return v ?? 5;
}
function computeStatusAfterWear(item) {
  if ((item.wearCount || 0) <= 0) return 'clean';
  if (item.category === 'top') return 'dirty';
  const threshold = getThreshold(item.category);
  if (item.category === 'bottom') {
    // only tops (immediate) and pants (threshold) use the temp-rack/resting stage
    return item.wearCount >= threshold ? 'dirty' : 'resting';
  }
  // outer/shoes/hat/accessory: no "resting" holding stage — clean until the
  // threshold is hit, then straight to dirty. They never populate the temp rack.
  return item.wearCount >= threshold ? 'dirty' : 'clean';
}
function applyWear(itemId) {
  const item = findItem(itemId);
  if (!item || item.wornToday) return;
  const previousStatus = item.status;
  item.wearCount = (item.wearCount || 0) + 1;
  item.totalWearCount = (item.totalWearCount || 0) + 1;
  item.lastWornDate = todayStr();
  item.wornToday = true;
  item.wearHistory = item.wearHistory || [];
  item.wearHistory.unshift(todayStr());
  item.status = computeStatusAfterWear(item);
  if (item.status === 'resting' && previousStatus !== 'resting') item.restingSince = todayStr();
  if (item.status === 'dirty' && previousStatus !== 'dirty') item.basketAt = todayStr();
  if (item.status !== 'resting') item.restingSince = null;
}
function revertWear(itemId) {
  const item = findItem(itemId);
  if (!item || !item.wornToday) return;
  item.wearCount = Math.max(0, (item.wearCount || 0) - 1);
  item.totalWearCount = Math.max(0, (item.totalWearCount || 0) - 1);
  item.wornToday = false;
  if (item.wearHistory && item.wearHistory[0] === todayStr()) item.wearHistory.shift();
  item.status = computeStatusAfterWear(item);
  if (item.status === 'resting' && !item.restingSince) item.restingSince = item.lastWornDate || todayStr();
  if (item.status !== 'dirty') item.basketAt = null;
  if (item.status !== 'resting') item.restingSince = null;
}
function setTodaySlot(slot, itemId) {
  const prev = state.today[slot];
  if (prev === itemId) return;
  if (prev) revertWear(prev);
  state.today[slot] = itemId;
  if (itemId) applyWear(itemId);
  saveState();
  renderHome();
  renderWardrobe();
}
function recordLaundryEvent(date = todayStr()) {
  state.laundry = state.laundry || { lastWashDate: date, cycleDays: 2, snoozedUntil: null, history: [] };
  state.laundry.history = Array.isArray(state.laundry.history) ? state.laundry.history : [];
  if (!state.laundry.history.some(entry => (typeof entry === 'string' ? entry : entry?.date) === date)) {
    state.laundry.history.unshift(date);
  }
}
function laundryHistoryDates() {
  return new Set((state.laundry?.history || []).map(entry => typeof entry === 'string' ? entry : entry?.date).filter(Boolean));
}
function recordItemWash(item) {
  if (!item) return;
  const date = todayStr();
  item.washHistory = item.washHistory || [];
  item.washHistory.unshift({ date, basketAt: item.basketAt || null });
  recordLaundryEvent(date);
  item.lastWashedDate = date;
  item.wearCount = 0;
  item.status = 'clean';
  item.basketAt = null;
  item.restingSince = null;
  item.wornToday = false;
}
function markItemClean(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  recordItemWash(item);
  saveState();
  renderAll();
  toast(`${item.name} 已記錄清洗日期`);
}
function sendToBasketNow(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  if (item.status !== 'dirty') item.basketAt = todayStr();
  item.status = 'dirty';
  item.restingSince = null;
  saveState();
  renderAll();
  toast(`${item.name} 已丟進洗衣籃`);
}
function wearOnceMore(itemId) {
  // "再穿一次": don't wash it yet — temporarily un-flag dirty so it's
  // selectable in the try-on picker again. wearCount is untouched, so the
  // next actual wear will very likely push it straight back to dirty.
  const item = findItem(itemId);
  if (!item) return;
  item.status = 'resting';
  item.restingSince = todayStr();
  item.basketAt = null;
  saveState();
  renderAll();
  toast(`${item.name} 可以再穿一次`);
}
function retireItem(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  item.status = 'retired';
  saveState();
  renderAll();
  toast(`${item.name} 已移入典藏`);
}
function restoreItem(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  item.status = 'clean';
  saveState();
  renderAll();
  toast(`${item.name} 已回到衣櫥`);
}
function deleteItemPermanently(itemId) {
  state.items = state.items.filter(i => i.id !== itemId);
  ALL_SLOTS.forEach(s => { if (state.today[s] === itemId) state.today[s] = null; });
  saveState();
  renderAll();
}
function importSeedItems() {
  if (typeof SEED_ITEMS === 'undefined' || !Array.isArray(SEED_ITEMS) || !SEED_ITEMS.length) {
    toast('找不到舊衣物清單資料，請確認網頁有完整載入（可以試著重新整理一次）');
    return;
  }
  const byId = new Map(state.items.map(i => [i.id, i]));
  let added = 0, pricePatched = 0;
  SEED_ITEMS.forEach(seed => {
    const existing = byId.get(seed.id);
    if (!existing) {
      state.items.push(JSON.parse(JSON.stringify(seed)));
      added++;
    } else if ((existing.price === null || existing.price === undefined) && seed.price != null) {
      // narrow, safe backfill: only touches items that are STILL missing a price
      // (an earlier import bug dropped prices) — never overwrites a price you've
      // since set yourself.
      existing.price = seed.price;
      pricePatched++;
    }
  });
  saveState();
  renderAll();
  const parts = [];
  if (added) parts.push(`已匯入 ${added} 件舊衣物`);
  if (pricePatched) parts.push(`補上 ${pricePatched} 件的價格`);
  toast(parts.length ? parts.join('，') : '這些衣物已經在衣櫥裡了');
}

/* ---------------------------- Consumables logic ---------------------------- */
function daysUsed(c) { return Math.max(0, daysBetween(c.startDate, todayStr())); }
function isOverdue(c) { return c.cycleDays !== null && daysUsed(c) >= c.cycleDays; }
function isTowelId(id) { return id === 'towelA' || id === 'towelB'; }
function handleConsumableReset(id) {
  const c = state.consumables.find(x => x.id === id);
  if (!c) return;
  if (isTowelId(id)) {
    const isActive = state.activeTowel === id;
    if (isActive) {
      c.history.unshift({ date: c.startDate });
      const other = id === 'towelA' ? 'towelB' : 'towelA';
      state.activeTowel = other;
      const otherC = state.consumables.find(x => x.id === other);
      otherC.startDate = todayStr();
      toast(`${c.name} 已丟進洗衣籃，換 ${otherC.name} 開始使用`);
    } else {
      state.activeTowel = id;
      c.startDate = todayStr();
      toast(`已切換為使用 ${c.name}`);
    }
  } else {
    c.history.unshift({ date: c.startDate });
    c.startDate = todayStr();
    toast(`${c.name} 已重新計算週期`);
  }
  saveState();
  renderConsumables();
  renderWishlist();
  renderNotifications();
}

/* ---------------------------- Laundry day (whole-basket cadence) ---------------------------- */
function nextWashDate() {
  const natural = addDays(state.laundry.lastWashDate, state.laundry.cycleDays);
  if (state.laundry.snoozedUntil && state.laundry.snoozedUntil > natural) return state.laundry.snoozedUntil;
  return natural;
}
function isLaundryDueToday() { return nextWashDate() <= todayStr(); }
function markLaundryDone() {
  state.items.filter(item => item.status === 'dirty').forEach(recordItemWash);
  state.laundry.lastWashDate = todayStr();
  state.laundry.snoozedUntil = null;
  recordLaundryEvent(todayStr());
  saveState();
  renderAll();
  toast('已記錄洗衣日，洗衣籃內容也已更新');
}
function postponeLaundry() {
  // postpone relative to *today* when overdue, not from a stale past date —
  // otherwise "postpone one day" from a week-overdue date doesn't actually
  // push the reminder past today at all.
  const base = nextWashDate() > todayStr() ? nextWashDate() : todayStr();
  state.laundry.snoozedUntil = addDays(base, 1);
  saveState();
  renderNotifications();
  toast('已延後一天洗衣');
}

/* ---------------------------- Notifications (derived) ---------------------------- */
function getNotifications() {
  const list = [];
  state.items.filter(i => i.status === 'dirty').forEach(i => {
    list.push({ type: 'item', id: i.id, text: `${i.name} 該洗了`, thumb: i });
  });
  state.consumables.forEach(c => {
    if (isTowelId(c.id) && state.activeTowel !== c.id) return; // standby towel: no reminder
    if (isOverdue(c)) list.push({ type: 'consumable', id: c.id, text: `${c.name} 已經用了 ${daysUsed(c)} 天，該更換了`, icon: c.icon });
  });
  if (isLaundryDueToday()) {
    const overdueDays = Math.max(0, daysBetween(nextWashDate(), todayStr()));
    list.push({ type: 'laundry', id: 'laundry', text: overdueDays > 0 ? `已經過了 ${overdueDays} 天沒洗衣服了` : '今天該洗衣服囉', icon: 'basket' });
  }
  return list;
}

/* ============================================================
   RENDER
   ============================================================ */
function renderAll() {
  ensureNewDay();
  renderHeader();
  renderHome();
  renderHistory();
  renderWardrobe();
  renderConsumables();
  renderNotifications();
  renderWishlist();
  renderAvatar();
  renderCardImageScale();
}

function renderHeader() {
  document.getElementById('headerDate').textContent = fmtHeaderDate();
  document.getElementById('headerGreeting').textContent = state.profile.name ? `哈囉，${state.profile.name}` : '哈囉';
  const current = state.profile.weather?.current;
  const isNight = current && current.is_day != null ? Number(current.is_day) === 0 : (new Date().getHours() >= 18 || new Date().getHours() < 6);
  const app = document.getElementById('app');
  app.classList.toggle('is-night-view', isNight);
  document.body.classList.toggle('night-page', isNight && document.body.classList.contains('home-page'));
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', isNight ? '#232C48' : '#CFE0F5');
  document.getElementById('sceneSky').classList.toggle('is-night', isNight);
  renderWeather();
}

function itemPhotoStyle(item) {
  return item.image ? `background-color:#fff;background-image:url('${item.image}');background-repeat:no-repeat;background-position:center` : 'background-color:#fff';
}
function calendarPhotoStyle(item) {
  return item.image ? `background-color:#fff;background-image:url('${item.image}');background-repeat:no-repeat;background-position:center bottom;background-size:contain` : 'background-color:#fff';
}
function thumbInner(item) {
  return item.image ? '' : (categoryIcon(item.category) || '');
}

function renderAvatar() {
  const img = document.getElementById('avatarImage');
  const fallback = document.getElementById('avatarFallback');
  const btn = document.getElementById('btnSettings');
  const src = state.profile.avatar || '';
  if (!img || !fallback || !btn) return;
  img.hidden = !src;
  fallback.hidden = !!src;
  btn.classList.toggle('has-avatar', !!src);
  if (src) img.src = src;
  const preview = document.getElementById('avatarPreview');
  const clear = document.getElementById('btnClearAvatar');
  if (preview) {
    if (src) {
      preview.style.backgroundImage = `url('${src}')`;
      preview.classList.add('has-photo');
      preview.innerHTML = '<span>更換頭像圖片</span>';
    } else {
      preview.removeAttribute('style');
      preview.classList.remove('has-photo');
      preview.innerHTML = '<span data-icon="camera"></span><span>上傳頭像圖片</span>';
      applyStaticIcons();
    }
  }
  if (clear) clear.classList.toggle('is-hidden', !src);
}
function renderCardImageScale() {
  const value = Math.min(100, Math.max(45, Number(state.profile.cardImageScale) || 72));
  state.profile.cardImageScale = value;
  document.getElementById('app')?.style.setProperty('--card-image-size', `${value}% auto`);
  const slider = document.getElementById('cardImageScale');
  const output = document.getElementById('cardImageScaleValue');
  if (slider) slider.value = String(value);
  if (output) output.textContent = `${value}%`;
}
const WEATHER_LABELS = {
  0: ['晴朗', '☀'], 1: ['大致晴朗', '☀'], 2: ['局部多雲', '◒'], 3: ['陰天', '☁'],
  45: ['霧', '≋'], 48: ['霧', '≋'], 51: ['細雨', '雨'], 53: ['細雨', '雨'], 55: ['細雨', '雨'],
  56: ['冰雨', '雨'], 57: ['冰雨', '雨'], 61: ['小雨', '雨'], 63: ['中雨', '雨'], 65: ['大雨', '雨'],
  66: ['冰雨', '雨'], 67: ['冰雨', '雨'], 71: ['小雪', '雪'], 73: ['中雪', '雪'], 75: ['大雪', '雪'],
  77: ['雪粒', '雪'], 80: ['陣雨', '雨'], 81: ['陣雨', '雨'], 82: ['大陣雨', '雨'],
  85: ['陣雪', '雪'], 86: ['大陣雪', '雪'], 95: ['雷雨', '雷'], 96: ['雷雨', '雷'], 99: ['雷雨', '雷'],
};
function weatherText(code) { return WEATHER_LABELS[Number(code)] || ['天氣', '•']; }
function renderWeather() {
  const el = document.getElementById('sceneWeather');
  if (!el) return;
  const w = state.profile.weather || {};
  if (!w.city || !w.current) { el.textContent = w.city ? `${w.city}・天氣更新中` : '設定城市後顯示天氣'; return; }
  const [label, symbol] = weatherText(w.current.weather_code);
  const temp = Number.isFinite(Number(w.current.temperature_2m)) ? `${Math.round(Number(w.current.temperature_2m))}°` : '';
  el.textContent = `${w.city}・${symbol} ${label}${temp ? ` ${temp}` : ''}`;
}
function syncWeatherSettings() {
  const input = document.getElementById('weatherCityInput');
  const status = document.getElementById('weatherStatus');
  if (!input || !status) return;
  const w = state.profile.weather || {};
  input.value = w.city || '';
  status.textContent = w.city && w.current ? `${w.city}・上次更新 ${new Date(w.updatedAt || Date.now()).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}` : (w.city ? `${w.city}・等待天氣資料` : '選擇城市後，景觀窗會顯示目前天氣。');
}
const CITY_SEARCH_ALIASES = { '台北': 'Taipei', '臺北': 'Taipei', '台中': 'Taichung', '臺中': 'Taichung', '台南': 'Tainan', '臺南': 'Tainan', '高雄': 'Kaohsiung', '新竹': 'Hsinchu', '基隆': 'Keelung', '桃園': 'Taoyuan', '香港': 'Hong Kong', '澳門': 'Macau' };
async function searchWeatherCities() {
  const input = document.getElementById('weatherCityInput');
  const results = document.getElementById('weatherSearchResults');
  const q = input?.value.trim();
  if (!results || !q || q.length < 2) { if (results) results.innerHTML = '<p class="settings-helper">請輸入至少兩個字再搜尋。</p>'; return; }
  results.innerHTML = '<p class="settings-helper">搜尋城市中…</p>';
  try {
    const terms = [q, CITY_SEARCH_ALIASES[q]].filter(Boolean);
    let locations = [];
    for (const term of terms) {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=6&language=zh&format=json`;
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      locations = Array.isArray(data.results) ? data.results : [];
      if (locations.length) break;
    }
    results.innerHTML = locations.length ? locations.map((loc, i) => `<button type="button" class="weather-result" data-weather-index="${i}"><b>${escapeHtml(loc.name)}</b><span>${escapeHtml([loc.admin2 || loc.admin1, loc.country].filter(Boolean).join(' · '))}</span></button>`).join('') : '<p class="settings-helper">找不到這個城市，請換個名稱試試。</p>';
    results._locations = locations;
  } catch (e) {
    results.innerHTML = '<p class="settings-helper">城市搜尋暫時失敗，請確認網路後再試。</p>';
  }
}
async function selectWeatherLocation(location) {
  if (!location) return;
  state.profile.weather = { city: [location.name, location.admin2 || location.admin1, location.country].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(' · '), latitude: location.latitude, longitude: location.longitude, timezone: location.timezone || 'auto', current: null, updatedAt: 0 };
  saveState();
  syncWeatherSettings();
  renderHeader();
  await refreshWeather(true);
}
async function refreshWeather(force = false) {
  const w = state.profile.weather || {};
  if (w.latitude == null || w.longitude == null) { syncWeatherSettings(); renderWeather(); return; }
  if (!force && w.current && Date.now() - Number(w.updatedAt || 0) < 30 * 60 * 1000) { renderWeather(); return; }
  const status = document.getElementById('weatherStatus');
  if (status) status.textContent = `${w.city}・正在更新天氣…`;
  try {
    const params = new URLSearchParams({ latitude: String(w.latitude), longitude: String(w.longitude), current: 'temperature_2m,weather_code,is_day,relative_humidity_2m', timezone: 'auto' });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error('forecast failed');
    const data = await response.json();
    state.profile.weather = { ...w, timezone: data.timezone || w.timezone || 'auto', current: data.current || null, updatedAt: Date.now() };
    saveState();
    renderHeader();
    syncWeatherSettings();
  } catch (e) {
    if (status) status.textContent = `${w.city}・天氣暫時無法更新，稍後可再試。`;
    renderWeather();
  }
}

function renderHome() {
  ['hat', 'top', 'bottom', 'shoes'].forEach(slot => {
    const btn = document.querySelector(`.figure-slot[data-slot="${slot}"]`);
    const thumb = btn.querySelector('.figure-thumb');
    const itemId = state.today[slot];
    const item = itemId ? findItem(itemId) : null;
    const ratio = HOME_SLOT_RATIOS[slot] || getCategoryAspectRatio(slot);
    if (item) {
      btn.classList.add('is-filled');
      btn.classList.toggle('has-photo', !!item.image);
      thumb.setAttribute('style', `${itemPhotoStyle(item)};aspect-ratio:${ratio}`);
      thumb.innerHTML = thumbInner(item);
      btn.setAttribute('aria-label', item.name);
    } else {
      btn.classList.remove('is-filled', 'has-photo');
      thumb.setAttribute('style', `aspect-ratio:${ratio}`);
      thumb.innerHTML = ICONS[slot] || '';
      btn.setAttribute('aria-label', btn.getAttribute('data-label'));
    }
  });

  const outerItem = state.today.outer ? findItem(state.today.outer) : null;
  const accItem = state.today.accessory ? findItem(state.today.accessory) : null;
  const hintParts = [];
  if (outerItem) hintParts.push(outerItem.name);
  if (accItem) hintParts.push(accItem.name);
  document.getElementById('figureExtrasLink').textContent = hintParts.length ? hintParts.join(' · ') : '點此選擇外套／配件';

  const rack = state.items.filter(i => i.status === 'resting');
  const basket = state.items.filter(i => i.status === 'dirty');
  renderChipList('tempRackList', 'tempRackEmpty', rack, { pinActiveTowel: true });
  renderChipList('basketList', 'basketEmpty', basket);
  document.getElementById('basketTitle').textContent = `洗衣籃・${Math.max(0, daysBetween(state.laundry.lastWashDate, todayStr()))}天`;
}
function renderChipList(listId, emptyId, items, opts) {
  const list = document.getElementById(listId);
  const empty = document.getElementById(emptyId);
  list.innerHTML = '';

  if (opts && opts.pinActiveTowel) {
    const towel = state.consumables.find(c => c.id === state.activeTowel);
    if (towel) {
      const chip = document.createElement('button');
      chip.className = 'rack-chip is-pinned';
      chip.type = 'button';
      chip.innerHTML = `<span class="rack-chip-thumb">${ICONS[towel.icon] || ''}</span><span class="rack-chip-text">${escapeHtml(towel.name)}・已用 ${daysUsed(towel)} 天</span>`;
      chip.addEventListener('click', e => { e.stopPropagation(); openConsumableDetail(towel.id); });
      list.appendChild(chip);
    }
  }

  if (!items.length) { empty.hidden = list.children.length > 0; return; }
  empty.hidden = true;
  items.slice(0, 8).forEach(item => {
    const chip = document.createElement('button');
    chip.className = 'rack-chip';
    chip.type = 'button';
    const thumb = item.image
      ? `<img class="rack-chip-thumb" src="${item.image}" alt="">`
      : `<span class="rack-chip-thumb">${categoryIcon(item.category)}</span>`;
    chip.innerHTML = `${thumb}<span class="rack-chip-text">${escapeHtml(item.name)}（${item.wearCount || 0}次）</span>`;
    chip.addEventListener('click', e => { e.stopPropagation(); openItemDetail(item.id); });
    list.appendChild(chip);
  });
}
function openRackOverview() {
  const grid = document.getElementById('rackOverviewGrid');
  const empty = document.getElementById('rackOverviewEmpty');
  const items = state.items.filter(i => i.status === 'resting');
  grid.innerHTML = '';
  empty.hidden = items.length !== 0;
  items.forEach(item => grid.appendChild(buildItemCard(item, { rackMode: true })));
  openModal('modal-rack-overview');
}

/* ---- Wardrobe tab ---- */
let uiWardrobeCat = 'all';
let uiWardrobeSort = 'recent';
let uiWardrobeFilters = { status: 'all', tags: [] };
let uiSearchQuery = '';
let uiSelectMode = false;
let uiSelectedIds = new Set();

function allTagsUsed() {
  const set = new Set();
  state.items.forEach(i => (i.tags || []).forEach(t => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-Hant'));
}
function isFilterActive() {
  return uiWardrobeFilters.status !== 'all' || uiWardrobeFilters.tags.length > 0;
}
function itemMatchesSearch(item, q) {
  if (!q) return true;
  const hay = [
    item.name,
    item.price != null ? String(item.price) : '',
    fmtDate(item.purchaseDate || ''),
    fmtDate(item.lastWornDate || ''),
    (item.tags || []).join(' '),
    categoryLabel(item.category),
  ].join(' ').toLowerCase();
  return hay.includes(q.toLowerCase());
}

function renderCategoryChips() {
  const row = document.getElementById('categoryChips');
  row.innerHTML = '';
  const defs = [{ id: 'all', label: '全部' }]
    .concat(allCategoryIds().map(id => ({ id, label: categoryLabel(id) })))
    .concat([{ id: 'retired', label: '典藏' }]);
  defs.forEach(d => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (uiWardrobeCat === d.id ? ' is-active' : '');
    chip.textContent = d.label;
    chip.addEventListener('click', () => { uiWardrobeCat = d.id; renderCategoryChips(); renderWardrobe(); });
    row.appendChild(chip);
  });
  const addChip = document.createElement('button');
  addChip.type = 'button';
  addChip.className = 'chip chip-add';
  addChip.textContent = '+ 新增分類';
  addChip.addEventListener('click', () => openModal('modal-category'));
  row.appendChild(addChip);
}

function itemMatchesFilters(item) {
  if (uiWardrobeFilters.status !== 'all' && item.status !== uiWardrobeFilters.status) return false;
  if (uiWardrobeFilters.tags.length && !uiWardrobeFilters.tags.every(t => (item.tags || []).includes(t))) return false;
  return true;
}

function getVisibleWardrobeItems() {
  let items = state.items.filter(i => {
    if (uiWardrobeCat === 'all') { if (i.status === 'retired') return false; }
    else if (uiWardrobeCat === 'retired') { if (i.status !== 'retired') return false; }
    else { if (i.category !== uiWardrobeCat || i.status === 'retired') return false; }
    if (!itemMatchesFilters(i)) return false;
    if (!itemMatchesSearch(i, uiSearchQuery)) return false;
    return true;
  });
  return items.slice().sort((a, b) => {
    if (uiWardrobeSort === 'wearCount') return (b.wearCount||0) - (a.wearCount||0);
    if (uiWardrobeSort === 'lastWorn') return (b.lastWornDate||'').localeCompare(a.lastWornDate||'');
    if (uiWardrobeSort === 'name') return a.name.localeCompare(b.name, 'zh-Hant');
    return (b.createdAt||0) - (a.createdAt||0);
  });
}
function renderWardrobe() {
  const grid = document.getElementById('wardrobeGrid');
  const emptyHint = document.getElementById('wardrobeEmpty');
  const items = getVisibleWardrobeItems();
  const retiredView = uiWardrobeCat === 'retired';
  document.getElementById('view-wardrobe').classList.toggle('is-retired-view', retiredView);
  const retiredBanner = document.getElementById('retiredBanner');
  if (retiredBanner) retiredBanner.hidden = !retiredView;
  document.getElementById('itemCount').textContent = retiredView ? `典藏・${items.length} 件` : `${items.length} 件`;
  document.getElementById('filterBadge').hidden = !isFilterActive();
  grid.innerHTML = '';
  emptyHint.hidden = items.length !== 0 || uiWardrobeCat !== 'all' || isFilterActive() || !!uiSearchQuery;
  items.forEach(item => grid.appendChild(buildItemCard(item)));
  document.getElementById('deleteCategoryWrap').classList.toggle('is-hidden', !uiWardrobeCat.startsWith('custom-'));
}
function toggleItemSelection(id) {
  if (uiSelectedIds.has(id)) uiSelectedIds.delete(id); else uiSelectedIds.add(id);
  document.getElementById('selectCount').textContent = `已選 ${uiSelectedIds.size} 件`;
  renderWardrobe();
}
function buildItemCard(item, opts) {
  opts = opts || {};
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'item-card';
  const statusClass = item.status === 'dirty' ? 'is-dirty' : item.status === 'resting' ? 'is-resting' : '';
  const selected = uiSelectMode && uiSelectedIds.has(item.id);
  if (uiSelectMode) card.classList.add('is-selectable');
  if (selected) card.classList.add('is-selected');
  const activityMeta = item.status === 'resting' && item.restingSince
    ? `（${fmtDate(item.restingSince)} 開始）`
    : item.status === 'dirty' && item.basketAt
      ? `（${fmtDate(item.basketAt)} 入籃）`
      : '';
  card.innerHTML = `
    <div class="item-photo" style="${itemPhotoStyle(item)}">${thumbInner(item)}</div>
    ${uiSelectMode ? `<span class="item-card-check"></span>` : (item.status !== 'retired' ? `<span class="item-status-dot ${statusClass}"></span>` : '')}
    <div class="item-info">
      <p class="item-name">${escapeHtml(item.name)}</p>
      <p class="item-wear">穿了 ${item.wearCount||0} 次${activityMeta}</p>
    </div>`;

  let longPressTimer = null;
  let longPressFired = false;
  card.addEventListener('touchstart', () => {
    longPressFired = false;
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      if (navigator.vibrate) navigator.vibrate(10);
      if (!uiSelectMode) openAddModal(item.id);
    }, 550);
  }, { passive: true });
  const cancelLongPress = () => clearTimeout(longPressTimer);
  card.addEventListener('touchmove', cancelLongPress, { passive: true });
  card.addEventListener('touchend', cancelLongPress);
  card.addEventListener('touchcancel', cancelLongPress);

  card.addEventListener('click', () => {
    if (longPressFired) { longPressFired = false; return; }
    if (opts.onClick) { opts.onClick(item); return; }
    if (uiSelectMode) toggleItemSelection(item.id);
    else openItemDetail(item.id);
  });
  return card;
}

/* ---- History tab ---- */
let uiCalMonth = (() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; })();

function allOotdEntries() {
  const entries = state.ootdHistory.slice();
  if (ALL_SLOTS.some(s => state.today[s])) entries.push(state.today);
  return entries;
}

function renderHistory() {
  document.getElementById('calTitle').textContent = `${uiCalMonth.y} 年 ${uiCalMonth.m + 1} 月`;
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';
  const firstDay = new Date(uiCalMonth.y, uiCalMonth.m, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(uiCalMonth.y, uiCalMonth.m + 1, 0).getDate();
  const entries = allOotdEntries();
  const byDate = {};
  entries.forEach(e => { if (e.date) (byDate[e.date] = byDate[e.date] || []).push(e); });
  const today = todayStr();
  const laundryDays = laundryHistoryDates();
  if (state.laundry?.lastWashDate) laundryDays.add(state.laundry.lastWashDate);
  const towelDays = new Set(
    state.consumables.filter(c => isTowelId(c.id)).flatMap(c => (c.history || []).map(h => h.date))
  );

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-cell is-empty';
    grid.appendChild(empty);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${uiCalMonth.y}-${String(uiCalMonth.m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cal-cell';
    if (dateStr === today) cell.classList.add('is-today');
    const dayEntries = byDate[dateStr];
    let thumbsHtml = '';
    if (dayEntries && dayEntries.length) {
      cell.classList.add('has-ootd');
      const entry = dayEntries[0];
      const thumbItems = [
        { item: entry.top ? findItem(entry.top) : null, className: 'cal-thumb-top' },
        { item: entry.bottom ? findItem(entry.bottom) : null, className: 'cal-thumb-bottom' },
      ].filter(({ item }) => item);
      thumbsHtml = `<span class="cal-thumbs">${thumbItems.map(({ item, className }) =>
        `<span class="cal-thumb ${className}" style="${calendarPhotoStyle(item)}">${item.image ? '' : categoryIcon(item.category)}</span>`
      ).join('')}</span>`;
    }
    let dotsHtml = '';
    if (laundryDays.has(dateStr)) dotsHtml += `<span class="cal-event-dot cal-dot-laundry"></span>`;
    if (towelDays.has(dateStr)) dotsHtml += `<span class="cal-event-dot cal-dot-towel" style="${laundryDays.has(dateStr) ? 'right:14px' : ''}"></span>`;
    cell.innerHTML = `<span class="cal-num">${d}</span>${dotsHtml}${thumbsHtml}`;
    if (dayEntries) cell.addEventListener('click', () => openDayDetail(dateStr, dayEntries[0]));
    else if (dateStr < today) cell.addEventListener('click', () => openBackfillModal(dateStr));
    grid.appendChild(cell);
  }
  renderCalStats();
  renderRank();
}

function renderCalStats() {
  const y = uiCalMonth.y, m = uiCalMonth.m;
  const prefix = `${y}-${String(m+1).padStart(2,'0')}`;
  const entries = allOotdEntries().filter(e => e.date && e.date.startsWith(prefix));
  const daysLogged = new Set(entries.map(e => e.date)).size;
  const wearCount = {};
  let slotFillTotal = 0;
  entries.forEach(e => {
    ALL_SLOTS.forEach(s => { if (e[s]) { wearCount[e[s]] = (wearCount[e[s]]||0) + 1; slotFillTotal++; } });
  });
  let topId = null, topCount = 0;
  Object.entries(wearCount).forEach(([id, c]) => { if (c > topCount) { topCount = c; topId = id; } });
  const topItem = topId ? findItem(topId) : null;
  const activeItemsCount = state.items.filter(i => i.status !== 'retired').length;
  const wornThisMonth = new Set(entries.flatMap(e => ALL_SLOTS.map(s => e[s]).filter(Boolean))).size;
  const utilization = activeItemsCount ? Math.round(wornThisMonth / activeItemsCount * 100) : 0;
  const avgPerOutfit = daysLogged ? (slotFillTotal / daysLogged).toFixed(1) : '0';

  const stats = [
    { label: '本月穿搭天數', value: `${daysLogged}<small> 天</small>` },
    { label: '最常穿單品', value: topItem ? `${escapeHtml(topItem.name)}<small>（${topCount} 次）</small>` : '—' },
    { label: '衣櫥使用率', value: `${utilization}<small>%</small>` },
    { label: '平均每套件數', value: `${avgPerOutfit}<small> 件</small>` },
  ];
  document.getElementById('calStats').innerHTML = stats.map(s =>
    `<div class="cal-stat-card"><p class="cs-label">${s.label}</p><p class="cs-value">${s.value}</p></div>`
  ).join('');
}

function renderRank() {
  const list = document.getElementById('rankList');
  const statsWrap = document.getElementById('rankStats');
  const entries = allOotdEntries();
  const monthPrefix = `${uiCalMonth.y}-${String(uiCalMonth.m + 1).padStart(2, '0')}`;
  const monthEntries = entries.filter(e => e.date?.startsWith(monthPrefix));
  const activeItems = state.items.filter(i => i.status !== 'retired');
  const wornItems = new Set(monthEntries.flatMap(e => ALL_SLOTS.map(s => e[s]).filter(Boolean)));
  const totalWear = state.items.reduce((sum, i) => sum + (i.totalWearCount || 0), 0);
  const rankedAll = state.items.slice().sort((a, b) => (b.totalWearCount || 0) - (a.totalWearCount || 0));
  const topWear = rankedAll[0]?.totalWearCount || 0;
  const laundryCount = state.items.filter(i => i.status === 'dirty').length;
  const monthWear = monthEntries.reduce((sum, e) => sum + ALL_SLOTS.filter(s => e[s]).length, 0);
  const stats = [
    { label: '最常穿比例', value: `${totalWear ? Math.round(topWear / totalWear * 100) : 0}%` },
    { label: '本月穿搭天數', value: `${new Set(monthEntries.map(e => e.date)).size} 天` },
    { label: '本月選用單品', value: `${wornItems.size} 件` },
    { label: '本月穿著次數', value: `${monthWear} 次` },
    { label: '衣櫥使用率', value: `${activeItems.length ? Math.round(wornItems.size / activeItems.length * 100) : 0}%` },
    { label: '目前待洗單品', value: `${laundryCount} 件` },
  ];
  if (statsWrap) statsWrap.innerHTML = stats.map(s => `<div class="rank-stat-card"><p>${s.label}</p><b>${s.value}</b></div>`).join('');
  const ranked = state.items.filter(i => (i.totalWearCount||0) > 0)
    .slice().sort((a,b) => (b.totalWearCount||0) - (a.totalWearCount||0)).slice(0, 21);
  list.innerHTML = '';
  if (!ranked.length) {
    list.innerHTML = `<p class="empty-hint">還沒有穿搭紀錄，去主頁試穿看看吧</p>`;
  }
  ranked.forEach((item, idx) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-photo" style="${itemPhotoStyle(item)}">${thumbInner(item)}</div>
      <span class="rank-badge">#${idx + 1}</span>
      <div class="item-info">
        <p class="item-name">${escapeHtml(item.name)}</p>
        <p class="item-wear">穿過 ${item.totalWearCount} 次</p>
      </div>`;
    card.addEventListener('click', () => openItemDetail(item.id));
    list.appendChild(card);
  });
}

function openDayDetail(dateStr, entry) {
  const d = new Date(dateStr + 'T00:00:00');
  document.getElementById('dayDetailTitle').textContent = `${d.getMonth()+1}月${d.getDate()}日的穿搭`;
  const body = document.getElementById('dayDetailBody');
  const isToday = dateStr === todayStr();
  const rows = ALL_SLOTS.filter(s => entry[s]).map(s => {
    const item = findItem(entry[s]);
    if (!item) return `<div class="day-detail-row"><p class="ddr-name">（已刪除的衣物）</p></div>`;
    const thumb = item.image ? `<img class="ddr-thumb" style="background-color:#fff" src="${item.image}" alt="">` : `<span class="ddr-thumb">${categoryIcon(item.category)}</span>`;
    return `<button type="button" class="day-detail-row" data-item-id="${item.id}">${thumb}
      <div><p class="ddr-cat">${categoryLabel(item.category)}</p><p class="ddr-name">${escapeHtml(item.name)}</p></div></button>`;
  });
  body.innerHTML = (rows.join('') || `<p class="empty-hint">這天沒有穿搭紀錄</p>`) + (isToday ? '' : `
    <div class="settings-actions" style="margin-top:14px">
      <button class="btn-secondary" id="btnDayEdit">編輯這天</button>
      <button class="btn-secondary btn-danger" id="btnDayDelete">刪除這天</button>
    </div>`);
  body.querySelectorAll('.day-detail-row[data-item-id]').forEach(row => {
    row.addEventListener('click', () => openItemDetail(row.dataset.itemId));
  });
  if (!isToday) {
    const editBtn = document.getElementById('btnDayEdit');
    if (editBtn) editBtn.addEventListener('click', () => openBackfillModal(dateStr));
    const delBtn = document.getElementById('btnDayDelete');
    if (delBtn) delBtn.addEventListener('click', () => {
      openConfirm('刪除這天的穿搭紀錄？', `${fmtDate(dateStr)} 的紀錄將被移除，此動作無法復原`, [
        { label: '取消', kind: 'secondary' },
        { label: '刪除', kind: 'danger', onClick: () => {
          state.ootdHistory = state.ootdHistory.filter(e => e.date !== dateStr);
          saveState();
          renderHistory();
          toast('已刪除這天的穿搭紀錄');
        } },
      ]);
    });
  }
  openModal('modal-day');
}

/* ---- Consumables ('更多' tab) ---- */
function renderConsumables() {
  const grid = document.getElementById('consumableGrid');
  grid.innerHTML = '';
  state.consumables.forEach(c => {
    const towel = isTowelId(c.id);
    const isActive = !towel || state.activeTowel === c.id;
    const used = daysUsed(c);
    const overdue = isActive && isOverdue(c);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'consumable-card' + (overdue ? ' is-overdue' : '') + (towel && !isActive ? ' is-standby' : '');
    const daysHtml = (towel && !isActive) ? `<p class="c-days">備用中</p>` : `<p class="c-days">已用了 <b>${used}</b> 天</p>`;
    card.innerHTML = `
      <span class="c-icon">${consumableImage(c) ? `<img src="${consumableImage(c)}" alt="">` : (ICONS[c.icon]||'')}</span>
      <p class="c-name">${escapeHtml(c.name)}</p>
      ${daysHtml}
      <p class="c-cycle">週期 ${c.cycleDays === null ? '無限制' : c.cycleDays + ' 天'}</p>
      ${overdue ? '<span class="c-flag">該換了</span>' : ''}
      ${towel && !isActive ? '<span class="c-standby-flag">備用</span>' : ''}`;
    card.addEventListener('click', () => openConsumableDetail(c.id));
    grid.appendChild(card);
  });
}
function openConsumableDetail(id) {
  const c = state.consumables.find(x => x.id === id);
  if (!c) return;
  const towel = isTowelId(id);
  const isActive = !towel || state.activeTowel === id;
  const used = daysUsed(c);
  const overdue = isActive && isOverdue(c);
  const body = document.getElementById('consumableDetailBody');
  const cycleLabel = c.cycleDays === null ? '無限制' : String(c.cycleDays);
  const lastReplacedLabel = c.history.length ? fmtDate(c.history[0].date) : `${fmtDate(c.startDate)}（尚未更換過）`;

  let statsHtml, actionLabel;
  if (towel && !isActive) {
    statsHtml = `<div class="detail-stats">
      <div class="detail-stat"><b>備用</b><span>目前狀態</span></div>
      <div class="detail-stat"><b>${cycleLabel}</b><span>週期天數</span></div>
      <div class="detail-stat"><b>${c.history.length}</b><span>歷史次數</span></div>
    </div>`;
    actionLabel = '現在開始使用這條';
  } else {
    statsHtml = `
      <div class="stepper-row">
        <span class="stepper-label">已用天數</span>
        <div class="stepper-control">
          <button type="button" class="stepper-btn" id="cUsedMinus">−</button>
          <span class="stepper-value" id="cUsedValue">${used}</span>
          <button type="button" class="stepper-btn" id="cUsedPlus">＋</button>
        </div>
      </div>
      <div class="stepper-row">
        <span class="stepper-label">建議週期</span>
        <div class="stepper-control">
          <button type="button" class="stepper-btn" id="cCycleMinus">−</button>
          <span class="stepper-value" id="cCycleValue">${cycleLabel}</span>
          <button type="button" class="stepper-btn" id="cCyclePlus">＋</button>
        </div>
      </div>`;
    actionLabel = towel ? '提前丟到洗衣籃' : (overdue ? '已更換，重新計算' : '提前更換／清洗');
  }
  body.innerHTML = `
    <div class="modal-head"><h2>${escapeHtml(c.name)}</h2><button class="modal-close" data-close>✕</button></div>
    ${statsHtml}
    <button class="btn-primary" id="btnResetConsumable">${actionLabel}</button>
    <p class="detail-meta">上次更換日期：${lastReplacedLabel}</p>
  `;
  body.querySelector('[data-close]').addEventListener('click', closeModal);
  body.querySelector('#btnResetConsumable').addEventListener('click', () => { handleConsumableReset(id); closeModal(); });

  const usedMinus = body.querySelector('#cUsedMinus'), usedPlus = body.querySelector('#cUsedPlus');
  if (usedMinus) usedMinus.addEventListener('click', () => {
    c.startDate = addDays(c.startDate, 1); // one day less "used"
    if (c.startDate > todayStr()) c.startDate = todayStr();
    saveState();
    openConsumableDetail(id);
    renderConsumables();
  });
  if (usedPlus) usedPlus.addEventListener('click', () => {
    c.startDate = addDays(c.startDate, -1); // one day more "used"
    saveState();
    openConsumableDetail(id);
    renderConsumables();
  });
  const cycleMinus = body.querySelector('#cCycleMinus'), cyclePlus = body.querySelector('#cCyclePlus');
  if (cycleMinus) cycleMinus.addEventListener('click', () => {
    c.cycleDays = c.cycleDays === null ? 7 : Math.max(1, c.cycleDays - 1);
    saveState();
    openConsumableDetail(id);
    renderConsumables();
  });
  if (cyclePlus) cyclePlus.addEventListener('click', () => {
    c.cycleDays = c.cycleDays === null ? 8 : c.cycleDays + 1;
    saveState();
    openConsumableDetail(id);
    renderConsumables();
  });
  openModal('modal-consumable');
}

/* ---- Notifications ---- */
function renderNotifications() {
  const notifs = getNotifications();
  const badge = document.getElementById('notifBadge');
  badge.hidden = notifs.length === 0;
  const list = document.getElementById('notifList');
  const empty = document.getElementById('notifEmpty');
  list.innerHTML = '';
  if (!notifs.length) { empty.hidden = false; return; }
  empty.hidden = true;
  notifs.forEach(n => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'notif-row';
    let thumbHtml;
    if (n.type === 'item') {
      thumbHtml = n.thumb.image ? `<img class="notif-thumb" src="${n.thumb.image}" alt="">` : `<span class="notif-thumb">${categoryIcon(n.thumb.category)}</span>`;
    } else {
      thumbHtml = `<span class="notif-thumb">${ICONS[n.icon] || ''}</span>`;
    }
    const actionLabel = n.type === 'item' ? '丟進洗衣籃' : n.type === 'laundry' ? '查看' : '處理';
    row.innerHTML = `${thumbHtml}<p class="notif-text">${escapeHtml(n.text)}</p><span class="notif-action">${actionLabel}</span>`;
    row.addEventListener('click', () => {
      if (n.type === 'item') {
        openConfirm('要丟進洗衣籃嗎？', n.text, [
          { label: '取消', kind: 'secondary' },
          { label: '丟進洗衣籃', kind: 'primary', onClick: () => sendToBasketNow(n.id) },
        ]);
      } else if (n.type === 'consumable') {
        openConfirm('確定要處理嗎？', n.text, [
          { label: '取消', kind: 'secondary' },
          { label: '確定', kind: 'primary', onClick: () => handleConsumableReset(n.id) },
        ]);
      } else if (n.type === 'laundry') {
        closeModal();
        openLaundryModal();
      }
    });
    list.appendChild(row);
  });
}


/* ============================================================
   WISHLIST / INSPIRATION
   ============================================================ */
function safeExternalUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  try {
    const url = new URL(raw);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch (e) {
    return '';
  }
}
function allWishlistTagsUsed() {
  const set = new Set();
  state.wishlist.forEach(item => (item.tags || []).forEach(tag => set.add(tag)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-Hant'));
}
let uiWishlistSort = 'recent';
let uiWishlistFilters = { category: 'all', tags: [] };
let uiWishlistSearchQuery = '';
let uiWishlistSelectMode = false;
let uiWishlistSelectedIds = new Set();
function wishlistFilterActive() { return uiWishlistFilters.category !== 'all' || uiWishlistFilters.tags.length > 0; }
function wishlistMatchesSearch(item, q) {
  if (!q) return true;
  return [item.name, categoryLabel(item.category), ...(item.tags || [])].join(' ').toLowerCase().includes(q.toLowerCase());
}
function getVisibleWishlistItems() {
  return state.wishlist.filter(item => {
    if (uiWishlistFilters.category !== 'all' && item.category !== uiWishlistFilters.category) return false;
    if (uiWishlistFilters.tags.length && !uiWishlistFilters.tags.every(t => (item.tags || []).includes(t))) return false;
    return wishlistMatchesSearch(item, uiWishlistSearchQuery);
  }).slice().sort((a, b) => {
    if (uiWishlistSort === 'name') return a.name.localeCompare(b.name, 'zh-Hant');
    if (uiWishlistSort === 'category') return categoryLabel(a.category).localeCompare(categoryLabel(b.category), 'zh-Hant');
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}
function updateWishlistSelectBar() {
  const count = document.getElementById('wishlistSelectCount');
  if (count) count.textContent = `已選 ${uiWishlistSelectedIds.size} 件`;
  document.getElementById('wishlistSelectBar')?.classList.toggle('is-hidden', !uiWishlistSelectMode);
  document.getElementById('view-inspiration')?.classList.toggle('wishlist-selecting', uiWishlistSelectMode);
}
function setWishlistSelectMode(on) {
  uiWishlistSelectMode = on;
  uiWishlistSelectedIds.clear();
  updateWishlistSelectBar();
  const btn = document.getElementById('btnWishlistSelectMode');
  if (btn) { btn.classList.toggle('is-active', on); btn.textContent = on ? '完成' : '選取'; }
  renderWishlist();
}
function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const empty = document.getElementById('wishlistEmpty');
  if (!grid || !empty) return;
  const items = getVisibleWishlistItems();
  const filterBadge = document.getElementById('wishlistFilterBadge');
  if (filterBadge) filterBadge.hidden = !wishlistFilterActive();
  grid.innerHTML = '';
  empty.hidden = items.length !== 0;
  if (!items.length && (uiWishlistSearchQuery || wishlistFilterActive())) empty.textContent = '找不到符合條件的想買單品。';
  else empty.textContent = '還沒有想買的單品，先記下一件吧。';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'wishlist-card' + (uiWishlistSelectMode ? ' is-selectable' : '') + (uiWishlistSelectedIds.has(item.id) ? ' is-selected' : '');
    const photo = item.image
      ? `<div class="wishlist-photo" style="background-color:#fff;background-image:url('${item.image}');background-repeat:no-repeat;background-position:center;background-size:contain"></div>`
      : `<div class="wishlist-photo wishlist-photo-empty">${ICONS.shopping}</div>`;
    const tags = (item.tags || []).map(tag => `<span class="wishlist-tag">${escapeHtml(tag)}</span>`).join('');
    const url = safeExternalUrl(item.referenceUrl);
    const actions = uiWishlistSelectMode ? '' : `<div class="wishlist-card-actions"><button type="button" class="btn-secondary wishlist-edit-btn">編輯</button>${url ? `<a class="btn-secondary wishlist-link" href="${url}" target="_blank" rel="noopener"><span data-icon="link"></span>參考網址</a>` : ''}</div>`;
    card.innerHTML = `${photo}${uiWishlistSelectMode ? '<span class="wishlist-card-check"></span>' : ''}<div class="wishlist-card-body"><p class="wishlist-name">${escapeHtml(item.name)}</p><p class="wishlist-category">${categoryLabel(item.category)}</p><div class="wishlist-tags">${tags}</div>${actions}</div>`;
    card.addEventListener('click', e => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (uiWishlistSelectMode) {
        if (uiWishlistSelectedIds.has(item.id)) uiWishlistSelectedIds.delete(item.id); else uiWishlistSelectedIds.add(item.id);
        updateWishlistSelectBar();
        renderWishlist();
      } else openWishlistModal(item.id);
    });
    card.querySelector('.wishlist-edit-btn')?.addEventListener('click', () => openWishlistModal(item.id));
    grid.appendChild(card);
  });
  updateWishlistSelectBar();
  applyStaticIcons();
}
function renderWishlistCategoryChips() {
  const row = document.getElementById('wishlistCategoryChips');
  row.innerHTML = '';
  allCategoryIds().forEach(id => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (pendingWishlistCategory === id ? ' is-active' : '');
    chip.textContent = categoryLabel(id);
    chip.addEventListener('click', () => {
      pendingWishlistCategory = id;
      wishlistDirty = true;
      renderWishlistCategoryChips();
      document.getElementById('wishlistLengthToggleWrap').classList.toggle('is-hidden', !(id === 'top' || id === 'bottom'));
      autoSaveWishlistDraft();
    });
    row.appendChild(chip);
  });
  document.getElementById('wishlistLengthToggleWrap').classList.toggle('is-hidden', !(pendingWishlistCategory === 'top' || pendingWishlistCategory === 'bottom'));
}
function renderWishlistLengthToggle() {
  document.querySelectorAll('#wishlistLengthToggle .segment-btn').forEach(btn => btn.classList.toggle('is-active', pendingWishlistTags.includes(btn.dataset.len)));
}
function renderWishlistTagChips() {
  const row = document.getElementById('wishlistTagPickerChips');
  row.innerHTML = '';
  Array.from(new Set(allTagsUsed().concat(allWishlistTagsUsed(), pendingWishlistTags))).forEach(tag => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (pendingWishlistTags.includes(tag) ? ' is-active' : '');
    chip.textContent = tag;
    chip.addEventListener('click', () => {
      pendingWishlistTags = pendingWishlistTags.includes(tag) ? pendingWishlistTags.filter(x => x !== tag) : pendingWishlistTags.concat(tag);
      wishlistDirty = true;
      renderWishlistTagChips();
      renderWishlistLengthToggle();
      autoSaveWishlistDraft();
    });
    row.appendChild(chip);
  });
}
function autoSaveWishlistDraft() {
  if (!document.getElementById('wishlistName')) return;
  const draft = {
    name: document.getElementById('wishlistName').value.trim(),
    category: pendingWishlistCategory,
    tags: pendingWishlistTags.slice(),
    referenceUrl: document.getElementById('wishlistReferenceUrl').value.trim(),
    image: pendingWishlistPhoto,
  };
  if (editingWishlistId) {
    const item = state.wishlist.find(x => x.id === editingWishlistId);
    if (item) Object.assign(item, draft);
  } else {
    state.drafts.wishlist = draft;
  }
  saveState();
}
function openWishlistModal(editId = null) {
  editingWishlistId = editId;
  wishlistDirty = false;
  wishlistEditSnapshot = null;
  pendingWishlistPhoto = null;
  pendingWishlistCategory = 'top';
  pendingWishlistTags = [];
  const form = document.getElementById('wishlistForm');
  form.reset();
  const savedDraft = !editId && state.drafts && state.drafts.wishlist;
  const item = editId ? state.wishlist.find(x => x.id === editId) : null;
  wishlistEditSnapshot = item ? JSON.parse(JSON.stringify(item)) : null;
  const source = item || savedDraft;
  if (source) {
    pendingWishlistCategory = source.category || 'top';
    pendingWishlistTags = Array.isArray(source.tags) ? source.tags.slice() : [];
    pendingWishlistPhoto = source.image || null;
    document.getElementById('wishlistName').value = source.name || '';
    document.getElementById('wishlistReferenceUrl').value = source.referenceUrl || '';
  }
  setPhotoPreview(document.getElementById('wishlistPhotoPreviewWrap'), pendingWishlistPhoto, '加入參考圖片');
  document.getElementById('btnReadjustWishlistPhoto').classList.toggle('is-hidden', !pendingWishlistPhoto);
  document.getElementById('wishlistModalTitle').textContent = editId ? '編輯想買單品' : '新增想買單品';
  document.getElementById('wishlistSubmitBtn').textContent = editId ? '儲存修改' : '加入想買清單';
  document.getElementById('btnDeleteWishlist').classList.toggle('is-hidden', !editId);
  renderWishlistCategoryChips();
  renderWishlistTagChips();
  renderWishlistLengthToggle();
  applyStaticIcons();
  openModal('modal-wishlist');
}
function saveWishlistForm() {
  const name = document.getElementById('wishlistName').value.trim();
  if (!name) { toast('請輸入想買單品名稱'); return false; }
  const data = {
    name,
    category: pendingWishlistCategory,
    tags: pendingWishlistTags.slice(),
    referenceUrl: safeExternalUrl(document.getElementById('wishlistReferenceUrl').value),
    image: pendingWishlistPhoto,
  };
  if (editingWishlistId) {
    const item = state.wishlist.find(x => x.id === editingWishlistId);
    if (item) Object.assign(item, data);
    toast('已儲存想買單品');
  } else {
    state.wishlist.push({ id: uid(), ...data, createdAt: Date.now() });
    toast('已加入想買清單');
  }
  state.drafts.wishlist = null;
  wishlistDirty = false;
  saveState();
  renderWishlist();
  forceCloseModal({ skipPersist: true });
  return true;
}

/* ============================================================
   ITEM DETAIL / ADD-EDIT MODAL
   ============================================================ */
function openItemDetail(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  const body = document.getElementById('itemDetailBody');
  const statusLabel = { clean:'乾淨', resting:'暫存衣架', dirty:'待洗', retired:'典藏中' }[item.status] || '';
  const lengthLabel = (item.tags || []).find(t => LENGTH_TAGS.includes(t)) || '';
  const showingBack = false;
  body.innerHTML = `
    <div class="detail-photo-wrap">
      <div class="detail-photo" id="detailPhotoEl" style="${itemPhotoStyle(item)}${item.image ? '' : 'display:flex;align-items:center;justify-content:center;color:var(--color-ink-faint)'}">${item.image ? '' : `<div style="width:64px;height:64px">${categoryIcon(item.category)}</div>`}</div>
      ${item.imageBack ? `<button class="detail-flip-btn" id="btnFlipPhoto">看背面</button>` : ''}
      <button class="detail-edit-btn" id="btnEditItem"></button>
    </div>
    <p class="detail-name">${escapeHtml(item.name)}</p>
    <p class="detail-tags">${categoryLabel(item.category)}${lengthLabel ? ' · ' + lengthLabel : ''}${item.tags && item.tags.length ? ' · ' + item.tags.filter(t => t !== lengthLabel).map(escapeHtml).join('、') : ''} · ${statusLabel}</p>
    <div class="detail-stats">
      <div class="detail-stat"><b>${item.wearCount||0}</b><span>本輪穿著</span></div>
      <div class="detail-stat"><b>${item.totalWearCount||0}</b><span>累計穿著</span></div>
      <div class="detail-stat"><b>${item.lastWornDate ? fmtDate(item.lastWornDate) : '—'}</b><span>最近穿著</span></div>
    </div>
    <div class="detail-actions" id="detailActionsPrimary"></div>
    <div class="detail-meta">
      ${item.purchaseDate ? `購買日期：${fmtDate(item.purchaseDate)}<br>` : ''}
      ${item.price != null ? `價格：$${item.price}<br>` : ''}
      加入衣櫥：${new Date(item.createdAt).toLocaleDateString('zh-TW')}
    </div>
    ${item.wearHistory && item.wearHistory.length ? `
      <p class="wear-history-heading">穿著歷史（共 ${item.wearHistory.length} 次）</p>
      <div class="wear-history-list">${item.wearHistory.slice(0, 30).map(d => `<div class="wear-history-row">${fmtDate(d)}</div>`).join('')}</div>
    ` : ''}
  `;
  body.querySelector('#btnEditItem').innerHTML = ICONS.edit;
  body.querySelector('#btnEditItem').addEventListener('click', () => openAddModal(item.id));

  let flipped = showingBack;
  const flipBtn = body.querySelector('#btnFlipPhoto');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      flipped = !flipped;
      const photoEl = document.getElementById('detailPhotoEl');
      photoEl.style.backgroundImage = `url('${flipped ? item.imageBack : item.image}')`;
      flipBtn.textContent = flipped ? '看正面' : '看背面';
    });
  }

  const actions = body.querySelector('#detailActionsPrimary');
  if (item.status === 'retired') {
    actions.innerHTML = `<button class="btn-secondary" id="a1">恢復到衣櫥</button>`;
    actions.querySelector('#a1').addEventListener('click', () => { restoreItem(item.id); closeModal(); });
  } else {
    let html = '';
    if (ALL_SLOTS.includes(item.category)) html += `<button class="btn-secondary" id="aWearToday">設為今日穿搭</button>`;
    if (item.status === 'dirty') html += `<button class="btn-secondary" id="aClean">已記錄清洗</button>`;
    if (item.status !== 'dirty') html += `<button class="btn-secondary" id="aBasket">丟進洗衣籃</button>`;
    actions.innerHTML = html;
    const aWearToday = actions.querySelector('#aWearToday');
    if (aWearToday) aWearToday.addEventListener('click', () => { setTodaySlot(item.category, item.id); closeModal(); toast(`已設為今日${categoryLabel(item.category)}`); });
    const aClean = actions.querySelector('#aClean');
    if (aClean) aClean.addEventListener('click', () => { markItemClean(item.id); closeModal(); });
    const aBasket = actions.querySelector('#aBasket');
    if (aBasket) aBasket.addEventListener('click', () => { sendToBasketNow(item.id); closeModal(); });
  }
  openModal('modal-item');
}

let pendingPhoto = null;
let pendingPhotoBack = null;
let pendingCategory = 'top';
let pendingTags = [];
let editingItemId = null;
let backfillDraft = null;
let formDirty = false;
let modalReturnTo = null; // sheet id to return to instead of fully closing (e.g. number-grid -> settings)
let editingWishlistId = null;
let pendingWishlistPhoto = null;
let pendingWishlistCategory = 'top';
let pendingWishlistTags = [];
let wishlistDirty = false;
let wishlistEditSnapshot = null;
let unsavedContext = null;

function setPhotoPreview(wrap, src, emptyLabel) {
  if (src) {
    wrap.setAttribute('style', `background-image:url('${src}')`);
    wrap.classList.add('has-photo');
    wrap.innerHTML = '';
  } else {
    wrap.removeAttribute('style');
    wrap.classList.remove('has-photo');
    wrap.innerHTML = `<span data-icon="camera"></span><span>${emptyLabel}</span>`;
    applyStaticIcons();
  }
}
function autoSaveAddItemDraft() {
  const name = document.getElementById('fieldName')?.value.trim() || '';
  const draft = {
    name,
    category: pendingCategory,
    tags: pendingTags.slice(),
    purchaseDate: document.getElementById('fieldPurchaseDate')?.value || '',
    price: document.getElementById('fieldPrice')?.value ? Number(document.getElementById('fieldPrice').value) : null,
    archiveDirect: !!document.getElementById('fieldArchiveDirect')?.checked,
    image: pendingPhoto,
    imageBack: pendingPhotoBack,
  };
  if (editingItemId) {
    const item = findItem(editingItemId);
    if (item) {
      Object.assign(item, {
        name: draft.name || item.name,
        category: draft.category,
        tags: draft.tags,
        purchaseDate: draft.purchaseDate,
        price: draft.price,
        image: draft.image || item.image,
        imageBack: draft.imageBack || item.imageBack || null,
      });
      if (item.status !== 'dirty' && item.status !== 'retired') item.status = computeStatusAfterWear(item);
    }
  } else {
    state.drafts.addItem = draft;
  }
  saveState();
}
function readSettingsDraft() {
  const readPicker = id => {
    const el = document.getElementById(id);
    if (!el) return null;
    const v = el.dataset.value;
    return v === 'none' ? null : Number(v);
  };
  if (!document.getElementById('settingName')) return;
  state.profile.name = document.getElementById('settingName').value.trim();
  state.profile.washThresholds = {
    bottom: readPicker('pickThresholdBottom'),
    outer: readPicker('pickThresholdOuter'),
    shoes: readPicker('pickThresholdShoes'),
    hat: readPicker('pickThresholdHat'),
    accessory: readPicker('pickThresholdAccessory'),
  };
  const towelDays = readPicker('pickThresholdTowel');
  state.consumables.forEach(c => { if (isTowelId(c.id)) c.cycleDays = towelDays; });
}
function saveSettingsDraft() {
  readSettingsDraft();
  saveState();
  renderHeader();
}
function persistTransientForms() {
  const active = document.querySelector('.modal-sheet.is-active')?.id;
  if (active === 'modal-add') autoSaveAddItemDraft();
  if (active === 'modal-settings') saveSettingsDraft();
  if (active === 'modal-wishlist') autoSaveWishlistDraft();
}

function renderCategoryPickerChips() {
  const row = document.getElementById('categoryPickerChips');
  row.innerHTML = '';
  allCategoryIds().forEach(id => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (pendingCategory === id ? ' is-active' : '');
    chip.textContent = categoryLabel(id);
    chip.addEventListener('click', () => {
      pendingCategory = id;
      formDirty = true;
      renderCategoryPickerChips();
      document.getElementById('lengthToggleWrap').classList.toggle('is-hidden', !(id === 'top' || id === 'bottom'));
      autoSaveAddItemDraft();
    });
    row.appendChild(chip);
  });
  document.getElementById('lengthToggleWrap').classList.toggle('is-hidden', !(pendingCategory === 'top' || pendingCategory === 'bottom'));
}
function renderLengthToggle() {
  document.querySelectorAll('#lengthToggle .segment-btn').forEach(b => {
    b.classList.toggle('is-active', pendingTags.includes(b.getAttribute('data-len')));
  });
}
function renderTagPickerChips() {
  const row = document.getElementById('tagPickerChips');
  row.innerHTML = '';
  const tags = Array.from(new Set(allTagsUsed().concat(pendingTags)));
  tags.forEach(t => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (pendingTags.includes(t) ? ' is-active' : '');
    chip.textContent = t;
    chip.addEventListener('click', () => {
      pendingTags = pendingTags.includes(t) ? pendingTags.filter(x => x !== t) : pendingTags.concat(t);
      formDirty = true;
      renderTagPickerChips();
      renderLengthToggle();
      autoSaveAddItemDraft();
    });
    row.appendChild(chip);
  });
}

function openAddModal(editId = null) {
  editingItemId = editId;
  pendingPhoto = null;
  pendingPhotoBack = null;
  pendingCategory = 'top';
  pendingTags = [];
  formDirty = false;
  const form = document.getElementById('addItemForm');
  form.reset();
  document.getElementById('photoPreviewWrap').removeAttribute('style');
  document.getElementById('photoPreviewWrap').classList.remove('has-photo');
  document.getElementById('photoPreviewWrap').innerHTML = `<span data-icon="camera"></span><span>上傳照片（可一次選2張，第2張當背面）</span>`;
  document.getElementById('photoBackHint').hidden = true;
  document.getElementById('btnReadjustPhoto').classList.add('is-hidden');
  applyStaticIcons();

  const editExtra = document.getElementById('editExtraActions');
  const archiveRow = document.getElementById('archiveCheckboxRow');
  document.getElementById('fieldArchiveDirect').checked = false;

  const savedDraft = !editId && state.drafts && state.drafts.addItem;
  if (savedDraft) {
    pendingCategory = savedDraft.category || 'top';
    pendingTags = Array.isArray(savedDraft.tags) ? savedDraft.tags.slice() : [];
    document.getElementById('fieldName').value = savedDraft.name || '';
    document.getElementById('fieldPurchaseDate').value = savedDraft.purchaseDate || '';
    document.getElementById('fieldPrice').value = savedDraft.price ?? '';
    document.getElementById('fieldArchiveDirect').checked = !!savedDraft.archiveDirect;
    pendingPhoto = savedDraft.image || null;
    pendingPhotoBack = savedDraft.imageBack || null;
    setPhotoPreview(document.getElementById('photoPreviewWrap'), pendingPhoto, '上傳照片（可一次選2張，第2張當背面）');
    document.getElementById('photoBackHint').hidden = !pendingPhotoBack;
    document.getElementById('btnReadjustPhoto').classList.toggle('is-hidden', !pendingPhoto || !editId);
  }

  if (editId) {
    const item = findItem(editId);
    pendingCategory = item.category;
    pendingTags = (item.tags || []).slice();
    document.getElementById('addModalTitle').textContent = '編輯單品';
    document.getElementById('addFormSubmitBtn').textContent = '儲存修改';
    document.getElementById('fieldName').value = item.name || '';
    document.getElementById('fieldPurchaseDate').value = item.purchaseDate || '';
    document.getElementById('fieldPrice').value = item.price ?? '';
    if (item.image) {
      pendingPhoto = item.image;
      const wrap = document.getElementById('photoPreviewWrap');
      wrap.setAttribute('style', `background-image:url('${item.image}')`);
      wrap.classList.add('has-photo');
      wrap.innerHTML = '';
      document.getElementById('btnReadjustPhoto').classList.remove('is-hidden');
    }
    pendingPhotoBack = item.imageBack || null;
    document.getElementById('photoBackHint').hidden = !pendingPhotoBack;
    editExtra.classList.remove('is-hidden');
    archiveRow.classList.add('is-hidden');
  } else {
    document.getElementById('addModalTitle').textContent = '新增單品';
    document.getElementById('addFormSubmitBtn').textContent = '加入衣櫥';
    editExtra.classList.add('is-hidden');
    archiveRow.classList.remove('is-hidden');
  }
  renderCategoryPickerChips();
  renderLengthToggle();
  renderTagPickerChips();
  formDirty = false; // the population above doesn't count as a user edit
  openModal('modal-add');
}

/* ============================================================
   MODAL PLUMBING (incl. swipe-to-dismiss)
   ============================================================ */
function openModal(id) {
  const current = document.querySelector('.modal-sheet.is-active');
  if (current && current.id !== id) persistTransientForms();
  document.querySelectorAll('.modal-sheet').forEach(s => { if (s.id !== id) { s.classList.remove('is-active', 'is-shown'); s.style.transform = ''; } });
  const sheet = document.getElementById(id);
  sheet.classList.add('is-active');
  document.getElementById('modalOverlay').classList.add('is-open');
  // force layout so the browser registers the "closed" position first, THEN add
  // is-shown on the next frame — otherwise display:none->block gives the sheet no
  // animatable starting state and the slide-up transition just gets skipped.
  void sheet.offsetHeight;
  requestAnimationFrame(() => { sheet.classList.add('is-shown'); });
}
function forceCloseModal(options = {}) {
  if (!options.skipPersist) persistTransientForms();
  document.getElementById('modalOverlay').classList.remove('is-open');
  const sheet = document.querySelector('.modal-sheet.is-active');
  if (sheet) {
    sheet.classList.remove('is-shown');
    const finish = () => { sheet.classList.remove('is-active'); sheet.removeEventListener('transitionend', finish); };
    sheet.addEventListener('transitionend', finish);
    setTimeout(finish, 360); // fallback in case transitionend doesn't fire
  }
  backfillDraft = null;
  formDirty = false;
  wishlistDirty = false;
  wishlistEditSnapshot = null;
  unsavedContext = null;
  modalReturnTo = null;
}
function openUnsavedPrompt(context) {
  unsavedContext = context;
  const isWishlist = context === 'wishlist';
  document.querySelector('#modal-unsaved h2').textContent = isWishlist ? '要儲存這件想買單品嗎？' : '要儲存變更嗎？';
  document.querySelector('#modal-unsaved .section-intro').textContent = isWishlist ? '這件想買單品的內容還沒儲存。' : '這個單品的內容還沒儲存。';
  document.getElementById('btnUnsavedDiscard').textContent = '放棄';
  document.getElementById('btnUnsavedSave').textContent = isWishlist ? '儲存到想買清單' : '儲存';
  openModal('modal-unsaved');
}
function closeModal() {
  const activeBeforePersist = document.querySelector('.modal-sheet.is-active');
  if (activeBeforePersist?.id === 'modal-add' && formDirty) { openUnsavedPrompt('item'); return; }
  if (activeBeforePersist?.id === 'modal-wishlist' && wishlistDirty) { openUnsavedPrompt('wishlist'); return; }
  persistTransientForms();
  // if we're picking an item for a backfill draft, closing the picker (X / backdrop /
  // swipe) should return to the backfill sheet rather than abandon the whole draft.
  const activeSheet = document.querySelector('.modal-sheet.is-active');
  if (backfillDraft && activeSheet && activeSheet.id === 'modal-tryon') {
    renderBackfillModal();
    openModal('modal-backfill');
    return;
  }
  // All form edits are persisted continuously; closing never discards them.
  if (modalReturnTo && activeSheet && activeSheet.id !== modalReturnTo) {
    const target = modalReturnTo;
    modalReturnTo = null;
    openModal(target);
    if (target === 'modal-tryon' && tryonCurrentSlot) renderTryonGridFor(tryonCurrentSlot, tryonCurrentCategory);
    return;
  }
  forceCloseModal();
}
function openConfirm(title, body, actions) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmBody').textContent = body;
  const wrap = document.getElementById('confirmActions');
  wrap.innerHTML = '';
  actions.forEach(a => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = a.kind === 'primary' ? 'btn-primary' : a.kind === 'danger' ? 'btn-secondary btn-danger' : 'btn-secondary';
    btn.style.flex = '1 1 auto';
    if (a.kind === 'primary') btn.style.marginTop = '0';
    btn.textContent = a.label;
    btn.addEventListener('click', () => { if (a.onClick) a.onClick(); forceCloseModal(); });
    wrap.appendChild(btn);
  });
  openModal('modal-confirm');
}
function renderLaundryOverview() {
  const grid = document.getElementById('laundryOverviewGrid');
  const empty = document.getElementById('laundryOverviewEmpty');
  if (!grid || !empty) return;
  const items = state.items.filter(i => i.status === 'dirty');
  grid.innerHTML = '';
  empty.hidden = items.length !== 0;
  items.forEach(item => grid.appendChild(buildItemCard(item, { laundryMode: true })));
}
function openLaundryModal() {
  renderLaundryOverview();
  const last = state.laundry.lastWashDate;
  const daysSince = Math.max(0, daysBetween(last, todayStr()));
  const next = nextWashDate();
  document.getElementById('laundryStats').innerHTML = `
    <div class="detail-stat"><b>${daysSince}</b><span>距上次洗衣天數</span></div>
    <div class="detail-stat"><b>${fmtDate(next)}</b><span>下次預計洗衣</span></div>
    <div class="detail-stat"><b>${state.laundry.cycleDays}</b><span>洗衣週期(天)</span></div>
  `;
  openModal('modal-laundry');
}

/* ---------------------------- Number-grid picker (settings) ---------------------------- */
function openNumberGridPicker(btn) {
  modalReturnTo = 'modal-settings';
  const current = btn.dataset.value === 'none' ? 'none' : (Number(btn.textContent) || 1);
  const isTowel = btn.dataset.cat === 'towel';
  document.getElementById('numberGridTitle').textContent = isTowel ? '選擇天數' : '選擇次數';
  const grid = document.getElementById('numberGrid');
  grid.innerHTML = '';
  const caption = document.getElementById('numberGridCaption');
  for (let n = 1; n <= 9; n++) {
    const cell = document.createElement('button');
    cell.type = 'button';
    const isNoneCell = n === 9;
    cell.textContent = isNoneCell ? '無' : String(n);
    if ((isNoneCell && current === 'none') || (!isNoneCell && n === current)) cell.classList.add('is-active');
    cell.addEventListener('click', () => {
      if (isNoneCell) {
        btn.textContent = '無';
        btn.dataset.value = 'none';
      } else {
        btn.textContent = String(n);
        btn.dataset.value = String(n);
      }
      grid.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      cell.classList.add('is-active');
      caption.classList.toggle('is-hidden', !(!isNoneCell && n > 5 && !isTowel));
      saveSettingsDraft();
      closeModal(); // returns to modal-settings via modalReturnTo, doesn't abandon the form
    });
    grid.appendChild(cell);
  }
  caption.classList.toggle('is-hidden', !(current !== 'none' && current > 5 && !isTowel));
  openModal('modal-number-grid');
}

/* ---------------------------- Calendar swipe ---------------------------- */
function wireCalendarSwipe() {
  const area = document.getElementById('calSwipeArea');
  let startX = 0, startY = 0, dragging = false, horizontal = false;
  area.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dragging = true;
    horizontal = false;
  }, { passive: true });
  area.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (!horizontal && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) horizontal = true;
    if (horizontal) {
      const grid = document.getElementById('calGrid');
      grid.style.transform = `translateX(${dx}px)`;
      grid.style.opacity = String(1 - Math.min(0.5, Math.abs(dx) / 300));
    }
  }, { passive: true });
  area.addEventListener('touchend', e => {
    if (!dragging) return;
    dragging = false;
    const grid = document.getElementById('calGrid');
    if (horizontal) {
      const dx = e.changedTouches[0].clientX - startX;
      grid.style.transform = '';
      grid.style.opacity = '';
      if (dx > 60) { uiCalMonth.m--; if (uiCalMonth.m < 0) { uiCalMonth.m = 11; uiCalMonth.y--; } renderHistory(); }
      else if (dx < -60) { uiCalMonth.m++; if (uiCalMonth.m > 11) { uiCalMonth.m = 0; uiCalMonth.y++; } renderHistory(); }
    }
    horizontal = false;
  });
}

function enableSwipeToClose(sheet) {
  let startY = 0, currentY = 0, dragging = false;
  const threshold = 90;
  sheet.addEventListener('touchstart', e => {
    if (sheet.scrollTop > 2) return;
    dragging = true;
    startY = e.touches[0].clientY;
    currentY = startY;
    sheet.classList.add('is-dragging');
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
    const dy = currentY - startY;
    if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  sheet.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove('is-dragging');
    const dy = currentY - startY;
    sheet.style.transform = '';
    if (dy > threshold) closeModal();
    startY = 0; currentY = 0;
  });
}

/* ============================================================
   TRY-ON PICKER
   Single-slot mode: top/bottom/shoes/hat — one dedicated category.
   Combined mode: outer + accessory — reached by tapping blank space
   on the figure board; a small category switcher picks which one.
   When backfillDraft is set, selections write into the draft instead
   of today's live outfit (see the backfill feature below).
   ============================================================ */
function selectSlotItem(slot, itemId) {
  if (backfillDraft) {
    backfillDraft[slot] = itemId;
    renderBackfillModal();
    openModal('modal-backfill');
  } else {
    setTodaySlot(slot, itemId);
    closeModal();
  }
}
let tryonCurrentSlot = null, tryonCurrentCategory = null;
let tryonSearchQuery = '';
let tryonSort = 'recent';
function renderTryonGridFor(slot, category) {
  tryonCurrentSlot = slot;
  tryonCurrentCategory = category;
  const grid = document.getElementById('tryonPickerGrid');
  const empty = document.getElementById('tryonPickerEmpty');
  grid.innerHTML = '';
  let options = state.items.filter(i => i.category === category && i.status !== 'dirty' && i.status !== 'retired');
  options = options.filter(i => itemMatchesSearch(i, tryonSearchQuery));
  options = options.filter(i => itemMatchesFilters(i));
  options = options.slice().sort((a, b) => {
    if (tryonSort === 'wearCount') return (b.wearCount||0) - (a.wearCount||0);
    if (tryonSort === 'lastWorn') return (b.lastWornDate||'').localeCompare(a.lastWornDate||'');
    if (tryonSort === 'name') return a.name.localeCompare(b.name, 'zh-Hant');
    return (b.createdAt||0) - (a.createdAt||0);
  });
  document.getElementById('tryonFilterBadge').hidden = !isFilterActive();
  empty.hidden = options.length !== 0;

  const current = backfillDraft ? backfillDraft[slot] : state.today[slot];
  const clearWrap = document.getElementById('tryonClearWrap');
  clearWrap.innerHTML = '';
  if (current) {
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'chip';
    clearBtn.style.marginBottom = '10px';
    clearBtn.textContent = `不穿${categoryLabel(category)}`;
    clearBtn.addEventListener('click', () => selectSlotItem(slot, null));
    clearWrap.appendChild(clearBtn);
  }
  options.forEach(item => {
    const card = buildItemCard(item, { onClick: () => selectSlotItem(slot, item.id) });
    grid.appendChild(card);
  });
}
function resetTryonToolbar() {
  tryonSearchQuery = '';
  tryonSort = 'recent';
  document.getElementById('tryonSortSelect').value = 'recent';
  document.getElementById('tryonSearchInput').value = '';
  document.getElementById('tryonSearchRow').classList.add('is-hidden');
}
function openTryonPicker(slot) {
  document.getElementById('tryonCategoryChips').classList.add('is-hidden');
  document.getElementById('tryonTitle').textContent = `選擇${categoryLabel(slot)}`;
  resetTryonToolbar();
  renderTryonGridFor(slot, slot);
  openModal('modal-tryon');
}
function openExtrasPicker() {
  document.getElementById('tryonTitle').textContent = '選擇外套或配件';
  resetTryonToolbar();
  const chipsWrap = document.getElementById('tryonCategoryChips');
  chipsWrap.classList.remove('is-hidden');
  chipsWrap.innerHTML = '';
  ['outer', 'accessory'].forEach((cat, i) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (i === 0 ? ' is-active' : '');
    chip.textContent = categoryLabel(cat);
    chip.addEventListener('click', () => {
      chipsWrap.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderTryonGridFor(cat, cat);
    });
    chipsWrap.appendChild(chip);
  });
  renderTryonGridFor('outer', 'outer');
  openModal('modal-tryon');
}

/* ============================================================
   BACKFILL A PAST DAY'S OOTD (from the 穿搭紀錄 tab's + button)
   Writes straight into ootdHistory; does not touch live wear counts,
   except it does bump totalWearCount so 常穿排行 stays consistent.
   ============================================================ */
function openBackfillModal(presetDate) {
  const date = presetDate || todayStr();
  const existing = state.ootdHistory.find(e => e.date === date);
  backfillDraft = { date };
  ALL_SLOTS.forEach(s => { backfillDraft[s] = existing ? (existing[s] || null) : null; });
  renderBackfillModal();
  openModal('modal-backfill');
}
function renderBackfillModal() {
  document.getElementById('backfillDate').value = backfillDraft.date;
  const wrap = document.getElementById('backfillRows');
  wrap.innerHTML = '';
  ALL_SLOTS.forEach(slot => {
    const itemId = backfillDraft[slot];
    const item = itemId ? findItem(itemId) : null;
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'day-detail-row';
    const thumb = item
      ? (item.image ? `<img class="ddr-thumb" src="${item.image}" alt="">` : `<span class="ddr-thumb">${categoryIcon(item.category)}</span>`)
      : `<span class="ddr-thumb">${ICONS[slot] || ''}</span>`;
    row.innerHTML = `${thumb}<div><p class="ddr-cat">${categoryLabel(slot)}</p><p class="ddr-name">${item ? escapeHtml(item.name) : '點選加入'}</p></div>`;
    row.addEventListener('click', () => openTryonPicker(slot));
    wrap.appendChild(row);
  });
}

/* ============================================================
   FILTER MODAL
   ============================================================ */
let filterContext = 'wardrobe';
function refreshFilteredViews() {
  renderWardrobe();
  renderWishlist();
  if (tryonCurrentSlot) renderTryonGridFor(tryonCurrentSlot, tryonCurrentCategory);
}
function openFilterModal(context = 'wardrobe') {
  filterContext = context;
  const isWishlist = context === 'wishlist';
  document.getElementById('filterModalTitle').textContent = isWishlist ? '篩選想買單品' : '篩選';
  document.getElementById('filterStatusSection').classList.toggle('is-hidden', isWishlist);
  document.getElementById('filterCategorySection').classList.toggle('is-hidden', !isWishlist);
  document.querySelectorAll('#filterStatusChips .chip').forEach(c => c.classList.toggle('is-active', c.getAttribute('data-status') === uiWardrobeFilters.status));
  const categoryRow = document.getElementById('filterCategoryChips');
  categoryRow.innerHTML = '';
  if (isWishlist) {
    [{ id: 'all', label: '全部' }].concat(allCategoryIds().map(id => ({ id, label: categoryLabel(id) }))).forEach(({ id, label }) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (uiWishlistFilters.category === id ? ' is-active' : '');
      chip.textContent = label;
      chip.addEventListener('click', () => { uiWishlistFilters.category = id; categoryRow.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active')); chip.classList.add('is-active'); refreshFilteredViews(); });
      categoryRow.appendChild(chip);
    });
  }
  const tagRow = document.getElementById('filterTagChips');
  tagRow.innerHTML = '';
  const selectedTags = isWishlist ? uiWishlistFilters.tags : uiWardrobeFilters.tags;
  (isWishlist ? allWishlistTagsUsed() : allTagsUsed()).forEach(t => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip' + (selectedTags.includes(t) ? ' is-active' : '');
    chip.textContent = t;
    chip.addEventListener('click', () => {
      if (isWishlist) uiWishlistFilters.tags = uiWishlistFilters.tags.includes(t) ? uiWishlistFilters.tags.filter(x => x !== t) : uiWishlistFilters.tags.concat(t);
      else uiWardrobeFilters.tags = uiWardrobeFilters.tags.includes(t) ? uiWardrobeFilters.tags.filter(x => x !== t) : uiWardrobeFilters.tags.concat(t);
      chip.classList.toggle('is-active');
      refreshFilteredViews();
    });
    tagRow.appendChild(chip);
  });
  openModal('modal-filter');
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
function wireEvents() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      persistTransientForms();
      lastChangedView = btn.getAttribute('data-view');
      activateView(lastChangedView);
    });
  });

  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  document.querySelectorAll('.modal-sheet').forEach(enableSwipeToClose);

  document.querySelectorAll('.figure-slot').forEach(btn => {
    btn.addEventListener('click', () => openTryonPicker(btn.getAttribute('data-slot')));
  });
  document.getElementById('figureExtrasLink').addEventListener('click', openExtrasPicker);
  document.getElementById('btnClearOotd').addEventListener('click', () => {
    ALL_SLOTS.forEach(s => { if (state.today[s]) setTodaySlot(s, null); });
    toast('已清空今日穿搭');
  });
  document.getElementById('btnBackfill').addEventListener('click', () => openBackfillModal());
  document.getElementById('backfillDate').addEventListener('change', e => {
    if (!backfillDraft) return;
    backfillDraft.date = e.target.value || todayStr();
  });
  document.getElementById('btnSaveBackfill').addEventListener('click', () => {
    if (!backfillDraft) return;
    if (backfillDraft.date === todayStr()) {
      toast('今天的穿搭請到主頁選擇喔');
      return;
    }
    if (!ALL_SLOTS.some(s => backfillDraft[s])) {
      toast('至少選一件單品');
      return;
    }
    const entry = { date: backfillDraft.date };
    ALL_SLOTS.forEach(s => { entry[s] = backfillDraft[s]; if (entry[s]) { const it = findItem(entry[s]); if (it) it.totalWearCount = (it.totalWearCount || 0) + 1; } });
    const existingIdx = state.ootdHistory.findIndex(e => e.date === entry.date);
    if (existingIdx >= 0) state.ootdHistory[existingIdx] = entry; else state.ootdHistory.push(entry);
    saveState();
    backfillDraft = null;
    document.getElementById('modalOverlay').classList.remove('is-open');
    renderHistory();
    toast('已儲存這天的穿搭紀錄');
  });

  document.getElementById('btnNotifications').addEventListener('click', () => { renderNotifications(); openModal('modal-notif'); });
  function setPickerBtn(id, value) {
    const el = document.getElementById(id);
    if (value === null) { el.textContent = '無'; el.dataset.value = 'none'; }
    else { el.textContent = String(value); el.dataset.value = String(value); }
  }
  document.getElementById('btnSettings').addEventListener('click', () => {
    document.getElementById('settingName').value = state.profile.name || '';
    setPickerBtn('pickThresholdBottom', state.profile.washThresholds.bottom);
    setPickerBtn('pickThresholdOuter', state.profile.washThresholds.outer);
    setPickerBtn('pickThresholdShoes', state.profile.washThresholds.shoes);
    setPickerBtn('pickThresholdHat', state.profile.washThresholds.hat);
    setPickerBtn('pickThresholdAccessory', state.profile.washThresholds.accessory);
    const towel = state.consumables.find(c => isTowelId(c.id));
    setPickerBtn('pickThresholdTowel', towel ? towel.cycleDays : 7);
    document.getElementById('moreThresholdsWrap').classList.add('is-hidden');
    renderAvatar();
    renderCardImageScale();
    syncWeatherSettings();
    document.getElementById('weatherSearchResults').innerHTML = '';
    modalReturnTo = null;
    openModal('modal-settings');
  });
  document.getElementById('btnExportData').addEventListener('click', async () => {
    // avoid blob: URLs entirely — in an installed iOS PWA, clicking a blob: link
    // can get recorded as a real navigation, and later gesture-navigating (e.g. the
    // right-edge back/forward swipe) to that now-revoked blob: URL throws
    // "WebKitBlobResource error 1". Web Share (or a data: URI) doesn't have that problem.
    const filename = `wardrobe-backup-${todayStr()}.json`;
    const jsonStr = JSON.stringify(state, null, 2);
    try {
      if (navigator.canShare && navigator.share) {
        const file = new File([jsonStr], filename, { type: 'application/json' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: filename });
          return;
        }
      }
    } catch (err) {
      // user cancelled the share sheet, or sharing isn't available — fall through
    }
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr);
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  document.getElementById('btnImportData').addEventListener('click', () => document.getElementById('importFileInput').click());
  document.getElementById('importFileInput').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || !Array.isArray(parsed.items)) throw new Error('格式不正確');
      Object.keys(state).forEach(k => delete state[k]);
      Object.assign(state, defaultState(), parsed);
      saveState();
      renderAll();
      toast('匯入完成');
      closeModal();
    } catch (err) {
      toast('匯入失敗，請確認檔案是否為衣櫥助手的備份檔');
    }
    e.target.value = '';
  });
  document.getElementById('btnImportSeedList').addEventListener('click', () => { importSeedItems(); closeModal(); });

  // wardrobe: sort + filter + search + select mode
  document.getElementById('sortSelect').addEventListener('change', e => { uiWardrobeSort = e.target.value; renderWardrobe(); });
  document.getElementById('btnAddItem').addEventListener('click', () => openAddModal(null));
  const retiredBanner = document.getElementById('retiredBanner');
  const openRetired = () => { uiWardrobeCat = 'retired'; uiSelectMode = false; uiSelectedIds.clear(); renderCategoryChips(); renderWardrobe(); document.getElementById('mainScroll').scrollTop = 0; };
  retiredBanner?.addEventListener('click', openRetired);
  retiredBanner?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRetired(); } });
  document.getElementById('btnFilter').addEventListener('click', () => { modalReturnTo = null; openFilterModal('wardrobe'); });
  document.getElementById('filterStatusChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    if (filterContext !== 'wardrobe') return;
    uiWardrobeFilters.status = chip.getAttribute('data-status');
    document.querySelectorAll('#filterStatusChips .chip').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    refreshFilteredViews();
  });
  document.getElementById('btnFilterClear').addEventListener('click', () => {
    if (filterContext === 'wishlist') uiWishlistFilters = { category: 'all', tags: [] };
    else uiWardrobeFilters = { status: 'all', tags: [] };
    openFilterModal(filterContext);
    refreshFilteredViews();
  });
  document.getElementById('btnFilterApply').addEventListener('click', closeModal);

  document.getElementById('btnSearch').addEventListener('click', () => {
    const row = document.getElementById('searchRow');
    row.classList.toggle('is-hidden');
    if (!row.classList.contains('is-hidden')) document.getElementById('searchInput').focus();
  });
  document.getElementById('searchInput').addEventListener('input', e => {
    uiSearchQuery = e.target.value.trim();
    renderWardrobe();
  });
  document.getElementById('btnSearchClear').addEventListener('click', () => {
    uiSearchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchRow').classList.add('is-hidden');
    renderWardrobe();
  });

  // try-on picker: sort + search
  document.getElementById('tryonSortSelect').addEventListener('change', e => {
    tryonSort = e.target.value;
    if (tryonCurrentSlot) renderTryonGridFor(tryonCurrentSlot, tryonCurrentCategory);
  });
  document.getElementById('btnTryonSearch').addEventListener('click', () => {
    const row = document.getElementById('tryonSearchRow');
    row.classList.toggle('is-hidden');
    if (!row.classList.contains('is-hidden')) document.getElementById('tryonSearchInput').focus();
  });
  document.getElementById('tryonSearchInput').addEventListener('input', e => {
    tryonSearchQuery = e.target.value.trim();
    if (tryonCurrentSlot) renderTryonGridFor(tryonCurrentSlot, tryonCurrentCategory);
  });
  document.getElementById('btnTryonSearchClear').addEventListener('click', () => {
    tryonSearchQuery = '';
    document.getElementById('tryonSearchInput').value = '';
    document.getElementById('tryonSearchRow').classList.add('is-hidden');
    if (tryonCurrentSlot) renderTryonGridFor(tryonCurrentSlot, tryonCurrentCategory);
  });
  document.getElementById('btnTryonFilter').addEventListener('click', () => {
    modalReturnTo = 'modal-tryon';
    openFilterModal();
  });

  function setSelectMode(on) {
    uiSelectMode = on;
    uiSelectedIds.clear();
    document.getElementById('btnSelectMode').classList.toggle('is-active', on);
    document.getElementById('selectBar').classList.toggle('is-hidden', !on);
    document.getElementById('btnAddItem').classList.toggle('is-hidden', on);
    document.getElementById('selectCount').textContent = '已選 0 件';
    renderWardrobe();
  }
  document.getElementById('btnSelectMode').addEventListener('click', () => setSelectMode(!uiSelectMode));
  document.getElementById('btnSelectCancel').addEventListener('click', () => setSelectMode(false));
  document.getElementById('btnSelectAll').addEventListener('click', () => {
    const visible = getVisibleWardrobeItems();
    const allSelected = visible.length > 0 && visible.every(i => uiSelectedIds.has(i.id));
    if (allSelected) uiSelectedIds.clear();
    else visible.forEach(i => uiSelectedIds.add(i.id));
    document.getElementById('selectCount').textContent = `已選 ${uiSelectedIds.size} 件`;
    renderWardrobe();
  });
  document.getElementById('btnSelectRetire').addEventListener('click', () => {
    if (!uiSelectedIds.size) return;
    const n = uiSelectedIds.size;
    openConfirm('移入典藏？', `已選 ${n} 件單品`, [
      { label: '取消', kind: 'secondary' },
      { label: '確定', kind: 'primary', onClick: () => {
        uiSelectedIds.forEach(id => { const it = findItem(id); if (it) it.status = 'retired'; });
        saveState();
        setSelectMode(false);
        renderAll();
      } },
    ]);
  });
  document.getElementById('btnSelectDelete').addEventListener('click', () => {
    if (!uiSelectedIds.size) return;
    const n = uiSelectedIds.size;
    openConfirm('永久刪除？', `已選 ${n} 件單品，此動作無法復原`, [
      { label: '取消', kind: 'secondary' },
      { label: '刪除', kind: 'danger', onClick: () => {
        state.items = state.items.filter(i => !uiSelectedIds.has(i.id));
        saveState();
        setSelectMode(false);
        renderAll();
      } },
    ]);
  });

  // wishlist / inspiration
  document.getElementById('btnAddWishlist').addEventListener('click', () => openWishlistModal());
  document.getElementById('btnWishlistFilter').addEventListener('click', () => { modalReturnTo = null; openFilterModal('wishlist'); });
  document.getElementById('wishlistSortSelect').addEventListener('change', e => { uiWishlistSort = e.target.value; renderWishlist(); });
  document.getElementById('btnWishlistSearch').addEventListener('click', () => { const row = document.getElementById('wishlistSearchRow'); row.classList.toggle('is-hidden'); if (!row.classList.contains('is-hidden')) document.getElementById('wishlistSearchInput').focus(); });
  document.getElementById('wishlistSearchInput').addEventListener('input', e => { uiWishlistSearchQuery = e.target.value.trim(); renderWishlist(); });
  document.getElementById('btnWishlistSearchClear').addEventListener('click', () => { uiWishlistSearchQuery = ''; document.getElementById('wishlistSearchInput').value = ''; document.getElementById('wishlistSearchRow').classList.add('is-hidden'); renderWishlist(); });
  document.getElementById('btnWishlistSelectMode').addEventListener('click', () => setWishlistSelectMode(!uiWishlistSelectMode));
  document.getElementById('btnWishlistSelectCancel').addEventListener('click', () => setWishlistSelectMode(false));
  document.getElementById('btnWishlistDeleteSelected').addEventListener('click', () => {
    if (!uiWishlistSelectedIds.size) return;
    openConfirm('刪除選取的想買單品？', `共 ${uiWishlistSelectedIds.size} 件，此動作無法復原`, [
      { label: '取消', kind: 'secondary' },
      { label: '刪除', kind: 'danger', onClick: () => { state.wishlist = state.wishlist.filter(item => !uiWishlistSelectedIds.has(item.id)); saveState(); setWishlistSelectMode(false); renderWishlist(); toast('已刪除選取的想買單品'); } },
    ]);
  });
  document.getElementById('wishlistForm').addEventListener('submit', e => { e.preventDefault(); saveWishlistForm(); });
  document.getElementById('wishlistCategoryChips').addEventListener('click', e => e.stopPropagation());
  document.getElementById('wishlistLengthToggle').addEventListener('click', e => {
    const btn = e.target.closest('.segment-btn');
    if (!btn) return;
    const value = btn.dataset.len;
    pendingWishlistTags = pendingWishlistTags.filter(tag => !LENGTH_TAGS.includes(tag));
    if (!pendingWishlistTags.includes(value)) pendingWishlistTags.push(value);
    wishlistDirty = true;
    renderWishlistTagChips();
    renderWishlistLengthToggle();
    autoSaveWishlistDraft();
  });
  document.getElementById('wishlistTagsCustom').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = e.target.value.trim();
    if (!value) return;
    if (!pendingWishlistTags.includes(value)) pendingWishlistTags.push(value);
    wishlistDirty = true;
    e.target.value = '';
    renderWishlistTagChips();
    autoSaveWishlistDraft();
  });
  ['wishlistName', 'wishlistReferenceUrl'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { wishlistDirty = true; autoSaveWishlistDraft(); });
    el.addEventListener('change', () => { wishlistDirty = true; autoSaveWishlistDraft(); });
  });
  document.getElementById('wishlistPhotoInput').addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast('處理參考圖片中…');
    try {
      const compressed = await compressImageFile(file);
      pendingWishlistPhoto = compressed;
      wishlistDirty = true;
      setPhotoPreview(document.getElementById('wishlistPhotoPreviewWrap'), compressed, '加入參考圖片');
      document.getElementById('btnReadjustWishlistPhoto').classList.toggle('is-hidden', !editingWishlistId);
      autoSaveWishlistDraft();
    } catch (err) { toast('參考圖片處理失敗，請換一張試試'); }
    e.target.value = '';
  });
  document.getElementById('btnReadjustWishlistPhoto').addEventListener('click', () => {
    if (!pendingWishlistPhoto) return;
    openPhotoAdjust(pendingWishlistPhoto, pendingWishlistCategory, finalUrl => {
      pendingWishlistPhoto = finalUrl;
      wishlistDirty = true;
      setPhotoPreview(document.getElementById('wishlistPhotoPreviewWrap'), finalUrl, '加入參考圖片');
      autoSaveWishlistDraft();
    });
  });
  document.getElementById('btnDeleteWishlist').addEventListener('click', () => {
    if (!editingWishlistId) return;
    state.wishlist = state.wishlist.filter(item => item.id !== editingWishlistId);
    state.drafts.wishlist = null;
    saveState();
    renderWishlist();
    forceCloseModal();
    toast('已刪除想買單品');
  });
  window.addEventListener('pagehide', persistTransientForms);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') persistTransientForms(); });

  // custom category
  document.getElementById('categoryForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('fieldCategoryName');
    const label = input.value.trim();
    if (!label) return;
    state.customCategories.push({ id: 'custom-' + uid(), label });
    saveState();
    renderCategoryChips();
    renderCategoryPickerChips();
    input.value = '';
    toast(`已新增分類「${label}」`);
    closeModal();
  });
  document.getElementById('btnDeleteCategory').addEventListener('click', () => {
    const catId = uiWardrobeCat;
    const cat = state.customCategories.find(c => c.id === catId);
    if (!cat) return;
    const affected = state.items.filter(i => i.category === catId).length;
    openConfirm(`刪除「${cat.label}」分類？`, affected ? `裡面 ${affected} 件單品會移到「配件」分類，此動作無法復原` : '此動作無法復原', [
      { label: '取消', kind: 'secondary' },
      { label: '刪除', kind: 'danger', onClick: () => {
        state.items.forEach(i => { if (i.category === catId) i.category = 'accessory'; });
        state.customCategories = state.customCategories.filter(c => c.id !== catId);
        uiWardrobeCat = 'all';
        saveState();
        renderCategoryChips();
        renderCategoryPickerChips();
        renderWardrobe();
        toast(`已刪除「${cat.label}」分類`);
      } },
    ]);
  });

  // history: segment + calendar nav
  document.getElementById('historySegment').addEventListener('click', e => {
    const btn = e.target.closest('.segment-btn');
    if (!btn) return;
    document.querySelectorAll('#historySegment .segment-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const seg = btn.getAttribute('data-seg');
    document.getElementById('panel-calendar').hidden = seg !== 'calendar';
    document.getElementById('panel-rank').hidden = seg !== 'rank';
  });
  document.getElementById('calPrev').addEventListener('click', () => {
    uiCalMonth.m--; if (uiCalMonth.m < 0) { uiCalMonth.m = 11; uiCalMonth.y--; }
    renderHistory();
  });
  document.getElementById('calNext').addEventListener('click', () => {
    uiCalMonth.m++; if (uiCalMonth.m > 11) { uiCalMonth.m = 0; uiCalMonth.y++; }
    renderHistory();
  });

  // photo upload (label already opens the native picker — no extra .click() here, that double-trigger was the bug)
  document.getElementById('photoInput').addEventListener('change', async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    toast('處理照片中…');
    try {
      const frontCompressed = await compressImageFile(files[0]);
      pendingPhoto = frontCompressed;
      autoSaveAddItemDraft();
      if (files[1]) {
        pendingPhotoBack = await compressImageFile(files[1]);
        document.getElementById('photoBackHint').hidden = false;
      } else {
        pendingPhotoBack = null;
        document.getElementById('photoBackHint').hidden = true;
      }
      formDirty = true;
      const wrap = document.getElementById('photoPreviewWrap');
      wrap.setAttribute('style', `background-color:#fff;background-image:url('${pendingPhoto}')`);
      wrap.classList.add('has-photo');
      wrap.innerHTML = '';
      document.getElementById('btnReadjustPhoto').classList.toggle('is-hidden', !editingItemId);
      autoSaveAddItemDraft();
    } catch (err) {
      toast('照片處理失敗，請換一張試試');
    }
  });
  document.getElementById('btnReadjustPhoto').addEventListener('click', () => {
    if (!pendingPhoto) return;
    openPhotoAdjust(pendingPhoto, pendingCategory, finalUrl => {
      pendingPhoto = finalUrl;
      autoSaveAddItemDraft();
      const wrap = document.getElementById('photoPreviewWrap');
      wrap.setAttribute('style', `background-image:url('${pendingPhoto}')`);
      formDirty = true;
    });
  });

  // length toggle — writes directly into the tag list (長/短 are just tags now)
  document.getElementById('lengthToggle').addEventListener('click', e => {
    const btn = e.target.closest('.segment-btn');
    if (!btn) return;
    const val = btn.getAttribute('data-len');
    const isActive = pendingTags.includes(val);
    pendingTags = pendingTags.filter(t => !LENGTH_TAGS.includes(t));
    if (!isActive) pendingTags.push(val);
    formDirty = true;
    renderLengthToggle();
    renderTagPickerChips();
    autoSaveAddItemDraft();
  });

  // custom tag text input
  document.getElementById('fieldTagsCustom').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = e.target.value.trim();
    if (!val) return;
    if (!pendingTags.includes(val)) pendingTags.push(val);
    formDirty = true;
    e.target.value = '';
    renderTagPickerChips();
    autoSaveAddItemDraft();
  });

  ['fieldName', 'fieldPurchaseDate', 'fieldPrice', 'fieldArchiveDirect'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => { formDirty = true; autoSaveAddItemDraft(); });
    el.addEventListener('change', () => { formDirty = true; autoSaveAddItemDraft(); });
  });

  // add / edit item form
  function saveItemForm() {
    const name = document.getElementById('fieldName').value.trim();
    if (!name) { toast('請輸入名稱'); return false; }
    const category = pendingCategory;
    const tags = pendingTags.slice();
    const purchaseDate = document.getElementById('fieldPurchaseDate').value;
    const priceVal = document.getElementById('fieldPrice').value;
    const price = priceVal ? Number(priceVal) : null;
    const archiveDirect = document.getElementById('fieldArchiveDirect').checked;

    if (editingItemId) {
      const item = findItem(editingItemId);
      Object.assign(item, { name, category, tags, purchaseDate, price, image: pendingPhoto || item.image, imageBack: pendingPhotoBack });
      toast('已儲存修改');
    } else {
      state.items.push({
        id: uid(), name, category, tags, purchaseDate, price,
        image: pendingPhoto, imageBack: pendingPhotoBack,
        wearCount: 0, totalWearCount: 0, status: archiveDirect ? 'retired' : 'clean',
        lastWornDate: null, wornToday: false, wearHistory: [], createdAt: Date.now(),
      });
      toast(archiveDirect ? '已加入典藏' : '已加入衣櫥');
    }
    state.drafts.addItem = null;
    saveState();
    renderAll();
    formDirty = false;
    forceCloseModal({ skipPersist: true });
    return true;
  }
  document.getElementById('addItemForm').addEventListener('submit', e => {
    e.preventDefault();
    saveItemForm();
  });
  document.getElementById('btnUnsavedDiscard').addEventListener('click', () => {
    if (unsavedContext === 'wishlist') {
      if (editingWishlistId && wishlistEditSnapshot) {
        const item = state.wishlist.find(x => x.id === editingWishlistId);
        if (item) Object.assign(item, JSON.parse(JSON.stringify(wishlistEditSnapshot)));
      } else {
        state.drafts.wishlist = null;
      }
    } else state.drafts.addItem = null;
    saveState();
    unsavedContext = null;
    forceCloseModal({ skipPersist: true });
  });
  document.getElementById('btnUnsavedSave').addEventListener('click', () => {
    const context = unsavedContext;
    unsavedContext = null;
    const saved = context === 'wishlist' ? saveWishlistForm() : saveItemForm();
    if (saved === false) {
      if (context === 'wishlist') openModal('modal-wishlist');
      else openModal('modal-add');
    }
  });

  document.getElementById('btnRetireItem').addEventListener('click', () => {
    if (editingItemId) { formDirty = false; retireItem(editingItemId); closeModal(); }
  });
  document.getElementById('btnDeleteItem').addEventListener('click', () => {
    if (editingItemId && confirm('確定要永久刪除這件單品嗎？此動作無法復原。')) {
      formDirty = false;
      deleteItemPermanently(editingItemId);
      closeModal();
    }
  });

  // laundry day (whole-basket cadence)
  document.getElementById('card-basket').addEventListener('click', openLaundryModal);
  document.getElementById('card-basket').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLaundryModal(); } });
  document.getElementById('card-rack').addEventListener('click', openRackOverview);
  document.getElementById('card-rack').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRackOverview(); } });
  document.getElementById('btnLaundryDone').addEventListener('click', () => { markLaundryDone(); closeModal(); });
  document.getElementById('btnLaundryPostpone').addEventListener('click', () => { postponeLaundry(); closeModal(); });

  // calendar: swipe between months + jump-to-date + tap title to return to today
  wireCalendarSwipe();
  document.getElementById('calTitle').addEventListener('click', () => {
    const d = new Date();
    uiCalMonth = { y: d.getFullYear(), m: d.getMonth() };
    renderHistory();
  });
  document.getElementById('calJumpBtn').addEventListener('click', () => {
    document.getElementById('jumpDateInput').value = todayStr();
    openModal('modal-jump');
  });
  document.getElementById('btnJumpGo').addEventListener('click', () => {
    const val = document.getElementById('jumpDateInput').value;
    if (!val) return;
    const d = new Date(val + 'T00:00:00');
    uiCalMonth = { y: d.getFullYear(), m: d.getMonth() };
    renderHistory();
    closeModal();
    const entries = allOotdEntries();
    const entry = entries.find(e => e.date === val);
    if (entry) openDayDetail(val, entry);
  });

  // settings: number-grid picker for wash thresholds (+ towel cycle days)
  document.querySelectorAll('.threshold-picker-btn').forEach(btn => {
    btn.addEventListener('click', () => openNumberGridPicker(btn));
  });
  document.getElementById('btnMoreThresholds').addEventListener('click', () => {
    document.getElementById('moreThresholdsWrap').classList.toggle('is-hidden');
    saveSettingsDraft();
  });
  ['settingName'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', saveSettingsDraft);
    el.addEventListener('change', saveSettingsDraft);
  });
  document.getElementById('cardImageScale').addEventListener('input', e => { state.profile.cardImageScale = Number(e.target.value); renderCardImageScale(); saveState(); renderWardrobe(); });
  document.getElementById('avatarInput').addEventListener('change', async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { state.profile.avatar = await compressImageFile(file, 320, 0.86); saveState(); renderAvatar(); toast('頭像已更新'); }
    catch (err) { toast('頭像處理失敗，請換一張圖片'); }
    e.target.value = '';
  });
  document.getElementById('btnClearAvatar').addEventListener('click', () => { state.profile.avatar = ''; saveState(); renderAvatar(); toast('已移除自訂頭像'); });
  document.getElementById('btnWeatherSearch').addEventListener('click', searchWeatherCities);
  document.getElementById('weatherCityInput').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchWeatherCities(); } });
  document.getElementById('weatherSearchResults').addEventListener('click', e => { const btn = e.target.closest('.weather-result'); if (!btn) return; const loc = e.currentTarget._locations?.[Number(btn.dataset.weatherIndex)]; selectWeatherLocation(loc); });
  document.getElementById('btnWeatherRefresh').addEventListener('click', () => refreshWeather(true));
  document.getElementById('btnUndo').addEventListener('click', undoState);
  document.getElementById('btnRedo').addEventListener('click', redoState);

  document.getElementById('settingsForm').addEventListener('submit', e => {
    e.preventDefault();
    const readPicker = id => {
      const v = document.getElementById(id).dataset.value;
      return v === 'none' ? null : Number(v);
    };
    state.profile.name = document.getElementById('settingName').value.trim();
    state.profile.washThresholds = {
      bottom: readPicker('pickThresholdBottom'),
      outer: readPicker('pickThresholdOuter'),
      shoes: readPicker('pickThresholdShoes'),
      hat: readPicker('pickThresholdHat'),
      accessory: readPicker('pickThresholdAccessory'),
    };
    const towelDays = readPicker('pickThresholdTowel');
    state.consumables.forEach(c => { if (isTowelId(c.id)) c.cycleDays = towelDays; });
    saveSettingsDraft();
    renderAll();
    renderAvatar();
    renderCardImageScale();
    toast('設定已儲存');
    modalReturnTo = null;
    forceCloseModal();
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyStaticIcons();
  wireEvents();
  wirePhotoAdjust();
  renderCategoryChips();
  ensureNewDay();
  historySnapshot = cloneState(state);
  historyReady = true;
  activateView('home');
  renderAll();
  updateHistoryControls();
  refreshWeather(false);
  setInterval(() => { ensureNewDay(); renderAll(); }, 5 * 60 * 1000);

  // small minimum splash time so it reads as an intentional launch moment
  // rather than an imperceptible flash, then fade it out and drop it from the DOM
  const splash = document.getElementById('splashScreen');
  setTimeout(() => {
    splash.classList.add('splash-fade-out');
    setTimeout(() => splash.remove(), 400);
  }, 350);

  if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // a new service worker just took over (skipWaiting + clients.claim in sw.js) —
      // reload once so the freshly-fetched HTML/JS actually gets used, instead of
      // leaving the old in-memory version running under the new SW.
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
}
document.addEventListener('DOMContentLoaded', init);
