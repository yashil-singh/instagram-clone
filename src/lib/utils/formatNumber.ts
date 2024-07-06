export function formatNumber(number: number) {
  const format = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });

  return format.format(number);
}
