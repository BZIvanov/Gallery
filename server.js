const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const { typeDefs } = require('./schema');
const resolvers = require('./resolvers');

const User = require('./models/User');
const Post = require('./models/Post');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
