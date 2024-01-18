const { i18n } = require('i18next');

const dayNumberToName = (dayNumber) => {
  const dayNameKey = `days.${dayNumber}`;
  return i18n.t(dayNameKey);
};

module.exports = { dayNumberToName };
