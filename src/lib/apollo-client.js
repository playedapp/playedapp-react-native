import ApolloClient, { gql } from "apollo-boost"
// import { InMemoryCache } from "apollo-cache-inmemory"
// import { HttpLink } from "apollo-link-http"
// import { onError } from "apollo-link-error"
// import { ApolloLink } from "apollo-link"

const client = new ApolloClient({
  uri: "http://192.168.0.4:3000/graphql",
  connectToDevTools: true, // Not working yet… :(
})

// TODO: Use cached data: https://www.apollographql.com/docs/react/features/performance.html#cache-redirects

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.map(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message},
//             Location: ${locations}, Path: ${path}`,
//           ),
//         )
//       if (networkError) console.log(`[Network error]: ${networkError}`)
//     }),
//     new HttpLink({
//       uri: "http://192.168.0.4:3000/graphql",
//       // uri: "http://172.20.10.4:3000/graphql",
//       // credentials: "same-origin",
//     }),
//   ]),
//   cache: new InMemoryCache(),
// })

export default client
