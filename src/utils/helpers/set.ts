import { Indexed } from '../../types';

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const keys = path.split('.');

  let current = object as Indexed;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!current.hasOwnProperty(key) || typeof current[key] !== 'object') {
      current[key] = {};
    }

    current = current[key] as Indexed;
  }

  current[keys[keys.length - 1]] = value;

  return object;
}
