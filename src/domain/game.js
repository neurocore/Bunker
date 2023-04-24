import { state } from '../state.js';
import * as Stage from './stage.js';
import * as Rules from './rules.js';

class Game
{
  constructor()
  {
    this.stage = null;
    this.plan = [];
    this.deck = [];
  }

  init(n)
  {
    const dropouts = Rules.get_dropout_counts(n);

    this.plan.push(new Stage.Shuffle());

    let first = true;
    for (const dropout of dropouts)
    {
      const type = first ? Rules.CardType.Profession : null;
      this.plan.push(new Stage.Round(type));
      this.plan.push(new Stage.Voting(dropout));
      this.plan.push(new Stage.Checkout());
      first = false;
    }
    this.plan.push(new Stage.Finish());
  }

  start()
  {
    for (const stage of this.plan)
    {
      stage.execute(state);
    }
  }
}

export const game = new Game();
