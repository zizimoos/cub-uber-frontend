describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Cub Uber Eat");
  });
  it("can fill out the form", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type("blackpinkrisa@risa.com")
      .get('[name="password"]')
      .type("1234567890")
      .get(".text-white")
      .should("not.have.class", "pointer-event-none");
    // to do (can log in)
  });
  it("can see email / password validation errors", () => {
    cy.visit("/")
      .get('[name="email"]')
      .type("bad@email")
      .get(".text-red-500")
      .should("have.text", "Please enter a vaild email");
  });
});
