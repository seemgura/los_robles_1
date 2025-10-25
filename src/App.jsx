import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const Contacto = lazy(() => import('./pages/Contacto'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
