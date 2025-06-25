import React from "react";

const LinkClass =
  "hover:text-cyan-200 transition-colors dark:hover:text-cyan-400";

const Footer = () => {
  return (
    <footer className="bg-cyan-900 py-12 text-cyan-50 text-md dark:bg-gray-900 dark:text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h6
            className="font-semibold text-3xl text-cyan-200 mb-2
          dark:text-cyan-300"
          >
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-200 text-transparent bg-clip-text">
              EquaLab
            </span>
          </h6>
          <p className="mb-1">
            EquaLab is a free platform with online tools for engineers and
            scientists.
          </p>
        </div>

        <div>
          <h6
            className="font-semibold text-cyan-100 mb-2
          dark:text-gray-200"
          >
            Contact Us
          </h6>
          <p className="mb-1">
            <a href="mailto:info@equalab.uk" className={LinkClass}>
              info@equalab.uk
            </a>
          </p>
          <p>Milton Keynes, </p>
          <p>Buckinghamshire</p>
        </div>

        <div>
          <h6 className="font-semibold text-cyan-100 mb-2 dark:text-gray-200">
            Quick Links
          </h6>
          <ul className="list-none space-y-1">
            <li>
              <a href="/" className={LinkClass}>
                Library
              </a>
            </li>
            <li>
              <a href="/add" className={LinkClass}>
                Add Materials
              </a>
            </li>
            <li>
              <a href="/compare" className={LinkClass}>
                Compare
              </a>
            </li>
            <li>
              <a
                href="https://equalab.uk"
                target="_blank"
                className={LinkClass}
              >
                EquaLab Home
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 py-4 text-center">
        <hr
          className="border-t border-cyan-500 w-1/2 mx-auto
        dark:border-gray-700"
        />
        <p
          className="text-sm text-cyan-50 mt-6
        dark:text-gray-400"
        >
          &copy; {new Date().getFullYear()} EquaLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
