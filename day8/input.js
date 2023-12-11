const instructions = ['R', 'L']

const map = {
    'AAA': ['BBB', 'CCC'],
    'BBB': ['DDD', 'EEE'],
    'CCC': ['ZZZ', 'GGG'],
    'DDD': ['DDD', 'DDD'],
    'EEE': ['EEE', 'EEE'],
    'GGG': ['GGG', 'GGG'],
    'ZZZ': ['ZZZ', 'ZZZ']
}

module.exports = {
    instructions,
    map
}