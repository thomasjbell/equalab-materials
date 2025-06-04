"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Material } from '@/types/material';
import { loadMaterials } from '@/lib/materials';
import MaterialCard from '@/components/MaterialCard';
import { ArrowLeft } from 'lucide-react';

export default function MaterialTypePage() {
  const params = useParams();
  const typeId = decodeURIComponent(params.typeId as string);
  
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await loadMaterials();
      setMaterials(data);
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const materialsOfType = materials.filter(material => material.type === typeId);

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
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-cyan-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to All Materials
          </a>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {typeId} Materials
            <span className="ml-2 text-lg text-slate-600">({materialsOfType.length})</span>
          </h1>
        </div>

        <div className="space-y-4">
          {materialsOfType.length > 0 ? (
            materialsOfType.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-slate-500 text-lg">No materials found for this type.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}