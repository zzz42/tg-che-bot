'use strict';

const colors = require('colors');
const moment = require('moment');

const LOG_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

const theme = {
  trace: 'cyan',
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
};
colors.setTheme(theme);

function makeLevel(level) {
  return function () {
    console[level](
        [moment().format(LOG_TIME_FORMAT)[level]]
          .concat(
              Array.prototype.slice.call(arguments, 0)
                      .map(function (e) {
                        if (!e) return String(e);
                        return (e.charAt ? e : (e instanceof Error ? errToString(e) : JSON.stringify(e)));
                      })
          )
          .join(' ')
    );
  };
}

function errToString(err) {
  return err + ' : ' + (err.stack || 'no stack trace');
}

// patch console object
console.debug = console.log;

module.exports = function () {
  let logger = {};
  Object.keys(theme).forEach(function (lvl) {
    logger[lvl] = makeLevel(lvl);
  });
  return logger;
}
