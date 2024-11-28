import { HttpResponse, http } from "msw";

import { authService } from "../../src/api/auth";
import { apiURL } from "../../src/utils";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url().should("include", "/");
  });

  it("should login successfully and redirected to app", () => {
    cy.login("someemail@gmail.com", "somepassword");

    cy.url().should("include", "/app");
  });

  it("should show error notification if login failed", () => {
    cy.interceptMswRequest(
      http.post(apiURL(authService.loginEndpoint).toString(), () => {
        return HttpResponse.json({ message: "Login failed." }, { status: 401 });
      })
    );

    cy.login("someemail@gmail.com", "somepassword");

    cy.findByRole("status").should("have.text", "Login failed.");
  });
});
