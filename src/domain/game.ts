import { Stage, Shuffle, Round, Voting, Checkout, Finish } from './stage.js';
import { CardType, cards, deck, get_dropouts } from './rules.js';

let instance: Game | null = null;

type Deck = Record<string, string[]>;

export default class Game // Global game state
{
  stage: Stage | null = null;
  plan: Stage[] = [];  // План игры
  deck: Deck = {};     // Текущая колода
  bun: string[] = [];  // Открытые карты бункера
  players: any[] = []; // Информация по игрокам

  constructor()
  {
    if (instance) return instance;
    instance = this;
  }

  init(n)
  {
    this.deck = deck;
    const dropouts = get_dropouts(n);
    this._build_plan(dropouts);
  }

  _build_plan(dropouts)
  {
    this.plan.push(new Shuffle(this));

    let num = 0;
    let first = true;
    for (const dropout of dropouts) 
    {
      const type = first ? CardType.Profession : null;
      this.plan.push(new Round(this, num, type));
      this.plan.push(new Voting(this, dropout));
      this.plan.push(new Checkout(this));
      first = false;
      num++;
    }
    this.plan.push(new Finish(this));
  }

  execute_next()
  {
    if (this.plan.length <= 0)
    {
      console.log('Game plan is over!');
      return;
    }

    this.stage = this.plan.shift()!;
    this.stage.execute();
  }
}
