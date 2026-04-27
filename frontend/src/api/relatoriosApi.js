import api from "./client";

export const getRelatorioEmprestimos = async () => {
  const response = await api.get("/api/relatorios/emprestimos");
  return response.data;
};

export const getLivrosMaisEmprestados = async () => {
  const response = await api.get("/api/relatorios/livros-mais-emprestados");
  return response.data;
};
