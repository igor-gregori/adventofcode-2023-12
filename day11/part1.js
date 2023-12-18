const { buildMatriz, printMatriz } = require('./utils');

const { applySpaceExpansion, numberingGalaxies, calculateDistance } = require('./logic');

const space = buildMatriz('input_final.txt');

const { spaceExpanded } = applySpaceExpansion(space);

const { galaxiesCoordinates } = numberingGalaxies(spaceExpanded);

const numberOfGalaxies = galaxiesCoordinates.length;

const distances = [];
for (let og = 0; og < numberOfGalaxies; og++) {
  for (let dg = og + 1; dg < numberOfGalaxies; dg++) {
    distances.push(calculateDistance(galaxiesCoordinates[og], galaxiesCoordinates[dg]));
  }
}

let sumOfDistances = 0;
for (const distance of distances) sumOfDistances += distance;
console.info('sumOfDistances:', sumOfDistances);
