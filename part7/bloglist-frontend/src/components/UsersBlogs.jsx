import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  console.log(id);

  const [user, setUser] = useState("");

  useEffect(() => {
    const user = users.find((user) => user.id === id);
    console.log(user);
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return <i>Not found</i>;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
