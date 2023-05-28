// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
const Hero = require('./Hero');

class Boomerang {
  constructor(trackLength) {
    this.skin = '🪃';
    this.position = undefined; // оставить так, бумеранг не будет видно в начале
    this.trackLength = trackLength;
    this.generateSkin();

    // * this.position = 1;
    // ? this.direction = 'right';
  }

  generateSkin() {
    const skins = ['🪃', '🌀', '🔪', '🧨'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  fly() {
    const distance = 10; // Устанавливаем дистанцию полета бумеранга

    // Запускаем бумеранг на заданное расстояние
    for (let i = 1; i <= distance; i += 1) {
      setTimeout(() => this.moveRight(), 25 * i);
    }

    // Возвращаем бумеранг на заданное расстояние
    for (let i = 1; i <= distance; i += 1) {
      setTimeout(() => this.moveLeft(), 25 * (distance + i));
    }

    // Сбрасываем позицию бумеранга после возвращения
    setTimeout(() => this.reset(), 25 * (distance * 2));

    // ? this.moveRight();
    // ? this.moveLeft();
  }

  reset() {
    this.position = undefined; // Сброс позиции бумеранга
    // this.position = -1; // Сброс позиции бумеранга
    // this.position = 1; // Сброс позиции бумеранга
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
