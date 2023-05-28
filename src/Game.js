const readlineSync = require('readline-sync');
// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
const db = require('../db/models');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({ position: 0, boomerang: this.boomerang });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
  }

  async name() {
    const result = await db.user.findOrCreate({
      where: { name: ${process.argv[2]} },
      defaults: { score: this.game.hero.scores },
    });
    return result;
  }

  async update() {
    const res = await db.user.update(
      { score: this.game.hero.scores },
      { where: { name: ${process.argv[2]} } },
    );
    return res;
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку
    if (
      this.hero.boomerang.position >= 0
      && this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  // check() {

  // }

  play() {
    // во время запуска игры выводится форма регистрации и присваивается имя игрока
    this.hero.name = readlineSync.question(
      'Приветствуем Героя!\nВведи своё имя: ',
    );
    process.stdin.resume();
    if (!this.hero.name) {
      this.hero.name = 'Anonimus';
    }

    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy.position = this.trackLength - 1;
      }

      this.view.render(this.track);
    }, 100); // Вы можете настроить частоту обновления игрового цикла
  }

  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.regenerateTrack();
      this.hero.position = 0;
      this.hero.lifesCount -= 1;
      if (this.hero.lifesCount === 2) {
        this.hero.lifes = 'Жизни: 💜💜🖤';
        this.enemy.position = 27;
      }
      if (this.hero.lifesCount === 1) {
        this.hero.lifes = 'Жизни: 💜🖤🖤';
        this.enemy.position = 25;
      }
      if (this.hero.lifesCount === 0) {
        this.hero.lifes = 'Жизни: 🖤🖤🖤';
        this.hero.die();
      }
    }

    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      // this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

// module.exports = newHero;
module.exports = Game;
