const TMDBAPI3 = '5c14d3dcf099ba21a7bce7fc355c9fca'
// const TMDBAPI4 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzE0ZDNkY2YwOTliYTIxYTdiY2U3ZmMzNTVjOWZjYSIsInN1YiI6IjVhNDM4MjExYzNhMzY4NTg0NDA1MDQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lq7WivS8qWrMsyQ_QQKaUgttRG_nhrzUORUmrrTo9dk'
const MDB = require('moviedb-promise')
const MovieDB = new MDB(TMDBAPI3)
const logger = require('winston')
let imgBase


module.exports = function bootstrap(app) {
  const genreService = app.service('genre')
  const filmService = app.service('film')
  MovieDB.configuration()
    .then((res) => {
      imgBase = `${res.images.secure_base_url}${res.images.poster_sizes[4]}`
    })
    .then(() => {
      MovieDB.genreMovieList()
        .then((data) => {
          try {
            data.genres.forEach((genre) => {
              genreService.find({ query: { 'tmdb_id': genre.id } }).then((thisGenre) => {
                if (thisGenre.data && thisGenre.data.length) {
                  logger.info(`${thisGenre.data[0].name} already in database.`)
                } else {
                  genreService.create({
                    'tmdb_id': genre.id,
                    'name': genre.name
                  }).catch((err) => logger.error(err))
                }
              })
                .catch((err) => logger.error(err))
            })
          } catch (e) {
            logger.error(`Unable to add genres: ${e}`)
          }
        })
        .catch((err) => logger.error(err))
    })

    .then(() => {
      let wait = 0
      for (var i = 1; i < 1001; i++) {
        if (i % 2 === 0) {
          wait = wait + 12000
          logger.info('Rate limit triggering a wait...')
        }
        // Rate limiting limits us to 40 reqs every 10s, so wrapping in a debouncing IIFE
        (function (wait, i) {
          setTimeout(() => {
            MovieDB.discoverMovie({
              page: i
            })
              .then((data) => {
                data = data.results
                try {
                  for (let i = 0; i < data.length; i++) {
                    filmService.find({ query: { 'tmdb_id': data[i].id } })
                      .then((thisFilm) => {
                        if (thisFilm.data.length) {
                          // logger.info(`Film ${thisFilm.data[0].title} already in database.`)
                        } else {

                          const film = {
                            'tmdb_id': data[i].id,
                            'title': data[i].title,
                            'rating': data[i].vote_average,
                            'overview': data[i].overview,
                            'image': imgBase + data[i].poster_path,
                            'backdrop': imgBase + data[i].backdrop_path,
                            'release_date': new Date(data[i].release_date)
                          }

                          // I need to get all the genres and then I can add them to my film object which I'm going to create
                          Promise.all(data[i].genre_ids.map((genre) => {
                            return genreService.find({ query: { 'tmdb_id': genre } }).catch((err) => logger.error(err))
                          }))

                            .then((values) => {
                              let filmGenres = values.map((value) => value.data[0])
                              let genreList = filmGenres
                              film.genres = genreList

                              filmService.create(film)
                                .then((newFilm) => {
                                  // logger.info(`${newFilm.title} added to database.`)
                                  //filmService.patch(newFilm.id, {genres: genreList})
                                  // .catch((err) => logger.error(err))
                                })
                                .catch((err) => logger.error(err.errors.map((item) => item.message)))
                            })
                            .catch((err) => logger.error(err))
                        }
                      })
                      .catch((err) => console.error(err))
                  }
                } catch (e) {
                  console.error(`Could not add films: ${e}`)
                }
              })
            console.log(`Waited ${wait / 1000}s before launching this request.`)
          }, wait)
        })(wait, i)
      }
      console.log('All requests queued!')
    })
}