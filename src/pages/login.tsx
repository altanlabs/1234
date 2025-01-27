import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "butifarra") {
      navigate("/editor");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-900">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg text-center">
          <img 
            src="https://static.wixstatic.com/media/eab6ae_43f4d7656c9740f68d357500571e82e3~mv2.png/v1/fill/w_540,h_311,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/salgueda.png" 
            alt="Salgueda Logo" 
            className="mx-auto mb-6 w-48"
          />
          <h2 className="text-3xl font-bold mb-6 text-white">Facturator de Salgueda</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Introduce la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600"
              autoFocus
            />
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}