export const convertDate = (startDate, endDate) => {
  const newStartDate = new Date(startDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
  const newEndDate = endDate
    ? new Date(endDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      })
    : 'Present';

  return `${newStartDate} - ${newEndDate}`;
};
