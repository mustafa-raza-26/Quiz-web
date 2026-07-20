// leaderboard.js - Renders the leaderboard table from real local quiz history
// (plus a few sample competitor rows for visual flavor, since this leaderboard
// is stored per-browser via localStorage rather than on a real backend).
import { Storage } from './storage.js';

const SAMPLE_COMPETITORS = [
  { name: 'Elena Vance', initials: 'EV', score: 12450, percentage: 98, date: 'Oct 24, 2024' },
  { name: 'Marcus Chen', initials: 'MC', score: 11920, percentage: 95, date: 'Oct 22, 2024' },
  { name: 'Sarah Jenkins', initials: 'SJ', score: 10800, percentage: 92, date: 'Oct 21, 2024' },
  { name: 'John Doe', initials: 'JD', score: 8200, percentage: 85, date: 'Oct 20, 2024' }
];

const RANK_STYLES = {
  1: { icon: 'rank-gold', label: 'rank-gold' },
  2: { icon: 'rank-silver', label: 'rank-silver' },
  3: { icon: 'rank-bronze', label: 'rank-bronze' }
};

const tbody = document.getElementById('leaderboard-body');
const yourRankEl = document.getElementById('your-rank');
const yourRankSubEl = document.getElementById('your-rank-sub');

function buildRows() {
  const real = Storage.getLeaderboard().map(r => ({
    name: 'You',
    score: r.score,
    percentage: r.percentage,
    date: r.date,
    category: r.category,
    isYou: true
  }));

  const combined = [...SAMPLE_COMPETITORS.map(c => ({ ...c, isYou: false })), ...real];
  combined.sort((a, b) => b.score - a.score);
  return combined;
}

function rowHtml(entry, rank) {
  const style = RANK_STYLES[rank];
  const rankCell = style
    ? `<div class="flex items-center gap-2">
         <span class="material-symbols-outlined ${style.icon} text-2xl" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
         <span class="font-bold text-lg ${style.label}">${rank}</span>
       </div>`
    : `<div class="font-bold text-lg pl-8 ${entry.isYou ? '' : 'text-on-surface-variant'}">${rank}</div>`;

  const avatar = entry.isYou
    ? `<div class="w-10 h-10 rounded-full border-2 border-primary overflow-hidden ring-4 ring-primary/20 bg-primary/20 flex items-center justify-center font-bold text-primary">Y</div>`
    : `<div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold border border-white/5">${entry.initials || '?'}</div>`;

  const nameCell = entry.isYou
    ? `<div class="font-bold text-primary flex items-center gap-2">You
         <span class="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
       </div>`
    : `<div class="font-medium${rank > 3 ? ' text-on-surface-variant' : ''}">${entry.name}</div>`;

  const scoreClass = rank <= 3 || entry.isYou ? 'font-mono text-primary font-bold' : 'font-mono text-on-surface-variant';
  const barClass = rank <= 3 || entry.isYou ? 'bg-primary' : 'bg-primary/40';

  const tr = document.createElement('tr');
  tr.className = entry.isYou ? 'user-highlight group' : 'glass-card-hover group';
  tr.innerHTML = `
    <td class="px-6 py-6">${rankCell}</td>
    <td class="px-6 py-6">
      <div class="flex items-center gap-3">
        ${avatar}
        ${nameCell}
      </div>
    </td>
    <td class="px-6 py-6 ${scoreClass}">${entry.score.toLocaleString()}</td>
    <td class="px-6 py-6">
      <div class="flex items-center gap-2">
        <div class="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full ${barClass}" style="width: ${entry.percentage}%"></div>
        </div>
        <span${rank > 3 && !entry.isYou ? ' class="text-on-surface-variant"' : ''}>${entry.percentage}%</span>
      </div>
    </td>
    <td class="px-6 py-6 text-right text-on-surface-variant">${entry.date}</td>
  `;
  return tr;
}

function render() {
  const rows = buildRows();
  tbody.innerHTML = '';
  rows.forEach((entry, i) => tbody.appendChild(rowHtml(entry, i + 1)));

  const yourBestRank = rows.findIndex(r => r.isYou);
  if (yourBestRank === -1) {
    yourRankEl.textContent = '—';
    yourRankSubEl.textContent = 'Play a quiz to get ranked';
  } else {
    yourRankEl.textContent = `#${yourBestRank + 1}`;
    const topPct = Math.max(1, Math.round(((yourBestRank + 1) / rows.length) * 100));
    yourRankSubEl.textContent = `Top ${topPct}% of this leaderboard`;
  }
}

render();

// Clear-leaderboard modal
const clearBtn = document.getElementById('clear-btn');
const modal = document.getElementById('clear-modal');
const cancelBtn = document.getElementById('cancel-clear');
const confirmBtn = document.getElementById('confirm-clear');

clearBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

confirmBtn.addEventListener('click', () => {
  Storage.clearLeaderboard();
  render();
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
});