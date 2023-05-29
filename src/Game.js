/* eslint-disable max-len */
// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const readlineSync = require('readline-sync');
const player = require('play-sound')((opts = {}));

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

const { User } = require('../db/models');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({
      position: 0,
      boomerang: this.boomerang,
      positionY: undefined,
      scores: 0,
    });
    this.enemy = new Enemy(trackLength);
    this.enemy2 = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.track2 = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку

    if (this.hero.position >= 0) {
      this.track[this.hero.position] = this.hero.skin;
    }

    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }

    this.track2 = new Array(this.trackLength).fill(' ');

    if (this.hero.positionY >= 0) {
      this.track2[this.hero.positionY] = this.hero.skin;
    }

    this.track2[this.enemy2.positionY] = this.enemy2.skin;

    if (
      this.hero.boomerang.positionY >= 0 &&
      this.hero.boomerang.positionY < this.trackLength
    ) {
      this.track2[this.hero.boomerang.positionY] = this.hero.boomerang.skin;
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
      this.hero.name = 'Anonimus';
    }

    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();
      this.enemy2.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        // this.enemy.position = this.trackLength - 1;
        this.enemy = new Enemy(this.trackLength);
      }
      if (this.enemy2.positionY < 0) {
        this.enemy2 = new Enemy(this.trackLength);
      }

      this.view.render(this.track);
    }, 50); // Вы можете настроить частоту обновления игрового цикла
  }

  // записать игрока в БД
  async dieHero() {
    const user = await User.findOrCreate({
      where: { name: this.hero.name },
      defaults: { score: this.hero.scores },
      logging: false,
    });
    // const user = await User.findOne({
    //   where: { name: this.hero.name },
    //   logging: false,
    // });
    // если очки в БД меньше очков текущего боя - запиши текущие очки в лучший результат и перепиши в БД
    if (user[0].score <= this.hero.scores) {
      this.hero.bigscore = this.hero.scores;
      await User.update(
        { score: this.hero.scores },
        { where: { name: this.hero.name } },
        { logging: false }
      );
      // this.hero.bigscore = user[0].score;
    } else {
      this.hero.bigscore = user[0].score;
      await User.update(
        { score: this.hero.bigscore },
        { where: { name: this.hero.name } },
        { logging: false }
      );
    }
    // если очки в БД больше очков текущего боя - запиши очки из БД в лучший результат
    // console.log(`\nТвой лучший результат: ${user[0].score}\n`);
    // logging: false,
  }

  async handleCollisions() {
    // const audio = player.play(
    //   './src/sounds/voennyiy-atmosfernyiy-orkestrovyiy-fonovyiy-saundtrek-43442.wav',
    // function (err) {
    //   if (err) console.log(err);
    // }
    // );
    // audio.kill();

    // враг сталкивается с Героем, и жизни героя уменьшаются
    if (
      (this.hero.position >= this.enemy.position &&
        this.hero.position - this.enemy.position < 2) ||
      (this.hero.positionY >= this.enemy2.positionY &&
        this.hero.positionY - this.enemy2.positionY < 2)
    ) {
      // this.regenerateTrack();
      // this.hero.position = 0;
      // this.hero.positionY = undefined;
      this.hero.lifesCount -= 1;

      if (this.hero.lifesCount === 2) {
        this.hero.lifes = 'Жизни: 💜💜🖤';
        player.play('./src/sounds/hit.wav');
        // this.enemy.position = 27;
      }
      if (this.hero.lifesCount === 1) {
        this.hero.lifes = 'Жизни: 💜🖤🖤';
        player.play('./src/sounds/hit.wav');
        // this.enemy.position = 25;
      }
      if (this.hero.lifesCount === 0) {
        this.hero.lifes = 'Жизни: 🖤🖤🖤';
        player.play('./src/sounds/death.wav');
        await this.dieHero();
        this.hero.die();
      }
    }
    // бумеранг сталкивается с врагом
    if (this.boomerang.position >= this.enemy.position) {
      player.play('./src/sounds/death.wav');
      this.enemy.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position = undefined;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }

    if (this.boomerang.positionY >= this.enemy2.positionY) {
      player.play('./src/sounds/death.wav');
      this.enemy2.die();
      this.hero.scores += 1;
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.positionY = undefined;
      this.enemy2 = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
