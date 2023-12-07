const fs = require('fs')

const filePath = 'input_final.txt'

const possibleGame = [12, 13, 14]

const possibleRedCubes = possibleGame[0]
const possibleGreenCubes = possibleGame[1]
const possibleBlueCubes = possibleGame[2]

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


  const possibleGames = []
  for (const gameData of totalGameData) {
    const numberOfGame = gameData[0]
    let isPossibleGame = true
    for (let i = 1; i < gameData.length; i++) {
      const redCubes = gameData[i][0]
      const greenCubes = gameData[i][1]
      const blueCubes = gameData[i][2]

      if (redCubes > possibleRedCubes) isPossibleGame = false
      if (greenCubes > possibleGreenCubes) isPossibleGame = false
      if (blueCubes > possibleBlueCubes) isPossibleGame = false
    }
    if (isPossibleGame) possibleGames.push(numberOfGame)
  }

  console.log("possibleGames: ", possibleGames)
  console.log("sum of possibleGames: ", possibleGames.reduce((acumulador, numero) => { return acumulador + numero; }, 0))
}

readLines(filePath)
