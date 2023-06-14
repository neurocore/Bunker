import * as Card from '../card.js';
import type Base from './stage_base.js';
import random from 'random';

export default class Round implements Base
{
  game: any;
  num: Number;
  type: Card.Type | null;

  constructor(game: any, num: Number, type: Card.Type | null)
  {
    this.game = game;
    this.num = num;
    this.type = type;

    console.log('created round with num & type', num, type);
  }

  execute()
  {
    console.log('round started');

    const cards_bun = this.game.deck['bun'];
    const n = random.int(0, cards_bun.length - 1);
    const choosed = cards_bun.splice(n, 1);
    console.log(choosed);

    this.game.bun.push(choosed);
  }

  finished() {}

  handle_card_click()
  {

  }

  handle_vote_submit() {}
}
