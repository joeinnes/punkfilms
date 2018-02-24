const users = require('./users/users.service.js');
const genre = require('./genre/genre.service.js');
const film = require('./film/film.service.js');
const like = require('./like/like.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(genre);
  app.configure(film);
  app.configure(like);
};
