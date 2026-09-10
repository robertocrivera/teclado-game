class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
    this.selectedAvatarKey = 'avatar_robot'; // Clave por defecto en PNG
    this.voice = new VoiceEngine();
  }

  create() {
    // Fondo interactivo
    this.add.rectangle(450, 300, 900, 600, 0x38bdf8);
    this.add.rectangle(450, 300, 860, 560, 0xf0f9ff, 0.98).setStrokeStyle(8, 0x0284c7);

    // Título Principal
    this.add.text(450, 55, '🚀 TYPEHERO 2.0', {
      fontSize: '48px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#0284c7'
    }).setOrigin(0.5);

    this.add.text(450, 115, '¡Escribe tu nombre de Héroe!', {
      fontSize: '24px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#334155'
    }).setOrigin(0.5);

    // Renderizado seguro del Input HTML
    const inputContainer = document.getElementById('game-container');
    
    // Remover input antiguo si existe
    const oldInput = document.getElementById('player-name-input');
    if (oldInput) oldInput.remove();

    this.nameInputDOM = document.createElement('input');
    this.nameInputDOM.id = 'player-name-input';
    this.nameInputDOM.type = 'text';
    this.nameInputDOM.placeholder = 'Tu Nombre aquí...';
    this.nameInputDOM.style.position = 'absolute';
    this.nameInputDOM.style.top = '150px';
    this.nameInputDOM.style.left = '50%';
    this.nameInputDOM.style.transform = 'translateX(-50%)';
    this.nameInputDOM.style.width = '350px';
    this.nameInputDOM.style.height = '48px';
    this.nameInputDOM.style.fontSize = '22px';
    this.nameInputDOM.style.fontWeight = 'bold';
    this.nameInputDOM.style.textAlign = 'center';
    this.nameInputDOM.style.borderRadius = '14px';
    this.nameInputDOM.style.border = '4px solid #0284c7';
    this.nameInputDOM.style.boxShadow = '0 6px 0 #0284c7';
    this.nameInputDOM.style.outline = 'none';
    this.nameInputDOM.style.zIndex = '1000';

    inputContainer.appendChild(this.nameInputDOM);

    // Subtítulo Avatares
    this.add.text(450, 230, 'Elige tu Avatar de Misión:', {
      fontSize: '22px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#475569'
    }).setOrigin(0.5);

    // Lista de Avatares en PNG precargados en BootScene
    const avatarList = [
      { key: 'avatar_robot', label: 'RoboHero' },
      { key: 'avatar_dino', label: 'DinoTec' },
      { key: 'avatar_astro', label: 'Cosmo' },
      { key: 'avatar_unicorn', label: 'Estrella' },
      { key: 'avatar_ninja', label: 'Sombra' }
    ];

    this.avatarCards = [];

    avatarList.forEach((av, index) => {
      const x = 150 + (index * 150);
      const y = 320;

      // Tarjeta base
      const card = this.add.rectangle(x, y, 115, 125, 0xffffff)
        .setStrokeStyle(4, av.key === this.selectedAvatarKey ? 0x0284c7 : 0xcbd5e1)
        .setInteractive({ useHandCursor: true });

      // Sprite PNG
      const img = this.add.image(x, y - 10, av.key)
        .setDisplaySize(70, 70);

      // Etiqueta del Avatar
      this.add.text(x, y + 42, av.label, {
        fontSize: '15px',
        fontStyle: 'bold',
        fontFamily: 'Fredoka, Arial, sans-serif',
        fill: '#475569'
      }).setOrigin(0.5);

      card.on('pointerdown', () => {
        this.selectedAvatarKey = av.key;
        this.voice.speak(`${av.label} seleccionado`);

        // Resaltar borde del seleccionado y atenuar los demás
        this.avatarCards.forEach(c => c.setStrokeStyle(4, 0xcbd5e1));
        card.setStrokeStyle(4, 0x0284c7);

        this.tweens.add({
          targets: [card, img],
          scaleX: 1.08,
          scaleY: 1.08,
          duration: 120,
          yoyo: true
        });
      });

      this.avatarCards.push(card);
    });

    // Botón Iniciar Misión
    const startBtn = this.add.rectangle(450, 480, 360, 70, 0x22c55e)
      .setStrokeStyle(5, 0x15803d)
      .setInteractive({ useHandCursor: true });

    this.add.text(450, 480, '¡INICIAR MISIÓN! ⚡', {
      fontSize: '30px',
      fontStyle: 'bold',
      fontFamily: 'Fredoka, Arial, sans-serif',
      fill: '#ffffff'
    }).setOrigin(0.5);

    startBtn.on('pointerdown', () => {
      const playerName = (this.nameInputDOM && this.nameInputDOM.value.trim() !== '') 
        ? this.nameInputDOM.value.trim() 
        : 'Campeón';

      this.voice.speak(`¡Hola ${playerName}! Prepárate para la aventura.`);

      // Eliminar el input al salir de la pantalla
      if (this.nameInputDOM) this.nameInputDOM.remove();

      this.scene.start('WorldMapScene', { 
        playerData: {
          playerName: playerName, 
          avatar: this.selectedAvatarKey // Enviar la key de la textura PNG
        }
      });
    });
  }
}