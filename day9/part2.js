const { report } = require("./input_final");

const previousValues = [];

function getLineOfDifferences(line) {
  const lineOfDifferences = [];
  for (let i = 0; i < line.length - 1; i++) {
    lineOfDifferences.push(line[i + 1] - line[i]);
  }
  return lineOfDifferences;
}

function getPreviousValue(history) {
  const extrapolate = [history];
  let lineOfDifferences = history;
  while (true) {
    const qttZeros = lineOfDifferences.filter((e) => e === 0).length;
    if (qttZeros === lineOfDifferences.length) {
      break;
    } else {
      lineOfDifferences = getLineOfDifferences(lineOfDifferences);
      extrapolate.push(lineOfDifferences);
    }
  }

  let firstNumberOfLine = 0;
  for (const line of extrapolate.reverse()) {
    firstNumberOfLine = line[0] - firstNumberOfLine;
    line.push(firstNumberOfLine);
  }

  return firstNumberOfLine;
}

for (const history of report) {
  previousValues.unshift(getPreviousValue(history));
}

let sumOfPreviousValues = 0;
for (const value of previousValues) sumOfPreviousValues += value;

console.log("previousValues:", previousValues);
console.info("sumOfNextValues:", sumOfPreviousValues);
