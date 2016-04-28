'use strict';

const config = require('./config.json');
const logger = require('./lib/logger')(config);

require('./lib/bot')(config, logger);
