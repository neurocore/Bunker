import Game from '../game.ts';
import Stage from './stage_base.js';

export default class Finish implements Stage
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
