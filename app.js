const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

// Ici nous placerons nos futurs point de terminaison






// app.get('/',(req,res)=>res.send("Hello, Express ! "))

// app.get('/api/pokemons/:id',(req, res) => {
//     const id =  parseInt(req.params.id)
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = "Un pokemon a bien ete trouve"
//     res.json(success(message, pokemon))
// })

// app.get('/api/pokemons', (req, res) => {
//     res.json(success('Tous les pokemons presents pour le moment',pokemons))
// })

// app.post('/api/pokemons',(req, res) => {
//     const id = getUniqueId(pokemons)
//     const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `Le pokemon ${pokemonCreated.name} a bien ete cree`
//     res.json(success(message, pokemonCreated))
// })

// app.put('/api/pokemons/:id',(req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = {...req.body, id: id}
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokemon num ${pokemonUpdated.id} a bien ete modifie`
//     res.json(success(message, pokemonUpdated))
// })

// app.delete('/api/pokemons/:id',(req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon num ${pokemonDeleted.id} a ete bien supprime`
//     res.json(success(message, pokemonDeleted))
// })

// // app.get('/api/pokemons/:id',(req,res)=>{
// //     const id = req.params.id
// //     const pokemon = pokemons.find(pokemon => pokemon.id === id)
// //     res.send(`Vous avez demande le pokemon ${pokemon.name}`)
// // })

app.listen(port,()=>console.log(`Notre application Node est demaree sur : http://localhost:${port}`))