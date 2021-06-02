// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url and check the locale switcher", () => {
    cy.visit("/");
    cy.get("h1.home-title").should("have.text", "Jeu du pendu");
    cy.get("span.locale-button.locale-active").should(($el) =>
      expect($el.text().trim()).to.equal("Français")
    );

    cy.get(".locale-button").contains("English").click();
    cy.get("h1.home-title").should("have.text", "Hangman game");
    cy.get("span.locale-button.locale-active").should(($el) =>
      expect($el.text().trim()).to.equal("English")
    );
  });

  it("Visit the play url and check the initial values", () => {
    // Change the game random words to a unique value
    cy.intercept("GET", Cypress.env("dataUrl"), { fixture: "data.json" });
    cy.visit("/play");

    // Check display letters count
    cy.get(".display-container-inner .display-letter").should("have.length", 3);
    cy.get(".display-container-inner .display-letter:nth-child(1)")
      .should("not.have.class", "display-letter-special")
      .should(($el) => expect($el.text().trim()).to.equal(""));
    cy.get(".display-container-inner .display-letter:nth-child(2)")
      .should("have.class", "display-letter-special")
      .should(($el) => expect($el.text().trim()).to.equal("-"));
    // Check game message
    cy.get(".state-container").should("have.text", "Erreurs restantes : 7");
    // Check keyboard
    cy.get(".keyboard-container .letter").should("have.length", 26);
  });

  it("Visit the play url and win the game", () => {
    // Change the game random words to a unique value
    cy.intercept("GET", Cypress.env("dataUrl"), { fixture: "data.json" });
    cy.visit("/play");

    // Click letter A -> Expect correct
    cy.get(".letter.letter-a")
      .trigger("mouseover")
      .click()
      .should("have.class", "letter-active")
      .should("not.have.class", "letter-error");
    cy.get(".display-letter.display-letter-0").should(($el) =>
      expect($el.text().trim()).to.equal("")
    );
    cy.get(".display-letter.display-letter-1").should(($el) =>
      expect($el.text().trim()).to.equal("-")
    );
    cy.get(".display-letter.display-letter-2").should(($el) =>
      expect($el.text().trim()).to.equal("A")
    );
    cy.get(".state-container").should("have.text", "Erreurs restantes : 7");

    // Click letter B -> Expect error
    cy.get(".letter.letter-b")
      .trigger("mouseover")
      .click()
      .should("have.class", "letter-error")
      .should("have.class", "letter-active");
    cy.get(".display-letter.display-letter-0").should(($el) =>
      expect($el.text().trim()).to.equal("")
    );
    cy.get(".display-letter.display-letter-1").should(($el) =>
      expect($el.text().trim()).to.equal("-")
    );
    cy.get(".display-letter.display-letter-2").should(($el) =>
      expect($el.text().trim()).to.equal("A")
    );
    cy.get(".state-container").should("have.text", "Erreurs restantes : 6");

    // Click letter T -> Expect game finished
    cy.get(".letter.letter-t")
      .trigger("mouseover")
      .click()
      .should("not.have.class", "letter-error")
      .should("have.class", "letter-active");
    cy.get(".display-letter.display-letter-0").should(($el) =>
      expect($el.text().trim()).to.equal("T")
    );
    cy.get(".display-letter.display-letter-1").should(($el) =>
      expect($el.text().trim()).to.equal("-")
    );
    cy.get(".display-letter.display-letter-2").should(($el) =>
      expect($el.text().trim()).to.equal("A")
    );
    cy.get(".state-container .game-finished-text").should("contains.text", "Vous avez gagné");
    cy.get(".game-button:nth-child(1)").should("be.visible");
    cy.get(".game-button:nth-child(2)").should("be.visible");
  });

  it("Visit the play url and lose the game", () => {
    // Change the game random words to a unique value
    cy.intercept("GET", Cypress.env("dataUrl"), { fixture: "data.json" });
    cy.visit("/play");

    // Click letter A -> Expect correct
    [..."bcdefgh"].forEach((letter, idx) => {
      cy.get(".letter.letter-" + letter)
        .trigger("mouseover")
        .click()
        .should("have.class", "letter-active")
        .should("have.class", "letter-error");
      if (idx < 6) {
        cy.get(".state-container").should("have.text", "Erreurs restantes : " + (6 - idx));
      }
    });

    // Check game end css class
    cy.get(".display-letter.display-letter-0").should("have.class", "display-letter-error");
    cy.get(".display-letter.display-letter-1").should("not.have.class", "display-letter-error");
    cy.get(".display-letter.display-letter-2").should("have.class", "display-letter-error");

    cy.get(".state-container .game-finished-text").should("contains.text", "Vous avez perdu");
    cy.get(".game-button:nth-child(1)").should("be.visible");
    cy.get(".game-button:nth-child(2)").should("be.visible");
  });
});
