import React from "react";
import CartItem from "./CartItem";
import SubTotalCart from "./SubTotalCart";
import TotalCart from "./TotalCart";

const ShoppingCart = (props) => {
  const { selectedCards, setSelectedCards } = props;

  let subTotal = 0;
  selectedCards.forEach((cardItem) => {
    subTotal += cardItem.price * cardItem.quantity;
  });

  const deliveryFees = 2.5;

  const total = subTotal + deliveryFees;

  return (
    <aside className="cart-container">
      <div className="cart-card">
        {selectedCards.length === 0 ? (
          <>
            <button type="submit" className="btn-checkout disabled">
              Valider mon panier
            </button>
            <div className="empty-cart">
              <h4>Votre panier est vide</h4>
            </div>
          </>
        ) : (
          <>
            <button type="submit" className="btn-checkout enabled">
              Valider mon panier
            </button>
            <div className="items-list">
              {selectedCards.map((card, index) => {
                return (
                  <CartItem
                    card={card}
                    key={index}
                    selectedCards={selectedCards}
                    setSelectedCards={setSelectedCards}
                  ></CartItem>
                );
              })}
            </div>
            <SubTotalCart
              subTotal={subTotal}
              deliveryFees={deliveryFees}
            ></SubTotalCart>
            <TotalCart total={total}></TotalCart>
          </>
        )}
      </div>
    </aside>
  );
};

export default ShoppingCart;
