import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants></Restaurants>
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail></ConfirmEmail>
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile></EditProfile>
  </Route>,
  <Route key={4} path="/search" exact>
    <Search></Search>
  </Route>,
  <Route key={5} path="/category/:slug" exact>
    <Category></Category>
  </Route>,
  <Route key={6} path="/restaurant/:id" exact>
    <Restaurant></Restaurant>
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide ">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header></Header>
      <Switch>
        {data?.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
  );
};
