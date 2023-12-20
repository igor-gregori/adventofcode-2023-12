const { conditionRecords } = require('./input_final');
const { calculateNumberOfPossibleArrangements } = require('./logic');
const { sumElementsOfArray } = require('./utils');

const possibleArrangements = [];

for (const [record, groups] of conditionRecords) {
  const result = calculateNumberOfPossibleArrangements(record, groups);
  possibleArrangements.push(result);
}

let sumOfPossibleArrangements = sumElementsOfArray(possibleArrangements);
console.info(sumOfPossibleArrangements);
