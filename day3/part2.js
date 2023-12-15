const fs = require("fs");

const filePath = "input_final.txt";

function printMatriz(matriz) {
  for (let line = 0; line < matriz.length; line++) {
    for (let column = 0; column < matriz[line].length; column++) {
      process.stdout.write(matriz[line][column].toString().padStart(4) + " ");
    }
    console.log();
  }
}

function isDigit(caractere) {
  return !isNaN(caractere) && !isNaN(parseInt(caractere));
}

function readLines(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  let id = 0;
  let lastIdInserted = -1;
  const gearIndexes = [];

  const matriz = [];
  const matrizIdentifier = [];
  for (const [lIndex, line] of lines.entries()) {
    const matrizLine = [];
    const matrizIdentifierLine = [];

    for (const [cIndex, caractere] of line.split("").entries()) {
      matrizLine.push(caractere);
      if (caractere === "*") {
        matrizIdentifierLine.push(".");
        gearIndexes.push([lIndex, cIndex]);
        if (lastIdInserted === id) id++;
      } else if (isDigit(caractere)) {
        matrizIdentifierLine.push(id);
        lastIdInserted = id;
      } else {
        matrizIdentifierLine.push(".");
        if (lastIdInserted === id) id++;
      }
    }
    if (lastIdInserted === id) id++;
    matriz.push(matrizLine);
    matrizIdentifier.push(matrizIdentifierLine);
  }

  const MAX_LINES = matrizIdentifier.length;
  const MAX_COLUMNS = matrizIdentifier[0].length;

  const adjacentIdentifiers = [];

  for (const gearIndex of gearIndexes) {
    let minLine = gearIndex[0] - 1;
    let minColumn = gearIndex[1] - 1;
    if (minLine < 0) minLine = 0;
    if (minColumn < 0) minColumn = 0;

    let maxLine = gearIndex[0] + 1;
    let maxColumn = gearIndex[1] + 1;
    if (maxLine > MAX_LINES) maxLine = MAX_LINES;
    if (maxColumn > MAX_COLUMNS) maxColumn = MAX_COLUMNS;

    let gearAdjacentIdentifiers = [];
    for (let line = minLine; line <= maxLine; line++) {
      for (let column = minColumn; column <= maxColumn; column++) {
        const caractere = matrizIdentifier[line][column];
        if (caractere !== ".") {
          if (!gearAdjacentIdentifiers.includes(caractere)) {
            gearAdjacentIdentifiers.push(caractere);
          }
        }
      }
    }
    adjacentIdentifiers.push(gearAdjacentIdentifiers);
  }

  const adjacentIdentifiersWithTwo = [];
  for (const adjacentIdentifier of adjacentIdentifiers) {
    if (adjacentIdentifier.length === 2) {
      adjacentIdentifiersWithTwo.push(adjacentIdentifier);
    }
  }

  const numberIndexes = [];
  for (const id of [].concat(...adjacentIdentifiersWithTwo)) {
    const identifierIndexes = [];
    for (let line = 0; line < matrizIdentifier.length; line++) {
      for (let column = 0; column < matrizIdentifier[line].length; column++) {
        const caractere = matrizIdentifier[line][column];
        // É possível otimizar aqui
        // Se o caractere for um número maior que o id
        //      Passo para o próximo id
        if (caractere === id) {
          identifierIndexes.push([line, column]);
        }
      }
    }
    numberIndexes.push(identifierIndexes);
  }

  const adjacentNumbers = [];
  for (const numberIndex of numberIndexes) {
    let number = "";
    for (const caractereIndex of numberIndex) {
      const line = caractereIndex[0];
      const column = caractereIndex[1];
      number += matriz[line][column];
    }
    adjacentNumbers.push(Number(number));
  }

  if (adjacentNumbers.length % 2 !== 0) {
    throw new Error("The number of elements must be even");
  }

  const gearRatios = [];
  for (let idx = 0; idx < adjacentNumbers.length; idx += 2) {
    gearRatios.push(adjacentNumbers[idx] * adjacentNumbers[idx + 1]);
  }

  let gearRatiosSum = 0;
  for (const gearRatio of gearRatios) gearRatiosSum += gearRatio;

  console.info("gearRatiosSum:", gearRatiosSum);
  // Errado -> gearRatiosSum: 236221603816 <- Muito grande (bug na matriz de indexação)
  // Errado -> gearRatiosSum: 118110801908 <- Muito grande (bug na matriz de indexação)
  // Errado -> gearRatiosSum: 71291110 <- Muito pequeno (bug na matriz de indexação)
  // Correto -> gearRatiosSum: 75220503
}

readLines(filePath);
