// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url and check the locale switcher", () => {
    cy.visit("/");
    cy.get("h1.home-title").should("have.text", "Jeu du pendu");
    cy.get("span.locale-button.locale-active").should("include.text", "Français");

    cy.get(".locale-button").contains("English").click();
    cy.get("h1.home-title").should("have.text", "Hangman game");
    cy.get("span.locale-button.locale-active").should("include.text", "English");
  });

  it("Visit the play url", () => {
    cy.visit("/play");
  });
});
