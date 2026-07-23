/* ═══════════════════════════════════════════════════
   YouTube Demo — App Logic
   ═══════════════════════════════════════════════════ */

// ── VIDEO DATA ──
const VIDEOS = [
  {
    title: "Building a Mass AI Agent System From Scratch — Full Tutorial",
    channel: "Tech With Tim",
    channelInitial: "T",
    channelColor: "linear-gradient(135deg, #667eea, #764ba2)",
    views: "2.4M views",
    time: "3 weeks ago",
    duration: "42:17",
    progress: 65,
    verified: true,
    thumb: 0
  },
  {
    title: "I Survived 100 Days in a Nuclear Bunker in Minecraft",
    channel: "MrBeast",
    channelInitial: "M",
    channelColor: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    views: "184M views",
    time: "2 months ago",
    duration: "25:31",
    progress: 0,
    verified: true,
    thumb: 1
  },
  {
    title: "The Most Beautiful Places on Earth You've Never Heard Of",
    channel: "Wanderlust",
    channelInitial: "W",
    channelColor: "linear-gradient(135deg, #11998e, #38ef7d)",
    views: "8.1M views",
    time: "5 days ago",
    duration: "18:44",
    progress: 0,
    verified: false,
    thumb: 2
  },
  {
    title: "Why Quantum Computing Will Change Everything — Explained Simply",
    channel: "Kurzgesagt",
    channelInitial: "K",
    channelColor: "linear-gradient(135deg, #f7971e, #ffd200)",
    views: "12M views",
    time: "1 month ago",
    duration: "11:02",
    progress: 30,
    verified: true,
    thumb: 3
  },
  {
    title: "Cooking the Perfect Wagyu Steak at Home — Step by Step Guide",
    channel: "Joshua Weissman",
    channelInitial: "J",
    channelColor: "linear-gradient(135deg, #fc4a1a, #f7b733)",
    views: "5.7M views",
    time: "1 week ago",
    duration: "14:23",
    progress: 0,
    verified: true,
    thumb: 4
  },
  {
    title: "lofi hip hop radio 📚 beats to relax/study to",
    channel: "Lofi Girl",
    channelInitial: "L",
    channelColor: "linear-gradient(135deg, #ee9ca7, #ffdde1)",
    views: "956K watching",
    time: "LIVE",
    duration: "🔴 LIVE",
    progress: 0,
    verified: true,
    thumb: 5
  },
  {
    title: "How NASA Plans to Colonize Mars by 2040 — The Full Plan",
    channel: "Veritasium",
    channelInitial: "V",
    channelColor: "linear-gradient(135deg, #5f2c82, #49a09d)",
    views: "18M views",
    time: "3 months ago",
    duration: "22:08",
    progress: 100,
    verified: true,
    thumb: 6
  },
  {
    title: "I Tried Every AI Code Editor — Here's the Winner",
    channel: "Fireship",
    channelInitial: "F",
    channelColor: "linear-gradient(135deg, #ff512f, #f09819)",
    views: "3.2M views",
    time: "4 days ago",
    duration: "8:47",
    progress: 0,
    verified: true,
    thumb: 7
  },
  {
    title: "Full Stack Web Development Course 2026 — Zero to Hero",
    channel: "freeCodeCamp",
    channelInitial: "f",
    channelColor: "linear-gradient(135deg, #0a3d62, #38ada9)",
    views: "1.1M views",
    time: "2 weeks ago",
    duration: "11:42:05",
    progress: 12,
    verified: true,
    thumb: 8
  },
  {
    title: "Why You're Always Tired — The Science of Sleep Explained",
    channel: "Huberman Lab",
    channelInitial: "H",
    channelColor: "linear-gradient(135deg, #4b6cb7, #182848)",
    views: "9.4M views",
    time: "3 weeks ago",
    duration: "1:28:33",
    progress: 0,
    verified: true,
    thumb: 9
  },
  {
    title: "We Built a Treehouse City in the Jungle (Incredible Result)",
    channel: "Primitive Technology",
    channelInitial: "P",
    channelColor: "linear-gradient(135deg, #56ab2f, #a8e063)",
    views: "22M views",
    time: "6 months ago",
    duration: "32:11",
    progress: 80,
    verified: false,
    thumb: 10
  },
  {
    title: "The Dark Side of Social Media — Documentary 2026",
    channel: "VICE",
    channelInitial: "V",
    channelColor: "linear-gradient(135deg, #232526, #414345)",
    views: "6.8M views",
    time: "1 month ago",
    duration: "45:20",
    progress: 0,
    verified: true,
    thumb: 11
  }
];

