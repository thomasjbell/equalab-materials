import React from "react";

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            About Materials Database
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Learn more about our comprehensive materials database and how to use
            it.
          </p>
        </header>

        <div className="space-y-8">
          <section className="bg-white p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">
              Project Overview
            </h2>
            <p className="mb-4">
              The Materials Database is a comprehensive tool for scientists,
              engineers, and researchers to access, compare, and contribute
              information about various materials and their properties. This
              application allows users to:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Browse materials by type (polymer, metal, ceramic, etc.)</li>
              <li>Search for specific materials by name or designation</li>
              <li>Compare up to three materials side-by-side</li>
              <li>
                View detailed material properties including mechanical,
                electrical, and thermal characteristics
              </li>
              <li>Contribute new materials to the database</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">
              Project Origin
            </h3>
            <p>
              This database was created based on an idea by Thomas Bell, an
              aspiring materials scientist. Thomas envisioned a comprehensive,
              accessible platform where researchers and students could easily
              access and compare material properties for both reference and
              research purposes.
            </p>
          </section>

          <section className="bg-white p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">
              Using the Database
            </h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Browsing Materials
              </h3>
              <p>
                Materials are organized by type and can be filtered and sorted.
                Click on any material card to expand it and view all properties.
                Each material is displayed with its name, type, and key
                characteristics.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Searching
              </h3>
              <p>
                Use the search bar to find materials by name, short code, or
                type. The search uses intelligent matching to help you find
                materials even with partial terms.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Comparing Materials
              </h3>
              <p>
                Navigate to the "Compare" page to select up to three materials
                for side-by-side comparison. This makes it easy to identify the
                best material for your specific requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Contributing
              </h3>
              <p>
                To add new materials to the database, use the "Add Material"
                page to enter properties and generate the necessary code for
                contribution. This crowd-sourced approach allows the database to
                grow with accurate information.
              </p>
            </div>
          </section>

          <section className="bg-white p-8 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">
              Technical Information
            </h2>
            <p className="mb-4">
              The Materials Database is built with modern web technologies:
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>Next.js 15 with TypeScript for the application framework</li>
              <li>Tailwind CSS for styling and responsive design</li>
              <li>JSON for efficient data storage and retrieval</li>
              <li>
                Fuzzy search capabilities for intelligent material discovery
              </li>
            </ul>

            <p>
              The database is designed to be fast, accessible, and easy to use
              across all devices.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
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
