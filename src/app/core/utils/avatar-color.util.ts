const AVATAR_COLORS = [
  '#FF7A00',
  '#9327FF',
  '#6E52FF',
  '#FC71FF',
  '#FFBB2B',
  '#1FD7C1',
  '#462F8A',
  '#FF4646',
  '#00BEE8',
  '#FF5EB3',
  '#0038FF',
  '#C3FF2B',
];

/**
 * Leitet aus einem Namen deterministisch eine Avatar-Farbe ab.
 * Gleicher Name ergibt immer dieselbe Farbe.
 */
export function getAvatarColor(name: string): string {
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return AVATAR_COLORS[charSum % AVATAR_COLORS.length];
}
