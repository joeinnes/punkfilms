const hydrate = require('feathers-sequelize/hooks/hydrate')

module.exports = function includeGenres() {
  return function (hook) {
    const GenreModel = hook.app.service('genre').Model
    const association = {
      include: [{
        model: GenreModel,
        attributes: ['name', 'id', 'tmdb_id']
      }]
    }

    switch (hook.type) {
    case 'before':
      hook.params.sequelize = Object.assign(association, { raw: false })
      break
      
    case 'after':
      hydrate( association ).call(this, hook)
      break
    }

    return Promise.resolve(hook)
  }
}