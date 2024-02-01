export const convertDate = (startDate, endDate) => {
  const newStartDate = new Date(startDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'narrow',
  });
  const newEndDate = endDate
    ? new Date(endDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'narrow',
      })
    : 'Present';

  return `${newStartDate} - ${newEndDate}`;
};
