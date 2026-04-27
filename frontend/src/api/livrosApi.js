import api from "./client";

export const getLivros = async (titulo = "") => {
  const params = titulo ? { titulo } : {};
  const response = await api.get("/api/livros", { params });
  return response.data;
};

export const getLivroById = async (id) => {
  const response = await api.get(`/api/livros/${id}`);
  return response.data;
};

export const createLivro = async (livroData) => {
  const response = await api.post("/api/livros", livroData);
  return response.data;
};

export const updateLivro = async (id, livroData) => {
  const response = await api.put(`/api/livros/${id}`, livroData);
  return response.data;
};

export const deleteLivro = async (id) => {
  await api.delete(`/api/livros/${id}`);
};
