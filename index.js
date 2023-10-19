const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
 
let jokes = [
    
    { "id": 1, "joke": "hahahahahahahahahahahahahaha" },
    { "id": 2, "joke": "hahahahahahahahahahahahahaha" },
    { "id": 3, "joke": "hahahahahahahahahahahahahaha" },
    { "id": 4, "joke": "hahahahahahahahahahahahahaha" },
    { "id": 5, "joke": "hahahahahahahahahahahahahaha" }
];

// enabling cors for all request
app.use(cors());


// enabiling bodyparser middleware tp pasrse json bodies into js objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define the root entry point for rest api
app.get('/', (req, res) => {
    res.send("welcome to the world of apis");
});


// define the route to retrive all jokes
app.get('/jokes', (req, res) => {
    res.send(jokes);
});


// define a root to retrive random jokes
app.get('/randomjokes', (req, res) => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    res.send(joke);
});


// define a route to add new joke
app.post('/jokes', (req, res) => {
    // generate a new id for the joke
    const newid = jokes[jokes.length - 1].id + 1;

    // get a joke from the request body (post man ki body mein jo code(key and value) add kiyeh haina woh body hai)
    const joke = req.body;

    // output the joke to console for debbuging
    console.log(joke);
    jokes.push({ id: newid, joke: joke });


    // a new joke has been added in the array
    res.send({ id: newid, joke: joke})
    
});

// define a route to delete a joke
app.delete('/jokes/:id', (req, res) => {
    // get the joke id from the request parameters
    const jokeid = req.params.id;

    // find the joke woth the mathcing id
    const jokeindex = jokes.findIndex(joke => joke.id == jokeid);

    // remove the joke from the array
    jokes.splice(jokeindex, 1);

    res.send({ message: "joke deleted successfully" });   
});

// start the rest api

app.listen(port, () => console.log(`jokes Api listening on port ${port} !`));