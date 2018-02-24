// Initializes the `genre` service on path `/genre`
const createService = require('feathers-sequelize')
const createModel = require('../../models/genre.model')
const hooks = require('./genre.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'genre',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/genre', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('genre')

  service.hooks(hooks)
}
