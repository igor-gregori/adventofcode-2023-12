const input = [[71530, 940200]];
const inputFinal = [[55826490, 246144110121111]];

const waysToWin = [];

for (const [time, distanceRecord] of inputFinal) {
  let countWaysToWin = 0;
  for (let opt = 1; opt < time; opt++) {
    const distance = opt * (time - opt);
    if (distance > distanceRecord) countWaysToWin++;
  }
  waysToWin.push(countWaysToWin);
}

const multOfWaysToWin = waysToWin.reduce(
  (accumulator, value) => accumulator * value,
  1
);

console.info("multOfWaysToWin:", multOfWaysToWin);
