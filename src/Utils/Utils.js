const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const getFullTime = (isoTime) => {
  const time = new Date(isoTime);

  return `${time.getHours()}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${time.getDate()} ${
    months[time.getMonth()]
  } ${time.getFullYear()}г.`;
};

export const getTime = (isoTime) => {
  const time = new Date(isoTime);

  return `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;
};

export const generateId = () => Math.floor(Math.random() * 100000);
