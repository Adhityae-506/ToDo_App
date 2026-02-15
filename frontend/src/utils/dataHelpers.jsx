export const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
};

export const isPast = (date) => {
  const today = new Date();
  return new Date(date) < new Date(today.toDateString());
};

export const isFuture = (date) => {
  const today = new Date();
  return new Date(date) > new Date(today.toDateString());
};
