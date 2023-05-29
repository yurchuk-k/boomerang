// Наш герой.
const player = require('play-sound')((opts = {}));

class Hero {
  constructor({ position, boomerang, positionY, scores }) {
    this.position = position;
    this.boomerang = boomerang;
    this.skin = '🐯';

    this.positionY = positionY;
    this.name = 'Anonimus';
    this.lifes = 'Жизни: 💜💜💜';
    this.lifesCount = 3;
    this.scores = scores;
    this.bigscore = 0;
  }

  moveLeft() {
    // Идём влево.
    if (this.position > 0) {
      this.position -= 1;
    }

    if (this.positionY > 0) {
      this.positionY -= 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    this.positionY += 1;
  }

  moveUp() {
    if (this.positionY >= 0) {
      this.position = this.positionY;
      this.positionY = undefined;
    }
  }

  moveDown() {
    if (this.position >= 0) {
      this.positionY = this.position;
      this.position = undefined;
    }
  }

  attack() {
    // Атакуем.
    if (this.position >= 0) {
      this.boomerang.position = this.position + 1;
      this.boomerang.positionY = undefined;
    } // Устанавливаем начальную позицию бумеранга

    if (this.positionY >= 0) {
      this.boomerang.positionY = this.positionY + 1;
      this.boomerang.position = undefined;
    }
    this.boomerang.fly();
    player.play('./src/sounds/shot.wav');
  }

  die() {
    this.skin = '🤕';
    console.log('YOU ARE DEAD!💀\n');
    process.exit();
  }
}

module.exports = Hero;
