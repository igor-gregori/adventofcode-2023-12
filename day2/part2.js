const fs = require('fs')

const filePath = 'input_final.txt'

function readLines(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8')
    const lines = data.split('\n')

    const totalGameData = []

    for (const line of lines) {
        const gameData = []

        const [game, gameResults] = line.split(':')
        const numberOfGame = Number(game.replace('Game ', ''))

        gameData.push(numberOfGame)

        const subGameResults = gameResults.replace(/\s/g, "").split(';')
        for (const subGameResult of subGameResults) {
            const unitGameResults = subGameResult.split(',')
            let red = 0, green = 0, blue = 0
            for (const unitGameResult of unitGameResults) {
                if (unitGameResult.includes('red')) red = Number(unitGameResult.replace('red', ''))
                if (unitGameResult.includes('green')) green = Number(unitGameResult.replace('green', ''))
                if (unitGameResult.includes('blue')) blue = Number(unitGameResult.replace('blue', ''))
            }
            gameData.push([red, green, blue])
        }
        totalGameData.push(gameData)
    }

    const minimumGames = []
    for (const gameData of totalGameData) {
        const numberOfGame = gameData[0]

        let minimunRedCubes = 0
        let minimunGreenCubes = 0
        let minimunBlueCubes = 0
        for (let i = 1; i < gameData.length; i++) {
            const redCubes = gameData[i][0]
            const greenCubes = gameData[i][1]
            const blueCubes = gameData[i][2]

            if (redCubes > minimunRedCubes) minimunRedCubes = redCubes
            if (greenCubes > minimunGreenCubes) minimunGreenCubes = greenCubes
            if (blueCubes > minimunBlueCubes) minimunBlueCubes = blueCubes
        }
        const multiplicationOfMinimum = minimunRedCubes * minimunGreenCubes * minimunBlueCubes
        minimumGames.push([numberOfGame, [minimunRedCubes, minimunGreenCubes, minimunBlueCubes], multiplicationOfMinimum])
    }

    let sumOfMultiplicationOfMinimum = 0
    for (const minimumGame of minimumGames) sumOfMultiplicationOfMinimum += minimumGame[2]

    console.log("🎲 minimumGames: ", minimumGames)
    console.log("🔑 sumOfMultiplicationOfMinimum: ", sumOfMultiplicationOfMinimum)
    console.log('✅ File reading completed.')
}

readLines(filePath)
