const express = require('express');

const { graphqlHTTP } = require("express-graphql");

const cors = require('cors')

const schema = require("./schema/schema")

const app = express();

// allow cross-origin requests
app.use(cors());

const mongoose = require("mongoose"); 

mongoose.connect('mongodb+srv://Hareesh:testPass@graphqlpractice.g9713wh.mongodb.net/test')

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