/* Quill & Wing — the practice flight on the landing page.
   QW_PATH is the raven's departure trajectory from the app's own render (bird-v17 manifest);
   qwFlight / qwArrival map it onto the 1280×800 simulated desktop. The sprite sheets are built by
   scripts/build-raven-sheets.py from the app's rendered frames. */
var QW_SHEETS = ["raven/sheet-00.webp", "raven/sheet-01.webp", "raven/sheet-02.webp", "raven/sheet-03.webp", "raven/sheet-04.webp", "raven/sheet-05.webp", "raven/sheet-06.webp", "raven/sheet-07.webp", "raven/sheet-08.webp"];
var QW_PATH = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0.0001],[0,0.0008],[0,0.0024],[-0.0001,0.0053],[-0.0002,0.0096],[-0.0003,0.0155],[-0.0005,0.0229],[-0.0006,0.0317],[-0.0008,0.0417],[-0.0011,0.0528],[-0.0013,0.0646],[-0.0016,0.0769],[-0.0019,0.0894],[-0.0021,0.1017],[-0.0024,0.1136],[-0.0027,0.1247],[-0.0029,0.1347],[-0.0031,0.1436],[-0.0033,0.151],[0.0123,0.1049],[0.0355,0.1083],[0.0354,0.1112],[0.0353,0.1127],[0.0353,0.1134],[0.0353,0.1135],[0.0353,0.1135],[0.0353,0.1135],[0.0353,0.1135],[0.0353,0.1135],[0.0353,0.113],[0.0354,0.1104],[0.0356,0.1037],[0.036,0.0907],[0.0365,0.0706],[0.0371,0.044],[0.0378,0.0127],[0.0385,-0.019],[0.0391,-0.0477],[0.0397,-0.0735],[0.0401,-0.0969],[0.0374,-0.1181],[0.0704,-0.1374],[0.161,-0.1551],[0.2696,-0.1716],[0.3218,-0.1872],[0.3296,-0.202],[0.3275,-0.2166],[0.3251,-0.2311],[0.3221,-0.2458],[0.3185,-0.2612],[0.3142,-0.2774],[0.3089,-0.2948],[0.3025,-0.3137],[0.2949,-0.3344],[0.2862,-0.3572],[0.2764,-0.3825],[0.2653,-0.4104],[0.2525,-0.4414],[0.2325,-0.4757],[0.2198,-0.5136],[0.1996,-0.5555],[0.1774,-0.6016],[0.1539,-0.6523],[0.1299,-0.7078],[0.1058,-0.7685],[0.0816,-0.8347],[0.0568,-0.9067],[0.0308,-0.9847],[-0.0044,-1.0691],[-0.0265,-1.1603],[-0.0573,-1.2621],[-0.0885,-1.3676],[-0.1192,-1.4706],[-0.1486,-1.5664],[-0.1769,-1.6533],[-0.2047,-1.7332],[-0.2332,-1.8112],[-0.2635,-1.8935],[-0.3045,-1.9899],[-0.3327,-2.0887],[-0.3711,-2.2011],[-0.4111,-2.3175],[-0.4516,-2.4316],[-0.4921,-2.5382],[-0.5323,-2.6352],[-0.5729,-2.7241],[-0.6147,-2.8098],[-0.6586,-2.898],[-0.713,-2.998],[-0.7544,-3.098],[-0.8058,-3.2092],[-0.8585,-3.3221],[-0.9115,-3.4301],[-0.964,-3.5283],[-1.016,-3.6143],[-1.0679,-3.69],[-1.1205,-3.7599],[-1.1749,-3.8299],[-1.2392,-3.9095],[-1.29,-3.9868],[-1.3503,-4.0732],[-1.4113,-4.1591],[-1.4717,-4.2381],[-1.5308,-4.3053],[-1.5884,-4.3586],[-1.6449,-4.3996],[-1.7009,-4.4333],[-1.7573,-4.4657],[-1.8226,-4.5062],[-1.8727,-4.5432],[-1.9309,-4.5883],[-1.9884,-4.632],[-2.044,-4.6682],[-2.097,-4.692],[-2.1472,-4.7015],[-2.1949,-4.6987],[-2.2412,-4.6885],[-2.2868,-4.6773],[-2.3412,-4.6754],[-2.3786,-4.6707],[-2.4256,-4.6777],[-2.4725,-4.6862],[-2.5183,-4.69],[-2.5623,-4.6841],[-2.6044,-4.6665],[-2.6454,-4.639],[-2.6863,-4.6069],[-2.7284,-4.5768],[-2.7828,-4.5603],[-2.8192,-4.5398],[-2.8673,-4.5317],[-2.9283,-4.5209],[-2.9891,-4.4997],[-3.0484,-4.4644],[-3.1089,-4.4221],[-3.172,-4.3941],[-3.2386,-4.3863],[-3.3086,-4.3899],[-3.3809,-4.3844],[-3.4552,-4.3573],[-3.5314,-4.3181],[-3.6102,-4.2746],[-3.6917,-4.2266],[-3.7759,-4.173],[-3.8625,-4.1141],[-3.9516,-4.0515],[-4.0429,-3.9874],[-4.1364,-3.9239],[-4.2317,-3.8629],[-4.3289,-3.8054],[-4.4277,-3.7511],[-4.5282,-3.6976],[-4.6305,-3.6422],[-4.7343,-3.5884],[-4.8397,-3.5404],[-4.9464,-3.4974],[-5.0543,-3.4546],[-5.1633,-3.4061],[-5.2733,-3.347],[-5.3842,-3.2752],[-5.4959,-3.1948],[-5.6085,-3.1096],[-5.722,-3.0191],[-5.8365,-2.9226],[-5.9521,-2.8199],[-6.0689,-2.7114],[-6.1867,-2.5976],[-6.3057,-2.4809],[-6.4264,-2.3635],[-6.549,-2.2463],[-6.6736,-2.1303],[-6.8003,-2.0164],[-6.9291,-1.905],[-7.0601,-1.7962],[-7.1933,-1.6895],[-7.329,-1.5836],[-7.4671,-1.4781],[-7.6078,-1.3731],[-7.7512,-1.2687],[-7.8971,-1.1679],[-8.0457,-1.076],[-8.1969,-0.9926],[-8.3517,-0.9128],[-8.5073,-0.8319],[-8.6665,-0.744],[-8.8284,-0.6491],[-8.9929,-0.5528],[-9.1601,-0.4569],[-9.3299,-0.3608],[-9.5024,-0.2641],[-9.6776,-0.1671],[-9.8554,-0.0701],[-10.0359,0.0264],[-10.219,0.1214],[-10.4047,0.2141],[-10.593,0.3037],[-10.784,0.3895],[-10.9775,0.4708],[-11.1736,0.5474],[-11.3723,0.6194],[-11.5735,0.6873],[-11.7773,0.7522],[-11.9836,0.8141],[-12.1924,0.8731],[-12.4037,0.9289],[-12.6174,0.9815],[-12.8337,1.0307],[-13.0523,1.0765],[-13.2733,1.1187],[-13.4964,1.1575],[-13.7216,1.1926],[-13.9491,1.2239],[-14.1789,1.2512],[-14.4111,1.2742],[-14.6459,1.2926],[-14.8834,1.3062],[-15.1237,1.3147],[-15.367,1.3177],[-15.6138,1.3152],[-15.859,1.3076],[-16.0769,1.2975]];
var QW = { W: 1280, H: 800, BOX: 420, AX: 1130, AY: 560, ORTHO: 6.4, FS: 400, COLS: 6, PER: 30,
  depart: { start: 0, n: 124, count: 247, fps: 36 },
  arrive: { start: 124, n: 91, count: 180, fps: 30 },
  look: { start: 215, n: 24, count: 48, fps: 24 },
  PERCHED: 239, PERCH: 240 };
