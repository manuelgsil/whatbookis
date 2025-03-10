import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import QuizPage from './pages/QuizPage';
import Caracteristicas from './pages/Caracteristicas';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/caracteristicas" element={<Caracteristicas />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App