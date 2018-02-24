// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const film = sequelizeClient.define('film', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    rating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    backdrop: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tmdb_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  // eslint-disable-next-line no-unused-vars
  film.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    film.belongsToMany(models.genre, {through: 'FilmGenres'})
  }
  return film
}
