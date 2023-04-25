import * as Utils from './utils.js';

export const CardType = Utils.Enum(
  'Profession', // player's
  'Biology',
  'Health',
  'Hobbies',
  'Baggage',
  'Facts',

  'Specials',

  'Bunker', // global
  'Danger',
  'Cataclysm'
);

export const RudeType = Utils.Enum('Sex', 'Alko', 'Drugs', 'Violence');

export function get_dropout_counts(n)
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
