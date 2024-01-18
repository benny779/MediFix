const { join } = require('path');

const i18next = require('i18next');
const i18backend = require('i18next-fs-backend');
const i18middleware = require('i18next-http-middleware');

i18next
  .use(i18backend)
  .use(i18middleware.LanguageDetector)
  .init({
    debug: false,
    fallbackLng: ['en', 'he'],
    lng: 'he',
    // initImmediate: false,
    skipOnVariables: false,
    backend: {
      loadPath: join(__dirname, './locales/{{lng}}/{{ns}}.json'),
      // loadPath: '/locales/{{lng}}.json',
    },
  });

module.exports = { i18next, i18nextMiddleware: i18middleware };
