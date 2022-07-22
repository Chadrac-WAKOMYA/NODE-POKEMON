const express = require('express')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get('/',(req,res)=>res.send("Hello, Express ! "))

app.get('/api/pokemons/:id',(req, res) => {
    const id =  parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(pokemon)
})

app.get('/api/pokemons', (req, res) => {
    let totalPokemon = pokemons.length
    res.send(`Il y a ${totalPokemon} pokemons dans le pokendex pour le moment`)
})

// app.get('/api/pokemons/:id',(req,res)=>{
//     const id = req.params.id
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     res.send(`Vous avez demande le pokemon ${pokemon.name}`)
// })

app.listen(port,()=>console.log(`Notre application Node est demaree sur : http://localhost:${port}`))