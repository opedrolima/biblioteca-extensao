import api from "./client";

export const getEmprestimos = async (atrasados = false) => {
  const params = atrasados ? { atrasados: true } : {};
  const response = await api.get("/api/emprestimos", { params });
  return response.data;
};

export const getEmprestimoById = async (id) => {
  const response = await api.get(`/api/emprestimos/${id}`);
  return response.data;
};

export const createEmprestimo = async (emprestimoData) => {
  const response = await api.post("/api/emprestimos", emprestimoData);
  return response.data;
};

export const registrarDevolucao = async (id) => {
  const response = await api.patch(`/api/emprestimos/${id}/devolver`);
  return response.data;
};

export const deleteEmprestimo = async (id) => {
  await api.delete(`/api/emprestimos/${id}`);
};
