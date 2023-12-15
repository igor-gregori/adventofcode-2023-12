const { instructions, map } = require("./input_final");

let step = 1;

function getInstruction(step) {
  const instruction = instructions[step % instructions.length];
  return instruction === "L" ? 0 : 1;
}

let node = "AAA";

while (true) {
  node = map[node][getInstruction(step - 1)];
  if (node === "ZZZ") break;
  step++;
}

console.info("step:", step);
