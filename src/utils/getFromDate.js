export function getFromDate(dateStr) {
  const MONTH = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const DAY = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const date = new Date(dateStr);

  const d = date.getDay();
  const m = date.getMonth();
  const y = date.getFullYear();

  return {
    weekday: DAY[d],
    day: date.getDay(),
    month: MONTH[m],
    year: y,
  };
}
