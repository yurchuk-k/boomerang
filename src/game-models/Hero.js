// Наш герой.

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

  attack() {
    // Атакуем.
    this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
    this.boomerang.fly();
  }

  die() {
    this.skin = '🤕';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
