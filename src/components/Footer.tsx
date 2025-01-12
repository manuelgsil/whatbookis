import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 text-gray-600 body-font">
      <div className="container mx-auto py-4 px-5 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Whatbookis — Todos los derechos reservados
        </p>
        <div className="flex space-x-3">
          <a href="https://facebook.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.12 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.198c0-2.506 1.492-3.89 3.777-3.89 1.095 0 2.238.194 2.238.194v2.465h-1.26c-1.242 0-1.628.774-1.628 1.564v1.865h2.773l-.443 2.89h-2.33v6.987C18.343 21.12 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.46 6.011c-.799.355-1.658.594-2.56.702a4.492 4.492 0 0 0 1.968-2.482 8.98 8.98 0 0 1-2.846 1.088 4.468 4.468 0 0 0-7.67 4.072 12.695 12.695 0 0 1-9.219-4.672 4.468 4.468 0 0 0 1.382 5.958 4.436 4.436 0 0 1-2.025-.562v.057a4.467 4.467 0 0 0 3.579 4.373 4.465 4.465 0 0 1-2.015.077 4.468 4.468 0 0 0 4.17 3.103 8.976 8.976 0 0 1-5.563 1.92c-.361 0-.718-.021-1.07-.062a12.676 12.676 0 0 0 6.856 2.007c8.229 0 12.739-6.817 12.739-12.738 0-.195-.005-.389-.013-.582A9.067 9.067 0 0 0 24 4.534a8.935 8.935 0 0 1-2.54.693 4.458 4.458 0 0 0 1.958-2.466z" />
            </svg>
          </a>
          <a href="https://instagram.com" className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
            <svg fill="none" stroke="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16.49 9.51l-7.98 7.98m8.49-.49h.01M7.51 16.49l7.98-7.98M8.01 8.01h.01M15 15h.01M9.21 14.2h.01M14.2 9.21h.01" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
