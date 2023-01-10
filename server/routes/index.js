const translation = require('./translation');

function registerApiRoute(path, route) {
  return (app) => app.register(route, { path });
}

function mountRoutes(app) {
  registerApiRoute('/translation', translation)(app);
}

module.exports = {
  mountRoutes,
}
