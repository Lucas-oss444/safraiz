import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import BarraAcessibilidade from "./BarraAcessibilidade";
import Rodape from "./Rodape";
import VLibrasWidget from "./VLibrasWidget";

export default function Layout() {
  const [altoContraste, setAltoContraste] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(100);

  useEffect(() => {
    document.documentElement.style.fontSize = `${tamanhoFonte}%`;
  }, [tamanhoFonte]);

  return (
    <div className="min-h-screen flex flex-col pt-16 md:pt-0">
      <BarraAcessibilidade
        altoContraste={altoContraste}
        setAltoContraste={setAltoContraste}
        tamanhoFonte={tamanhoFonte}
        setTamanhoFonte={setTamanhoFonte}
      />

      <div className="flex-1">
        <Outlet context={{ altoContraste, tamanhoFonte }} />
      </div>

      <Rodape altoContraste={altoContraste} />
      <VLibrasWidget />
    </div>
  );
}
