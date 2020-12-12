module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "cub-uber-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
