export default function isEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (typeof obj1 !== 'object' || obj1 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!isEqual(obj1[key] as Record<string, unknown>, obj2[key] as Record<string, unknown>)) {
      return false;
    }
  }

  return true;
}
