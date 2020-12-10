import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";


// 1 app config
// create our instance
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://Sanad:stEqfIKgHsS88ulw@tinder.ml2rr.mongodb.net/tinderdb?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// 2 API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello there!!!"));

// to create and submit the data

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(201).send(data);
        }
    });
});

// to download or get our data back

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(200).send(data);
        }
    });
});

app.delete("/tinder/cards/:name", (req, res) => {
    Cards.findOneAndDelete({name: req.params.name},(err, data) => {
        if(err){
            res.status(500).send(err);
        }else {
            res.status(200).send("deleted");
        }
    });
});


// 3 Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));