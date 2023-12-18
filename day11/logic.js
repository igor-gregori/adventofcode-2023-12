function applySpaceExpansion(space) {
  const voidLines = [];

  const max_l = space.length;
  const max_c = space[0].length;

  for (const [idx, line] of space.entries()) {
    if (line.filter((e) => e === '.').length === line.length) {
      voidLines.push(idx);
    }
  }

  const voidColunms = [];
  for (let col = 0; col < max_c; col++) {
    let qttVoid = 0;
    for (const line of space) {
      if (line[col] === '.') qttVoid++;
    }
    if (qttVoid === max_l) voidColunms.push(col);
  }

  const spaceExpanded = [];
  for (let l = 0; l < max_l; l++) {
    const spaceExpandedLine = [];
    for (let c = 0; c < max_c; c++) {
      spaceExpandedLine.push(space[l][c]);
      if (voidColunms.includes(c)) spaceExpandedLine.push('.');
    }
    if (voidLines.includes(l)) {
      const spaceExpandedLineAux = [];
      for (let ca = 0; ca < max_c + voidColunms.length; ca++) spaceExpandedLineAux.push('.');
      spaceExpanded.push(spaceExpandedLineAux);
    }
    spaceExpanded.push(spaceExpandedLine);
  }

  return {
    spaceExpanded,
    voidLines,
    voidColunms,
  };
}

function numberingGalaxies(space) {
  const spaceNumered = [];
  const galaxiesCoordinates = [];

  const max_l = space.length;
  const max_c = space[0].length;

  let counter = 1;

  for (let l = 0; l < max_l; l++) {
    const spaceNumeredLine = [];
    for (let c = 0; c < max_c; c++) {
      if (space[l][c] === '#') {
        galaxiesCoordinates.push([l, c]);
        spaceNumeredLine.push(counter);
        counter++;
      } else {
        spaceNumeredLine.push('.');
      }
    }
    spaceNumered.push(spaceNumeredLine);
  }

  return {
    galaxiesCoordinates,
    spaceNumered,
  };
}

function calculateDistance(originGalaxy, destinyGalaxy) {
  return (
    Math.abs(originGalaxy[0] - destinyGalaxy[0]) + Math.abs(originGalaxy[1] - destinyGalaxy[1])
  );
}

function calculateAncientGalaxiesDistance(
  originGalaxy,
  destinyGalaxy,
  voidLines,
  voidColunms,
  multiplicationFactor
) {
  const minLine = Math.min(originGalaxy[0], destinyGalaxy[0]);
  const maxLine = Math.max(originGalaxy[0], destinyGalaxy[0]);
  const qttVoidLinesBetweenGalaxies = voidLines.filter((e) => e > minLine && e < maxLine).length;

  const minColumn = Math.min(originGalaxy[1], destinyGalaxy[1]);
  const maxColumn = Math.max(originGalaxy[1], destinyGalaxy[1]);
  const qttVoidColumnsBetweenGalaxies = voidColunms.filter(
    (e) => e > minColumn && e < maxColumn
  ).length;

  let linesDifference = Math.abs(originGalaxy[0] - destinyGalaxy[0]);
  let columnsDifference = Math.abs(originGalaxy[1] - destinyGalaxy[1]);

  linesDifference += qttVoidLinesBetweenGalaxies * (multiplicationFactor - 1);
  columnsDifference += qttVoidColumnsBetweenGalaxies * (multiplicationFactor - 1);

  return linesDifference + columnsDifference;
}

module.exports = {
  applySpaceExpansion,
  numberingGalaxies,
  calculateDistance,
  calculateAncientGalaxiesDistance,
};
