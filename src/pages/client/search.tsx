import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const [_, searchTerm] = location.search.split("?term=");
    console.log(searchTerm);
    if (!searchTerm) {
      history.replace("/");
    }
  }, []);
  return (
    <h1>
      <Helmet>Home | Nuber Eats</Helmet>Search page
    </h1>
  );
};
