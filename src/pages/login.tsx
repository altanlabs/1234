import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password.toLowerCase() === "butifarra") {
      navigate("/editor");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4">Acceso</h1>
          <Input
            type="password"
            placeholder="Introduce la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Button onClick={handleLogin}>Entrar</Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <img src="https://static.wixstatic.com/media/eab6ae_43f4d7656c9740f68d357500571e82e3~mv2.png/v1/fill/w_540,h_311,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/salgueda.png" alt="Salgueda Logo" className="mb-4" />
        <h2 className="text-3xl font-bold text-gray-900">Facturator de Salgueda</h2>
      </div>
    </div>
  );
}
