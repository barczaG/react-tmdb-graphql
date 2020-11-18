/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_edges_node_TVShowResult {
  __typename: "TVShowResult" | "PersonListResult";
}

export interface Search_search_edges_node_MovieResult_details_genres {
  __typename: "Genre";
  name: string;
}

export interface Search_search_edges_node_MovieResult_details {
  __typename: "DetailedMovie";
  genres: Search_search_edges_node_MovieResult_details_genres[];
  poster: any | null;
  releaseDate: any | null;
  imdbID: string;
}

export interface Search_search_edges_node_MovieResult {
  __typename: "MovieResult";
  title: string;
  rating: number;
  details: Search_search_edges_node_MovieResult_details;
}

export type Search_search_edges_node = Search_search_edges_node_TVShowResult | Search_search_edges_node_MovieResult;

export interface Search_search_edges {
  __typename: "MovieOrTVOrPeopleEdge";
  node: Search_search_edges_node | null;
}

export interface Search_search {
  __typename: "MovieOrTVOrPeopleConnection";
  edges: (Search_search_edges | null)[] | null;
}

export interface Search {
  search: Search_search;
}

export interface SearchVariables {
  term: string;
}
