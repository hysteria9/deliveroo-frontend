import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import request from "supertest";
import App from "./App";

describe("Deliveroo - Tests >Exercises", () => {
  it("should check if meals are all correctly displayed", async () => {
    const response = await request(
      "https://deliveroo-backend-hysteria.herokuapp.com"
    ).get("/");

    let picturesAlts = [];
    for (let i = 0; i < response.body.categories.length; i++) {
      for (let j = 0; j < response.body.categories[i].meals.length; j++) {
        if (response.body.categories[i].meals[j].picture) {
          picturesAlts.push(response.body.categories[i].meals[j].title);
        }
      }
    }
    //console.log(picturesAlts);
    render(<App />);
    let meals;
    for (let k = 0; k < picturesAlts.length; k++) {
      meals = await screen.findByAltText(picturesAlts[k]);
      expect(meals).toBeInTheDocument();
    }
  });

  it("should check if cart is working when a meal is selected", async () => {
    const response = await request(
      "https://deliveroo-backend-hysteria.herokuapp.com"
    ).get("/");

    let mealsId = [];
    let mealsNames = [];
    for (let i = 0; i < response.body.categories.length; i++) {
      for (let j = 0; j < response.body.categories[i].meals.length; j++) {
        if (response.body.categories[i].meals[j].id) {
          mealsId.push(response.body.categories[i].meals[j].id);
          mealsNames.push(response.body.categories[i].meals[j].title);
        }
      }
    }
    //console.log(mealsId);
    const { container } = render(<App />);
    let textOnCart = await screen.findByText("Votre panier est vide");
    expect(textOnCart).toBeInTheDocument();

    userEvent.click(await screen.findByTestId(mealsId[3]));

    expect(container.querySelector(".title-item>p").textContent).toEqual(
      mealsNames[3]
    );
    //console.log(container.querySelector(".title-item>p").textContent);
  });

  it("should check if quantities are correctly updated in cart", async () => {
    const response = await request(
      "https://deliveroo-backend-hysteria.herokuapp.com"
    ).get("/");

    let mealsId = [];
    for (let i = 0; i < response.body.categories.length; i++) {
      for (let j = 0; j < response.body.categories[i].meals.length; j++) {
        if (response.body.categories[i].meals[j].id) {
          mealsId.push(response.body.categories[i].meals[j].id);
        }
      }
    }
    //console.log(mealsId);
    const { container } = render(<App />);
    userEvent.click(await screen.findByTestId(mealsId[6]));
    expect(container.querySelector(".quantity-item>span").textContent).toEqual(
      "1"
    );

    userEvent.click(await screen.findByTestId(mealsId[6]));
    expect(container.querySelector(".quantity-item>span").textContent).toEqual(
      "2"
    );
  });

  it("should check if total bill of cart is correct", async () => {
    const response = await request(
      "https://deliveroo-backend-hysteria.herokuapp.com"
    ).get("/");

    let mealsId = [];
    let mealsPrices = [];
    let price = 0.0;
    const deliveryFees = 2.5;
    for (let i = 0; i < response.body.categories.length; i++) {
      for (let j = 0; j < response.body.categories[i].meals.length; j++) {
        if (response.body.categories[i].meals[j].id) {
          mealsId.push(response.body.categories[i].meals[j].id);
          price = parseFloat(response.body.categories[i].meals[j].price);
          mealsPrices.push(price);
        }
      }
    }
    //console.log(mealsPrices);
    const { container } = render(<App />);
    userEvent.click(await screen.findByTestId(mealsId[6]));
    userEvent.click(await screen.findByTestId(mealsId[8]));
    userEvent.click(await screen.findByTestId(mealsId[1]));
    userEvent.click(await screen.findByTestId(mealsId[1]));
    userEvent.click(await screen.findByTestId(mealsId[7]));
    const expectedBillAmount =
      mealsPrices[6] +
      mealsPrices[8] +
      mealsPrices[1] +
      mealsPrices[1] +
      mealsPrices[7] +
      deliveryFees;
    const totalContent = container.querySelector(".full-bill>p");
    const totalBill = totalContent.nextSibling;
    let result = totalBill.querySelector("strong").textContent;
    result = parseFloat(
      result.substring(0, result.length - 1).replace(",", ".")
    ).toFixed(2);

    expect(result).toEqual(expectedBillAmount.toFixed(2));
  });
});
