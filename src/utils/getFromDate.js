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

  const date = new Date(dateStr);

  const d = date.getDate();
  const day_number = date.getDay();
  const m = date.getMonth();
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
