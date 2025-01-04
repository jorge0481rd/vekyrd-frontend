export const extractDateStartAndDateEnd = (body) => {
  const { date_start, date_end } = body;
  const ds = new Date(date_start).toISOString().split('T')[0];
  const de = new Date(date_end).toISOString().split('T')[0];
  return { ds, de };
};
