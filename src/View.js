// Сделаем отдельный класс для отображения игры в консоли.
const { User } = require('../db/models');

class View {
  constructor(game) {
    this.game = game;
  }

  async render() {
    // const user = await User.findOne({
    //   where: { name: this.game.hero.name },
    //   logging: false,
    // });

    // const user = await User.findOrCreate({
    //   where: { name: this.game.hero.name },
    //   defaults: { score: this.game.hero.score },
    //   logging: false,
    // });

    console.clear();

    // console.log(user[0].score);

    const yourTeamName = 'TIGERS';

    // Тут всё рисуем.
    console.log(
      `Наш герой: ${this.game.hero.name}\n${this.game.hero.lifes}\nТекущий счет: ${this.game.hero.scores}\n`
    );
    // console.log(`Твой прошлый лучший результат: ${user[0].score}\n`);
    if (this.game.hero.lifesCount === 0) {
      await this.game.dieHero();
      // if (this.game.hero.lifesCount === 0) {
      // this.game.hero.bigscore = user[0].score;
      console.log(
        `\nТвой текущий лучший результат: ${this.game.hero.bigscore}\n`
      );
    }
    console.log('\n');
    console.log(this.game.track.join(''));
    console.log('\n');
    console.log(this.game.track2.join(''));
    console.log('\n');
    console.log(`Created by "${yourTeamName}" with love\n`);
  }
}

module.exports = View;
