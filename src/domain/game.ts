import { messaging } from '../service/messaging.js';
import * as Rules from './rules.js';
import * as Stage from './stage.js';
import * as Card from './card.js';

let instance: Game | null = null;

export default class Game // Global game state
{
  stage: Stage.Base | null = null;
  plan: Stage.Base[] = []; // План игры
  deck: Rules.Deck = {};   // Текущая колода
  bun: Card.Id[] = [];     // Открытые карты бункера
  players: any[] = [];     // Информация по игрокам

  constructor()
  {
    if (instance) return instance;
    instance = this;
  }

  init(n: number)
  {
    this.deck = Rules.deck;
    const dropouts = Rules.get_dropouts(n);
    this._build_plan(dropouts);
  }

  _build_plan(dropouts: Rules.Dropouts)
  {
    this.plan.push(new Stage.Shuffle(this));

    let num = 0;
    let first = true;
    for (const dropout of dropouts) 
    {
      const type = first ? Card.Type.Profession : null;
      this.plan.push(new Stage.Round(this, num, type));
      this.plan.push(new Stage.Voting(this, dropout));
      this.plan.push(new Stage.Checkout(this));
      first = false;
      num++;
    }
    this.plan.push(new Stage.Finish(this));
  }

  execute_next()
  {
    if (this.plan.length <= 0)
    {
      console.log('Game plan is over!');
      return;
    }

    this.stage = this.plan.shift()!;
    const update = this.stage.execute();

    messaging.update_game(update);
  }
}
