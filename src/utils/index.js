'use strict';

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv-safe');

module.exports = {
  dotEnv: _ => {
    dotenv.config({
      example: path.join(__dirname,
        '..',
        '..',
        'env.md'),
      path: path.join(__dirname,
        '..',
        '..',
        '.env')
    });
  },
  getFilesInDirSync: (dir, ext, exludes = []) => {
    return fs.readdirSync(dir)
      .filter(file => file.endsWith(ext) && !exludes.includes(file))
      .map(file => path.join(dir, file));
  }
};
