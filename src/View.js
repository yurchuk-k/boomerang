// Сделаем отдельный класс для отображения игры в консоли.

class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(
      `Наш герой: ${this.game.hero.name}\n${this.game.hero.lifes}\nТекущий счет: ${this.game.hero.scores}\n\n`
    );
    console.log(this.game.track.join(''));
    console.log('\n');
    if (this.game.hero.lifes === 0) {
      console.log(`Твой общий результат: ${this.game.hero.bigscore}`);
    }

    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
