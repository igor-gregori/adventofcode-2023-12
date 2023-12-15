const seedsToFindLocation = [79, 14, 55, 13];

const seedToSoilMap = [
  [50, 98, 2],
  [52, 50, 48],
];

const soilToFertilizerMap = [
  [0, 15, 37],
  [37, 52, 2],
  [39, 0, 15],
];

const fertilizerTowaterMap = [
  [49, 53, 8],
  [0, 11, 42],
  [42, 0, 7],
  [57, 7, 4],
];

const waterTolightMap = [
  [88, 18, 7],
  [18, 25, 70],
];

const lightTotemperatureMap = [
  [45, 77, 23],
  [81, 45, 19],
  [68, 64, 13],
];

const temperatureTohumidityMap = [
  [0, 69, 1],
  [1, 0, 69],
];

const humidityTolocationMap = [
  [60, 56, 37],
  [56, 93, 4],
];

module.exports = {
  seedsToFindLocation,
  seedToSoilMap,
  soilToFertilizerMap,
  fertilizerTowaterMap,
  waterTolightMap,
  lightTotemperatureMap,
  temperatureTohumidityMap,
  humidityTolocationMap,
};
