import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog, token) => {
  console.log(token);
  console.log(blog);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // try {
  const responce = await axios.post(baseUrl, blog, config);
  console.log(responce.data);
  if (!responce) throw responce.body;
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
  await axios.put(`${baseUrl}/${blog.id}`, blog, config);
};

const removeBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(blog);
  console.log(token);
  console.log(config);
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default { getAll, create, like, removeBlog };
