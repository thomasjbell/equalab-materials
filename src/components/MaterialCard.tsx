"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-50 dark:border-gray-800 overflow-hidden transition-all duration-200 hover:shadow-xl ${
        isExpanded ? "shadow-lg border-blue-400 dark:border-cyan-600" : ""
      } ${isSelected ? 'ring-2 ring-cyan-500' : ''}`}
    >
      {/* Card Header */}
      <div
        className="p-6 cursor-pointer bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-750"
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {material.name}
              </h3>
              <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm font-medium rounded-full">
                {material.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{material.shortName}</p>
            {material.designation && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{material.designation}</p>
            )}
          </div>
          <div className="ml-4 flex items-center">
            {!onClick && (
              isExpanded ? (
                <ChevronDown className="h-6 w-6 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              )
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content with Animation */}
      <AnimatePresence>
        {isExpanded && !onClick && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyProperties}
                    className="px-4 py-2 text-sm bg-green-500 dark:bg-green-600 text-white rounded-full hover:bg-green-600 dark:hover:bg-green-500 transition-colors duration-150 flex items-center gap-2 font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy All Properties
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Properties Grid - Increased Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {Object.entries(material.properties).map(([key, value]) => {
                  if (!value) return null;
                  
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-lg border-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {formatPropertyLabel(key)}
                        </label>
                        <div className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-600 p-2 rounded">
                          {value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Properties Summary */}
              <div className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-600">
                <h4 className="text-sm font-semibold text-cyan-800 dark:text-cyan-200 mb-2">
                  📊 Material Summary
                </h4>
                <div className="text-sm text-cyan-700 dark:text-cyan-300">
                  {Object.keys(material.properties).filter(key => material.properties[key]).length} properties available. 
                  Click "Copy All Properties" to export this data for use in your projects.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}