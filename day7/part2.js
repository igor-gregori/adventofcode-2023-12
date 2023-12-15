const { listOfHands } = require("./input_final");

function cardCounter(cards, cardToCount) {
  let counter = 0;
  for (const card of cards) if (card === cardToCount) counter++;
  return counter;
}

function getHandType(handCards) {
  const handSplited = handCards.split("");
  const cards = [];
  for (const card of handSplited) {
    cards.push([card, cardCounter(handSplited, card)]);
  }

  let qttOfMostRepeatedCard = 0;
  let mostRepeatedCard = "";
  let qttOfJokers = 0;
  const joker = "J";
  for (const [card, count] of cards) {
    if (card !== joker && count > qttOfMostRepeatedCard) {
      qttOfMostRepeatedCard = count;
      mostRepeatedCard = card;
    }
    if (card === joker) qttOfJokers = count;
  }

  qttOfMostRepeatedCard += qttOfJokers;

  if (qttOfMostRepeatedCard === 5) return "fiveOfAKind";
  if (qttOfMostRepeatedCard === 4) return "fourOfAKind";
  if (qttOfMostRepeatedCard === 3) {
    for (const [card, count] of cards) {
      if (![mostRepeatedCard, joker].includes(card) && count === 2) {
        return "fullHouse";
      }
    }
    return "threeOfAKind";
  }
  if (qttOfMostRepeatedCard === 2) {
    let twoCounter = 0;
    for (const [_, count] of cards) if (count === 2) twoCounter++;
    if (twoCounter === 4) return "twoPair";
    return "onePair";
  }
  if (qttOfMostRepeatedCard === 1) return "highCard";
}

const fiveOfAKind = [];
const fourOfAKind = [];
const fullHouse = [];
const threeOfAKind = [];
const twoPair = [];
const onePair = [];
const highCard = [];

for (const hand of listOfHands) {
  const [handCards, bid] = hand;

  const handType = getHandType(handCards);

  if (handType === "fiveOfAKind") fiveOfAKind.push(hand);
  else if (handType === "fourOfAKind") fourOfAKind.push(hand);
  else if (handType === "fullHouse") fullHouse.push(hand);
  else if (handType === "threeOfAKind") threeOfAKind.push(hand);
  else if (handType === "twoPair") twoPair.push(hand);
  else if (handType === "onePair") onePair.push(hand);
  else if (handType === "highCard") highCard.push(hand);
  else throw new Error(`Can not find a handType for hand ${hand}`);
}

function compareStrength(handX, handY) {
  const [cardsX] = handX;
  const [cardsY] = handY;

  if (cardsX.length !== cardsY.length) {
    throw new Error("impossible to compare strength");
  }

  const cardsInOrderOfStrength = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];

  for (idxCard = 0; idxCard < cardsX.length; idxCard++) {
    const strengthX = cardsInOrderOfStrength.indexOf(cardsX[idxCard]);
    const strengthY = cardsInOrderOfStrength.indexOf(cardsY[idxCard]);
    if (strengthX < strengthY) return -1;
    if (strengthX > strengthY) return 1;
    if (strengthX === strengthY) continue;
  }
}

fiveOfAKind.sort(compareStrength);
fourOfAKind.sort(compareStrength);
fullHouse.sort(compareStrength);
threeOfAKind.sort(compareStrength);
twoPair.sort(compareStrength);
onePair.sort(compareStrength);
highCard.sort(compareStrength);

const handsJoined = [
  ...fiveOfAKind,
  ...fourOfAKind,
  ...fullHouse,
  ...threeOfAKind,
  ...twoPair,
  ...onePair,
  ...highCard,
];

let totalWinnings = 0;

for (const [idx, [_, bid]] of handsJoined.reverse().entries()) {
  totalWinnings += bid * (idx + 1);
}

console.info("totalWinnings:", totalWinnings);
