import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  return axios.get(url).then((res) => res.data);
};

const create = (person) => {
  return axios.post(url, person).then((res) => res.data);
};

const update = (id, person) => {
  return axios.put(`${url}/${id}`, person).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`).then((res) => res.data);
};

export { getAll, create, update, remove };
