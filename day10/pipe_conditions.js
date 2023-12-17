const north = ['|', '7', 'F', 'S'];
const south = ['|', 'L', 'J', 'S'];
const east = ['-', 'J', '7', 'S'];
const west = ['-', 'L', 'F', 'S'];

const pipeConditions = {
  '|': { north, south },
  '-': { east, west },
  L: { north, east },
  J: { north, west },
  7: { south, west },
  F: { south, east },
  '.': {},
  S: { north, south, east, west },
};

module.exports = { pipeConditions };
