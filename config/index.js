const _ = require('lodash');

const config_production = require('./production.json');
const config_development = require('./development.json');

/**
 *
 * @param {string} NODE_ENV
 */
function get(NODE_ENV) {
  let config = config_production;

  if (NODE_ENV === 'development') {
    config = _.defaults(config_development, config);
  }
  return config;
}

module.exports = get;
