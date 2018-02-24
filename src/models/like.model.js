// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const like = sequelizeClient.define('like', {
    reaction: {
      type: DataTypes.ENUM,
      values: ['like', 'dislike', 'seen']
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  // eslint-disable-next-line no-unused-vars
  like.associate = function (models) {
    like.belongsTo(models.users)
    like.belongsTo(models.film)
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  }

  return like
}
