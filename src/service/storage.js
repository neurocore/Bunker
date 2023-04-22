const pre = process.env.VUE_APP_PRE;
const dev = process.env.NODE_ENV == 'development';

export function get(name, def)
{
  const val = sessionStorage.getItem(`${pre}_${name}`);
  return val || def;
}

export function set(name, val)
{
  sessionStorage.setItem(`${pre}_${name}`, val);
}

export function get_global(name, def)
{
  const val = dev ? sessionStorage.getItem(`${pre}_${name}`)
                  : localStorage.getItem(`${pre}_${name}`);
  return val || def;
}

export function set_global(name, val)
{
  if (dev)
    sessionStorage.setItem(`${pre}_${name}`, val);
  else
    localStorage.setItem(`${pre}_${name}`, val);
}
