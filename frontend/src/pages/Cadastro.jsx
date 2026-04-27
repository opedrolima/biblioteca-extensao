import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { register } from '../api/authApi';
import backgroundImage from '../assets/library-background.png';

export default function Cadastro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      let detail = err.response?.data?.detail;
      if (!detail) {
        detail = err.message === 'Network Error' 
          ? 'Erro de rede: O backend parece estar desligado ou bloqueando a conexão.' 
          : 'Erro ao cadastrar: ' + err.message;
      } else if (Array.isArray(detail)) {
        detail = detail[0].msg;
      } else if (typeof detail === 'object') {
        detail = JSON.stringify(detail);
      }
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={handleCadastro} className="bg-[#FFFFFF] rounded-[2.5rem] p-10 shadow-2xl w-full max-w-95 flex flex-col items-center">
        
        <h2 className="text-[#FF8A24] text-2xl font-bold mb-10 mt-2">
          Cadastro
        </h2>

        <div className="w-full space-y-5 px-2">
          <div className="relative flex items-center">
            <User className="absolute left-4 text-gray-600 w-5 h-5 stroke-[2.5]" />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#D9D9D9] text-gray-800 placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF8A24]/50 transition-all font-medium"
            />
          </div>

          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-gray-600 w-5 h-5 stroke-[2.5]" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#D9D9D9] text-gray-800 placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF8A24]/50 transition-all font-medium"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-600 w-5 h-5 stroke-[2.5]" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#D9D9D9] text-gray-800 placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF8A24]/50 transition-all font-medium"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center px-4">{error}</p>
        )}

       <div className="relative flex items-center mt-2 text-blue-900 underline">
       <div><a href="/">Já tenho uma conta</a></div>
      </div>

        <button 
          type="submit"
          disabled={loading}
          className="mt-12 mb-4 bg-[#D9D9D9] hover:bg-[#CFCFCF] text-gray-800 font-semibold py-3 px-10 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

      </form>
    </div>
  );
}
