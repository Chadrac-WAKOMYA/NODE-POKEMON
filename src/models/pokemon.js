
const validTypes = ['Plante','Poison','Eau','Insecte','Feu','Vol','Normal','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Le nom est deja pris'},
        validate:{
            notEmpty : { msg: 'Name ne doit pas etre vide' },
            notNull : { msg: 'Name est une propriete requise' }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isInt : { msg: 'Utiliser uniquement les nombres entiers, SVP' },
            notNull : { msg: 'Les points de vie est une propriete requise' },
            min : {
                args: [0],
                msg: 'Les points de vie doivent etre superieurs ou egaux a 0'
            },
            max : {
                args: [999],
                msg: 'Les points de vie doivent etre inferieurs ou egaux a 999'
            }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isInt : { msg: 'Utiliser uniquement les nombres entiers, SVP' },
            notNull : { msg: 'Les points de vie est une propriete requise' }
        },
        min : {
            args: [0],
            msg: 'Les points de degats doivent etre superieurs ou egaux a 0'
        },
        max : {
            args: [99],
            msg: 'Les points de degats doivent etre inferieurs ou egaux a 99'
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isUrl : { msg: 'Utiliser uniquement les URL valides pour les images' },
            notNull : { msg: 'Les points de vie est une propriete requise' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types', types.join())
        },
        validate: {
            isTypeValid(value){
                if(!value){
                    throw new Error('Un pokemon doit avoir un type')
                }
                if(value.split(',').length > 3){
                    throw new Error('Un pokemon ne peut pas avoir plus de trois types')
                }
                value.split(',').forEach(type => {
                    if(!validTypes.includes(type)){
                        throw new Error(`Le type d'un pokemon doit appartenir a la liste suivante : ${validTypes}`)
                    }
                });
            }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }