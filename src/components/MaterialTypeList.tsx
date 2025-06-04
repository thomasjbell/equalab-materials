"use client";

import { Material } from '@/types/material';

interface MaterialTypeListProps {
  materials: Material[];
  onTypeSelect?: (type: string | null) => void;
  selectedType?: string | null;
}

export default function MaterialTypeList({ 
  materials, 
  onTypeSelect, 
  selectedType 
}: MaterialTypeListProps) {
  const uniqueTypes = [...new Set(materials.map(material => material.type))];
  
  const typeCounts = uniqueTypes.reduce((counts, type) => {
    counts[type] = materials.filter(m => m.type === type).length;
    return counts;
  }, {} as Record<string, number>);

  const sortedTypes = uniqueTypes.sort((a, b) => typeCounts[b] - typeCounts[a]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Material Types</h2>
      <div className="space-y-2">
        <button
          onClick={() => onTypeSelect?.(null)}
          className={`w-full text-left py-2 px-4 rounded transition-colors ${
            selectedType === null
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Types ({materials.length})
        </button>
        {sortedTypes.map(type => (
          <button
            key={type}
            onClick={() => onTypeSelect?.(type)}
            className={`w-full text-left py-2 px-4 rounded transition-colors ${
              selectedType === type
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {type} ({typeCounts[type]})
          </button>
        ))}
      </div>
    </div>
  );
}