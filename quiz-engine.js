// quiz-engine.js - Core Quiz Engine
// (Previously named quiz-login.js — renamed because this file has always
// contained the quiz question/timer/scoring engine, not login logic.)
//
// Timer model: ONE overall countdown for the whole quiz, not a per-question
// timer. Total time = number of questions * SECONDS_PER_QUESTION (e.g. a
// 10-question quiz gets 10 * 30s = 5 minutes total; a 2-question quiz gets
// just 1 minute). Moving between questions does not reset or pause the
// timer — it keeps counting down from quiz start. When it reaches 0 the
// quiz stops immediately and the results are shown, regardless of how many
// questions were actually answered.
import QUIZ_QUESTIONS from './questions.js';
import { Storage } from './storage.js';

const SECONDS_PER_QUESTION = 30;
const QUESTIONS_PER_QUIZ = 10;

class QuizEngine {
  constructor() {
    this.questions = [];
    this.answers = [];
    this.currentIndex = 0;
    this.timeLeft = 0;
    this.totalTime = 0;
    this.timerInterval = null;
    this.category = null;
    this.finished = false;

    // UI hooks — assign these from the page that uses the engine.
    this.onTick = null;          // (secondsLeft, totalTime) => void
    this.onQuestionChange = null; // () => void
    this.onFinish = null;        // (result) => void
  }

  start(category, count = QUESTIONS_PER_QUIZ) {
    const pool = QUIZ_QUESTIONS.filter(q => category === 'mixed' || q.category === category);
    this.questions = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    this.answers = this.questions.map(() => ({ selected: null }));
    this.currentIndex = 0;
    this.category = category;
    this.finished = false;
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
    this.totalTime = this.questions.length * SECONDS_PER_QUESTION;
    this.timeLeft = this.totalTime;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.onTick) this.onTick(this.timeLeft, this.totalTime);
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        if (this.onTick) this.onTick(this.timeLeft, this.totalTime);
        this.finish();
      }
    }, 1000);
    if (this.onTick) this.onTick(this.timeLeft, this.totalTime);
  }

  selectAnswer(optionIndex) {
    this.answers[this.currentIndex].selected = optionIndex;
  }

  // Moves to the next question WITHOUT touching the overall timer.
  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      if (this.onQuestionChange) this.onQuestionChange();
    } else {
      this.finish();
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      if (this.onQuestionChange) this.onQuestionChange();
    }
  }

  skip() {
    this.answers[this.currentIndex].selected = null;
    this.next();
  }

  finish() {
    if (this.finished) return this._lastResult;
    this.finished = true;
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
    this._lastResult = result;
    Storage.saveScore(result);
    if (this.onFinish) this.onFinish(result);
    return result;
  }

  stop() {
    clearInterval(this.timerInterval);
  }
}

export default new QuizEngine();