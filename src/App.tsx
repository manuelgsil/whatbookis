import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { LayoutMain } from './layouts/LayoutMain';
import QuizPage from './pages/QuizPage';
/* import React, { useEffect, useState } from 'react';
import axios from 'axios'; */
/*  👁️‍🗨️👁️‍🗨️👁️‍🗨️ LAS IMPORTACIONES👁️‍🗨️👁️‍🗨️👁️‍🗨️👁️‍🗨️

Exportación con nombre: Cuando usas  🔥  export function Layout 🔥 ,
estás creando una exportación con nombre,  lo que significa que al importar este componente en otro archivo,
debes usar llaves 🔧 {}.  

Exportación por defecto: Si hubieras usado export default Layout, 
podrías importar el componente sin llaves.
*/

/* Aqui es donde traigo los componentes, es la parte de react que los randeriza */

function App() {
  return (
    <>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<LayoutMain />} /> 
        <Route path="/quiz" element={<QuizPage />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App