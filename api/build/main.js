"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apollo_server_1 = require("apollo-server");
var PORT = process.env.PORT || 3000;
var store = {
    messages: [],
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
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  type Query {\n    todos: [Todo]\n    messages: [Message]\n  }\n\n  type Mutation {\n    toggleTodo(id: ID!): Todo\n  }\n\n  type Todo {\n    id: ID\n    text: String\n    complete: Boolean\n  }\n\n  type Subscription {\n    newMessages: Message\n  }\n\n  type Message {\n    id: ID\n    from: String\n    message: String\n  }\n"], ["\n  type Query {\n    todos: [Todo]\n    messages: [Message]\n  }\n\n  type Mutation {\n    toggleTodo(id: ID!): Todo\n  }\n\n  type Todo {\n    id: ID\n    text: String\n    complete: Boolean\n  }\n\n  type Subscription {\n    newMessages: Message\n  }\n\n  type Message {\n    id: ID\n    from: String\n    message: String\n  }\n"])));
var resolvers = {
    Query: {
        todos: function () { return store.todos; },
        messages: function () { return store.messages; },
    },
    Mutation: {
        toggleTodo: function (_root, _a, _context) {
            var id = _a.id;
            store.todos[id].complete = !store.todos[id].complete;
            return store.todos[id];
        },
    },
    Subscription: {},
};
var number = 0;
setInterval(function () {
    var newMessage = {
        id: ++number,
        message: "This is message number " + number,
        from: 'Server',
    };
    store.messages.push(newMessage);
}, 5000);
setInterval(function () {
    store.messages = [];
}, 20000);
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
server.listen(PORT).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
//# sourceMappingURL=main.js.map