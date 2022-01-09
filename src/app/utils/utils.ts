/**
 * Get a fulfilled array of provided type with JSON data
 * @param ctor Type of constructor
 * @param input JSON object of data
 */

export function initGenericArrayFromJson<T>(
  ctor: new (p: any) => T,
  input: any
): T[] {
  const propertyArray: T[] = [];
  input.forEach((element) => {
    const tmpObj = create(ctor, element);
    propertyArray.push(tmpObj);
  });
  return propertyArray;
}

function create<T>(ctor: new (p: any) => T, val: any): T {
  return new ctor(val);
}

export function capitalise(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
