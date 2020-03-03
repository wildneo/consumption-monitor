export const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('ru', options);
};

export const isNumeric = (value) => {
  const result = value.match(/^[-+]?[0-9]*\.?[0-9]+$/g);
  return result ? false : true;
};
