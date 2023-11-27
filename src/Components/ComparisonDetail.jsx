/* eslint-disable react/prop-types */
export default function ComparisonDetail({
  data: {
    id,
    images,
    name,
    prize_czk,
    locality,
    building_area,
    land_area,
    company_logo,
    company_name,
  },
  priceClassName,
  buildingAreaClassName,
  landAreaClassName,
}) {
  return (
    <div className="comparison-property-container" key={id}>
      <img className="comparison-property__image" src={images[0]} alt={name} />
      <p className="comparison-property__name">{name}</p>

      <div className="comparison-property__details">
        <p className={`comparison-property__price ${priceClassName}`}>
          <strong>Price</strong>{" "}
          <span className="comparison-property-span">
            {" "}
            {prize_czk.toLocaleString("cs-CZ")} Kč
          </span>
        </p>
        <p className="comparison-property__locality">
          <strong>Locality</strong> <span className="locality">{locality}</span>
        </p>
        <p className={`comparison-property__floor ${buildingAreaClassName}`}>
          <strong>Floor area</strong>{" "}
          <span className="comparison-property-span">
            {building_area} m<sup>2</sup>
          </span>
        </p>
        <p className={`comparison-property__land ${landAreaClassName}`}>
          <strong>Land area</strong>{" "}
          <span className="comparison-property-span">
            {land_area} m<sup>2</sup>
          </span>
        </p>

        {company_name && company_logo && (
          <div className="comparison-property__company">
            <img
              className="comparison-property__company-image"
              src={company_logo}
              alt={company_name}
            />
            <p>{company_name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
