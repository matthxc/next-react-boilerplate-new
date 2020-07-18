/* eslint-disable no-multi-assign */
// #region Global Imports
const nextRoutes = require('next-routes');
// #endregion Global Imports

const routes = (module.exports = nextRoutes());

routes.add('home', '/');
routes.add('example', '/example');

export default routes;
