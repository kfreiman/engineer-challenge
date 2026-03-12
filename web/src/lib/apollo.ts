import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: '/bff/query',
  }),
  cache: new InMemoryCache(),
});
