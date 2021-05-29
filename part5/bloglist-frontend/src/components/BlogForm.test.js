import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("form calls the event handler it received as props with the right details when a new blog is created", () => {
  const createBlog = jest.fn();
  const component = render(<BlogForm createBlog={createBlog} />);
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const blogForm = component.container.querySelector(".blogForm");
  fireEvent.change(title, {
    target: {
      value: "new title",
    },
  });
  fireEvent.change(author, {
    target: {
      value: "new author",
    },
  });
  fireEvent.change(url, {
    target: {
      value: "new url",
    },
  });
  fireEvent.submit(blogForm);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "new title",
    author: "new author",
    url: "new url",
  });
});
