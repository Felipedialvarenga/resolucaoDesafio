const express = require('express');
const app = express();
const port = 3000;
const fetch = require("node-fetch");

app.listen(port);
app.use(express.json());

app.get('/hello', (req, res) => {
    res.status(200).send('World')
} );

app.post('/soma', (req, res) => {
    const { n1, n2 } = req.body;


    if(!n1 || !n2){
        return res.status(400).send({ message:"Valores não informados" })
    }

    if(typeof(n1) !== 'number' || typeof(n2) !== 'number'){
        return res.status(400).send({ message: "Os valores devem ser números"})
    }

    res.send({ soma: `${n1 + n2}`})
})

app.get('/starwars/films', (req, res) => {

    const getFilms = async () => {
        const searchedInfo = await fetch('https://swapi.dev/api/films')
            .then(info => info.json())
            .then(films => films.results.map(film => film.title))
        
    res.status(200).send(searchedInfo)
    }
    
    getFilms();   
})