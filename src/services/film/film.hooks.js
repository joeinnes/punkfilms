const includeGenres = require('../../hooks/includeGenres')
const addGenresToNewFilm = require('../../hooks/addGenresToNewFilm')

module.exports = {
  before: {
    all: [includeGenres()],
    find: [],
    get: [],
    create: [addGenresToNewFilm()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [includeGenres()],
    find: [],
    get: [],
    create: [addGenresToNewFilm()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
