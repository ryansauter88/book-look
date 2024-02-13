// We bring in gql from the @apollo/client library to allow us to parse queries (and mutations) as template literals
import { gql } from '@apollo/client';

// Each query we'd like to be able to perform gets exported out of our queries.js utility
export const GET_ME = gql`
  query me($_id: ID!) {
    me(_id: $_id) {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }
`;