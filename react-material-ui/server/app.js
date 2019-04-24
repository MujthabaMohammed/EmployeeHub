const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

//Mongo 
mongoose.connect('mongodb+srv://muji:58162@cluster0-cnvde.mongodb.net/test?retryWrites=true',{useNewUrlParser:true});
mongoose.connection.once('open',()=> {
    console.log('connected to DB');
})



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(4000,() => {
    console.log('now listening for requests in port 4000')
})