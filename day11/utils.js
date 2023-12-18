const fs = require('fs');

function buildMatriz(filePath) {
  const matriz = [];
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');
  for (const line of lines) matriz.push(line.split(''));
  return matriz;
}

function printMatriz(matriz) {
  for (let line = 0; line < matriz.length; line++) {
    for (let column = 0; column < matriz[line].length; column++) {
      process.stdout.write(matriz[line][column].toString().padStart(2) + ' ');
    }
    console.log();
  }
}

module.exports = {
  buildMatriz,
  printMatriz,
};
