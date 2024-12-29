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
  const m = date.getMonth();
  const y = date.getFullYear();

  return {
    d,
    m,
    y,
    day_name: DAY_NAMES[d],
    month_name: MONTH[m],
    date: `${d}/${m}/${y}`,
    longDate: `${DAY_NAMES[d]} ${d + 1} de ${MONTH[m]} del ${y}`,
  };
}
