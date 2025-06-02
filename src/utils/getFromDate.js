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

  // If we don't add time, the date returned is off by one day
  if (!dateStr.includes('T')) {
    dateStr += 'T00:00:00';
  }

  const date = new Date(dateStr);

  const d = date.getDate();
  const day_number = date.getDay();
  const m = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits
  const y = String(date.getFullYear());

  return {
    d,
    m,
    y,
    day_name: DAY_NAMES[day_number], // Fixed index from `d` to `day_number`
    day_number,
    month_name: MONTH[date.getMonth()], // Use zero-based index directly
    date: `${String(d).padStart(2, '0')}/${m}/${y}`, // Ensure day is also two digits if needed
    longDate: `${DAY_NAMES[day_number]} ${d} de ${MONTH[date.getMonth()]} del ${y}`,
  };
}
