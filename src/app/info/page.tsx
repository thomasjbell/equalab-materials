"use client";
import React from "react";
import { motion } from "framer-motion";

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-cyan-950 dark:text-cyan-50 text-center mb-4">
            About EquaLab Materials
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-2 text-lg">
            Comprehensive materials database and comparison platform
          </p>
          <p className="text-center text-gray-500 dark:text-gray-500 mb-6 text-sm">
            Access, compare, and contribute material property data
          </p>
          <motion.div
            className="bg-gradient-to-r from-cyan-800 to-cyan-500 h-0.5 w-1/3 md:w-1/3 mx-auto rounded-full"
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

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white border-b pb-2 mb-6 dark:border-gray-600">
              Project Overview
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              EquaLab Materials is a comprehensive tool for scientists,
              engineers, and researchers to access, compare, and contribute
              information about various materials and their properties. This
              application allows users to:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Browse materials by type (polymer, metal, ceramic, etc.)</li>
              <li>Search for specific materials by name or designation</li>
              <li>Compare up to three materials side-by-side</li>
              <li>
                View detailed material properties including mechanical,
                electrical, and thermal characteristics
              </li>
              <li>Contribute new materials to the database</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 mt-6">
              Project Origin
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              This database was created based on an idea by Thomas Bell, an
              aspiring materials scientist. Thomas envisioned a comprehensive,
              accessible platform where researchers and students could easily
              access and compare material properties for both reference and
              research purposes.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white border-b pb-2 mb-6 dark:border-gray-600">
              Using the Database
            </h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Browsing Materials
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Materials are organized by type and can be filtered and sorted.
                Click on any material card to expand it and view all properties.
                Each material is displayed with its name, type, and key
                characteristics.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Searching
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Use the search bar to find materials by name, short code, or
                type. The search uses intelligent matching to help you find
                materials even with partial terms.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Comparing Materials
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Navigate to the "Compare" page to select up to three materials
                for side-by-side comparison. This makes it easy to identify the
                best material for your specific requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Contributing
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To add new materials to the database, use the "Add Material"
                page to enter properties and generate the necessary code for
                contribution. This crowd-sourced approach allows the database to
                grow with accurate information.
              </p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white border-b pb-2 mb-6 dark:border-gray-600">
              Technical Information
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The Materials Database is built with modern web technologies:
            </p>

            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Next.js 15 with TypeScript for the application framework</li>
              <li>Tailwind CSS for styling and responsive design</li>
              <li>JSON for efficient data storage and retrieval</li>
              <li>
                Fuzzy search capabilities for intelligent material discovery
              </li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300">
              The database is designed to be fast, accessible, and easy to use
              across all devices.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-600">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Return to Database
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}