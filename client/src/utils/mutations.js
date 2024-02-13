// We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from '@apollo/client';

// Each mutation we'd like to be able to perform gets exported out of our mutations.js utility
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String]!, $description: String!, $title: String!, $bookId: ID!, $image: String!, $link: String!) {
        saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;