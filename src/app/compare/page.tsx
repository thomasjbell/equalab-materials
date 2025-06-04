"use client";

import { useState, useMemo, useEffect } from "react";
import { Material } from "@/types/material";
import { loadMaterials } from "@/lib/materials";
import { formatPropertyLabel } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";

export default function ComparePage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await loadMaterials();
      setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const filteredMaterials = useMemo(() => {
    if (!searchTerm.trim()) return materials;
    
    const searchLower = searchTerm.toLowerCase();
    return materials.filter(material =>
      material.name.toLowerCase().includes(searchLower) ||
      material.shortName.toLowerCase().includes(searchLower) ||
      material.type.toLowerCase().includes(searchLower) ||
      material.designation.toLowerCase().includes(searchLower)
    );
  }, [materials, searchTerm]);

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterials(prev => {
      const isSelected = prev.some(m => m.id === material.id);
      
      if (isSelected) {
        return prev.filter(m => m.id !== material.id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), material];
        }
        return [...prev, material];
      }
    });
  };

  const clearSelection = () => {
    setSelectedMaterials([]);
  };

  // Get all property keys from selected materials
  const allProperties = useMemo(() => {
    const props = new Set<string>();
    selectedMaterials.forEach(material => {
      Object.keys(material.properties).forEach(key => {
        if (material.properties[key]) {
          props.add(key);
        }
      });
    });
    return Array.from(props);
  }, [selectedMaterials]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Compare Materials</h1>
          <p className="mt-2 text-sm text-slate-600">
            Select up to 3 materials to compare their properties side by side.
          </p>
        </header>

        {/* Material Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search materials to add to comparison..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaterials.map(material => (
              <div
                key={material.id}
                onClick={() => handleMaterialSelect(material)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMaterials.some(m => m.id === material.id)
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <h3 className="font-medium text-gray-900">{material.name}</h3>
                <p className="text-sm text-gray-500">{material.shortName}</p>
                <p className="text-sm text-gray-500">{material.type}</p>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No materials found matching your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-cyan-600 hover:text-cyan-700 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selectedMaterials.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Comparison</h2>
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    {selectedMaterials.map(material => (
                      <th key={material.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {material.shortName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Name
                    </td>
                    {selectedMaterials.map(material => (
                      <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.name}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Type
                    </td>
                    {selectedMaterials.map(material => (
                      <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.type}
                      </td>
                    ))}
                  </tr>
                  {allProperties.map((property, index) => (
                    <tr key={property} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatPropertyLabel(property)}
                      </td>
                      {selectedMaterials.map(material => (
                        <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {material.properties[property] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedMaterials.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              Select materials above to start comparing their properties.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}