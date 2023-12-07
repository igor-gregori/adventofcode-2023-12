const fs = require('fs')

const filePath = 'input_final.txt'

function printMatriz(matriz) {
    for (let line = 0; line < matriz.length; line++) {
        for (let column = 0; column < matriz[line].length; column++) {
            process.stdout.write(
                matriz[line][column].toString().padStart(2) + ' '
            )
        }
        console.log()
    }
}

function isDigit(caractere) {
    return !isNaN(caractere) && !isNaN(parseInt(caractere))
}

function isSymbol(caractere) {
    return !isDigit(caractere) && caractere !== '.'
}

function readLines(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8')
    const lines = data.split('\n')

    const matriz = []
    const matrizTermal = []
    for (const line of lines) {
        const matrizLine = []
        const matrizTermalLine = []

        for (const caractere of line) {
            matrizLine.push(caractere)
            matrizTermalLine.push(isSymbol(caractere) ? 2 : 0)
        }

        matriz.push(matrizLine)
        matrizTermal.push(matrizTermalLine)
    }


    const MAX_LINES = matrizTermal.length
    const MAX_COLUMNS = matrizTermal[0].length

    const symbolIndexes = []
    for (let line = 0; line < matrizTermal.length; line++) {
        for (let column = 0; column < matrizTermal[line].length; column++) {
            if (matrizTermal[line][column] == 2) symbolIndexes.push([line, column])
        }
    }

    for (const symbolIndex of symbolIndexes) {
        let minLine = symbolIndex[0] - 1
        let minColumn = symbolIndex[1] - 1
        if (minLine < 0) minLine = 0
        if (minColumn < 0) minColumn = 0

        let maxLine = symbolIndex[0] + 1
        let maxColumn = symbolIndex[1] + 1
        if (maxLine > MAX_LINES) maxLine = MAX_LINES
        if (maxColumn > MAX_COLUMNS) maxColumn = MAX_COLUMNS

        for (let line = minLine; line <= maxLine; line++) {
            for (let column = minColumn; column <= maxColumn; column++) {
                if (matrizTermal[line][column] !== 2) matrizTermal[line][column] = 1
            }
        }
    }

    const numberIndexes = []
    for (let line = 0; line < matriz.length; line++) {
        let caractereNumberIndexes = []
        for (let column = 0; column < matriz[line].length; column++) {
            if (isDigit(matriz[line][column])) {
                caractereNumberIndexes.push([line, column])
            } else {
                if (caractereNumberIndexes.length > 0) {
                    numberIndexes.push(caractereNumberIndexes)
                    caractereNumberIndexes = []
                }
            }
        }
        if (caractereNumberIndexes.length > 0) {
            numberIndexes.push(caractereNumberIndexes)
            caractereNumberIndexes = []
        }
    }

    const adjacentNumberIndexes = []
    for (const numberIndex of numberIndexes) {
        let isAdjacent = false
        for (const caractereIndex of numberIndex) {
            const line = caractereIndex[0]
            const column = caractereIndex[1]

            if (matrizTermal[line][column] > 0) {
                isAdjacent = true
                break
            }
        }
        if (isAdjacent) adjacentNumberIndexes.push(numberIndex)
    }

    const adjacentNumbers = []
    for (const numberIndex of adjacentNumberIndexes) {
        let number = ''
        for (const caractereIndex of numberIndex) {
            const line = caractereIndex[0]
            const column = caractereIndex[1]

            number += matriz[line][column]
        }
        adjacentNumbers.push(number)
    }

    let sum = 0
    for (const strNumber of adjacentNumbers) sum += Number(strNumber)

    console.log("sum:", sum)
}

readLines(filePath)