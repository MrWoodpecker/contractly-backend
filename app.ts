import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { token } from './middlewares/token';

import schema from './schemes';
import resolver from './resolvers'



const app = express();

app.use(token);
app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: resolver
    })
);
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);