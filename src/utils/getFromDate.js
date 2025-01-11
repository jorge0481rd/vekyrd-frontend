export function getFromDate(dateStr) {
  const MONTH = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  const DAY_NAMES = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  // if we don't add time, the date returned is off by one day
  if (!dateStr.includes('T')) {
    dateStr += 'T00:00:00';
  }

  const date = new Date(dateStr);

  const d = date.getDate();
  const day_number = date.getDay();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return {
    d,
    m,
    y,
    day_name: DAY_NAMES[d],
    day_number,
    month_name: MONTH[m],
    date: `${d}/${m}/${y}`,
    longDate: `${DAY_NAMES[day_number]} ${d} de ${MONTH[m]} del ${y}`,
  };
}
