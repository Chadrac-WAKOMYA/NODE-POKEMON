const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
            const message = "Le pokemon demande n\'existe pas, essayez avec un autre identifiant"
            res.statut(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = "Le pokemon n\'a pas pu etre recuperee, reessayez dans quelques instants"
        res.statut(500).json({message, data: error})
      })
  })
}