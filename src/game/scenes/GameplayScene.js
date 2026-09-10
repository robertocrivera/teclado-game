class GameplayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameplayScene' });
  }

  init(data) {
    this.mission = data.mission;
    this.currentLevelIdx = data.currentLevelIdx || 0;
    
    // Asegurar estructura de playerData
    this.playerData = {
      playerName: (data && data.playerData && data.playerData.playerName) ? data.playerData.playerName : 'Campeón',
      avatar: (data && data.playerData && data.playerData.avatar) ? data.playerData.avatar : 'avatar_robot'
    };

    this.levelData = this.mission.levels[this.currentLevelIdx];
    this.currentIndex = 0;
    this.isLevelFinished = false;
  }

  create() {
    this.voice = new VoiceEngine();
    this.progressManager = new ProgressManager();
    this.difficultyAdapter = new DifficultyAdapter();

    // Fondo
    this.add.rectangle(450, 300, 900, 600, 0xf0f9ff);
    this.add.rectangle(450, 300, 860, 560, 0xffffff).setStrokeStyle(6, 0x0284c7);

    // Barra Superior: Renderizado del Sprite PNG del Avatar
    const avatarKey = this.textures.exists(this.playerData.avatar) 
      ? this.playerData.avatar 
      : 'avatar_robot';

    this.add.image(55, 30, avatarKey).setDisplaySize(42, 42);

    this.add.text(85, 18, this.playerData.playerName, {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#0284c7'
    });

    this.add.text(450, 30, `Nivel ${this.levelData.level} de 10`, {
      fontSize: '28px',
      fontStyle: 'bold',
      fill: '#334155'
    }).setOrigin(0.5);

    // Texto de la lección
    const fullText = this.levelData.keys.join('').toUpperCase();
    this.targetTextDisplay = this.add.text(450, 115, fullText, {
      fontSize: '52px',
      fontStyle: 'bold',
      fill: '#0284c7',
      backgroundColor: '#e0f2fe',
      padding: { x: 30, y: 12 }
    }).setOrigin(0.5);

    // Indicador
    this.instructionText = this.add.text(450, 195, '', {
      fontSize: '26px',
      fontStyle: 'bold',
      fill: '#15803d'
    }).setOrigin(0.5);

    // Teclado
    this.keyboard = new VisualKeyboard(this, 450, 420);

    // Botón Salir
    const backBtn = this.add.rectangle(810, 30, 110, 40, 0xef4444)
      .setInteractive({ useHandCursor: true });
    
    this.add.text(810, 30, '✖ Salir', {
      fontSize: '18px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    backBtn.on('pointerdown', () => {
      this.cleanupScene();
      this.scene.start('WorldMapScene', this.playerData);
    });

    // Escucha controlada del teclado
    this.onKeyDown = (event) => this.handleKeyPress(event);
    this.input.keyboard.on('keydown', this.onKeyDown);

    this.updateDisplay();
  }

  updateDisplay() {
    if (this.isLevelFinished) return;

    const currentTarget = this.levelData.keys[this.currentIndex];

    if (!currentTarget) {
      this.finishLevel();
      return;
    }

    if (this.keyboard) {
      this.keyboard.highlightKey(currentTarget);
    }

    if (currentTarget === ' ') {
      this.instructionText.setText('¡Presiona la BARRA ESPACIO!');
      if (this.voice) this.voice.speak('Espacio');
    } else {
      this.instructionText.setText(`¡Presiona la letra "${currentTarget.toUpperCase()}"!`);
      if (this.voice) this.voice.speak(currentTarget);
    }
  }

  handleKeyPress(event) {
    if (this.isLevelFinished) return;

    const pressedKey = event.key.toLowerCase();
    const targetKey = this.levelData.keys[this.currentIndex].toLowerCase();

    if (pressedKey === targetKey) {
      if (this.difficultyAdapter) {
        this.difficultyAdapter.registerKeyPress(targetKey, true);
      }

      if (this.voice) this.voice.stop();
      if (this.keyboard) this.keyboard.flashSuccess(pressedKey);
      this.currentIndex++;

      if (this.currentIndex < this.levelData.keys.length) {
        this.updateDisplay();
      } else {
        this.finishLevel();
      }
    } else {
      if (this.difficultyAdapter) {
        this.difficultyAdapter.registerKeyPress(targetKey, false);
      }

      this.cameras.main.shake(100, 0.005);
      if (this.voice) this.voice.speak('Intenta de nuevo');
    }
  }

  finishLevel() {
    this.isLevelFinished = true;
    if (this.keyboard) this.keyboard.clearHighlights();

    this.instructionText.setText('🎉 ¡NIVEL COMPLETADO! 🎉')
      .setStyle({ fill: '#22c55e', fontSize: '36px', fontStyle: 'bold' });

    if (this.voice) {
      this.voice.speak(`¡Excelente ${this.playerData.playerName}! Nivel completado.`);
    }

    if (this.progressManager && this.progressManager.addPoints) {
      this.progressManager.addPoints(50);
    }

    const nextBtn = this.add.rectangle(450, 300, 320, 65, 0x22c55e)
      .setStrokeStyle(4, 0x15803d)
      .setInteractive({ useHandCursor: true });

    const nextText = (this.currentLevelIdx + 1 < this.mission.levels.length) 
      ? '¡Siguiente Nivel! ➔' 
      : '¡Misión Completada! 🏆';

    this.add.text(450, 300, nextText, {
      fontSize: '28px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    nextBtn.on('pointerdown', () => {
      this.cleanupScene();

      if (this.currentLevelIdx + 1 < this.mission.levels.length) {
        this.scene.restart({
          mission: this.mission,
          currentLevelIdx: this.currentLevelIdx + 1,
          playerData: this.playerData
        });
      } else {
        this.scene.start('WorldMapScene', this.playerData);
      }
    });
  }

  cleanupScene() {
    if (this.onKeyDown) {
      this.input.keyboard.off('keydown', this.onKeyDown);
    }
    if (this.voice) {
      this.voice.stop();
    }
  }
}