const {
  countOccurencesInString,
  sumElementsOfArray,
  decreaseOne,
  compareArrays,
} = require('./utils');

function getValuesOfPositionControl(allowedPositions, positionControl) {
  const iterationPosition = [];
  for (let i = 0; i < positionControl.length; i++) {
    const ep1 = allowedPositions.length - positionControl[i];
    const ep2 = positionControl.length - i;
    const r = ep1 - ep2;
    iterationPosition.push(allowedPositions[r]);
  }
  return iterationPosition;
}

function getNextIterationPosition(allowedPositions, positionControl) {
  const sumOfPositions = sumElementsOfArray(positionControl);
  if (sumOfPositions === 0) {
    return null;
  }
  const nextPositionControl = decreaseOne(positionControl);
  const nextIterationPosition = getValuesOfPositionControl(allowedPositions, nextPositionControl);
  return nextIterationPosition;
}

function findAllowedPositions(record) {
  const allowedPositions = [];
  for (let i = 0; i < record.length; i++) {
    if (record[i] === '?') allowedPositions.push(i);
  }
  return allowedPositions;
}

function buildPossibleRecord(record, iterationPosition) {
  let possibleRecord = record.replaceAll('?', '.').split('');
  for (const i of iterationPosition) {
    possibleRecord[i] = '#';
  }
  return possibleRecord.join('');
}

function evaluateRecord(record, groups) {
  const recordGroup = record
    .split('.')
    .filter((e) => e !== '')
    .map((e) => e.length);

  return compareArrays(recordGroup, groups);
}

function calculateNumberOfPossibleArrangements(record, groups) {
  const totalBrokenSprings = countOccurencesInString(record, '#');
  const totalGrouping = sumElementsOfArray(groups);
  const totalDifferentPositionsToHandle = totalGrouping - totalBrokenSprings;

  const allowedPositions = findAllowedPositions(record);
  let iterationPosition = allowedPositions.slice(0, totalDifferentPositionsToHandle);

  const maxTravelPosition = allowedPositions.length - iterationPosition.length;
  let positionControl = Array(iterationPosition.length).fill(maxTravelPosition);

  let numberOfPossibleArrangements = 0;
  while (true) {
    const possibleRecord = buildPossibleRecord(record, iterationPosition);

    if (evaluateRecord(possibleRecord, groups)) {
      numberOfPossibleArrangements += 1;
    }

    iterationPosition = getNextIterationPosition(allowedPositions, positionControl);
    if (iterationPosition === null) {
      break;
    }
  }

  return numberOfPossibleArrangements;
}

module.exports = {
  calculateNumberOfPossibleArrangements,
};
