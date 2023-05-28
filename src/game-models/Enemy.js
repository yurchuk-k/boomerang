// Враг.

class Enemy {
  constructor(trackLength) {
    this.generateSkin();
    this.position = trackLength - 1;
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
    }, 900);
  }

  die() {
    // this.skin = '💥';
    this.position = '?';
    // console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
