import { DocumentNode } from 'graphql';
import { apolloClient } from './apollo';
import { queryOptions } from '@tanstack/react-query';

export function graphqlQueryOptions<TData = any, TVariables = any>(
  query: DocumentNode,
  variables?: TVariables,
  key?: string
) {
  return queryOptions({
    queryKey: [key || (query.definitions[0] as any).name?.value, variables],
    queryFn: async ({ signal }) => {
      const { data, errors } = await apolloClient.query<TData, TVariables>({
        query,
        variables,
        context: { fetchOptions: { signal } },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data;
    },
  });
}
