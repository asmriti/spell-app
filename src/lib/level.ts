export const getLevelDisplay = (level: number) => {
  if (level === 0) return "Cantrip";
  const suffix =
    level === 1 ? "st" : level === 2 ? "nd" : level === 3 ? "rd" : "th";
  return `${level}${suffix} Level`;
};
