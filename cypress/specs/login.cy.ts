describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url().should("include", "/");
  });

  it("should login successfully", () => {
    cy.findByRole("button", { name: /login/i }).click();

    cy.url().should("include", "/auth/login");

    cy.findByLabelText(/email/i).type("someemail@example.com");
    cy.findByLabelText(/password/i).type("password");

    cy.findAllByRole("button", { name: "Login" }).eq(1).click();

    cy.url().should("include", "/app");
  });
});
