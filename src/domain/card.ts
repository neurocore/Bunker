/**
 * Некоторые карты содержат грубый контент, поэтому они были
 * промаркированы соответствующим типом. Планируется возможность
 * изымать некоторые типы карт из игры если они не желательны
 */

enum Rude { Sex, Alko, Drugs, Violence };
enum Type
{
  Profession = 'pro', // players
  Biology    = 'bio',
  Health     = 'hea',
  Hobbies    = 'hob',
  Baggage    = 'bag',
  Facts      = 'fac',
  Specials   = 'spe', 

  Bunker     = 'bun', // global
  Danger     = 'dan',
  Cataclysm  = 'cat' 
};

type Id = string;         // имя карты
type Cat = string;         // категория
type Name = `${Cat}_${Id}`; // полное имя карты

const CATS = Object.values(Type) as string[];

function is_valid(cat: Cat): boolean
{
  return CATS.includes(cat);
}

function get_id(card: Name): Id
{
  const parts = card.split('_', 1);
  return (parts.length != 2) ? '' : parts[1];
}

function get_cat(card: Name): Cat
{
  const parts = card.split('_', 1);
  if (parts.length != 2) return '';
  return is_valid(parts[0]) ? parts[0] : '';
}

export
{
  Rude, Type,
  type Id, type Cat, type Name,
  is_valid, get_id, get_cat
};
