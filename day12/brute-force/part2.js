const { conditionRecords } = require('./input');
const { calculateNumberOfPossibleArrangements, unfoldRecords } = require('./logic');
const { sumElementsOfArray } = require('./utils');

const possibleArrangements = [];

let counter = 1;
for (const [record, groups] of conditionRecords) {
  const startTime = new Date();

  const { unfoldRecord, unfoldGroups } = unfoldRecords(record, groups);
  const result = calculateNumberOfPossibleArrangements(unfoldRecord, unfoldGroups);

  possibleArrangements.push(result);

  console.log(`Foram calculados ${counter} registros de um total de ${conditionRecords.length}.`);

  const endTime = new Date();
  const timeDifference = endTime - startTime;
  const seconds = timeDifference / 1000;

  console.log(`O calculo demorou ${seconds} segundos.`);
  console.log(`O resultado para o registro ${counter} foi ${result}.`);
  console.log('---');
  counter++;
}

let sumOfPossibleArrangements = sumElementsOfArray(possibleArrangements);
console.info(sumOfPossibleArrangements);
