const hydrate = require('feathers-sequelize/hooks/hydrate')

module.exports = function addGenresToNewFilm () {
  return function (hook) {
    const GenreModel = hook.app.service('genre').Model
    const association = { include: [ GenreModel ] }
    switch (hook.type) {
    case 'before':
      if (hook.data && hook.data.genres) {
        hook.params.genres = hook.data.genres
        delete hook.data.genres
      }
      return Promise.resolve(hook)
        
    case 'after':
      if (hook.params.genres) {
        // Do I have an array?
        if (Array.isArray(hook.params.genres)) {
        // If I have an array, is it an array of Genre IDs or of Genre objects containing Genre ID?
          if (hook.params.genres[0].id) {
            hook.result.addGenres(hook.params.genres.map((genre) => genre.id))  
          } else { // My array is just an array of Genre IDs so I can just add it directly
            hook.result.addGenres(hook.params.genres)  
          }
        } else if (hook.params.genres.id) {
          hook.result.addGenre(hook.params.genres.id)  
        } else {
          throw `Couldn't work out how to add ${hook.params.genres}, sorry.`
        }
      }
      hydrate( association ).call(this, hook)
      break
    }
    return Promise.resolve(hook)
  }
}