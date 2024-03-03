const formatJsonDateTime = (dateTime) => {
  const date = dateTime.substring(0, 10);
  const formattedDate = formatJsonDateToNiceView(date);
  return `${formattedDate} ${dateTime.substring(11, 16)}`;
};

const formatJsonDateToNiceView = (date) =>
  `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`;

export { formatJsonDateTime };
