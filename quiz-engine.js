// quiz-engine.js - Core Quiz Engine
// (Previously named quiz-login.js — renamed because this file has always
// contained the quiz question/timer/scoring engine, not login logic.)
import QUIZ_QUESTIONS from './questions.js';
import { Storage } from './storage.js';

const SECONDS_PER_QUESTION = 30;
const QUESTIONS_PER_QUIZ = 10;

class QuizEngine {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.currentIndex = 0;
    this.timeLeft = SECONDS_PER_QUESTION;
    this.timerInterval = null;
    this.category = null;

    // UI hooks — assign these from the page that uses the engine.
    this.onTick = null;          // (secondsLeft) => void
    this.onQuestionChange = null; // () => void
    this.onFinish = null;        // (result) => void
  }

  start(category, count = QUESTIONS_PER_QUIZ) {
    const pool = QUIZ_QUESTIONS.filter(q => category === 'mixed' || q.category === category);
    this.questions = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    this.answers = this.questions.map(() => ({ selected: null }));
    this.currentIndex = 0;
    this.category = category;
    this._startTimer();
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  get currentAnswer() {
    return this.answers[this.currentIndex];
  }

  get total() {
    return this.questions.length;
  }

  _startTimer() {
    this.timeLeft = SECONDS_PER_QUESTION;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.onTick) this.onTick(this.timeLeft);
      if (this.timeLeft <= 0) {
        this.next();
      }
    }, 1000);
    if (this.onTick) this.onTick(this.timeLeft);
  }

  selectAnswer(optionIndex) {
    this.answers[this.currentIndex].selected = optionIndex;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this._startTimer();
      if (this.onQuestionChange) this.onQuestionChange();
    } else {
      this.finish();
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this._startTimer();
      if (this.onQuestionChange) this.onQuestionChange();
    }
  }

  skip() {
    this.answers[this.currentIndex].selected = null;
    this.next();
  }

  finish() {
    clearInterval(this.timerInterval);
    let correct = 0, wrong = 0, skipped = 0;
    this.questions.forEach((q, i) => {
      const selected = this.answers[i].selected;
      if (selected === null || selected === undefined) skipped++;
      else if (selected === q.correct) correct++;
      else wrong++;
    });
    const total = this.questions.length;
    const score = correct * 10;
    const percentage = total ? Math.round((correct / total) * 100) : 0;

    const result = { score, correct, wrong, skipped, total, percentage, category: this.category };
    Storage.saveScore(result);
    if (this.onFinish) this.onFinish(result);
    return result;
  }

  stop() {
    clearInterval(this.timerInterval);
  }
}

export default new QuizEngine();
