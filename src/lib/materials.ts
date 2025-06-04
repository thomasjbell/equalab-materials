import { Material } from '@/types/material';

export const loadMaterials = async (): Promise<Material[]> => {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    
    // Add IDs to materials if they don't already have them
    const materialsWithIds: Material[] = data.materials.map((material: Partial<Material>, index: number) => ({
      id: material.id || `${index + 1}`,
      name: material.name || '',
      shortName: material.shortName || '',
      type: material.type || '',
      designation: material.designation || '',
      properties: material.properties || {},
      ...material
    }));

    return materialsWithIds;
  } catch (error) {
    console.error("Error loading materials:", error);
    return [];
  }
};

// Helper function to get unique material types
export const getMaterialTypes = (materials: Material[]): string[] => {
  return [...new Set(materials.map(material => material.type))];
};