const truncateText = (text, maxLength) => {
  if (text == null || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export { truncateText };
