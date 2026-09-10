class ProgressManager {
  constructor() {
    this.storageKey = 'typehero_player_progress';
    this.progress = this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {
      unlockedLevels: [1],
      stars: {},
      totalScore: 0,
      rewardsUnlocked: ['🤖']
    };
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  getPoints() {
    return this.progress.totalScore;
  }

  addPoints(points) {
    this.progress.totalScore += points;
    this.saveProgress();
  }

  isUnlocked(itemId) {
    return this.progress.rewardsUnlocked.includes(itemId);
  }

  savePurchase(itemId, remainingPoints) {
    this.progress.totalScore = remainingPoints;
    if (!this.progress.rewardsUnlocked.includes(itemId)) {
      this.progress.rewardsUnlocked.push(itemId);
    }
    this.saveProgress();
  }

  saveLevelResult(levelId, starsCount, score) {
    this.progress.stars[levelId] = Math.max(this.progress.stars[levelId] || 0, starsCount);
    this.progress.totalScore += score;

    const nextLevel = levelId + 1;
    if (!this.progress.unlockedLevels.includes(nextLevel)) {
      this.progress.unlockedLevels.push(nextLevel);
    }
    this.saveProgress();
  }

  isLevelUnlocked(levelId) {
    return this.progress.unlockedLevels.includes(levelId);
  }
}