import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constant";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// console.log("default value of isLoggedInVar is: ", isLoggedInVar());
// console.log("default value of authTokenVar is: ", authTokenVar());

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  console.log(headers);
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
              // return Boolean(localStorage.getItem("token"));
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
