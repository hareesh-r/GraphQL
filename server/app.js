const express = require('express');

const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema")

const app = express();

const mongoose = require("mongoose"); 

// mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/?retryWrites=true&w=majority')

mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/test')

// mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/?retryWrites=true&w=majority')


mongoose.connection.once('open',()=>{
    console.log("Connection Succeded!");
})

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

 app.listen(4000,()=>{
    console.log("Listening to the port 4000!");
 })    