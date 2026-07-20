// storage.js - LocalStorage Management
export const Storage = {
  saveScore: (scoreData) => {
    const leaderboard = JSON.parse(localStorage.getItem('quizflow_leaderboard') || '[]');
    leaderboard.push({
      ...scoreData,
      date: new Date().toLocaleDateString()
    });
    // Keep the complete quiz history (every attempt), not just the top 10 scores.
    localStorage.setItem('quizflow_leaderboard', JSON.stringify(leaderboard));
  },
  getLeaderboard: () => {
    return JSON.parse(localStorage.getItem('quizflow_leaderboard') || '[]');
  },
  clearLeaderboard: () => {
    localStorage.removeItem('quizflow_leaderboard');
  },
  saveSettings: (settings) => {
    localStorage.setItem('quizflow_settings', JSON.stringify(settings));
  },
  getSettings: () => {
    return JSON.parse(localStorage.getItem('quizflow_settings') || '{"darkMode": true, "sound": true, "difficulty": "medium"}');
  },
  saveUser: (user) => {
    localStorage.setItem('quizflow_user', JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem('quizflow_user') || 'null');
  }
};