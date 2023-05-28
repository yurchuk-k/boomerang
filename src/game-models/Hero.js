// Наш герой.
const player = require("play-sound")((opts = {}));
class Hero {
  constructor({ position, boomerang }) {
    this.position = position;
    this.boomerang = boomerang;
    this.skin = '🐯';

    this.name = 'Anonimus';
    this.lifes = 'Жизни: 💜💜💜';
    this.lifesCount = 3;
    this.scores = 0;
    this.bigscore = 0;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
    if (this.position <= 2) {
      this.position = 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  moveUp() {
    if (this.positionY === 1) {
      this.positionY -= 1;
    }
  }

  moveDown() {
    if (this.positionY === 0) {
      this.positionY += 1;
    }
  }

  attack() {
    // Атакуем.
    this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
    this.boomerang.fly();
    player.play("./src/sounds/shot.wav");
  }

  die() {
    this.skin = '🤕';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
