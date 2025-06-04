export interface Material {
  id: string;
  name: string;
  shortName: string;
  type: string;
  designation: string;
  properties: {
    hardness?: string;
    density?: string;
    youngsModulus?: string;
    uts?: string;
    frictionCoef?: string;
    waterAbsorption?: string;
    electricalResistance?: string;
    resistivity?: string;
    flexuralMod?: string;
    impactCharpy?: string;
    notchedImpactCharpy?: string;
    meltingTemp?: string;
    specificHeatCap?: string;
    thermalConductivity?: string;
    costPerKg?: string;
    recyclability?: string;
    biocompatible?: string;
    application?: string;
    [key: string]: string | number | undefined;
  };
}

export interface MaterialCardProps {
  material: Material;
  onClick?: (material: Material) => void;
  isSelected?: boolean;
}