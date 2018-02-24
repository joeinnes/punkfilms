// Initializes the `film` service on path `/film`
const createService = require('feathers-sequelize')
const createModel = require('../../models/film.model')
const hooks = require('./film.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'film',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/film', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('film')

  service.hooks(hooks)
}
