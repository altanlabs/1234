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
      navigate("/");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
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
  );
}
