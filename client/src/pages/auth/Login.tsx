
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@getinfo.com" && senha === "123456") {
      navigate("/contratos");
    } else {
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-slate-200 to-gray-300 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Formulário */}
        <div className="w-full md:w-1/2 p-10 text-gray-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">
            Faça o seu login <span className="text-blue-400">●</span>
          </h2>

          <label className="text-sm mb-2">E-mail</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-slate-100 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@getinfo.com"
          />

          <label className="text-sm mb-2">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-slate-100 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="123456"
          />

          {erro && <div className="text-red-500 mb-4 text-sm">{erro}</div>}

          <button
            onClick={handleLogin}
            className="w-full py-2 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-200 hover:to-blue-400 rounded-lg text-white font-semibold transition"
          >
            Entrar
          </button>

          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <strong>Credenciais de teste:</strong><br />
            Email: admin@getinfo.com<br />
            Senha: 123456
          </div>
        </div>

        {/* Imagem */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/7190920/pexels-photo-7190920.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)",
          }}
        />
      </div>
    </div>
  );
}
