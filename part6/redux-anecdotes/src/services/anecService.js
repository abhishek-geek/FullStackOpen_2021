import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const create = async (content) => {
  const anecdote = {
    content,
    id: getId(),
    votes: 0,
  };
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

const increaseVote = async (id) => {
  const anec = await getOne(id);
  const newAnec = {
    ...anec,
    votes: anec.votes + 1,
  };
  const res = await axios.put(`${baseUrl}/${id}`, newAnec);
  console.log(res.data);
  return res.data;
};

export default { getAll, getOne, create, increaseVote };
