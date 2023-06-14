import Game from '../game.js';
import type Base from './stage_base.js';

export default class Checkout implements Base
{
  game: Game;

  constructor(game: Game)
  {
    this.game = game;
  }

  execute() {}
  finished() {}

  handle_card_click() {}
  handle_vote_submit() {}
}
