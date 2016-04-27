const TelegramBot = require('node-telegram-bot-api');

const config = require('./config.json');

// Setup polling way
const bot = new TelegramBot(config.token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  let fromId = msg.from.id;
  let resp = match[1];
  bot.sendMessage(fromId, resp);
});
