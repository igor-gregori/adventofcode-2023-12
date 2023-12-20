function sumElementsOfArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}

function decreaseOne(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > 0) {
      arr[i] -= 1;
      if (i !== arr.length - 1) {
        for (let j = i + 1; j <= arr.length - 1; j++) {
          arr[j] = arr[i];
        }
      }
      return arr;
    }
  }
  throw new RangeError();
}

function countOccurencesInString(str, ocurrence) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ocurrence) count++;
  }
  return count;
}

function compareArrays(arrX, arrY) {
  return JSON.stringify(arrX) === JSON.stringify(arrY);
}

module.exports = {
  sumElementsOfArray,
  countOccurencesInString,
  compareArrays,
  decreaseOne,
};
