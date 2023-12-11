const { instructions, map } = require('./input_final')

const letters = [
    ['A', 1], ['B', 1], ['C', 1], ['D', 1], ['E', 1], ['F', 1], ['G', 1], ['H', 1], ['I', 1], ['J', 1],
    ['K', 1], ['L', 1], ['M', 1], ['N', 1], ['O', 1], ['P', 1], ['Q', 1], ['R', 1], ['S', 1], ['T', 1],
    ['U', 1], ['V', 1], ['W', 1], ['X', 1], ['Y', 1], ['Z', 1]
]

function getNumberOfLetter(letter) {
    for (let idx = 0; idx < letters.length; idx++) {
        if (letters[idx][0] === letter) {
            letters[idx][1]++
            return letters[idx][1] - 1
        }
    }
}

const dictionary = []

for (const node of Object.keys(map)) {
    const letter = node[2]
    const number = getNumberOfLetter(letter)
    dictionary.push([node, `${number}${number}${letter}`])
}

function getValueFromDictionary(node) {
    for (const [key, value] of dictionary) if (key === node) return value
    throw new Error(`Impossible to find a value from node ${node}`)
}

const mapTransformed = {}

for (const key of Object.keys(map)) {
    const leftValue = map[key][0]
    const rightValue = map[key][1]

    const keyTransformed = getValueFromDictionary(key)
    const leftValueTransformed = getValueFromDictionary(leftValue)
    const rightValueTransformed = getValueFromDictionary(rightValue)

    mapTransformed[keyTransformed] = [leftValueTransformed, rightValueTransformed]
}

module.exports = {
    instructions,
    map: mapTransformed
}
