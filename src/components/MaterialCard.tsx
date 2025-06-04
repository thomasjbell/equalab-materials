"use client";

import { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, RefreshCw, Copy, Check } from 'lucide-react';
import { Material } from '@/types/material';
import { formatPropertyLabel } from '@/lib/utils';

interface MaterialCardProps {
  material: Material;
  onClick?: (material: Material) => void;
  isSelected?: boolean;
}

export default function MaterialCard({ 
  material, 
  onClick, 
  isSelected = false 
}: MaterialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(material);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCopyProperties = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    let content = `${material.name} (${material.shortName})\n`;
    content += `Type: ${material.type}\n`;
    content += `Designation: ${material.designation}\n\n`;
    content += `Properties:\n`;

    Object.entries(material.properties).forEach(([key, value]) => {
      if (value) {
        content += `${formatPropertyLabel(key)}: ${value}\n`;
      }
    });

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-sm transition-all duration-200 hover:border-cyan-400 p-6 ${
        isExpanded ? "shadow-lg border-blue-400" : ""
      } ${isSelected ? 'ring-2 ring-cyan-500' : ''}`}
    >
      {/* Card Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {material.name}
            </h3>
            <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">
              {material.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{material.shortName}</p>
          {material.designation && (
            <p className="text-sm text-gray-500">{material.designation}</p>
          )}
        </div>
        <div className="ml-4 flex items-center">
          {!onClick && (
            isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && !onClick && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-gray-900">Properties</h4>
            <button
              onClick={handleCopyProperties}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-sm transition-colors duration-150 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy All
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(material.properties).map(([key, value]) => {
              if (!value) return null;
              return (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {formatPropertyLabel(key)}
                  </label>
                  <div className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}