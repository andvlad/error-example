const translationController = require('../controllers/translation');

module.exports = function (fastify, opts, done) {
  fastify.get('/:code', translationController.get)
  done();
}
