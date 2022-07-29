export function getColor(color: string | null | undefined): string {
  if (color === 'primary') {
    return '#07A39D';
  } else if (color === 'secondary') {
    return '#0A2540';
  } else if (color === 'warning') {
    return '#F18F01';
  } else if (color === 'success') {
    return '#74B06F';
  } else if (color === 'danger') {
    return '#E54D4D';
  } else if (color === 'white') {
    return '#FFFFFF';
  } else if (color === 'black') {
    return '#000000';
  } else if (color === 'gray') {
    return '#2C2C2C';
  } else {
    return color || '#07A39D';
  }
}

export const projectIcons = {
  close: (size = 24, color?: string) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="${getColor(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="${getColor(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  menu: (size = 24, color?: string) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H21" stroke="${getColor(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 16H17" stroke="${getColor(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 23H21" stroke="${getColor(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
};

