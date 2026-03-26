export function formatLabelValue(value: string) {
  return value.trim().toLowerCase();
}

export function formatProjectCount(total: number) {
  return `${total} ${total === 1 ? "projeto" : "projetos"}`;
}
