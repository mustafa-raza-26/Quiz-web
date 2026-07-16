// test.js - Wires the Assessment page (test.html) to the quiz engine.
import quizEngine from './quiz-engine.js';

const CATEGORY_LABELS = {
  html: 'HTML5 Mastery',
  css: 'Styling & Layouts',
  js: 'JavaScript Core',
  programming: 'Algorithms',
  general: 'Global IQ',
  mixed: 'Mixed Gauntlet'
};

const DIFFICULTY_STYLES = {
  easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  medium: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  hard: 'bg-error/10 text-error border-error/20'
};

const params = new URLSearchParams(window.location.search);
const category = params.get('category') || 'mixed';

const topicLabel = document.getElementById('topic-label');
const progressLabel = document.getElementById('progress-label');
const progressBar = document.getElementById('progress-bar');
const difficultyBadge = document.getElementById('difficulty-badge');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const countdown = document.getElementById('countdown');
const timerContainer = document.getElementById('timer-container');
const prevBtn = document.getElementById('prev-btn');
const skipBtn = document.getElementById('skip-btn');
const nextBtn = document.getElementById('next-btn');
const nextBtnLabel = document.getElementById('next-btn-label');

topicLabel.textContent = CATEGORY_LABELS[category] || 'Mixed Gauntlet';

function optionLetter(i) {
  return String.fromCharCode(65 + i);
}

function createRipple(button) {
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = '0px';
  circle.style.top = '0px';
  circle.classList.add('ripple-effect');
  const existing = button.getElementsByClassName('ripple-effect')[0];
  if (existing) existing.remove();
  button.appendChild(circle);
}

function renderQuestion() {
  const q = quizEngine.currentQuestion;
  if (!q) return;

  progressLabel.textContent = `Question ${quizEngine.currentIndex + 1} of ${quizEngine.total}`;
  progressBar.style.width = `${((quizEngine.currentIndex) / quizEngine.total) * 100}%`;

  difficultyBadge.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
  difficultyBadge.className = `px-3 py-1 rounded-full text-sm font-bold border ${DIFFICULTY_STYLES[q.difficulty] || DIFFICULTY_STYLES.medium}`;

  questionText.textContent = q.question;

  const selected = quizEngine.currentAnswer.selected;
  optionsContainer.innerHTML = '';
  q.options.forEach((optionText, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-tile ripple w-full text-left p-5 rounded-lg border border-white/10 flex items-center gap-4 group' + (selected === i ? ' selected-tile' : '');
    btn.setAttribute('role', 'radio');
    btn.setAttribute('tabindex', '0');

    const indicator = document.createElement('span');
    indicator.className = 'w-10 h-10 flex items-center justify-center rounded-full border font-bold transition-colors ' +
      (selected === i ? 'bg-primary text-on-primary border-primary' : 'bg-white/5 border-white/10 group-hover:border-primary/50');
    indicator.textContent = optionLetter(i);

    const label = document.createElement('span');
    label.className = 'flex-grow';
    label.textContent = optionText;

    btn.appendChild(indicator);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      quizEngine.selectAnswer(i);
      createRipple(btn);
      renderQuestion();
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    optionsContainer.appendChild(btn);
  });

  prevBtn.disabled = quizEngine.currentIndex === 0;
  nextBtnLabel.textContent = quizEngine.currentIndex === quizEngine.total - 1 ? 'Finish Quiz' : 'Next Question';
}

quizEngine.onTick = (secondsLeft) => {
  const clamped = Math.max(secondsLeft, 0);
  const seconds = clamped < 10 ? `0${clamped}` : `${clamped}`;
  countdown.textContent = `00:${seconds}`;
  if (clamped <= 10) {
    countdown.classList.add('timer-pulse', 'text-error');
  } else {
    countdown.classList.remove('timer-pulse', 'text-error');
  }
};

quizEngine.onQuestionChange = renderQuestion;

const quizView = document.getElementById('quiz-view');
const resultsView = document.getElementById('results-view');
const resultsIcon = document.getElementById('results-icon');
const resultsTopic = document.getElementById('results-topic');
const resultsHeadline = document.getElementById('results-headline');
const resultsSubtext = document.getElementById('results-subtext');
const resultsScore = document.getElementById('results-score');
const resultsCorrect = document.getElementById('results-correct');
const resultsWrong = document.getElementById('results-wrong');
const resultsSkipped = document.getElementById('results-skipped');
const resultsAccuracy = document.getElementById('results-accuracy');
const resultsAccuracyBar = document.getElementById('results-accuracy-bar');

function headlineFor(percentage) {
  if (percentage >= 90) return { text: 'Outstanding!', icon: 'emoji_events' };
  if (percentage >= 70) return { text: 'Great job!', icon: 'workspace_premium' };
  if (percentage >= 50) return { text: 'Nice effort!', icon: 'thumb_up' };
  return { text: 'Keep practicing!', icon: 'auto_stories' };
}

quizEngine.onFinish = (result) => {
  progressBar.style.width = '100%';
  countdown.textContent = '00:00';

  quizView.classList.add('hidden');
  resultsView.classList.remove('hidden');

  const { text, icon } = headlineFor(result.percentage);
  resultsIcon.textContent = icon;
  resultsTopic.textContent = `${CATEGORY_LABELS[category] || 'Mixed Gauntlet'} • Quiz Complete`;
  resultsHeadline.textContent = text;
  resultsSubtext.textContent = `You answered ${result.correct} out of ${result.total} questions correctly.`;
  resultsScore.textContent = result.score;
  resultsCorrect.textContent = result.correct;
  resultsWrong.textContent = result.wrong;
  resultsSkipped.textContent = result.skipped;
  resultsAccuracy.textContent = result.percentage;
  resultsAccuracyBar.style.width = `${result.percentage}%`;
};

prevBtn.addEventListener('click', () => quizEngine.previous());
skipBtn.addEventListener('click', () => quizEngine.skip());
nextBtn.addEventListener('click', () => quizEngine.next());

quizEngine.start(category);
renderQuestion();
