describe("Home Page", () => {
  it("Visits the home page", () => {
    cy.visit("/");
    cy.contains("p", "This is a simple SPA");
  });
});
