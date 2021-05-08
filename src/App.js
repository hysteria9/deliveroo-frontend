import "./App.css";
import Header from "./components/Header";
import Cover from "./components/Cover";
import Categories from "./components/Categories";
import ShoppingCart from "./components/ShoppingCart";
import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";

//* HTML
//* Etats
//* Intéractions
//* CSS

function App() {
  const [dataHeader, setDataHeader] = useState({});
  const [dataCards, setDataCards] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://deliveroo-backend-hysteria.herokuapp.com/"
    );
    setDataHeader(response.data.restaurant);
    setDataCards(response.data.categories);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading-container">
      <img className="loading-logo" src={logo} alt="Deliveroo Logo" />
      <div className="animation">
        <div className="dash uno"></div>
        <div className="dash dos"></div>
        <div className="dash tres"></div>
        <div className="dash cuatro"></div>
      </div>
    </div>
  ) : (
    <div className="container">
      <Header></Header>
      <div className="h-line"></div>
      <Cover data={dataHeader}></Cover>
      <div className="main-bgc">
        <main className="wrapper">
          <div>
            {dataCards.map((card) => {
              if (card.meals.length === 0) {
                return null;
              }
              return (
                <Categories
                  key={card.name}
                  data={card}
                  setSelectedCards={setSelectedCards}
                  selectedCards={selectedCards}
                ></Categories>
              );
            })}
          </div>
          <ShoppingCart
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          ></ShoppingCart>
        </main>
      </div>
    </div>
  );
}

export default App;
