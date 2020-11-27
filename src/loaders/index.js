'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  getData: _ => {
    const filters = JSON.parse(fs.readFileSync(path.join(__dirname,
      '..',
      '..',
      'data',
      'filters.json'), 'utf8'));
    const jobs = JSON.parse(fs.readFileSync(path.join(__dirname,
      '..',
      '..',
      'data',
      'jobs.json'), 'utf8'));
    return {
      filters,
      jobs
    };
  }
};
