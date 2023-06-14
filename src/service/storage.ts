const pre = import.meta.env.VITE_APP_PRE;
const dev = import.meta.env.DEV;

export function get(name: string, def: any)
{
  const val = sessionStorage.getItem(`${pre}_${name}`);
  return val || def;
}

export function set(name: string, val: any)
{
  sessionStorage.setItem(`${pre}_${name}`, val);
}

export function get_global(name: string, def: any): any
{
  const val = dev ? sessionStorage.getItem(`${pre}_${name}`)
                  : localStorage.getItem(`${pre}_${name}`);
  return val || def;
}

export function set_global(name: string, val: any)
{
  if (dev)
    sessionStorage.setItem(`${pre}_${name}`, val);
  else
    localStorage.setItem(`${pre}_${name}`, val);
}
