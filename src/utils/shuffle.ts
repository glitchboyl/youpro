export default function shuffle(array: string[]) {
	const shuffled = [...array];
  const lastIndex = shuffled.length - 1;
  let temp;
  for (let i = 0; i < lastIndex; i++) {
    const random = Math.floor(Math.random() * (lastIndex - i + 1)) + i;
    temp = shuffled[random];
    shuffled[random] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
}