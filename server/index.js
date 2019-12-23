const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const config = require('./config/configLog');
const log = require('./lib/log');

const cors = require('cors');
const {readFileSync} = require('fs');

const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');
const models = require('./models');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {models}
});
const app = express();
server.applyMiddleware({app});
models.sequelize.authenticate();

models.sequelize.sync();
app.use(
    cors(),
);
app.get('/', (req, res) => {
    res.end(`Добро пожаловать`)
});
app.get('/playground', expressPlayground({endpoint: '/graphql'}));

app.listen(config.port, () => {
    log.info(`GraphQL Service running on port ${config.port} ${server.graphqlPath}`);
});
