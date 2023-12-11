const { instructions, map } = require('./input_final_p2')

function getInstruction(step) {
    const instruction = instructions[step % instructions.length]
    return instruction === 'L' ? 0 : 1
}

let nodes = Object.keys(map).filter((node) => node[node.length - 1] === 'A')
let nodesStepsToZ = []

for (const node of nodes) {
    let step = 1
    let auxNode = node
    while (true) {
        auxNode = map[auxNode][getInstruction(step - 1)]
        if (auxNode[auxNode.length - 1] === 'Z') {
            nodesStepsToZ.push(step)
            console.log('nodesStepsToZ:', nodesStepsToZ)
            break
        }
        step++
    }
}

function calcularMDC(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

function calcularMMC(a, b) {
    return (a * b) / calcularMDC(a, b);
}

function calcularMMCArray(numeros) {
    if (numeros.length < 2) {
        throw new Error('A função requer pelo menos dois números para calcular o MMC.');
    }
    let mmcAtual = calcularMMC(numeros[0], numeros[1]);
    for (let i = 2; i < numeros.length; i++) {
        mmcAtual = calcularMMC(mmcAtual, numeros[i]);
    }
    return mmcAtual;
}

const mmc = calcularMMCArray(nodesStepsToZ);

console.info('nodesStepsToZ:', nodesStepsToZ)
console.info('mmc:', mmc)
