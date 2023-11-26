/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Comparison.scss";
import ComparisonDetail from "./ComparisonDetail";
import { getComparisonClassNames } from "../Helpers/helper";

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

  const {
    priceClassNameA,
    buildingAreaClassNameA,
    landAreaClassNameA,
    priceClassNameB,
    buildingAreaClassNameB,
    landAreaClassNameB,
  } = getComparisonClassNames(comparisonA, comparisonB);

  return (
    <div className="comparison-container">
      {isLoading ? (
        <p>Loading Comparison...</p>
      ) : (
        <>
          {comparisonA && (
            <ComparisonDetail
              data={comparisonA}
              priceClassName={priceClassNameA}
              buildingAreaClassName={buildingAreaClassNameA}
              landAreaClassName={landAreaClassNameA}
            />
          )}
          {comparisonB && (
            <ComparisonDetail
              data={comparisonB}
              priceClassName={priceClassNameB}
              buildingAreaClassName={buildingAreaClassNameB}
              landAreaClassName={landAreaClassNameB}
            />
          )}
        </>
      )}
    </div>
  );
}
