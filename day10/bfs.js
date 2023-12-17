function countEnclosedFloor(matrixMaze) {
  const rows = matrixMaze.length;
  const columns = matrixMaze[0].length;
  const visited = new Set();
  let floorCount = 0;

  function bfs(i, j) {
    const queue = [[i, j]];
    visited.add(`${i}-${j}`);

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < rows &&
          ny >= 0 &&
          ny < columns &&
          matrixMaze[nx][ny] === '.' &&
          !visited.has(`${nx}-${ny}`)
        ) {
          visited.add(`${nx}-${ny}`);
          queue.push([nx, ny]);
        }
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const point = matrixMaze[i][j];

      if (point === '.' && !visited.has(`${i}-${j}`)) {
        if (i === 0 || i === rows - 1 || j === 0 || j === columns - 1) {
          bfs(i, j);
        } else {
          floorCount++;
        }
      }
    }
  }

  return floorCount;
}

module.exports = {
  countEnclosedFloor,
};
