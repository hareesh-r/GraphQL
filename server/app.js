const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')
const mongooes = require('mongoose')

const app = express();

mongooes.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/?retryWrites=true&w=majority');

mongooes.connection.once('open',()=>{
    console.log("Connected to Database");
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log("Now listening for requests in port 4000");
});