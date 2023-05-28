const readlineSync = require("readline-sync");
// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

const player = require("play-sound")((opts = {}));
const { User } = require('../db/models');
// const runInteractiveConsole = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({ position: 0, boomerang: this.boomerang });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.track2 = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track2 = new Array(this.trackLength).fill(' ');

    this.track[this.hero.position] = this.hero.skin;
    if (this.hero.positionY === 0) {
      this.track[this.hero.position] = this.hero.skin;
    }
    if (this.hero.positionY === 1) {
      this.track2[this.hero.position] = this.hero.skin;
    }
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку

    // this.track = new Array(this.trackLength).fill(' ');
    // this.track[this.hero.position] = this.hero.skin;
    // this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку

    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  // check() {}

  play() {
    // во время запуска игры выводится форма регистрации и присваивается имя игрока
    this.hero.name = readlineSync.question(
      'Приветствуем Героя!\nВведи своё имя: '
    );
    process.stdin.resume();
    if (!this.hero.name) {
      this.hero.name = "Anonimus";
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

  // записать игрока в БД
  async dieHero() {
    await User.findOrCreate({
      where: { name: this.hero.name },
      defaults: { score: this.hero.scores },
      logging: false,
    });

    await User.update(
      { score: this.hero.scores },
      { where: { name: this.hero.name } },
      { logging: false },
    );
    // logging: false,
  }

  async handleCollisions() {
    // враг сталкивается с Героем, и жизни героя уменьшаются
    if (this.hero.position >= this.enemy.position) {
      this.regenerateTrack();
      this.hero.position = 0;
      this.hero.lifesCount -= 1;

      if (this.hero.lifesCount === 2) {
        this.hero.lifes = 'Жизни: 💜💜🖤';
        player.play('./src/sounds/hit.wav');
        this.enemy.position = 27;
      }
      if (this.hero.lifesCount === 1) {
        this.hero.lifes = 'Жизни: 💜🖤🖤';
        player.play('./src/sounds/hit.wav');
        this.enemy.position = 25;
      }
      if (this.hero.lifesCount === 0) {
        this.hero.lifes = 'Жизни: 🖤🖤🖤';
        player.play('./src/sounds/death.wav');
        await this.dieHero();
        this.hero.die();
      }
    }

    if (this.boomerang.position >= this.enemy.position) {
      player.play('./src/sounds/death.wav');
      this.enemy.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      // this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
