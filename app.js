const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
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

app.post('',(req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien ete cree`
    res.json(success(message, pokemonCreated))
})

// app.get('/api/pokemons/:id',(req,res)=>{
//     const id = req.params.id
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     res.send(`Vous avez demande le pokemon ${pokemon.name}`)
// })

app.listen(port,()=>console.log(`Notre application Node est demaree sur : http://localhost:${port}`))