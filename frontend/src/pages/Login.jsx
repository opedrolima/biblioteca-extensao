import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import backgroundImage from '../assets/library-background.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Preencha todos os campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        } catch (err) {
            let detail = err.response?.data?.detail;
            if (!detail) {
                detail = err.message === 'Network Error' 
                ? 'Erro de rede: O backend parece estar desligado ou bloqueando a conexão.' 
                : 'Erro ao fazer login: ' + err.message;
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
    <>
        <div
        className="flex justify-center items-center w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <form onSubmit={handleLogin} className="w-md h-150 flex flex-col justify-between items-center bg-white rounded-[2.5rem] shadow-2xl">

                <h2 className="text-orange-400 text-4xl font-bold mt-10">
                    Login
                </h2>

                <div className="flex flex-col justify-center items-center ">

                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-80 h-15 bg-gray-300 pl-5 rounded-md mb-5" 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-80 h-15 bg-gray-300 pl-5 rounded-md"
                        />

                        {error && (
                            <p className="text-red-500 text-sm mt-3 text-center px-4">{error}</p>
                        )}

                        <div className="w-full flex flex-row justify-between mt-2 text-blue-900 underline">
                            <div><a href="/esqueceusenha">Esqueceu a senha?</a></div>
                            <div><a href="/cadastro">Cadastrar</a></div>
                        </div>

                </div>
               
                <button 
                    type="submit" 
                    disabled={loading}
                    className="flex justify-center items-center w-3xs h-15 bg-gray-400 text-3xl rounded-2xl mb-30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
               
            </form>
        </div>
    </>
    );
}
 
export default Login;