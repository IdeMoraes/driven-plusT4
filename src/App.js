import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from 'react';
import TokenContext from "./contexts/TokenContext";
import PlanoContext from "./contexts/PlanoContext";
import BeneficiosContext from "./contexts/BeneficiosContext";

import TelaLogin from './components/TelaLogin';
import TelaCadastro from './components/TelaCadastro';
import TelaPlanos from './components/TelaPlanos';
import TelaPlano from './components/TelaPlano';
import TelaHome from './components/TelaHome';



function App() {
  const [token, setToken] = useState("");
  const [plano, setPlano] = useState("");
  const [beneficios, setBeneficios] = useState("");

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <PlanoContext.Provider value={{plano,setPlano}}>
        <BeneficiosContext.Provider value={{beneficios,setBeneficios}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TelaLogin />} />
              <Route path="/sign-up" element={<TelaCadastro />} />
              <Route path="/subscriptions" element={<TelaPlanos />} />
              <Route path="/subscriptions/:ID_DO_PLANO" element={<TelaPlano />} />
              <Route path="/home" element={<TelaHome />} />
            </Routes>
          </BrowserRouter>
        </BeneficiosContext.Provider>
      </PlanoContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
