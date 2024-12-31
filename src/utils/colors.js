export const getRandomColor = () => {
  const COLORS = [
    '#003547',
    '#C2BB00',
    '#E1523D',
    '#ED8B16',
    '#103778',
    '#0593A2',
    '#fe98ef',
  ];
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

export function hexToRGBA(hex, alpha = 0.5) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return as rgba string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
