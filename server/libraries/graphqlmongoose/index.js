import graphqlFields from 'graphql-fields';

export const projection = (info) => Object.keys(graphqlFields(info));