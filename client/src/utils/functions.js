export const toUpperFirstLFirstLetter = (string) => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};

export const getDateToday = (today) => {
  const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  const month =today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1; 
  const year = today.getFullYear(); 

  return `${year}-${month}-${day}`;
};
