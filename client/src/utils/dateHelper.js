const formatJsonDateTime = (dateTime) => {
  const date = dateTime.substring(0, 10);
  const formattedDate = formatJsonDateToNiceView(date);
  return `${formattedDate} ${dateTime.substring(11, 16)}`;
};

const formatJsonDateToNiceView = (date) =>
  `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`;

const getTimeDifference = (time) => {
  const now = new Date();
  const createdDate = new Date(time);
  const diffInMilliseconds = now - createdDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) return `${diffInDays}d`;
  if (diffInHours > 0) {
    const remainingMinutes = diffInMinutes % 60;
    return `${diffInHours}h ${remainingMinutes}m`;
  }
  return `${diffInMinutes}m`;
};

export { formatJsonDateTime, getTimeDifference };
