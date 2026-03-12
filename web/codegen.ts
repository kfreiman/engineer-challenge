import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../api/graphql/schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
