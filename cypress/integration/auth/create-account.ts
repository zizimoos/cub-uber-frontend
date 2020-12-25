describe("Create Account", () => {
  const user = cy;
  it("should see email / password validation errors", () => {
    user.visit("/");
    user.findByText(/create an account/i).click();
    user.findByPlaceholderText(/email/i).type("non@good");
    user.findByRole("alert").should("have.text", "Please enter a vaild email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("real@email.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
  });
  it("should be able to create account", () => {
    user.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccountMutation") {
        req.reply((res) => {
          res.send({
            fixture: "auth/create-account.json",
          });
        });
      }
    });
    user.visit("/create-account");
    user.findByPlaceholderText(/email/i).type("blackpink@blackrisa.com");
    user.findByPlaceholderText(/password/i).type("12345");
    user.findByRole("button").click();
    user.wait(1000);
    // user.title().should("eq", "Login | Cub Uber Eat");
    // user.findByPlaceholderText(/email/i).type("blackpink@blackrisa.com");
    // user.findByPlaceholderText(/password/i).type("12345");
    // user.findByRole("button").click();
    // user.window().its("localStorage.cubUber-token").should("be.a", "string");
    // @ts-ignore
    user.login("blackpink@blackrisa.com", "12345");
  });
});
