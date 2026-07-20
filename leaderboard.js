// leaderboard.js - Renders YOUR quiz history (every quiz you've taken, with
// its category and the score you got). Pulled entirely from local storage —
// no sample/fake rows anymore, this is a personal history, not a global list.
import { Storage } from './storage.js';

const CATEGORY_LABELS = {
  html: 'HTML5 Mastery',
  css: 'Styling & Layouts',
  js: 'JavaScript Core',
  programming: 'Algorithms',
  general: 'Global IQ',
  mixed: 'Mixed Gauntlet'
};

const RANK_STYLES = {
  1: { icon: 'rank-gold', label: 'rank-gold' },
  2: { icon: 'rank-silver', label: 'rank-silver' },
  3: { icon: 'rank-bronze', label: 'rank-bronze' }
};

const tbody = document.getElementById('leaderboard-body');
const yourRankEl = document.getElementById('your-rank');
const yourRankSubEl = document.getElementById('your-rank-sub');

function buildRows() {
  const rows = Storage.getLeaderboard();
  // Best score first, so your top quiz attempt shows up at rank #1.
  return [...rows].sort((a, b) => b.score - a.score);
}

function rowHtml(entry, rank) {
  const style = RANK_STYLES[rank];
  const rankCell = style
    ? `<div class="flex items-center gap-2">
         <span class="material-symbols-outlined ${style.icon} text-2xl" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
         <span class="font-bold text-lg ${style.label}">${rank}</span>
       </div>`
    : `<div class="font-bold text-lg pl-8 text-on-surface-variant">${rank}</div>`;

  const quizLabel = CATEGORY_LABELS[entry.category] || 'Mixed Gauntlet';
  const quizCell = `
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <span class="material-symbols-outlined text-[20px]">quiz</span>
      </div>
      <div class="font-medium">${quizLabel}</div>
    </div>`;

  const scoreClass = rank <= 3 ? 'font-mono text-primary font-bold' : 'font-mono text-on-surface-variant';
  const barClass = rank <= 3 ? 'bg-primary' : 'bg-primary/40';

  const tr = document.createElement('tr');
  tr.className = 'glass-card-hover group';
  tr.innerHTML = `
    <td class="px-6 py-6">${rankCell}</td>
    <td class="px-6 py-6">${quizCell}</td>
    <td class="px-6 py-6 ${scoreClass}">${entry.score.toLocaleString()}</td>
    <td class="px-6 py-6">
      <div class="flex items-center gap-2">
        <div class="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full ${barClass}" style="width: ${entry.percentage}%"></div>
        </div>
        <span${rank > 3 ? ' class="text-on-surface-variant"' : ''}>${entry.percentage}%</span>
      </div>
    </td>
    <td class="px-6 py-6 text-right text-on-surface-variant">${entry.date}</td>
  `;
  return tr;
}

function emptyStateHtml() {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="px-6 py-16 text-center text-on-surface-variant" colspan="5">
      <span class="material-symbols-outlined text-4xl block mb-2 opacity-50">quiz</span>
      You haven't taken a quiz yet. Play one to see your history here.
    </td>
  `;
  return tr;
}

function render() {
  const rows = buildRows();
  tbody.innerHTML = '';

  if (rows.length === 0) {
    tbody.appendChild(emptyStateHtml());
    yourRankEl.textContent = '—';
    yourRankSubEl.textContent = 'Play a quiz to get ranked';
    return;
  }

  rows.forEach((entry, i) => tbody.appendChild(rowHtml(entry, i + 1)));

  const best = rows[0];
  yourRankEl.textContent = `${best.score.toLocaleString()}`;
  yourRankSubEl.textContent = `Best score across ${rows.length} quiz${rows.length === 1 ? '' : 'zes'} taken`;
}

render();

// Clear-history modal
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