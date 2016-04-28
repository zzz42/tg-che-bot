'use strict';

module.exports = function (bot, config, logger) {
  // Matches /echo [whatever]
  bot.onText(/\/echo (.+)/, function (msg, match) {
    logger.debug('Echo called');

    let fromId = msg.from.id;
    let resp = match[1];
    bot.sendMessage(fromId, resp);
  });
}
