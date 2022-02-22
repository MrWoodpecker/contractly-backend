export default `
    type Contract {
        _id: ID!
        title: String!
    }

    type Query {
        contracts: [Contract!]!
    }
`;
