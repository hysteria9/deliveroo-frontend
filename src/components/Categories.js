import React from "react";
import Meals from "./Meals";

const Categories = (props) => {
  const sectionTitle = props.data.name;
  const cards = props.data.meals;
  return (
    <section>
      <h3>{sectionTitle}</h3>
      <div className="cards-container">
        {cards.map((card) => {
          return (
            <Meals
              key={card.id}
              card={card}
              setSelectedCards={props.setSelectedCards}
              selectedCards={props.selectedCards}
            ></Meals>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
