const fs = require('fs');
const { pipeConditions } = require('./pipe_conditions');

const filePath = './inputs/input_final.txt';

const pipeMaze = [];

function readLines(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');
  for (const line of lines) pipeMaze.push(line.split(''));
}

readLines(filePath);

function findInitialPosition() {
  for (let l = 0; l < pipeMaze.length; l++) {
    for (let c = 0; c < pipeMaze[l].length; c++) {
      if (pipeMaze[l][c] === 'S') return [l, c];
    }
  }
}

function isPossibleConnectPipes(actualPipe, nextPipe, direction) {
  const conditions = pipeConditions[actualPipe]?.[direction];
  return conditions ? conditions.includes(nextPipe) : false;
}

function getNextPipe(actualPipe) {
  const [l, c] = actualPipe;

  const north = [l - 1, c];
  const south = [l + 1, c];
  const east = [l, c + 1];
  const west = [l, c - 1];

  const getDirectionPipeValue = (direction) => {
    try {
      const value = pipeMaze[direction[0]][direction[1]];
      return value;
    } catch (err) {
      return null;
    }
  };

  const actualPipeValue = getDirectionPipeValue(actualPipe);

  const possibleConnections = [];

  const northPipeValue = getDirectionPipeValue(north);
  if (
    lastDirection !== 'north' &&
    northPipeValue !== null &&
    isPossibleConnectPipes(actualPipeValue, northPipeValue, 'north')
  ) {
    possibleConnections.push([north, 'north']);
  }

  const southPipeValue = getDirectionPipeValue(south);
  if (
    lastDirection !== 'south' &&
    southPipeValue !== null &&
    isPossibleConnectPipes(actualPipeValue, southPipeValue, 'south')
  ) {
    possibleConnections.push([south, 'south']);
  }

  const eastPipeValue = getDirectionPipeValue(east);
  if (
    lastDirection !== 'east' &&
    eastPipeValue !== null &&
    isPossibleConnectPipes(actualPipeValue, eastPipeValue, 'east')
  ) {
    possibleConnections.push([east, 'east']);
  }

  const westPipeValue = getDirectionPipeValue(west);
  if (
    lastDirection !== 'west' &&
    westPipeValue !== null &&
    isPossibleConnectPipes(actualPipeValue, westPipeValue, 'west')
  ) {
    possibleConnections.push([west, 'west']);
  }

  if (actualPipe !== S && possibleConnections.length > 1) {
    throw new Error(`There is a fork ${actualPipe} with ${possibleConnections}`);
  }

  return possibleConnections[0];
}

const loop = [];

const S = findInitialPosition();

loop.push([S, 0]);

let counter = 1;

var lastDirection = '';

for (const [pipe, _] of loop) {
  const [nextPipe, direction] = getNextPipe(pipe);
  const nextPipeValue = pipeMaze[nextPipe[0]][nextPipe[1]];

  if (nextPipeValue === 'S') break;

  loop.push([nextPipe, counter]);

  if (direction === 'north') lastDirection = 'south';
  if (direction === 'south') lastDirection = 'north';
  if (direction === 'east') lastDirection = 'west';
  if (direction === 'west') lastDirection = 'east';

  counter++;
}

const farthestPoint = loop.length / 2;

// console.info("farthestPoint:", farthestPoint);

module.exports = {
  pipeMaze,
  loop: loop.map((e) => e[0]),
};
