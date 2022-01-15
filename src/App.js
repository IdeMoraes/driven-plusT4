import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from 'react';
import TokenContext from "./contexts/TokenContext";

import TelaLogin from './components/TelaLogin';
import TelaCadastro from './components/TelaCadastro';
import TelaPlanos from './components/TelaPlanos';
import TelaPlano from './components/TelaPlano';
import TelaHome from './components/TelaHome';



function App() {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/sign-up" element={<TelaCadastro />} />
          <Route path="/subscriptions" element={<TelaPlanos />} />
          <Route path="/subscriptions/ID_DO_PLANO" element={<TelaPlano />} />
          <Route path="/home" element={<TelaHome />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
