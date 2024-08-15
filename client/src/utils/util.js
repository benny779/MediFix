export const greeting = () => {
  var d = new Date();
  var time = d.getHours();

  switch (true) {
    case time < 12:
      return 'Good Morning';
    case time === 12:
      return 'Good Noon';
    case time > 12 && time <= 18:
      return 'Good Afternoon';
    case time > 18:
      return 'Good Evening';
    default:
      return 'Hello';
  }
};

export const getUserGreeting = (name) => {
  return `${greeting()}, ${name}`;
};
