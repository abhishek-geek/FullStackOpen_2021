import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Test",
  author: "Jest",
  url: "www.jest.com",
  likes: 5,
  user: {
    id: "12345",
    username: "jest",
    name: "Jest",
  },
};

const user = {
  token: "dummy token",
  username: "jest",
  name: "Jest",
};

test("show_hide button is working", () => {
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("Test", "Jest");
});

test(" blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
  const component = render(<Blog blog={blog} />);
  const blogDetails = component.container.querySelector(".blogDetails");
  const btn = component.container.querySelector(".show_hide");
  expect(component.container).toHaveTextContent("Test", "Jest");
  expect(blogDetails).toHaveStyle("display:none");
  fireEvent.click(btn);
  expect(blogDetails).not.toHaveStyle("display:none");
  fireEvent.click(btn);
  expect(blogDetails).toHaveStyle("display:none");
});

test("like function is called twice if like button is clicked twice", () => {
  const component = render(<Blog blog={blog} user={user} />);
  const likes = component.container.querySelector(".likes");
  const likeBtn = component.container.querySelector(".like");
  fireEvent.click(likeBtn);
  fireEvent.click(likeBtn);
  expect(likes).toHaveTextContent(7);
});
