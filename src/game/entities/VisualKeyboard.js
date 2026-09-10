class VisualKeyboard {
  /**
   * @param {Phaser.Scene} scene - La escena de Phaser a la que pertenece el teclado
   * @param {number} x - Posición X central en el canvas
   * @param {number} y - Posición Y central en el canvas
   */
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.keysMap = {}; // Mapa para acceso rápido por carácter

    // Distribución QWERTY incluyendo la Barra Espaciadora
    this.layout = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      [' ']
    ];

    this.createKeyboard();
  }

  createKeyboard() {
    // Contenedor principal para agrupar todas las teclas
    this.container = this.scene.add.container(this.x, this.y);

    // Marco / Fondo Estilo Gamer Neón
    const bgBorder = this.scene.add.rectangle(0, 0, 760, 270, 0x0f172a, 0.95)
      .setStrokeStyle(4, 0x38bdf8);
    this.container.add(bgBorder);

    let startY = -90;

    this.layout.forEach((row) => {
      let startX = -((row.length * 62) / 2) + 31;

      row.forEach((keyChar) => {
        let width = 54;
        let height = 48;
        let posX = startX;

        // Ajuste especial para la Barra Espaciadora
        if (keyChar === ' ') {
          width = 380;
          posX = 0;
        }

        // Tecla Base Gamer
        const bg = this.scene.add.rectangle(posX, startY, width, height, 0x1e293b)
          .setStrokeStyle(3, 0x475569);

        // Texto LED Neón
        const labelText = keyChar === ' ' ? 'ESPACIO' : keyChar.toUpperCase();
        const text = this.scene.add.text(posX, startY, labelText, {
          font: keyChar === ' ' ? 'bold 18px Fredoka, sans-serif' : 'bold 22px Fredoka, sans-serif',
          fill: '#38bdf8'
        }).setOrigin(0.5);

        // Guardar referencia en el Mapa
        this.keysMap[keyChar.toLowerCase()] = { bg, text };

        this.container.add([bg, text]);

        startX += keyChar === ' ' ? 0 : 62;
      });

      startY += 56;
    });
  }

  /**
   * Resalta la tecla esperada con efecto Neón y Animación de Pulso
   * @param {string} targetChar - Letra que debe presionar el niño
   */
  highlightKey(targetChar) {
    this.clearHighlights();

    if (!targetChar) return;

    const keyObj = this.keysMap[targetChar.toLowerCase()];
    if (keyObj) {
      // Color Neón Amarillo / Dorado para la tecla activa
      keyObj.bg.setFillStyle(0xf59e0b);
      keyObj.bg.setStrokeStyle(4, 0xfef08a);
      keyObj.text.setStyle({ fill: '#000000' });

      // Animación de latido / pulso suave recuperada de tu código original
      this.scene.tweens.add({
        targets: [keyObj.bg, keyObj.text],
        scaleX: 1.15,
        scaleY: 1.15,
        duration: 350,
        yoyo: true,
        repeat: -1
      });
    }
  }

  /**
   * Feedback visual instantáneo cuando se acierta la tecla
   * @param {string} char - Letra acertada
   */
  flashSuccess(char) {
    const keyObj = this.keysMap[char.toLowerCase()];
    if (keyObj) {
      // Detener pulso previo
      this.scene.tweens.killTweensOf([keyObj.bg, keyObj.text]);
      keyObj.bg.setScale(1);
      keyObj.text.setScale(1);

      // Verde Neón de Acierto
      keyObj.bg.setFillStyle(0x22c55e);
      keyObj.bg.setStrokeStyle(3, 0x86efac);
      keyObj.text.setStyle({ fill: '#ffffff' });

      this.scene.time.delayedCall(200, () => {
        keyObj.bg.setFillStyle(0x1e293b);
        keyObj.bg.setStrokeStyle(3, 0x475569);
        keyObj.text.setStyle({ fill: '#38bdf8' });
      });
    }
  }

  /**
   * Restablece todas las teclas a su estado base e interrumpe animaciones
   */
  clearHighlights() {
    Object.keys(this.keysMap).forEach((char) => {
      const keyObj = this.keysMap[char];

      // Cancelar animaciones de pulso
      this.scene.tweens.killTweensOf([keyObj.bg, keyObj.text]);

      keyObj.bg.setScale(1);
      keyObj.text.setScale(1);

      // Estilos base Gamer
      keyObj.bg.setFillStyle(0x1e293b);
      keyObj.bg.setStrokeStyle(3, 0x475569);
      keyObj.text.setStyle({ fill: '#38bdf8' });
    });
  }
}