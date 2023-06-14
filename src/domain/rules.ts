import { AES, enc } from 'crypto-ts';
import { the_cards } from './cards.js';
import * as Card from './card.js';


/**
 * Вся информация по картам зашифрована секретным ключом
 */

const key = import.meta.env.VITE_APP_ENCRYPT_SECRET;
const bytes = AES.decrypt(the_cards, key);
const obj = JSON.parse(bytes.toString(enc.Utf8));
const cards = Object.freeze(obj) as Record<Card.Cat, Record<Card.Id, Object>>;

if (import.meta.env.DEV) console.log(cards);

type Deck = Record<Card.Cat, Card.Name[]>;

const deck: Deck = {};
for (const [cat, obj] of Object.entries(cards))
{
  const ids = Object.keys(obj) as Array<string>;
  deck[cat] = ids.map(id => `${cat}_${id}` as Card.Name);
}
Object.freeze(deck);


/** 
 * В игре всегда 5 раундов, поэтому количества выбывающих
 * игроков в каждом раунде можно представить через кортеж
 */

type Dropouts = [number, number, number, number, number];

function get_dropouts(players_n: number): Dropouts
{
  const empty: Dropouts = [0, 0, 0, 0, 0];
  const dropouts: Array<Dropouts> =
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

  return players_n < 4 || players_n > 16 ? empty
       : dropouts[players_n];
}

function get_info(cat: Card.Cat, id: Card.Id): any;
function get_info(card: Card.Name): any;

function get_info(cat_or_card: Card.Cat | Card.Name, id?: Card.Id): any
{
  const error = (text: string) =>
  {
    console.error(text);
    return null;
  }

  let cat: Card.Cat = '';

  if (id === undefined)
  {
    const card = cat_or_card;
    const parts = card.split('_', 1);
    if (parts.length != 2) return error(`wrong cat_id = '${card}'`);

    [cat, id] = parts as [Card.Cat, Card.Id];
  }
  else
  {
    cat = cat_or_card as Card.Cat;
  }

  if (!(cat in cards)) return error(`no cat = '${cat}' in cards`);
  if (!(id in cards[cat])) return error(`no id = '${id}' in cat '${cat}'`);

  return cards[cat][id];
}

export
{
  type Deck, type Dropouts,
  cards, deck,
  get_dropouts, get_info
};
