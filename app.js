const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {success, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

// app.use((req,res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// })

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/',(req,res)=>res.send("Hello, Express ! "))

app.get('/api/pokemons/:id',(req, res) => {
    const id =  parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokemon a bien ete trouve"
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) => {
    res.json(success('Tous les pokemons presents pour le moment',pokemons))
})

app.post('/api/pokemons',(req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien ete cree`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id',(req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated} a bien ete modifie`
    res.json(success(message, pokemonUpdated))
})

// app.get('/api/pokemons/:id',(req,res)=>{
//     const id = req.params.id
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     res.send(`Vous avez demande le pokemon ${pokemon.name}`)
// })

app.listen(port,()=>console.log(`Notre application Node est demaree sur : http://localhost:${port}`))