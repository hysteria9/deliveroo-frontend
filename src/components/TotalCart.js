import React from "react";

const TotalCart = (props) => {
  const total = props.total;
  return (
    <div className="full-bill">
      <p>
        <strong>Total</strong>
      </p>
      <p>
        <strong>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(total)}
        </strong>
      </p>
    </div>
  );
};

export default TotalCart;
