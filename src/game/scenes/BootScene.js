class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Texto de Carga
    this.add.text(450, 300, 'Cargando TypeHero 2.0...', {
      font: 'bold 28px Fredoka',
      fill: '#0284c7'
    }).setOrigin(0.5);

    // Carga de Recursos Base (JSON)
    this.load.json('levelsData', 'src/data/levels.json');
    this.load.json('rewardsData', 'src/data/rewards.json');

    // Carga de Texturas PNG de los Avatares
    this.load.image('avatar_robot', 'assets/images/avatar_robot.png');
    this.load.image('avatar_dino', 'assets/images/avatar_dino.png');
    this.load.image('avatar_astro', 'assets/images/avatar_astro.png');
    this.load.image('avatar_unicorn', 'assets/images/avatar_unicorn.png');
    this.load.image('avatar_ninja', 'assets/images/avatar_ninja.png');
  }

  create() {
    // Transición directa al Menú Principal una vez cargados los assets
    this.scene.start('MenuScene');
  }
}