export function shuffleArray<T>(input: readonly T[]): T[] {
  const array = input.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    if (j >= 0 && j < array.length) {
      const temp = array[i]!;
      array[i] = array[j]!;
      array[j] = temp;
    }
  }
  return array;
}
