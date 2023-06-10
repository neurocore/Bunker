import { AES, enc } from 'crypto-js';
import { cards } from './cards.js';
import * as Utils from './utils.js';

let instance = null;

class Rules
{
  CardType = Utils.Enum(
    'Profession', 'Biology', 'Health', 'Hobbies', 'Baggage', 'Facts',
    'Specials', // player's

    'Bunker', 'Danger', 'Cataclysm' // global
  );

  RudeType = Utils.Enum('Sex', 'Alko', 'Drugs', 'Violence');

  constructor()
  {
    if (instance) return instance;

    this.random = Math.random();

    const key = process.env.VUE_APP_ENCRYPT_SECRET;
    const bytes = AES.decrypt(cards, key);
    this.cards = Object.freeze(JSON.parse(bytes.toString(enc.Utf8)));

    if (process.env.NODE_ENV == 'development') console.log(this.cards);

    this.deck = {};
    for (const [type, obj] of Object.entries(this.cards))
    {
      const names = Object.keys(obj);
      this.deck[type] = names.map(name => `${type}_${name}`);
    }
    this.deck = Object.freeze(this.deck);

    this.instance = this;
  }

  get_cards()
  {
    return this.cards;
  }

  get_deck()
  {
    return {...this.deck};
  }

  get_dropout_counts(n)
  {
    const empty = [0, 0, 0, 0, 0];
    const dropouts =
    [
      empty, empty, empty, empty,

      [0, 0, 0, 1, 1], // 4
      [0, 0, 1, 1, 1], // 5
      [0, 0, 1, 1, 1], // 6
      [0, 1, 1, 1, 1], // 7
      [0, 1, 1, 1, 1], // 8
      [0, 1, 1, 1, 2], // 9
      [0, 1, 1, 1, 2], // 10
      [0, 1, 1, 2, 2], // 11
      [0, 1, 1, 2, 2], // 12
      [0, 1, 2, 2, 2], // 13
      [0, 1, 2, 2, 2], // 14
      [0, 2, 2, 2, 2], // 15
      [0, 2, 2, 2, 2], // 16
    ];

    return n < 4 || n > 16 ? empty : dropouts[n];
  }
}

const rules = new Rules;
export default rules;
