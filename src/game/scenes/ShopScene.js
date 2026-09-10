class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShopScene' });
  }

  init(data) {
    this.playerData = data.playerData || { playerName: 'Explorador', avatar: '🤖' };
  }

  create() {
    // Instanciar el gestor de progreso para leer/guardar puntos y desbloqueables
    this.progressManager = new ProgressManager();
    this.playerPoints = this.progressManager.getPoints ? this.progressManager.getPoints() : 150;

    // Fondo de la Tienda
    this.add.rectangle(450, 300, 900, 600, 0x0f172a);
    this.add.rectangle(450, 300, 840, 540, 0x1e293b, 0.9).setStrokeStyle(4, 0x3b82f6);

    // Título e Información de Puntos
    this.add.text(450, 70, '🛒 TIENDA DE RECOMPENSAS', {
      font: 'bold 36px Fredoka, sans-serif',
      fill: '#fbbf24'
    }).setOrigin(0.5);

    this.pointsText = this.add.text(450, 120, `⭐ Tus Puntos: ${this.playerPoints}`, {
      font: 'bold 24px Fredoka, sans-serif',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Catálogo de Avatares/Trajes Desbloqueables
    const shopItems = [
      { id: 'avatar_dragon', emoji: '🐲', name: 'Dragón', price: 50 },
      { id: 'avatar_alien', emoji: '👽', name: 'Alienígena', price: 100 },
      { id: 'avatar_hero', emoji: '🦸', name: 'Súper Héroe', price: 150 },
      { id: 'avatar_wizard', emoji: '🧙‍♂️', name: 'Mago', price: 200 }
    ];

    this.renderShopItems(shopItems);

    // Botón para Volver al Mapa de Mundos
    const backBtn = this.add.rectangle(450, 520, 220, 50, 0xef4444)
      .setInteractive({ useHandCursor: true });

    this.add.text(450, 520, '⬅️ Volver al Mapa', {
      font: 'bold 20px Fredoka, sans-serif',
      fill: '#ffffff'
    }).setOrigin(0.5);

    backBtn.on('pointerdown', () => {
      this.scene.start('WorldMapScene', this.playerData);
    });
  }

  renderShopItems(items) {
    items.forEach((item, index) => {
      const x = 200 + (index * 165);
      const y = 280;

      // Tarjeta de Producto
      const card = this.add.rectangle(x, y, 140, 180, 0x334155)
        .setStrokeStyle(3, 0x475569);

      // Icono y Nombre
      this.add.text(x, y - 40, item.emoji, { font: '50px Arial' }).setOrigin(0.5);
      this.add.text(x, y + 20, item.name, {
        font: 'bold 18px Fredoka, sans-serif',
        fill: '#ffffff'
      }).setOrigin(0.5);

      // Comprobar si ya está comprado
      const isUnlocked = this.progressManager.isUnlocked 
        ? this.progressManager.isUnlocked(item.id) 
        : false;

      if (isUnlocked) {
        // Estado: Ya Comprado / Equipar
        const equipBtn = this.add.rectangle(x, y + 60, 110, 35, 0x22c55e)
          .setInteractive({ useHandCursor: true });

        this.add.text(x, y + 60, 'Usar', {
          font: 'bold 16px Fredoka, sans-serif',
          fill: '#ffffff'
        }).setOrigin(0.5);

        equipBtn.on('pointerdown', () => {
          this.playerData.avatar = item.emoji;
          this.showMessage(`¡Ahora usas a ${item.name}!`);
        });
      } else {
        // Estado: Disponible para Comprar
        const buyBtn = this.add.rectangle(x, y + 60, 110, 35, 0x3b82f6)
          .setInteractive({ useHandCursor: true });

        this.add.text(x, y + 60, `⭐ ${item.price}`, {
          font: 'bold 16px Fredoka, sans-serif',
          fill: '#ffffff'
        }).setOrigin(0.5);

        buyBtn.on('pointerdown', () => {
          this.buyItem(item);
        });
      }
    });
  }

  buyItem(item) {
    if (this.playerPoints >= item.price) {
      this.playerPoints -= item.price;
      
      if (this.progressManager.savePurchase) {
        this.progressManager.savePurchase(item.id, this.playerPoints);
      }

      this.pointsText.setText(`⭐ Tus Puntos: ${this.playerPoints}`);
      this.showMessage(`🎉 ¡Desbloqueaste a ${item.name}!`);

      // Recargar la escena para actualizar los botones a "Usar"
      this.time.delayedCall(1000, () => {
        this.scene.restart({ playerData: this.playerData });
      });
    } else {
      this.showMessage('❌ ¡No tienes puntos suficientes!');
    }
  }

  showMessage(msg) {
    const toast = this.add.text(450, 440, msg, {
      font: 'bold 22px Fredoka, sans-serif',
      fill: '#fbbf24',
      backgroundColor: '#0f172a',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => toast.destroy());
  }
}