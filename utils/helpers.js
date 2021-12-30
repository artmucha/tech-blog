export const formDate = date => {
  const newDate = new Date(date);
  return Intl.DateTimeFormat('pl-PL', {dateStyle: 'long'}).format(new Date(date));
};