import { render } from "@testing-library/react";
import React from "react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("renders OK with props", () => {
    const { getByText, container } = render(<FormError errorMessage="test" />);
    getByText("test");

    expect(container.firstChild).toHaveClass("text-red-500");
  });
});
