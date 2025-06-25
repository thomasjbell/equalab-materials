"use client";

import { useState, useMemo, useEffect } from "react";
import { Material } from "@/types/material";
import { loadMaterials } from "@/lib/materials";
import { formatPropertyLabel } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-cyan-950 dark:text-cyan-50 text-center mb-4">Compare Materials</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-2 text-lg">
            Select up to 3 materials for side-by-side comparison
          </p>
          <p className="text-center text-gray-500 dark:text-gray-500 mb-6 text-sm">
            Click materials below to add them to your comparison
          </p>
          <motion.div
            className="bg-gradient-to-r from-cyan-800 to-cyan-500 h-0.5 w-1/3 md:w-1/4 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.1,
            }}
            viewport={{ once: true }}
          />
        </header>

        {/* Material Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
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
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-600 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm bg-white dark:bg-gray-700'
                }`}
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{material.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{material.shortName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{material.type}</p>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No materials found matching your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {selectedMaterials.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Comparison</h2>
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-md transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Property
                    </th>
                    {selectedMaterials.map(material => (
                      <th key={material.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {material.shortName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </td>
                    {selectedMaterials.map(material => (
                      <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {material.name}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Type
                    </td>
                    {selectedMaterials.map(material => (
                      <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {material.type}
                      </td>
                    ))}
                  </tr>
                  {allProperties.map((property, index) => (
                    <tr key={property} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {formatPropertyLabel(property)}
                      </td>
                      {selectedMaterials.map(material => (
                        <td key={material.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Select materials above to start comparing their properties.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}