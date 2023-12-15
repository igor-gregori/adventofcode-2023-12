const fs = require("fs");

const filePath = "input_final.txt";

function isDigit(caractere) {
  return !isNaN(caractere) && !isNaN(parseInt(caractere));
}

function transformToArrayNumbers(strArray) {
  const result = [];
  for (const element of strArray.split(" ")) {
    if (isDigit(element)) result.push(Number(element));
  }
  return result;
}

function readLines(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  const pileOfColorfulCards = [];
  for (const line of lines) {
    const [cardName, numbers] = line.split(":");
    const cardNumber = cardName.replace("Card ", "");

    const [strWinningNumbers, strNumbersYouHave] = numbers.split("|");
    const winningNumbers = transformToArrayNumbers(strWinningNumbers);
    const numbersYouHave = transformToArrayNumbers(strNumbersYouHave);

    pileOfColorfulCards.push({
      cardNumber,
      winningNumbers,
      numbersYouHave,
      pointing: 0,
      total: 1,
    });
  }

  for (const [idx, card] of pileOfColorfulCards.entries()) {
    let points = 0;
    for (const yourNumber of card.numbersYouHave) {
      for (const winningNumber of card.winningNumbers) {
        if (yourNumber === winningNumber) points++;
      }
    }
    pileOfColorfulCards[idx].pointing = points;
  }

  for (const [idxCard, card] of pileOfColorfulCards.entries()) {
    for (let i = 0; i < card.pointing; i++) {
      pileOfColorfulCards[idxCard + 1 + i].total += 1 * card.total;
    }
  }

  let sumOfTotals = 0;
  for (const card of pileOfColorfulCards) sumOfTotals += card.total;

  console.info("sumOfTotals:", sumOfTotals);
}

readLines(filePath);
