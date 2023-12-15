const {
  seedsToFindLocation,
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerTowaterMap,
  waterTolightMap,
  lightTotemperatureMap,
  temperatureTohumidityMap,
  humidityTolocationMap,
} = require("./input_final");

function isBetween(value, startRange, endRange) {
  return value >= startRange && value <= endRange;
}

function findDestinationValue(sourceValue, map) {
  for (const range of map) {
    const destinationRangeStart = range[1];
    const sourceRangeStart = range[0];
    const rangeLength = range[2];

    if (
      isBetween(
        sourceValue,
        destinationRangeStart,
        destinationRangeStart + (rangeLength - 1)
      )
    ) {
      const gap = sourceRangeStart - destinationRangeStart;
      return sourceValue + gap;
    }
  }

  return sourceValue;
}

let lowestLocation = Number.POSITIVE_INFINITY;

let pair = 1;

for (let idx = 0; idx < seedsToFindLocation.length; idx += 2) {
  console.info(`pair:${pair}/${seedsToFindLocation.length / 2}`);

  const initialSeed = seedsToFindLocation[idx];
  const rangeLength = seedsToFindLocation[idx + 1];

  // Esse for é muito grande, é uma boa pra aprender sobre paralização ou comparar com outros runtimes/linguagens
  // ou achar uma otimização na lógica do código msm
  for (let seed = initialSeed; seed <= initialSeed + rangeLength; seed++) {
    const soil = findDestinationValue(seed, seedToSoilMap);
    const fertilizer = findDestinationValue(soil, soilToFertilizerMap);
    const water = findDestinationValue(fertilizer, fertilizerTowaterMap);
    const light = findDestinationValue(water, waterTolightMap);
    const temperature = findDestinationValue(light, lightTotemperatureMap);
    const humidity = findDestinationValue(
      temperature,
      temperatureTohumidityMap
    );
    const location = findDestinationValue(humidity, humidityTolocationMap);
    if (location < lowestLocation) lowestLocation = location;
  }

  pair++;
}

console.log("lowestLocation:", lowestLocation);
