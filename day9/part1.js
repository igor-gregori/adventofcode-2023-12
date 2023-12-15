const { report } = require("./input_final");

const nextValues = [];

function getLineOfDifferences(line) {
  const lineOfDifferences = [];
  for (let i = 0; i < line.length - 1; i++) {
    lineOfDifferences.push(line[i + 1] - line[i]);
  }
  return lineOfDifferences;
}

function getNextValue(history) {
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

  let lastNumberOfLine = 0;
  for (const line of extrapolate.reverse()) {
    lastNumberOfLine += line[line.length - 1];
    line.push(lastNumberOfLine);
  }

  return lastNumberOfLine;
}

for (const history of report) {
  nextValues.push(getNextValue(history));
}

let sumOfNextValues = 0;
for (const value of nextValues) sumOfNextValues += value;

console.info("sumOfNextValues:", sumOfNextValues);
