import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-gray-600 body-font bg-white dark:bg-slate-900 p-5">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
      <Link to="/" className="flex title-font font-medium items-center text-gray-900 dark:text-white mb-4 md:mb-0">
          <img
            src="src/assets/libro.png" // Corregir la ruta del logo si es necesario
            alt="logo"
            className="w-10 h-10 text-white p-2 bg-emerald-500 rounded-full object-scale-down"
          />
          <span className="ml-3 text-xl">Whatbookis</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="#features" className="mr-5 hover:text-gray-900 dark:hover:text-white">Características</a>
          <a href="#about" className="mr-5 hover:text-gray-900 dark:hover:text-white">Acerca de</a>
          <a href="#contact" className="mr-5 hover:text-gray-900 dark:hover:text-white">Contacto</a>
        </nav>
        {/* Se USA LINK no A /implementamos Reac-router-dom */}
{/*         <a
          href="/login"
          className="inline-flex items-center bg-emerald-600 border-0 py-2 px-4 focus:outline-none hover:bg-emerald-700 rounded text-white mt-4 md:mt-0"
        >
          Iniciar Sesión
        </a> */}
      </div>
    </header>
  );
};

export default Header;
