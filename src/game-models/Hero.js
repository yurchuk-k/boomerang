// Наш герой.

class Hero {
  constructor({
    name = 'Anonimus',
    scores = 0,
    lifes = 'Жизни: 💜💜💜',
    lifesCount = 3,
    bigscore = 0,
    position,
    boomerang,
  }) {
    this.name = name;
    this.scores = scores;
    this.lifes = lifes;
    this.lifesCount = lifesCount;
    this.bigscore = bigscore;
    this.skin = '🐯';
    this.position = position;
    this.boomerang = boomerang;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
    this.boomerang.fly();
  }

  die() {
    this.skin = '🤕';
    console.log('YOU ARE DEAD!🤕');
    process.exit();
  }
}

module.exports = Hero;
