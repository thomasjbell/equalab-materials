"use client";

import { useState, useMemo, useEffect } from "react";
import MaterialCard from "./MaterialCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import { loadMaterials } from "@/lib/materials";
import { Material } from "@/types/material";
import { motion } from "framer-motion";

export default function MaterialGrid() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await loadMaterials();
      setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const filteredAndSortedMaterials = useMemo(() => {
    let filtered = materials;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = materials.filter(material => 
        material.name.toLowerCase().includes(searchLower) ||
        material.shortName.toLowerCase().includes(searchLower) ||
        material.type.toLowerCase().includes(searchLower) ||
        material.designation.toLowerCase().includes(searchLower) ||
        // Search in properties
        Object.values(material.properties).some(value => 
          value && value.toString().toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(material => material.type === selectedType);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });
  }, [materials, searchTerm, selectedType, sortBy]);

  const uniqueTypes = useMemo(() => {
    return [...new Set(materials.map(material => material.type))];
  }, [materials]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold text-cyan-950 text-center mb-4 dark:text-cyan-50">
          Material Library
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-2 text-lg">
          Comprehensive database of engineering materials and their properties
        </p>
        <p className="text-center text-gray-500 dark:text-gray-500 mb-6 text-sm">
          Search by material name, type, or property values
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
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-center gap-4">
          <div className="flex-1 min-w-0">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search materials, types, or designations..."
            />
          </div>
          <div className="sm:w-auto">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Type Filter */}
        <div className="overflow-x-auto whitespace-nowrap">
          <button
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              selectedType === null
                ? "bg-cyan-600 text-cyan-50 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600"
                : "bg-slate-200 text-cyan-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-cyan-50 dark:hover:bg-gray-600"
            }`}
            onClick={() => setSelectedType(null)}
          >
            All Types
          </button>
          {uniqueTypes.map((type) => (
            <button
              key={type}
              className={`inline-flex items-center rounded-full px-3 py-1 ml-2 text-sm font-medium ${
                selectedType === type
                  ? "bg-cyan-600 text-cyan-50 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600"
                  : "bg-slate-200 text-cyan-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-cyan-50 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {filteredAndSortedMaterials.length} material
        {filteredAndSortedMaterials.length !== 1 ? "s" : ""} found
        {selectedType && ` in category "${selectedType}"`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Material Cards */}
      <div className="space-y-4">
        {filteredAndSortedMaterials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      {filteredAndSortedMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No materials found matching your search
            {selectedType && ` in category "${selectedType}"`}.
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}