"use client";

import { useState, useEffect } from 'react';
import { Material } from '@/types/material';
import { loadMaterials, getMaterialTypes } from '@/lib/materials';

interface FormData {
  name: string;
  shortName: string;
  type: string;
  customType: string;
  designation: string;
  properties: {
    hardness: string;
    density: string;
    youngsModulus: string;
    uts: string;
    frictionCoef: string;
    waterAbsorption: string;
    electricalResistance: string;
    resistivity: string;
    flexuralMod: string;
    impactCharpy: string;
    notchedImpactCharpy: string;
    meltingTemp: string;
    specificHeatCap: string;
    thermalConductivity: string;
    costPerKg: string;
    recyclability: string;
    biocompatible: string;
    application: string;
  };
}

export default function AddMaterialPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    name: '',
    shortName: '',
    type: '',
    customType: '',
    designation: '',
    properties: {
      hardness: '',
      density: '',
      youngsModulus: '',
      uts: '',
      frictionCoef: '',
      waterAbsorption: '',
      electricalResistance: '',
      resistivity: '',
      flexuralMod: '',
      impactCharpy: '',
      notchedImpactCharpy: '',
      meltingTemp: '',
      specificHeatCap: '',
      thermalConductivity: '',
      costPerKg: '',
      recyclability: '',
      biocompatible: '',
      application: ''
    }
  });

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await loadMaterials();
      setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const materialTypes = getMaterialTypes(materials);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'properties') {
        setFormData(prev => ({
          ...prev,
          properties: {
            ...prev.properties,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty properties
    const filteredProperties: Record<string, string> = {};
    Object.entries(formData.properties).forEach(([key, value]) => {
      if (value.trim() !== '') {
        filteredProperties[key] = value.trim();
      }
    });

    // Create the new material object
    const newMaterial = {
      name: formData.name,
      shortName: formData.shortName,
      type: formData.type === 'custom' ? formData.customType : formData.type,
      designation: formData.designation,
      properties: filteredProperties
    };

    // Generate JSON code
    const code = JSON.stringify(newMaterial, null, 2);
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Material</h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill out this form to generate the JSON code needed to add a new material to the database.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 shadow-xl rounded-lg">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Material Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="e.g., High-Density Polyethylene"
                />
              </div>

              <div>
                <label htmlFor="shortName" className="block text-sm font-medium text-slate-700">
                  Short Name/Code *
                </label>
                <input
                  type="text"
                  name="shortName"
                  id="shortName"
                  required
                  value={formData.shortName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="e.g., HDPE"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                  Material Type *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                >
                  <option value="">Select a type</option>
                  {materialTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value="custom">Add New Type</option>
                </select>
              </div>

              {formData.type === 'custom' && (
                <div>
                  <label htmlFor="customType" className="block text-sm font-medium text-slate-700">
                    New Type Name *
                  </label>
                  <input
                    type="text"
                    name="customType"
                    id="customType"
                    required
                    value={formData.customType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="e.g., Composite"
                  />
                </div>
              )}

              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-slate-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  placeholder="e.g., Type III"
                />
              </div>
            </div>
          </section>

          {/* Properties */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">Material Properties</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(formData.properties).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-slate-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    name={`properties.${key}`}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder={`Enter ${key.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="pt-5">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate Material Code
            </button>
          </div>
        </form>

        {generatedCode && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-800">Generated Code:</h2>
            <p className="mt-1 mb-2 text-sm text-slate-600">
              Copy this code and add it to the materials database.
            </p>
            <div className="relative bg-slate-800 text-white p-4 rounded-md shadow-lg overflow-x-auto">
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-3 py-1 bg-sky-500 text-white text-xs font-medium rounded hover:bg-sky-600"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <pre><code className="language-json text-sm">{generatedCode}</code></pre>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}