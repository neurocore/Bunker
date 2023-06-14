import Game from '../game.js';
import type Base from './stage_base.js';
import random from 'random';

export default class Shuffle implements Base
{
  game: Game;

  constructor(game: Game)
  {
    this.game = game;
  }

  execute()
  {
    for (const cards of Object.values(this.game.deck))
    {
      cards.sort(() => random.float(-.5, .5));
    }

    console.log(this.game.deck);
    this.game.execute_next();
  }

  finished() {}

  handle_card_click() {}
  handle_vote_submit() {}
}
