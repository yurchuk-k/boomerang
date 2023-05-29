// Враг.

class Enemy {
  constructor(trackLength) {
    this.generateSkin();
    this.position = trackLength - 1;
    this.positionY = trackLength - 1;
  }

  generateSkin() {
    const skins = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    setInterval(() => {
      this.position -= 1;
    }, 400);
    setInterval(() => {
      this.positionY -= 1;
    }, 1000);
  }

  die() {
    this.position = '?';
    this.positionY = '?';
    // console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
