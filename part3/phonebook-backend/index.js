const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
const logger = morgan(function (tokens, req, res) {
  //   console.log(tokens.req("body"));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens["body"](req, res),
  ].join(" ");
});
app.use(logger);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  console.log(person);
  if (!person) {
    console.log("Not Found given id");
    return res.status(404).end();
  }
  res.json(person);
});

app.get("/info", (req, res) => {
  const info = `<div>Phonebook has info of ${
    persons.length
  } people</div></br><div>${new Date()}</div>`;
  res.send(info);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and Number must be present" });
  }
  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };
  persons = persons.concat(person);
  res.json(persons);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
