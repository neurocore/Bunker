import Game from '../game.ts';
import { Dropouts } from '../rules.ts';
import Stage from './stage_base.js';

export default class Voting implements Stage
{
  game: Game;
  dropouts: Dropouts;

  constructor(game: Game, dropouts: Dropouts)
  {
    this.game = game;
    this.dropouts = dropouts;
  }

  execute() {}
  finished() {}

  handle_card_click() {}
  handle_vote_submit() {}
}
