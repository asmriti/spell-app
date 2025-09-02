export const getLevelColor = (level: number) => {
  if (level === 0) return "bg-secondary/20 border border-secondary/30";
  if (level <= 2) return "bg-primary/20 border border-primary/30";
  if (level <= 5) return "bg-accent/20 border border-accent";
  return "bg-muted border border-border";
};
