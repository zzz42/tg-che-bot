'use strict';

const TelegramBot = require('node-telegram-bot-api');

module.exports = function (config, logger) {
  logger.info('Starting to configure bot instance...');

  // Setup polling way
  const bot = new TelegramBot(config.token, {polling: true});
  require('./plugins-loader')(bot, config, logger);

  logger.info('✔ Bot is ready');
  return bot;
}
