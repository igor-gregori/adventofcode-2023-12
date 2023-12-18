const { buildMatriz, printMatriz } = require('./utils');

const {
  applySpaceExpansion,
  numberingGalaxies,
  calculateAncientGalaxiesDistance,
} = require('./logic');

const space = buildMatriz('input_final.txt');

const { voidLines, voidColunms } = applySpaceExpansion(space);

const { galaxiesCoordinates, spaceNumered } = numberingGalaxies(space);

// printMatriz(spaceNumered);

const numberOfGalaxies = galaxiesCoordinates.length;

const distances = [];
for (let og = 0; og < numberOfGalaxies; og++) {
  for (let dg = og + 1; dg < numberOfGalaxies; dg++) {
    distances.push(
      calculateAncientGalaxiesDistance(
        galaxiesCoordinates[og],
        galaxiesCoordinates[dg],
        voidLines,
        voidColunms,
        1000000
      )
    );
  }
}

let sumOfDistances = 0;
for (const distance of distances) sumOfDistances += distance;
console.info('sumOfDistances:', sumOfDistances);
