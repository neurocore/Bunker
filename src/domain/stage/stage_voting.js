import Stage from './stage_base.js';

export default class Voting extends Stage
{
  constructor(game, dropout)
  {
    super();
    this.game = game;
    this.dropout = dropout;
  }
}
