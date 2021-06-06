import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const User = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Blogs Created</TableCell>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default User;
