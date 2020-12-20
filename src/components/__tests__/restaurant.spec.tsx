import { render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant/>", () => {
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "id",
      name: "name",
      coverImg: "imgPath",
      address: "categoryName",
    };
    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );

    getByText(restaurantProps.name);
    getByText(restaurantProps.address);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${restaurantProps.id}`
    );
  });
});
