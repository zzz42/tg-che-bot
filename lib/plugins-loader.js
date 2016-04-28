'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (bot, config, logger) {
  const pluginsDir = path.join(__dirname, '..', 'plugins');
  let plugins = fs.readdirSync(pluginsDir);
  plugins.filter(plugin => plugin.toLowerCase().endsWith('.js')).forEach(plugin => {
    try {
      logger.info('Loading plugin:', plugin);
      require(path.join(pluginsDir, plugin))(bot, config, logger);
    } catch (e) {
      logger.warn('Failed plugin:', plugin, e);
    }
  });
}
