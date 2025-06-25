'use client';

import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'type', label: 'Type' },
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-cyan-900 bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-1 focus:ring-cyan-400 focus:border-transparent outline-none transition-all shadow-sm
        dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-500 dark:shadow-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
    </div>
  );
}