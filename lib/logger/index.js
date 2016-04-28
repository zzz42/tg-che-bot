'use strict';

module.exports = function (config) {
  let isCorrectLogDir = 'logDir' in config && config.logDir.length;
  return require(isCorrectLogDir ? './bunyan' : './console')(config);
}
