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

const locations = [];

for (const seed of seedsToFindLocation) {
  const soil = findDestinationValue(seed, seedToSoilMap);
  const fertilizer = findDestinationValue(soil, soilToFertilizerMap);
  const water = findDestinationValue(fertilizer, fertilizerTowaterMap);
  const light = findDestinationValue(water, waterTolightMap);
  const temperature = findDestinationValue(light, lightTotemperatureMap);
  const humidity = findDestinationValue(temperature, temperatureTohumidityMap);
  const location = findDestinationValue(humidity, humidityTolocationMap);
  locations.push(location);
}

let lowestLocation = locations[0];
for (const location of locations)
  if (lowestLocation > location) lowestLocation = location;

console.log("lowestLocation:", lowestLocation);
