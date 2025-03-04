
// Frontend: React
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { usuario, senha });
      localStorage.setItem('token', response.data.token);
      setMensagem('Login realizado!');
    } catch (error) {
      setMensagem('Erro no login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login Governamental</h2>
        <input className="w-full p-2 mb-2 bg-gray-700" type="text" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <input className="w-full p-2 mb-2 bg-gray-700" type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <button className="w-full bg-blue-500 p-2" onClick={handleLogin}>Entrar</button>
        <p className="mt-2">{mensagem}</p>
      </div>
    </div>
  );
};

export default Login;