// ── THUMBNAIL GENERATOR ──
// Generates visually appealing SVG thumbnails since we have no real images
function generateThumbnail(index) {
  const palettes = [
    ['#667eea','#764ba2','#a855f7'],
    ['#06b6d4','#3b82f6','#1e40af'],
    ['#10b981','#059669','#047857'],
    ['#f59e0b','#d97706','#b45309'],
    ['#ef4444','#f97316','#fbbf24'],
    ['#ec4899','#a855f7','#6366f1'],
    ['#1e3a5f','#3b82f6','#93c5fd'],
    ['#f43f5e','#fb923c','#fbbf24'],
    ['#0d9488','#06b6d4','#67e8f9'],
    ['#7c3aed','#a78bfa','#c4b5fd'],
    ['#16a34a','#84cc16','#d9f99d'],
    ['#334155','#64748b','#94a3b8']
  ];

  const icons = [
    // AI/Code
    `<g transform="translate(160,80) scale(3)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="rgba(255,255,255,.9)"/></g>`,
    // Play
    `<g transform="translate(150,70) scale(4)"><path d="M8 5v14l11-7z" fill="rgba(255,255,255,.9)"/></g>`,
    // Globe
    `<g transform="translate(150,70) scale(4)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="rgba(255,255,255,.85)"/></g>`,
    // Science
    `<g transform="translate(155,75) scale(3.5)"><path d="M13 3c0-.55-.45-1-1-1s-1 .45-1 1v6.6l-6.44 9.66C3.96 20.16 4.62 21.5 5.72 21.5h12.56c1.1 0 1.76-1.34 1.16-2.24L13 9.6V3z" fill="rgba(255,255,255,.85)"/></g>`,
    // Fire (cooking)
    `<g transform="translate(155,75) scale(3.5)"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="rgba(255,255,255,.9)"/></g>`,
    // Music
    `<g transform="translate(155,75) scale(3.5)"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="rgba(255,255,255,.9)"/></g>`,
    // Rocket
    `<g transform="translate(152,72) scale(3.5)"><path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-12.75 4.5-12.75S14.14-.36 8.74 5.04C6.59 7.19 5.04 10.93 5.04 10.93l6.13 6.07zM18.5 5.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM5.65 14.81s.59 2.3 2.73 4.44l-.48.48c-.78.78-2.05.78-2.83 0l-2.12-2.12a2 2 0 0 1 0-2.83l.48-.48 2.22.51z" fill="rgba(255,255,255,.85)"/></g>`,
    // Lightning (fast)
    `<g transform="translate(158,72) scale(3.8)"><path d="M7 2v11h3v9l7-12h-4l4-8z" fill="rgba(255,255,255,.95)"/></g>`,
    // Code
    `<g transform="translate(148,75) scale(3.5)"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="rgba(255,255,255,.9)"/></g>`,
    // Brain
    `<g transform="translate(155,75) scale(3.5)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" fill="rgba(255,255,255,.85)"/></g>`,
    // Tree
    `<g transform="translate(155,72) scale(3.5)"><path d="M18 10h-3l3-7H6l3 7H6l5 10v4h2v-4l5-10z" fill="rgba(255,255,255,.85)"/></g>`,
    // Eye
    `<g transform="translate(152,78) scale(3.5)"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="rgba(255,255,255,.85)"/></g>`
  ];

  const p = palettes[index % palettes.length];
  const icon = icons[index % icons.length];

  // Decorative shapes
  const shapes = `
    <circle cx="50" cy="40" r="60" fill="${p[1]}" opacity=".18"/>
    <circle cx="300" cy="150" r="80" fill="${p[2]}" opacity=".15"/>
    <rect x="260" y="10" width="80" height="80" rx="20" fill="${p[0]}" opacity=".12" transform="rotate(25 300 50)"/>
    <circle cx="80" cy="160" r="30" fill="${p[2]}" opacity=".22"/>
  `;

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200">
    <defs>
      <linearGradient id="bg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p[0]}"/>
        <stop offset="100%" stop-color="${p[1]}"/>
      </linearGradient>
    </defs>
    <rect width="360" height="200" fill="url(#bg${index})"/>
    ${shapes}
    ${icon}
  </svg>`)}`;
}

// ── RENDER VIDEO CARDS ──
function renderVideos() {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = '';

  VIDEOS.forEach((video, i) => {
    const card = document.createElement('article');
    card.className = 'video-card';
    card.style.animationDelay = `${i * 0.06}s`;
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const isLive = video.duration.includes('LIVE');

    card.innerHTML = `
      <div class="thumbnail-wrapper">
        <img src="${generateThumbnail(video.thumb)}" alt="${video.title}" loading="lazy" />
        <span class="thumbnail-time${isLive ? ' live-badge' : ''}">${video.duration}</span>
        ${video.progress > 0 ? `
          <div class="thumbnail-progress">
            <div class="thumbnail-progress-bar" style="width:${video.progress}%"></div>
          </div>` : ''}
      </div>
      <div class="video-info">
        <div class="channel-avatar" style="background:${video.channelColor}">${video.channelInitial}</div>
        <div class="video-meta">
          <h3 class="video-title">${video.title}</h3>
          <div class="channel-name">
            ${video.channel}
            ${video.verified ? `<span class="verified-badge"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z"/></svg></span>` : ''}
          </div>
          <div class="video-stats">${video.views} · ${video.time}</div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ── CHIP FILTER ──
function initChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

// ── SIDEBAR TOGGLE ──
function initSidebar() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// ── SEARCH INTERACTION ──
function initSearch() {
  const form = document.getElementById('search-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
      // Visual feedback only
      const btn = document.getElementById('search-btn');
      btn.style.background = 'var(--bg-active)';
      setTimeout(() => btn.style.background = '', 300);
    }
  });
}

// ── LIVE BADGE STYLE ──
function addLiveBadgeStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .live-badge {
      background: var(--accent) !important;
      animation: livePulse 2s ease-in-out infinite;
    }
    @keyframes livePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .75; }
    }
  `;
  document.head.appendChild(style);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  addLiveBadgeStyle();
  renderVideos();
  initChips();
  initSidebar();
  initSearch();
});