var QW_LETTER = "Meet me at the marina at 8am for a sail.\nBring strong coffee.";

function qwFlight(delta, frame) {
  var W = QW.W, H = QW.H, box = QW.BOX, ax = QW.AX, ay = QW.AY;
  var mirror = ax < W / 2, ppu = box / QW.ORTHO;
  var travel = mirror ? W - ax : ax;
  var horizontal = Math.max(ppu, (travel + box * 0.65) / 16.076894);
  var vertical = Math.max(0, (ay - box * 0.36) / 4.701535);
  var t = Math.max(0, Math.min(1, (frame - 66) / 35));
  var blend = t * t * (3 - 2 * t);
  var xScale = ppu + (horizontal - ppu) * blend;
  var yScale = delta[1] < 0 ? ppu + (vertical - ppu) * blend : ppu;
  var exitT = Math.max(0, Math.min(1, (frame - 177) / 70));
  var exitBlend = exitT * exitT * (3 - 2 * exitT);
  var sideExitY = Math.min(H * 0.8, H - box * 0.3);
  var originalExitY = ay + 1.297465 * ppu;
  return { x: ax + delta[0] * xScale * (1 + 0.12 * exitBlend) * (mirror ? -1 : 1),
    y: ay + delta[1] * yScale + (sideExitY - originalExitY) * exitBlend, mirror: mirror, rotation: 0 };
}

