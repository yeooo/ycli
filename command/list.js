'use strict'
const table = require('../util/table');
const config = require('../templates');
module.exports = () => {
  table(config);
  process.exit();
};