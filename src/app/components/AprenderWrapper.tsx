import { useOutletContext } from "react-router";
import Aprender from "./Aprender";

export default function AprenderWrapper() {
  const { altoContraste, tamanhoFonte } = useOutletContext<{ altoContraste: boolean; tamanhoFonte: number }>();
  return <Aprender altoContraste={altoContraste} tamanhoFonte={tamanhoFonte} />;
}
