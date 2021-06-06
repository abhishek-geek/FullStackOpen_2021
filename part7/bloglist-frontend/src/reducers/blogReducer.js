import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS": {
      return action.data;
    }
    case "ADD_BLOG": {
      return state.concat(action.data);
    }
    case "LIKE_BLOG": {
      return state.map((s) => {
        console.log(s);
        return s.id === action.data.id ? action.data : s;
      });
    }
    case "DEL_BLOG": {
      return state.filter((s) => s.id !== action.data.id);
    }
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const user = JSON.parse(await window.localStorage.getItem("user"));
    const data = await blogService.create(blog, user.token);
    dispatch({ type: "ADD_BLOG", data });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const user = JSON.parse(await window.localStorage.getItem("user"));
    console.log(blog);
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    console.log(likedBlog);
    const data = await blogService.like(likedBlog, user.token);
    console.log(data, user);
    dispatch({ type: "LIKE_BLOG", data });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const user = JSON.parse(await window.localStorage.getItem("user"));
    await blogService.remove(blog, user.token);
    dispatch({ type: "DEL_BLOG", data: blog });
  };
};

export default reducer;
