import { useEffect } from "react";

export default function VLibrasWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div vw="true" className="enabled" />;
}
