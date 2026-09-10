class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldMapScene' });
    this.voice = new VoiceEngine();
  }

  init(data) {
    // Validar siempre que exista el nombre para evitar "undefined"
    this.playerData = {
      playerName: (data && data.playerName) ? data.playerName : 'Campeón',
      avatar: (data && data.avatar) ? data.avatar : '🤖'
    };
  }

  create() {
    this.add.rectangle(450, 300, 900, 600, 0x0f172a);
    this.add.rectangle(450, 300, 860, 560, 0x1e293b, 0.95).setStrokeStyle(6, 0x38bdf8);

    // Cabecera con Nombre del Jugador
    this.add.text(40, 35, `${this.playerData.avatar} ¡Hola, ${this.playerData.playerName}!`, {
      fontSize: '28px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#38bdf8'
    });

    // Botón para volver al Inicio / Cambiar de Jugador
    const changeUserBtn = this.add.rectangle(760, 40, 200, 40, 0x475569)
      .setStrokeStyle(2, 0x94a3b8)
      .setInteractive({ useHandCursor: true });

    this.add.text(760, 40, '👤 Cambiar Héroe', {
      fontSize: '18px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#ffffff'
    }).setOrigin(0.5);

    changeUserBtn.on('pointerdown', () => {
      if (this.voice) this.voice.stop();
      this.scene.start('MenuScene');
    });

    this.add.text(450, 100, '🗺️ ELIGE TU MISIÓ N', {
      fontSize: '40px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#fbbf24'
    }).setOrigin(0.5);

    // Definición Progresiva de Misiones (10 Niveles Cada Una)
    const missions = [
      { 
        id: 1, 
        name: 'Misión 1: Teclas y Palabras Básicas', 
        description: '10 Niveles desde Fila Guía hasta Palabras',
        levels: [
          { level: 1, keys: ['a', 's', 'd', 'f'] },
          { level: 2, keys: ['j', 'k', 'l', 'ñ'] },
          { level: 3, keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'] },
          { level: 4, keys: ['a', 'l', 'a'] },
          { level: 5, keys: ['d', 'a', 'd', 'o'] },
          { level: 6, keys: ['f', 'i', 'l', 'a'] },
          { level: 7, keys: ['s', 'o', 'l'] },
          { level: 8, keys: ['m', 'a', 'n', 'o'] },
          { level: 9, keys: ['c', 'a', 's', 'a'] },
          { level: 10, keys: ['a', 'l', 'a', ' ', 'd', 'a', 'd', 'a'] }
        ]
      },
      { 
        id: 2, 
        name: 'Misión 2: Frases Progresivas', 
        description: '10 Niveles desde 2 Palabras hasta Frases Largas',
        levels: [
          { level: 1, keys: Array.from('el sol') },
          { level: 2, keys: Array.from('la casa') },
          { level: 3, keys: Array.from('mi papa') },
          { level: 4, keys: Array.from('el gato cae') },
          { level: 5, keys: Array.from('dame la mano') },
          { level: 6, keys: Array.from('el oso grande') },
          { level: 7, keys: Array.from('veo una estrella') },
          { level: 8, keys: Array.from('juego en el parque') },
          { level: 9, keys: Array.from('me gusta aprender mecanografia') },
          { level: 10, keys: Array.from('soy un super heroe del teclado') }
        ]
      }
    ];

    missions.forEach((mision, idx) => {
      const x = 240 + (idx * 420);
      const y = 310;

      const card = this.add.rectangle(x, y, 350, 300, 0x334155)
        .setStrokeStyle(5, 0x38bdf8)
        .setInteractive({ useHandCursor: true });

      this.add.circle(x, y - 70, 50, 0xfbbf24).setStrokeStyle(4, 0xd97706);
      this.add.text(x, y - 70, `${mision.id}`, {
        fontSize: '50px',
        fontStyle: 'bold',
        fill: '#1e293b'
      }).setOrigin(0.5);

      this.add.text(x, y + 15, mision.name, {
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#ffffff',
        align: 'center',
        wordWrap: { width: 310 }
      }).setOrigin(0.5);

      this.add.text(x, y + 70, mision.description, {
        fontSize: '18px',
        fill: '#94a3b8',
        align: 'center',
        wordWrap: { width: 300 }
      }).setOrigin(0.5);

      const playBtn = this.add.rectangle(x, y + 120, 220, 50, 0x22c55e).setStrokeStyle(3, 0x15803d);
      this.add.text(x, y + 120, '¡JUGAR! ➔', {
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#ffffff'
      }).setOrigin(0.5);

      card.on('pointerdown', () => {
        if (this.voice) this.voice.speak(`Iniciando Misión ${mision.id}`);
        this.scene.start('GameplayScene', { 
          mission: mision, 
          currentLevelIdx: 0,
          playerData: this.playerData 
        });
      });
    });

    // Botón Tienda
    const shopBtn = this.add.rectangle(450, 530, 280, 55, 0xf59e0b)
      .setStrokeStyle(4, 0xb45309)
      .setInteractive({ useHandCursor: true });

    this.add.text(450, 530, '🛒 TIENDA DE HÉROES', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    shopBtn.on('pointerdown', () => {
      this.scene.start('ShopScene', { playerData: this.playerData });
    });
  }
}