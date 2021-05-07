import { ApolloServer, gql } from 'apollo-server';

const PORT = process.env.PORT || 3000;

const store = {
  messages: [] as any,
  todos: [
    {
      id: 0,
      text: 'Go to the shop',
      complete: false,
    },
    {
      id: 1,
      text: 'Go to school',
      complete: true,
    },
    {
      id: 2,
      text: 'Use urql',
      complete: false,
    },
  ],
};

const typeDefs = gql`
  type Query {
    todos: [Todo]
    messages: [Message]
  }

  type Mutation {
    toggleTodo(id: ID!): Todo
  }

  type Todo {
    id: ID
    text: String
    complete: Boolean
  }

  type Subscription {
    newMessages: Message
  }

  type Message {
    id: ID
    from: String
    message: String
  }
`;

const resolvers = {
  Query: {
    todos: () => store.todos,
    messages: () => store.messages,
  },
  Mutation: {
    toggleTodo: (_root: any, { id }: any, _context: any) => {
      store.todos[id].complete = !store.todos[id].complete;
      return store.todos[id];
    },
  },
  Subscription: {},
};

// Fake message dispatcher
let number = 0;

setInterval(() => {
  const newMessage = {
    id: ++number,
    message: `This is message number ${number}`,
    from: 'Server',
  };
  store.messages.push(newMessage);
}, 5000);

setInterval(() => {
  store.messages = [];
}, 20000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
