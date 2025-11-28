document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-btn');
  const overlay = document.getElementById('overlay');
  const popupArea = document.getElementById('popup-area');

  confirmBtn.addEventListener('click', () => {
    // 隐藏初始弹窗，进入空白界面
    overlay.style.display = 'none';
    popupArea.setAttribute('aria-hidden', 'false');
    // 背景使用深色渐变以衬托烟花效果
    document.body.style.background = 'linear-gradient(180deg, #0b1023 0%, #090d20 100%)';

    startFireworks();
    startBlessingSequence();
  });
});

function startBlessingSequence() {
  const total = 30; // 约30个弹窗

  const genericBlessings = [
    '愿你笑容常在，心事都甜。',
    '愿你被温柔以待，万事顺意。',
    '愿你如星闪耀，自带光芒。',
    '愿你健康快乐，越活越精彩。',
    '愿你所有等待，都有回应。',
    '愿你生活明朗，未来可期。',
    '愿你被世界温柔相拥。',
    '愿你不负自己，优雅从容。',
    '愿你心里有爱，眼里有光。',
    '愿你被喜欢包围，被关心环绕。',
    '愿你所愿皆得，所行皆坦。',
    '愿你心境澄澈，笑意不减。',
    '愿你梦都成真，愿你所爱可达。',
    '愿你年年有今日，岁岁有今朝。',
    '愿你热爱永在，温柔长存。',
    '愿你可爱如初，幸运常伴。',
    '愿你不惧风雨，永远漂亮。',
    '愿你自信闪耀，明媚动人。',
    '愿你被世界珍藏，被时光偏爱。',
    '愿你心之所向，步履不停。',
    '愿你被花朵簇拥，被星辰眷顾。',
    '愿你所遇皆良人，所行皆坦途。',
    '愿你眉目带笑，心中有光。',
    '愿你眼底星河，岁月温柔。',
    '愿你所有热爱，都有回响。',
    '愿你气质如兰，温婉动人。',
    '愿你快乐不止，好运常至。',
    '愿你被温柔守护，被幸运收藏。',
    '愿你一切如愿，万事胜意。',
    '愿你如风自由，如光明亮。',
    // 新增20条祝福
    '愿你可爱与智慧并存，光彩夺目。',
    '愿你永远被世界温柔相待。',
    '愿你对镜笑时，连星星都嫉妒。',
    '愿你眼里有星河，心里有山海。',
    '愿你走过的路，都开满鲜花。',
    '愿你所想皆成，所盼皆至。',
    '愿你眉间不染忧愁，心底常住晴空。',
    '愿你有鲜花般的笑，有月亮般的温柔。',
    '愿你桃花不散，春风如故。',
    '愿你被好运围绕，被爱包裹。',
    '愿你惊艳岁月，温柔了时光。',
    '愿你与美好撞个满怀。',
    '愿你逆风也能飞翔，笑对风浪。',
    '愿你所有心事都有光照。',
    '愿你被时间温柔以待，不负流年。',
    '愿你每一步都踩在彩虹上。',
    '愿你永远优雅，永远被爱。',
    '愿你把烦恼丢进海里，只留笑意。',
    '愿你此生灿烂，万事顺心。',
    '愿你星河长明，热爱不灭。'
  ];

  // 随机挑选一个索引作为特别弹窗
  const specialIndex = Math.floor(Math.random() * total);

  let indexGeneric = 0;
  for (let i = 0; i < total; i++) {
    const isSpecial = i === specialIndex;
    const text = isSpecial ? '暗恋LZX~' : genericBlessings[indexGeneric++ % genericBlessings.length];

    // 以随机间隔依次弹出
    const delay = 400 + (i * 220) + Math.floor(Math.random() * 600);
    setTimeout(() => {
      const p = createPopup(text, isSpecial);
      addMeteorsToPopup(p);
    }, delay);
  }
}

function createPopup(message, isSpecial) {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const header = document.createElement('div');
  header.className = 'popup-header';

  const icon = document.createElement('img');
  icon.className = 'popup-icon';
  // 特别弹窗使用 780.jpeg，普通弹窗使用 OIP.jpg
  icon.src = isSpecial ? 'src/780.jpeg' : 'src/OIP.jpg';


  const title = document.createElement('div');
  title.className = 'popup-title';
  title.textContent = isSpecial ? 'Surprise' : '提示';

  header.appendChild(icon);
  header.appendChild(title);

  const body = document.createElement('div');
  body.className = 'popup-body';
  body.textContent = message;

  popup.appendChild(header);
  popup.appendChild(body);
  // 背景流星层
  const meteorLayer = document.createElement('div');
  meteorLayer.className = 'popup-meteors';
  popup.appendChild(meteorLayer);
  document.body.appendChild(popup);

  // 计算随机位置（不超出视口）
  // 先让元素渲染以获取尺寸
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const rect = popup.getBoundingClientRect();
  const maxLeft = Math.max(0, vw - rect.width - 10);
  const maxTop = Math.max(0, vh - rect.height - 10);
  const left = Math.floor(Math.random() * (maxLeft + 1));
  const top = Math.floor(Math.random() * (maxTop + 1));

  popup.style.left = left + 'px';
  popup.style.top = top + 'px';

  // 入场动画
  requestAnimationFrame(() => popup.classList.add('show'));
  return popup;
}

// 为弹窗添加若干动态流星
function addMeteorsToPopup(popup) {
  const layer = popup.querySelector('.popup-meteors');
  if (!layer) return;
  const rect = popup.getBoundingClientRect();
  const count = 3 + Math.floor(Math.random() * 3); // 3~5颗
  for (let i = 0; i < count; i++) {
    const m = document.createElement('div');
    m.className = 'meteor';
    const sx = Math.floor(Math.random() * (rect.width - 40));
    const sy = Math.floor(Math.random() * (rect.height - 40));
    const dur = (1.8 + Math.random() * 1.8).toFixed(2) + 's';
    const delay = (-Math.random() * 2).toFixed(2) + 's';
    m.style.setProperty('--sx', sx + 'px');
    m.style.setProperty('--sy', sy + 'px');
    m.style.setProperty('--dur', dur);
    m.style.animationDelay = delay;
    layer.appendChild(m);
  }
}

// 主背景烟花特效
function startFireworks() {
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworks-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let particles = [];
  function burst(x, y, hue) {
    const n = 28 + Math.floor(Math.random() * 12);
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n;
      const speed = 2.2 + Math.random() * 2.8;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 60 + Math.floor(Math.random() * 30), alpha: 1, hue });
    }
  }

  function spawn() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
    const hue = Math.floor(Math.random() * 360);
    burst(x, y, hue);
  }

  let lastSpawn = 0;
  function tick(ts) {
    if (!lastSpawn || ts - lastSpawn > 450) { spawn(); lastSpawn = ts; }

    // 残影与叠加光效
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    const next = [];
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy + 0.02; // 微重力
      p.vx *= 0.992; p.vy *= 0.992; p.life -= 1;
      p.alpha = Math.max(0, p.life / 80);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
      ctx.fill();
      if (p.life > 0) next.push(p);
    }
    particles = next;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}