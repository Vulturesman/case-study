export const comparePrice = (priceA, priceB) => {
  if (priceA < priceB) return "better";
  if (priceA > priceB) return "worse";
  return "same";
};

export const compareArea = (areaA, areaB) => {
  if (areaA < areaB) return "worse";
  if (areaA > areaB) return "better";
  return "same";
};

export const getComparisonClassNames = (dataA, dataB) => {
  return {
    priceClassNameA: comparePrice(dataA.prize_czk, dataB.prize_czk),
    buildingAreaClassNameA: compareArea(
      dataA.building_area,
      dataB.building_area
    ),
    landAreaClassNameA: compareArea(dataA.land_area, dataB.land_area),
    priceClassNameB: comparePrice(dataB.prize_czk, dataA.prize_czk),
    buildingAreaClassNameB: compareArea(
      dataB.building_area,
      dataA.building_area
    ),
    landAreaClassNameB: compareArea(dataB.land_area, dataA.land_area),
  };
};
