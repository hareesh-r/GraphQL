"use strict";

var express = require('express');

var _require = require("express-graphql"),
    graphqlHTTP = _require.graphqlHTTP;

var schema = require("./schema/schema");

var app = express();

var mongoose = require("mongoose"); // mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/?retryWrites=true&w=majority')


mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/test'); // mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.once('open', function () {
  console.log("Connection Succeded!");
});
app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4001, function () {
  console.log("Listening to the port 4001!");
});