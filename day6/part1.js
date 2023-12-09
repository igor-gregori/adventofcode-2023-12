const input = [[7, 9], [15, 40], [30, 200]]
const inputFinal = [[55, 246], [82, 1441], [64, 1012], [90, 1111]]

const waysToWin = []

for (const [time, distanceRecord] of inputFinal) {
    let countWaysToWin = 0
    for (let opt = 1; opt < time; opt++) {
        const distance = opt * (time - opt)
        if (distance > distanceRecord) countWaysToWin++
    }
    waysToWin.push(countWaysToWin)
}

const multOfWaysToWin = waysToWin.reduce((accumulator, value) => accumulator * value, 1)

console.info('multOfWaysToWin:', multOfWaysToWin)
