import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartItem = (props) => {
  const { card, selectedCards, setSelectedCards } = props;

  const addItem = () => {
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

  const removeItem = () => {
    const copy = [...selectedCards];
    const exist = copy.find((item) => item.id === card.id);
    const index = copy.indexOf(exist);
    copy[index].quantity--;

    const filteredCopy = copy.filter((item) => item.quantity > 0);

    console.log(filteredCopy);
    return setSelectedCards(filteredCopy);
  };

  return (
    <div className="cart-item-line">
      <div className="quantity-item">
        <FontAwesomeIcon
          icon={faMinus}
          size="1x"
          className="plus-minus-icons"
          onClick={removeItem}
        ></FontAwesomeIcon>
        <span>{card.quantity}</span>
        <FontAwesomeIcon
          icon={faPlus}
          size="1x"
          className="plus-minus-icons"
          onClick={addItem}
        ></FontAwesomeIcon>
      </div>
      <div className="title-item">
        <p>{card.title}</p>
      </div>
      <div className="price-item">
        <p>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(card.price)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
