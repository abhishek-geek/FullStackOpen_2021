const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.map((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  //   let like = 0;
  const fav = { likes: 0 };
  blogs.map((blog) => {
    if (blog.likes > fav.likes) {
      Object.assign(fav, blog);
    }
  });
  return fav;
};

const mostBlogs = (blogs) => {
  let arr = {};
  blogs.map((blog) => {
    if (arr[blog.author] === undefined) arr[blog.author] = 1;
    else arr[blog.author]++;
  });

  let index,
    max = 0;

  for (const [key, value] of Object.entries(arr)) {
    if (value > max) {
      max = value;
      index = key;
    }
  }

  return { author: index, blogs: arr[index] };
};

const mostLikes = (blogs) => {
  let arr = {};
  blogs.map((blog) => {
    if (arr[blog.author] === undefined) arr[blog.author] = blog.likes;
    else arr[blog.author] += blog.likes;
  });

  let index,
    max = 0;

  for (const [key, value] of Object.entries(arr)) {
    if (value > max) {
      max = value;
      index = key;
    }
  }

  return { author: index, likes: arr[index] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
