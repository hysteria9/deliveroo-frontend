import React from "react";
import star from "../assets/Popular.svg";

const Meals = (props) => {
  const { card, selectedCards, setSelectedCards } = props;

  const handleSelectCard = () => {
    const copy = [...selectedCards];

    let isProductFound = false;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id === card.id) {
        copy[i].quantity++;
        isProductFound = true;
      }
    }
    if (!isProductFound) {
      copy.push({
        id: card.id,
        title: card.title,
        quantity: 1,
        price: card.price,
      });
    }

    console.log(copy);
    return setSelectedCards(copy);
  };

  return (
    <div className="card" data-testid={card.id} onClick={handleSelectCard}>
      <div className="left-card">
        <h4>{card.title}</h4>
        <div className="card-description">
          <h5>{card.description}</h5>
        </div>
        <div className="bottom-left-card">
          <h5>
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(card.price)}
          </h5>
          {card.popular && (
            <div className="popular">
              <img src={star} alt="popular meal" />
              <h6>Populaire</h6>
            </div>
          )}
        </div>
      </div>
      {card.picture && (
        <div className="right-card">
          <img className="meal-picture" src={card.picture} alt={card.title} />
        </div>
      )}
    </div>
  );
};

export default Meals;
