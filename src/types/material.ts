export interface Material {
  id: string;
  name: string;
  shortName: string;
  type: string;
  designation: string;
  properties: MaterialProperties;
}

export interface MaterialProperties {
  hardness?: string;
  density?: string;
  youngsModulus?: string;
  uts?: string;
  frictionCoef?: string;
  waterAbsorption?: string;
  flexuralMod?: string;
  meltingTemp?: string;
  specificHeatCap?: string;
  thermalConductivity?: string;
  costPerKg?: string;
  recyclability?: string;
  biocompatible?: string;
  application?: string;
  [key: string]: string | number | undefined;
}

export interface MaterialCardProps {
  material: Material;
  onClick?: (material: Material) => void;
  isSelected?: boolean;
}