import React, { useState, useEffect } from 'react';
import { getEmprestimos, createEmprestimo } from '../api/emprestimosApi';

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    id_usuario: '', data_emprestimo: '', id_exemplar: '', data_prevista: '',
  });

  const carregarEmprestimos = async () => {
    try {
      setLoading(true);
      const data = await getEmprestimos();
      setEmprestimos(data);
    } catch (err) {
      setError('Erro ao carregar empréstimos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarEmprestimos(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoEmprestimo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmprestimo = async (e) => {
    e.preventDefault();
    if (!novoEmprestimo.id_usuario || !novoEmprestimo.id_exemplar || !novoEmprestimo.data_emprestimo || !novoEmprestimo.data_prevista) {
      setError('Preencha todos os campos'); return;
    }
    try {
      setError('');
      await createEmprestimo({
        id_usuario: parseInt(novoEmprestimo.id_usuario),
        id_exemplar: parseInt(novoEmprestimo.id_exemplar),
        data_emprestimo: novoEmprestimo.data_emprestimo,
        data_prevista: novoEmprestimo.data_prevista,
      });
      setNovoEmprestimo({ id_usuario: '', data_emprestimo: '', id_exemplar: '', data_prevista: '' });
      await carregarEmprestimos();
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao criar empréstimo');
    }
  };

  const emptySlotsCount = Math.max(0, 4 - emprestimos.length);

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans pb-12">
      <div className="w-full flex justify-center -mt-30 sm:-mt-37.5 mb-12">
        <div className="w-200 h-75 bg-[#fca867] border-4 border-[#2b9bf4] rounded-[50%] flex items-end justify-center pb-8 gap-4 shadow-sm">
          <div className="relative w-14 h-16 flex items-end">
            <div className="absolute right-0 bottom-0 w-10 h-16 bg-[#5c2ef4] rounded-sm shadow-sm"></div>
            <div className="absolute right-1 bottom-0 w-1 h-16 bg-[#4a1ed4] rounded-sm"></div>
            <div className="absolute left-0 bottom-0 w-11 h-14 bg-[#2b9bf4] rounded-sm border-r-4 border-[#1e82d4] shadow-md flex justify-center">
              <div className="w-4 h-1 bg-[#85c8f9] rounded-full mt-2 opacity-80"></div>
            </div>
          </div>
          <h1 className="text-white text-4xl font-extrabold tracking-wide mb-2">Emprestimos</h1>
        </div>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <p className="text-red-500 text-center text-sm bg-red-50 p-2 rounded-lg">{error}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-center items-start gap-10 md:gap-16">
        <form onSubmit={handleAddEmprestimo} className="bg-[#ebebeb] p-6 rounded-2xl w-full md:w-87.5 flex flex-col gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
          <div className="flex gap-3">
            <input type="number" name="id_usuario" value={novoEmprestimo.id_usuario} onChange={handleInputChange} placeholder="ID Usuário" className="flex-3 w-full bg-white px-3 py-2.5 rounded-full text-[#fc9d54] placeholder-[#fc9d54] text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-orange-300 transition-all shadow-sm" />
            <input type="date" name="data_emprestimo" value={novoEmprestimo.data_emprestimo} onChange={handleInputChange} className="flex-2 w-full bg-white px-2 py-2.5 rounded-full text-[#fc9d54] text-[11px] sm:text-xs font-bold outline-none text-center focus:ring-2 focus:ring-orange-300 transition-all shadow-sm" />
          </div>
          <div className="flex gap-3">
            <input type="number" name="id_exemplar" value={novoEmprestimo.id_exemplar} onChange={handleInputChange} placeholder="ID Exemplar" className="flex-3 w-full bg-white px-3 py-2.5 rounded-full text-[#fc9d54] placeholder-[#fc9d54] text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-orange-300 transition-all shadow-sm" />
            <input type="date" name="data_prevista" value={novoEmprestimo.data_prevista} onChange={handleInputChange} className="flex-2 w-full bg-white px-2 py-2.5 rounded-full text-[#fc9d54] text-[11px] sm:text-xs font-bold outline-none text-center focus:ring-2 focus:ring-orange-300 transition-all shadow-sm" />
          </div>
          <button type="submit" className="mt-4 mb-2 bg-white text-[#fc9d54] font-bold text-sm px-8 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] self-center hover:bg-gray-50 active:scale-95 transition-all">Adicionar</button>
        </form>

        <div className="bg-[#f2f2f2] p-8 rounded-2xl w-full md:w-112.5 flex flex-col gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] min-h-112.5">
          {loading ? (
            <p className="text-gray-400 text-center py-10">Carregando...</p>
          ) : (
            <>
              {emprestimos.map((emp) => (
                <div key={emp.id} className="bg-[#d9d9d9] rounded-xl p-4 flex justify-between items-center h-22 shadow-sm">
                  <div className="flex flex-col gap-1.5 text-black font-bold text-sm tracking-tight">
                    <span className="truncate max-w-50">Usuário: {emp.id_usuario}</span>
                    <span className="truncate max-w-50">Exemplar: {emp.id_exemplar}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right text-xs text-gray-600">
                    <span>Emp: {emp.data_emprestimo}</span>
                    <span>Dev: {emp.data_prevista}</span>
                    {emp.data_devolucao && <span className="text-green-600 font-bold">Devolvido</span>}
                  </div>
                </div>
              ))}
              {Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-[#d9d9d9] rounded-xl p-4 h-22 shadow-sm opacity-80"></div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}