/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Comparison.scss";
import ComparisonDetail from "./ComparisonDetail";

export default function Comparison({ idA, idB }) {
  const [comparisonA, setComparisonA] = useState([]);
  const [comparisonB, setComparisonB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (id) => {
    const url = `https://estate-comparison.codeboot.cz/detail.php?id=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [responseDataA, responseDataB] = await Promise.all([
          fetchData(idA),
          fetchData(idB),
        ]);
        setComparisonA(responseDataA);
        setComparisonB(responseDataB);
      } catch (error) {
        console.log("Error while fetching comparisons: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [idA, idB]);

  const comparePrice = (priceA, priceB) => {
    if (priceA < priceB) return "better";
    if (priceA > priceB) return "worse";
    return "same";
  };

  const compareArea = (areaA, areaB) => {
    if (areaA < areaB) return "worse";
    if (areaA > areaB) return "better";
    return "same";
  };

  const priceClassName = comparePrice(
    comparisonA.prize_czk,
    comparisonB.prize_czk
  );
  const buildingAreaClassName = compareArea(
    comparisonA.building_area,
    comparisonB.building_area
  );
  const landAreaClassName = compareArea(
    comparisonA.land_area,
    comparisonB.land_area
  );

  return (
    <div className="comparison-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {comparisonA && (
            <ComparisonDetail
              data={comparisonA}
              priceClassName={priceClassName}
              buildingAreaClassName={buildingAreaClassName}
              landAreaClassName={landAreaClassName}
            />
          )}
          {comparisonB && (
            <ComparisonDetail
              data={comparisonB}
              priceClassName={priceClassName}
              buildingAreaClassName={buildingAreaClassName}
              landAreaClassName={landAreaClassName}
            />
          )}
        </>
      )}
    </div>
  );
}