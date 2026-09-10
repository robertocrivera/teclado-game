class DifficultyAdapter {
  constructor() {
    this.keyMetrics = {}; // Registro de aciertos y errores por tecla
  }

  registerKeyPress(key, isCorrect) {
    const k = key.toLowerCase();
    if (!this.keyMetrics[k]) {
      this.keyMetrics[k] = { hits: 0, errors: 0 };
    }

    if (isCorrect) {
      this.keyMetrics[k].hits++;
    } else {
      this.keyMetrics[k].errors++;
    }
  }

  // Obtiene las 3 teclas con mayor tasa de error para reforzar
  getProblematicKeys() {
    return Object.keys(this.keyMetrics)
      .map(key => {
        const total = this.keyMetrics[key].hits + this.keyMetrics[key].errors;
        const errorRate = total > 0 ? (this.keyMetrics[key].errors / total) : 0;
        return { key, errorRate };
      })
      .filter(item => item.errorRate > 0.3) // Teclas con más del 30% de fallo
      .sort((a, b) => b.errorRate - a.errorRate)
      .map(item => item.key);
  }
}