function qwArrival(frame, count) {
  var W = QW.W, H = QW.H, box = QW.BOX, ax = QW.AX, ay = QW.AY;
  var t = Math.max(0, Math.min(1, (frame - 1) / (count - 1)));
  var mirror = ax < W / 2;
  var x = mirror ? W - ax : ax;
  var top = Math.max(box * 0.25, ay - box * 0.4);
  var low = Math.min(H - box * 0.5, Math.max(top + box * 0.16, ay - box * 0.08));
  var pts = [[0, -box * 0.65, Math.min(H * 0.06, top * 0.5)], [0.28, x * 0.32, low], [0.46, x * 0.76, top + (low - top) * 0.4], [0.58, x, top], [0.82, x, ay], [1, x, ay]];
  if (t >= 0.82) return { x: ax, y: ay, mirror: mirror, rotation: 0 };
  var index = 0;
  for (var i = 0; i < pts.length - 1; i++) { if (t <= pts[i + 1][0]) { index = i; break; } }
  var a = pts[index], b = pts[index + 1];
  var u = (t - a[0]) / (b[0] - a[0]), span = b[0] - a[0];
  function tangent(l, m, r, axis) { return (m[axis] - l[axis]) * (r[axis] - m[axis]) <= 0 ? 0 : (r[axis] - l[axis]) / (r[0] - l[0]); }
  function coord(axis, derivative) {
    var before = pts[Math.max(0, index - 1)], after = pts[Math.min(pts.length - 1, index + 2)];
    var m0 = index === 0 ? (b[axis] - a[axis]) / span : tangent(before, a, b, axis);
    var m1 = b[0] >= 0.82 ? 0 : tangent(a, b, after, axis);
    if (derivative) return ((6 * u * u - 6 * u) * a[axis] + (3 * u * u - 4 * u + 1) * span * m0 + (-6 * u * u + 6 * u) * b[axis] + (3 * u * u - 2 * u) * span * m1) / span;
    return (2 * u * u * u - 3 * u * u + 1) * a[axis] + (u * u * u - 2 * u * u + u) * span * m0 + (-2 * u * u * u + 3 * u * u) * b[axis] + (u * u * u - u * u) * span * m1;
  }
  var px = coord(1, false);
  var fade = Math.max(0, Math.min(1, (t - 0.35) / 0.3));
  var follow = 1 - fade * fade * (3 - 2 * fade);
  var rotation = Math.max(-0.35, Math.min(0.35, Math.atan2(coord(2, true), Math.max(1, coord(1, true))))) * follow;
  return { x: mirror ? W - px : px, y: coord(2, false), mirror: mirror, rotation: rotation };
}

