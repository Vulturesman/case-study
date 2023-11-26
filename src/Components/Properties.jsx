import { useState } from "react";
import "./Properties.scss";
import { useEffect } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";

export default function Properties({ idA, setIdA, idB, setIdB }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // pagination states/const
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 10;

  const fetchData = async () => {
    const url = "https://estate-comparison.codeboot.cz/list.php";
    const response = await fetch(url);
    const responseData = await response.json();
    setData(responseData);
    setIsLoading(false);
    // console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // pagination function
  const indexOfLastProperty = (currentPage + 1) * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = data
    ? data.slice(indexOfFirstProperty, indexOfLastProperty)
    : [];

  const paginate = (direction) => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + direction);
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = data ? indexOfLastProperty >= data.length : true;
  // pagination up

  // selection to comparions, odd click -> property A, even click -> property B
  const [clickCount, setClickCount] = useState(0);
  const assignProperty = (id) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount % 2 === 1) {
      setIdA(id);
    } else {
      setIdB(id);
    }
  };

  const isSelected = (id) => {
    return id === idA || id === idB;
  };

  return (
    <div className="properties-container">
      <div className="pagination-container">
        <button
          className="pagination__button"
          onClick={() => paginate(-1)}
          disabled={isFirstPage}
        >
          <ArrowLeftCircle size={40} />
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        currentProperties.map(
          ({ id, name, name_extracted, locality, images }) => (
            <div
              className={`property-container ${
                isSelected(id) ? "selected" : ""
              }`}
              key={id}
              onClick={() => assignProperty(id)}
            >
              <img className="property-image" src={images[0]} alt={name} />
              <p className="property-slug">
                {name_extracted}, {locality}
              </p>
            </div>
          )
        )
      )}

      <div className="pagination-container">
        <button
          className="pagination__button"
          onClick={() => paginate(1)}
          disabled={isLastPage}
        >
          <ArrowRightCircle size={40} />
        </button>
      </div>
    </div>
  );
}
