import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      edges {
        node {
          __typename
          ... on MovieResult {
            title
            rating
            details {
              genres {
                name
              }
              poster(size: W92)
              releaseDate
              imdbID
            }
          }
        }
      }
    }
  }
`;
