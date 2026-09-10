class KeyboardEngine {
  constructor(currentLevelData, voiceEngine) {
    this.level = currentLevelData;
    this.voice = voiceEngine;
    this.targetSequence = [];
    this.currentIndex = 0;
    this.errorsCount = 0;
  }

  loadSequence(sequence) {
    this.targetSequence = sequence.split('');
    this.currentIndex = 0;
    this.errorsCount = 0;
  }

  handleKeyPress(keyPressed) {
    const expectedKey = this.targetSequence[this.currentIndex];

    if (!expectedKey) return;

    if (keyPressed.toLowerCase() === expectedKey.toLowerCase()) {
      this.currentIndex++;
      if (this.currentIndex >= this.targetSequence.length) {
        this.voice.speak("¡Excelente trabajo! ¡Nivel completado!");
        return "LEVEL_COMPLETE";
      }
      return "SUCCESS";
    } else {
      this.errorsCount++;
      const fingerNeeded = this.level.finger_map[expectedKey] || "correcto";
      this.voice.guidedCorrection(expectedKey, fingerNeeded);
      return "ERROR";
    }
  }
}