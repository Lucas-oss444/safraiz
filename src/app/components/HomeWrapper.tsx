import { useOutletContext } from "react-router";
import Home from "./Home";

export default function HomeWrapper() {
  const { altoContraste, tamanhoFonte } = useOutletContext<{ altoContraste: boolean; tamanhoFonte: number }>();
  return <Home altoContraste={altoContraste} tamanhoFonte={tamanhoFonte} />;
}
