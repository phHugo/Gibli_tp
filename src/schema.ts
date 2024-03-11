import { gql } from 'graphql-tag';

export const typeDefs = gql`

type Query {
  add(number1: Int!, number2: Int!) : Int
  substract(number1: Int!, number2: Int!) : Int
  multiply(number1: Int!, number2: Int!) : Int
  divide(number1: Int!, number2: Int!) : Int
  closestColor(color: String!): String

  getTracks: [Track!]!
  
  getFilms: [Film!]!
  getPeople: [People!]!
}

type Track {
  id: ID!
  title: String!
  author: Author!
  thumbnail: String
}

type Author {
  id: ID!
  name: String!
  photo: String
}

type Film {
  id: ID!
  title: String!
  people: [People!]!
}

type People {
  id: ID!
  name: String!
  eyeColor: String
  films: [Film!]!
}
`;
