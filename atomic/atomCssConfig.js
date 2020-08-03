const merge = require('lodash/merge');
const themeFn = require('./theme');
const themeEn = themeFn();

const cssVariables = {};
Object.keys(themeEn).forEach(prop => {
  const obj = themeEn[prop];
  const { prefix } = obj;
  delete obj.prefix;

  Object.keys(obj).forEach(key => {
    cssVariables[`$${prefix}${key}`] = obj[key];
  });
});

const config = {
  cssDest: './css/generatedAtoms.css',
  options: {},
  configs: {
    breakPoints: {
      sm: '@media screen and (min-width: 750px)',
      md: '@media(min-width: 900px)',
      lg: '@media(min-width: 1200px)',
      mdDown: '@media screen and (max-width: 600px)',
      ptr: '@media screen and (orientation:portrait)',
      ldsp: '@media screen and (orientation:landscape)',
    },
    custom: cssVariables,
    classNames: [
      'M(0)',
      'P(0)',
      'W($25xl)',
      'W($full)',
      'W($half)',
      'W($quarter)',
      'Mend(8px)',
      'Trsdu(0.4s)',
      'Trsp(a)',
      'Trstf(e)',
      'Trsdu(0.5s)',
      'Trsdu(0.8s)',
      'Trdsu(1s)',
      'Trsdu(2s)',
      'Trsdu(3s)',
      'Trsdu(5s)',
      'Mstart(8px)',
      'Mah($10x)',
    ],
  },
};

module.exports = merge(config, config.configs);
