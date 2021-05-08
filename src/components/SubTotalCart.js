import React from "react";

const SubTotalCart = (props) => {
  const { subTotal, deliveryFees } = props;
  return (
    <div className="first-bill">
      <div>
        <p>Sous-total</p>
        <p>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(subTotal)}
        </p>
      </div>
      <div>
        <p>Frais de livraison</p>
        <p>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(deliveryFees)}
        </p>
      </div>
    </div>
  );
};

export default SubTotalCart;
