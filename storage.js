// storage.js - LocalStorage Management
export const Storage = {
  saveScore: (scoreData) => {
    const leaderboard = JSON.parse(localStorage.getItem('quizflow_leaderboard') || '[]');
    leaderboard.push({
      ...scoreData,
      date: new Date().toLocaleDateString()
    });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('quizflow_leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
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