export function formatPropertyLabel(key: string): string {
  // First handle special cases to prevent double replacements
  if (key === 'youngsModulus') return "Young's Modulus";
  if (key === 'flexuralMod') return "Flexural Modulus";
  if (key === 'costPerKg') return "Cost Per kg";

  // Then apply the general formatting rules for other properties
  const formatted = key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

  // Replace common abbreviations
  return formatted
    .replace('Uts', 'UTS')
    .replace('Coef', 'Coefficient')
    .replace(' Mod', ' Modulus')
    .replace('Temp', 'Temperature')
    .replace('Cap', 'Capacity');
}

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}