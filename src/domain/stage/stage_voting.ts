import Game from '../game.js';
import type Base from './stage_base.js';

export default class Voting implements Base
{
  game: Game;
  dropout: number;

  constructor(game: Game, dropout: number)
  {
    this.game = game;
    this.dropout = dropout;
  }

  execute() {}
  finished() {}

  handle_card_click() {}
  handle_vote_submit() {}
}
