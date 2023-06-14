import { AES, enc } from 'crypto-ts';
import { the_cards } from './cards.js';

/**
 * Некоторые карты содержат грубый контент, поэтому они были
 * промаркированы соответствующим типом. Планируется возможность
 * изымать некоторые типы карт из игры если они не желательны
 */

enum RudeType { Sex, Alko, Drugs, Violence };
enum CardType
{
  Profession, Biology, Health, Hobbies, Baggage, Facts, Specials, // players
  Bunker, Danger, Cataclysm // global
};


/**
 * Вся информация по картам зашифрована секретным ключом
 */

const key = import.meta.env.VITE_APP_ENCRYPT_SECRET;
const bytes = AES.decrypt(the_cards, key);
const cards = Object.freeze(JSON.parse(bytes.toString(enc.Utf8)));

if (import.meta.env.NODE_ENV == 'development') console.log(cards);

const deck: Record<string, Array<string>> = {};
for (const [type, obj] of Object.entries(cards))
{
  const names = Object.keys(obj as Array<string>);
  deck[type] = names.map(name => `${type}_${name}`);
}
Object.freeze(deck);


/** 
 * В игре всегда 5 раундов, поэтому количества выбывающих
 * игроков в каждом раунде можно представить через кортеж
 */

type Dropouts = [number, number, number, number, number];

function get_dropouts(players_n: number) : Dropouts
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

export
{
  RudeType, CardType, type Dropouts,
  cards, deck,
  get_dropouts
};
