import * as Stage from './stage.js';
import Rules from './rules.js';

let instance = null;

class Game // Global game state
{
  constructor()
  {
    if (instance) return instance;

    this.stage = null;
    this.plan = [];    // План игры
    this.deck = {};    // Текущая колода
    this.bun = [];     // Открытые карты бункера
    this.players = []; // Информация по игрокам
    this.instance = this;
  }

  init(n)
  {
    this.deck = Rules.get_deck();
    const dropouts = Rules.get_dropout_counts(n);
    this._build_plan(dropouts);
  }

  _build_plan(dropouts)
  {
    this.plan.push(new Stage.Shuffle(this));

    let num = 0;
    let first = true;
    for (const dropout of dropouts)
    {
      const type = first ? Rules.CardType.Profession : null;
      this.plan.push(new Stage.Round(this, num, type));
      this.plan.push(new Stage.Voting(this, dropout));
      this.plan.push(new Stage.Checkout(this));
      first = false;
      num++;
    }
    this.plan.push(new Stage.Finish());
  }

  execute_next()
  {
    if (this.plan.length <= 0)
    {
      console.log('Game plan is over!');
      return;
    }

    this.stage = this.plan.shift();
    this.stage.execute();
  }
}

export const game = new Game();
