import React, { useState, useEffect } from 'react';
import { getLivros, createLivro, deleteLivro } from '../api/livrosApi';

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [novoLivro, setNovoLivro] = useState({
    titulo: '',
    quantidade_exemplares: '',
    id_categorias: [],
  });

  // Carregar livros do backend
  const carregarLivros = async () => {
    try {
      setLoading(true);
      const data = await getLivros();
      setLivros(data);
    } catch (err) {
      setError('Erro ao carregar livros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLivro((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLivro = async (e) => {
    e.preventDefault();
    if (!novoLivro.titulo || !novoLivro.quantidade_exemplares) return;

    try {
      setError('');
      await createLivro({
        titulo: novoLivro.titulo,
        quantidade_exemplares: parseInt(novoLivro.quantidade_exemplares) || 0,
        id_categorias: [],
      });
      setNovoLivro({ titulo: '', quantidade_exemplares: '', id_categorias: [] });
      await carregarLivros();
    } catch (err) {
      const detail = err.response?.data?.detail || 'Erro ao adicionar livro';
      setError(detail);
    }
  };

  const handleRemoveLivro = async (idToRemove) => {
    try {
      setError('');
      await deleteLivro(idToRemove);
      await carregarLivros();
    } catch (err) {
      const detail = err.response?.data?.detail || 'Erro ao remover livro';
      setError(detail);
    }
  };

  const emptySlotsCount = Math.max(0, 3 - livros.length);

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
          <h1 className="text-white text-4xl font-extrabold tracking-wide mb-2">
            Livros
          </h1>
        </div>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <p className="text-red-500 text-center text-sm bg-red-50 p-2 rounded-lg">{error}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-center items-start gap-10 md:gap-16">

        <form
          onSubmit={handleAddLivro}
          className="bg-[#ebebeb] p-6 rounded-2xl w-full md:w-87.5 flex flex-col gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
        >
          <div className="flex gap-4">
            <input
              type="text"
              name="titulo"
              value={novoLivro.titulo}
              onChange={handleInputChange}
              placeholder="Título"
              className="flex-1 bg-white px-4 py-2 rounded-full text-[#fc9d54] placeholder-[#fc9d54] text-sm font-bold outline-none focus:ring-2 focus:ring-orange-300 transition-all shadow-sm"
            />
            <input
              type="number"
              name="quantidade_exemplares"
              value={novoLivro.quantidade_exemplares}
              onChange={handleInputChange}
              placeholder="Quant"
              className="w-20 bg-white px-4 py-2 rounded-full text-[#fc9d54] placeholder-[#fc9d54] text-sm font-bold outline-none text-center focus:ring-2 focus:ring-orange-300 transition-all shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-6 mb-2 bg-white text-[#fc9d54] font-bold text-sm px-6 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] self-center hover:bg-gray-50 active:scale-95 transition-all"
          >
            Adicionar livros
          </button>
        </form>

        <div className="bg-[#f2f2f2] p-8 rounded-2xl w-full md:w-125 flex flex-col gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] min-h-112.5">

          {loading ? (
            <p className="text-gray-400 text-center py-10">Carregando...</p>
          ) : (
            <>
              {livros.map((livro) => (
                <div key={livro.id} className="flex items-center gap-4">
                  <div className="bg-[#d9d9d9] rounded-xl p-4 flex-1 flex justify-between items-center h-24 shadow-sm">
                    <div className="flex flex-col gap-1.5 text-black font-bold text-sm tracking-tight">
                      <span className="truncate max-w-45">{livro.titulo}</span>
                      <span className="truncate max-w-45 text-gray-500 text-xs">
                        {livro.categorias?.map(c => c.categoria).join(', ') || 'Sem categoria'}
                      </span>
                      <span className="truncate max-w-45 text-gray-500 text-xs">
                        Exemplares: {livro.quantidade_exemplares}
                      </span>
                    </div>
                    <div className="bg-white rounded-full w-15 h-15 flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-[9px] font-extrabold text-center leading-[1.1] text-black">
                        Estoque<br />
                        {livro.quantidade_exemplares}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveLivro(livro.id)}
                    className="w-6.5 h-6.5 bg-[#fc9d54] rounded-full text-white flex items-center justify-center text-xl font-bold shadow-sm hover:bg-[#f58d3d] active:scale-90 transition-all shrink-0 pb-1"
                    aria-label="Remover livro"
                  >
                    -
                  </button>
                </div>
              ))}

              {Array.from({ length: emptySlotsCount }).map((_, index) => (
                <div key={`empty-${index}`} className="flex items-center gap-4">
                  <div className="bg-[#d9d9d9] rounded-xl p-4 flex-1 h-24 shadow-sm opacity-80"></div>
                  <div className="w-6.5 h-6.5 bg-[#fc9d54] rounded-full text-white flex items-center justify-center text-xl font-bold shadow-sm shrink-0 opacity-80 pb-1">
                    -
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      </div>
    </div>
  );
}