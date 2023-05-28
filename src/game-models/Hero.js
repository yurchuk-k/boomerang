// Наш герой.
var player = require("play-sound")((opts = {}));
class Hero {
  constructor({
    name = "Anonimus",
    scores = 0,
    lifes = "Жизни: 💜💜💜",
    bigscore = 0,
    position,
    boomerang,
    direction,
  }) {
    this.name = name;
    this.scores = scores;
    this.lifes = lifes;
    this.bigscore = bigscore;
    this.skin = "🤠";
    this.position = position;
    this.boomerang = boomerang;
    this.direction = direction;
    this.positionY = 0;
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
  }

  die() {
    this.skin = "💀";
    console.log("YOU ARE DEAD!💀");
    process.exit();
  }
}

module.exports = Hero;