/* ---- The page's own controller (no framework). ------------------------------------
   Story loop: writing (the letter types itself) → sealing → away (the raven departs,
   is gone a moment, then arrives) → returned (a reply waits) → writing again.
   Runs only while the desk is on screen; honours prefers-reduced-motion. */
(function () {
  'use strict';

  // Fit the fixed 1310×830 desk frame to whatever width it has.
  var scaler = document.getElementById('desk-scaler');
  function fit() {
    if (!scaler) return;
    var s = Math.min(1, scaler.clientWidth / 1310);
    scaler.style.setProperty('--desk-scale', String(s));
  }
  fit();
  window.addEventListener('resize', fit);

  var canvas = document.getElementById('qw-canvas');
  if (!canvas || !canvas.getContext) return;
  var el = {};
  ['status', 'body', 'placeholder', 'caret', 'count', 'awaiting', 'unopened', 'badge', 'seal'].forEach(function (k) {
    el[k] = document.getElementById('qw-' + k);
  });
  var reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var sheets = null, raf = 0;
  var story = { phase: 'writing', t: 0 };
  var bird = { mode: 'perched', t: 0, nextLook: 0 };
  var state = { phase: 'writing', typed: 0, awaiting: 0, unopened: 0 };

  function loadSheets() {
    if (sheets) return;
    sheets = QW_SHEETS.map(function (u) { var i = new Image(); i.decoding = 'async'; i.src = u; return i; });
  }

  function render() {
    var body = QW_LETTER.slice(0, state.typed), p = state.phase;
    el.body.textContent = body;
    el.placeholder.hidden = body.length !== 0;
    el.caret.hidden = p !== 'writing';
    el.count.textContent = body.length + ' characters';
    el.status.textContent = p === 'away' ? 'Your raven is away'
      : p === 'returned' ? 'A reply has arrived'
      : p === 'sealing' ? 'Sealing…' : 'Saved on this Mac';
    el.awaiting.textContent = state.awaiting ? String(state.awaiting) : '○';
    el.unopened.textContent = state.unopened ? String(state.unopened) : '○';
    el.badge.hidden = p !== 'returned';
    el.seal.classList.toggle('is-sealing', p === 'sealing');
  }
  function set(patch) { for (var k in patch) state[k] = patch[k]; render(); }

  function go(phase, now) {
    story = { phase: phase, t: now };
    if (phase === 'writing') set({ phase: phase, typed: 0, awaiting: 0, unopened: 0 });
    else if (phase === 'sealing') set({ phase: phase, typed: QW_LETTER.length });
    else if (phase === 'away') set({ phase: phase, typed: 0, awaiting: 1 });
    else if (phase === 'returned') set({ phase: phase, awaiting: 0, unopened: 1 });
  }
  function setBird(mode, now) { bird = { mode: mode, t: now, nextLook: now + 2500 + Math.random() * 2500 }; }
  function startSend() {
    if (story.phase !== 'writing') return;
    go('sealing', performance.now());
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    var s = story, e = now - s.t;
    if (s.phase === 'writing') {
      var n = Math.max(0, Math.min(QW_LETTER.length, Math.floor((e - 900) / 62)));
      if (n !== state.typed) set({ typed: n });
      if (e > 900 + QW_LETTER.length * 62 + 1600) go('sealing', now);
    } else if (s.phase === 'sealing') {
      if (e > 650) { go('away', now); setBird('depart', now); }
    } else if (s.phase === 'away') {
      if (bird.mode === 'gone' && now - bird.t > 2200) setBird('arrive', now);
      if (bird.mode === 'perched' && e > 1500) go('returned', now);
    } else if (s.phase === 'returned') {
      if (e > 6000) go('writing', now);
    }
    draw(now);
  }

  function blit(ctx, g, x, y, mirror, rot, alpha) {
    var sh = sheets && sheets[Math.floor(g / QW.PER)];
    if (!sh || !sh.complete || !sh.naturalWidth) return;
    var c = g % QW.PER, sx = (c % QW.COLS) * QW.FS, sy = Math.floor(c / QW.COLS) * QW.FS, b = QW.BOX;
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.translate(x, y);
    ctx.scale(mirror ? -1 : 1, 1);
    ctx.rotate(rot || 0);
    ctx.drawImage(sh, sx, sy, QW.FS, QW.FS, -b / 2, -b / 2, b, b);
    ctx.restore();
  }

  function draw(now) {
    var cv = canvas;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== QW.W * dpr) { cv.width = QW.W * dpr; cv.height = QW.H * dpr; }
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, QW.W, QW.H);
    var b = bird, e = now - b.t, ax = QW.AX, ay = QW.AY;
    blit(ctx, QW.PERCH, ax, ay, false, 0, 1);
    if (b.mode === 'perched') {
      blit(ctx, QW.PERCHED, ax, ay, false, 0, 1);
      if (!reduced && now > b.nextLook && story.phase !== 'sealing') setBird('look', now);
    } else if (b.mode === 'look') {
      var lf = Math.floor(e * QW.look.fps / 1000) + 1;
      if (lf > QW.look.count) { setBird('perched', now); blit(ctx, QW.PERCHED, ax, ay, false, 0, 1); }
      else blit(ctx, QW.look.start + Math.min(QW.look.n - 1, Math.floor((lf - 1) / 2)), ax, ay, false, 0, 1);
    } else if (b.mode === 'depart') {
      if (reduced) {
        var p = Math.min(1, e / 900);
        blit(ctx, QW.PERCHED, ax, ay, false, 0, 1 - p);
        if (p >= 1) setBird('gone', now);
        return;
      }
      var f = Math.max(1, Math.floor(e * QW.depart.fps / 1000) + 1);
      if (f > QW.depart.count) { setBird('gone', now); return; }
      var pos = qwFlight(QW_PATH[f - 1], f);
      blit(ctx, QW.depart.start + Math.min(QW.depart.n - 1, Math.floor((f - 1) / 2)), pos.x, pos.y, pos.mirror, 0, 1);
    } else if (b.mode === 'arrive') {
      if (reduced) {
        var q = Math.min(1, e / 900);
        blit(ctx, QW.PERCHED, ax, ay, false, 0, q);
        if (q >= 1) setBird('perched', now);
        return;
      }
      var af = Math.max(1, Math.floor(e * QW.arrive.fps / 1000) + 1);
      if (af > QW.arrive.count) { setBird('perched', now); blit(ctx, QW.PERCHED, ax, ay, false, 0, 1); return; }
      var ap = qwArrival(af, QW.arrive.count);
      blit(ctx, QW.arrive.start + Math.min(QW.arrive.n - 1, Math.round((af - 1) / 2)), ap.x, ap.y, ap.mirror, ap.rotation, 1);
    }
  }

  function start() {
    if (raf) return;
    loadSheets();
    var now = performance.now();
    story = { phase: 'writing', t: now };
    bird = { mode: 'perched', t: now, nextLook: now + 3500 };
    set({ phase: 'writing', typed: 0, awaiting: 0, unopened: 0 });
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  // Play only while the desk is on screen; a fresh loop each time it comes back.
  if ('IntersectionObserver' in window && scaler) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) start(); else stop(); });
    }, { threshold: 0.15 }).observe(scaler);
  } else {
    start();
  }

  // Pressing the wax seal on the desk sends the letter now.
  Array.prototype.forEach.call(document.querySelectorAll('[data-send]'), function (btn) {
    btn.addEventListener('click', startSend);
  });
})();
