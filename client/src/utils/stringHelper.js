const truncateText = (text, maxLength) => {
  if (text == null || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

const capitalizeFirstLetter = (string) => {
  return string === null ? null : string.charAt(0).toUpperCase() + string.slice(1);
};

const spreadTrim = (str, char) => {
  const first = [...str].findIndex((c) => c !== char);
  const last = [...str].reverse().findIndex((c) => c !== char);
  return str.substring(first, str.length - last);
};

export { truncateText, capitalizeFirstLetter, spreadTrim };
