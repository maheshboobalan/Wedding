// ---- Edit these after confirming details ----
const CONFIG = {
  venueName: 'VASAVI MITHRA MAHAL GRAND AKSHAYAM',
  venueQuery: 'VASAVI MITHRA MAHAL GRAND AKSHAYAM', // replace with exact address once confirmed
  target: '2027-07-06T05:15:00+05:30', // IST
  title: 'Wedding of Manasa A & Boobalan S',
};
const $ = (s) => document.querySelector(s);
const q = encodeURIComponent(CONFIG.venueQuery);
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
$('#loc').href = $('#loc2').href = mapUrl;
$('#dir').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
const siteUrl = () => location.origin + location.pathname;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Petals
if (!reduce) {
  const p = $('#petals');
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.style.cssText = `left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 8}s;animation-delay:-${Math.random() * 12}s`;
    p.append(s);
  }
}
// Temple doors
$('#open').addEventListener('click', () => {
  const g = $('#gate'); g.classList.add('open');
  setTimeout(() => g.classList.add('done'), reduce ? 100 : 2600);
  setTimeout(() => g.remove(), reduce ? 400 : 3800);
});
// Menu
const mb = $('#menuBtn'), menu = $('#menu');
mb.addEventListener('click', () => { menu.hidden = !menu.hidden; mb.setAttribute('aria-expanded', String(!menu.hidden)); });
menu.addEventListener('click', () => { menu.hidden = true; mb.setAttribute('aria-expanded', 'false'); });
// Music (user-initiated only)
const au = $('#audio'), mu = $('#music');
mu.addEventListener('click', async () => {
  if (au.paused) {
    try { await au.play(); mu.textContent = '♪ Music ON'; mu.setAttribute('aria-pressed', 'true'); }
    catch { mu.textContent = '♪ Audio file not added'; }
  } else { au.pause(); mu.textContent = '♪ Music OFF'; mu.setAttribute('aria-pressed', 'false'); }
});
// Scratch card
const cv = $('#sc'), ctx = cv.getContext('2d');
function paint() {
  const r = cv.getBoundingClientRect(); cv.width = r.width; cv.height = r.height;
  const g = ctx.createLinearGradient(0, 0, r.width, r.height);
  g.addColorStop(0, '#b8861f'); g.addColorStop(.5, '#f3d77a'); g.addColorStop(1, '#b8861f');
  ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
  ctx.fillStyle = '#6b4a0a'; ctx.font = '700 18px serif'; ctx.textAlign = 'center';
  ctx.fillText('Scratch to reveal the date', r.width / 2, r.height / 2);
}
paint();
let down = false;
const scratch = (e) => {
  const r = cv.getBoundingClientRect();
  ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath();
  ctx.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, 7); ctx.fill();
};
const reveal = () => { cv.classList.add('gone'); $('#revealBtn').hidden = true; };
cv.addEventListener('pointerdown', (e) => { down = true; cv.setPointerCapture(e.pointerId); scratch(e); });
cv.addEventListener('pointermove', (e) => { if (down) scratch(e); });
cv.addEventListener('pointerup', () => {
  down = false;
  const d = ctx.getImageData(0, 0, cv.width, cv.height).data; let c = 0, n = 0;
  for (let i = 3; i < d.length; i += 160) { n++; if (d[i] === 0) c++; }
  if (c / n > .5) reveal();
});
$('#revealBtn').addEventListener('click', reveal);
// Countdown
const T = new Date(CONFIG.target).getTime();
function tick() {
  let ms = T - Date.now();
  if (ms <= 0) { ['d', 'h', 'mi', 's'].forEach((k) => ($('#' + k).textContent = '0'));
    $('#cdMsg').textContent = 'The wedding celebrations have begun. Thank you for your blessings.'; return; }
  const s = Math.floor(ms / 1000);
  $('#d').textContent = Math.floor(s / 86400); $('#h').textContent = Math.floor(s % 86400 / 3600);
  $('#mi').textContent = Math.floor(s % 3600 / 60); $('#s').textContent = s % 60;
}
tick(); setInterval(tick, 1000);
// Parallax
const par = [...document.querySelectorAll('[data-par]')];
if (!reduce) addEventListener('scroll', () => requestAnimationFrame(() => par.forEach((el) => {
  const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top - innerHeight / 2) * el.dataset.par}px)`; })), { passive: true });
// Calendar (ICS). Duration is an editable placeholder; no end time was supplied.
document.querySelectorAll('.cal').forEach((b) => b.addEventListener('click', () => {
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE', 'TZID:Asia/Kolkata', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0530', 'TZOFFSETTO:+0530', 'TZNAME:IST', 'END:STANDARD', 'END:VTIMEZONE',
    'BEGIN:VEVENT', 'UID:wedding-20270706@invitation', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]|\.\d{3}/g, ''),
    'DTSTART;TZID=Asia/Kolkata:20270706T051500', 'DURATION:PT2H', 'SUMMARY:' + CONFIG.title,
    'LOCATION:' + CONFIG.venueName, 'DESCRIPTION:Muhurtham at 5:15 AM IST', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'wedding.ics'; a.click();
}));
// Share
const msg = `With joy and the blessings of our families, we invite you to the wedding of Manasa A & Boobalan S.\n6 July 2027, 5:15 AM IST\n${CONFIG.venueName}\n`;
$('#wa').href = 'https://wa.me/?text=' + encodeURIComponent(msg + siteUrl());
$('#copy').addEventListener('click', async () => {
  const st = $('#status');
  try { await navigator.clipboard.writeText(siteUrl()); st.textContent = 'Link copied.'; }
  catch { prompt('Copy this link:', siteUrl()); st.textContent = 'Copy the link from the dialog.'; }
});
