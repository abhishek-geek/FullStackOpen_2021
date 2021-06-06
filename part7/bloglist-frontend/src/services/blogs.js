import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  // console.log(res);
  return res.data;
};

const create = async (blog, token) => {
  // console.log(token);
  // console.log(blog);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // try {
  const responce = await axios.post(baseUrl, blog, config);
  console.log(responce.data);
  if (!responce) throw responce.body;
  console.log(responce.data);
  return responce.data;
  // } catch (er) {
  //   console.log(20);
  //   console.error(er);
  // }
};

const like = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res.data;
};

const remove = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(blog);
  console.log(token);
  console.log(config);
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const getComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`);
  return res.data;
};

const newComment = async (id, comment) => {
  const obj = {
    comment,
    blog: id,
  };
  const res = await axios.post(`${baseUrl}/${id}/comments`, obj);
  return res.data;
};

export default { getAll, create, like, remove, getComments, newComment };
