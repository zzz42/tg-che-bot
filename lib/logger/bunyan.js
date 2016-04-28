'use strict';

const bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');

const options = {
  name: require(path.join(process.cwd(), 'package.json')).name
};

module.exports = function (config) {
  let logDir = config.logDir;
  if (logDir.charAt(0) !== '/') {
    logDir = path.join(process.cwd(), logDir);
  }
  if (fs.existsSync(logDir) === false) {
    try {
      fs.mkdirSync(logDir);
    } catch (e) {
      console.error('✗ Error with configuration: can not create logs directory', e);
      process.exit(1);
    }
  }
  options.streams = [
    {
      type: 'rotating-file',
      path: path.join(logDir, options.name + '.log'),
      period: '1d',
      count: 10
    }
  ];
  let logger = bunyan.createLogger(options);
  logger.level(config.logLevel || 'info');

  process.on('SIGUSR2', function () {
    logger.reopenFileStreams();
  });

  return logger;
}
