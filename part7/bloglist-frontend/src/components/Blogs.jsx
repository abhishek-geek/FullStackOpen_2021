import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table striped>
          <TableHead>
            <TableCell>Blog Title</TableCell>
            <TableCell>Author</TableCell>
          </TableHead>
          <TableBody>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                  </TableRow>
                );
                // return <Blog key={blog.id} blog={blog} user={user} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
