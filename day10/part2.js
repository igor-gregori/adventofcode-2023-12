const { pipeMaze, loop } = require('./part1');
// const { countEnclosedFloor } = require('./bfs');
const { countEnclosedDots } = require('./dfs');

const max_l = pipeMaze.length;
const max_c = pipeMaze.length;

const maze = [];

for (let i = 0; i < max_l; i++) {
  const mazeLine = [];
  for (let j = 0; j < max_c; j++) {
    mazeLine.push('.');
  }
  maze.push(mazeLine);
}

for (const [l, c] of loop) {
  maze[l][c] = 'L';
}

const enclosedDots = countEnclosedDots(maze);

console.info('enclosedFloor:', enclosedDots);
