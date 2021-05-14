require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/contact");

const app = express();

app.use(express.static("build"));
app.use(cors());
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

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((person) => res.json(person))
    .catch((err) => {
      console.log("error while getting all documents", err.message);
      res.status(404).end();
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  Person.findById(id)
    .then((person) => {
      console.log(Boolean(person));
      if (person) {
        return res.json(person).end();
      } else {
        return res.status(404).end();
      }
    })
    .catch((err) => {
      console.log("What ID is this??", err.message);
      next(err);
      // return res.status(404).send(err.message).end();
    });
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    const len = result.length;
    const info = `<div>Phonebook has info of ${len} people</div></br><div>${new Date()}</div>`;
    res.send(info);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log("deleted", result);
      res.status(204).end();
    })
    .catch((err) => {
      console.log("failed to delete", err.message);
      next(err);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  // if (!body.name || !body.number) {
  //   return res.status(400).json({ error: "Name and Number must be present" });
  // }
  // Person.find({ name: body.name }).then((result) => {
  //   console.log(result);
  //   if (result.length) {
  //     console.log("already present in the DB");
  //     return res.status(400).json({ error: "Name must be unique" });
  //   }
  // });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      console.log("saved person", result);
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  console.log("entered put");
  const id = req.params.id;
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  console.log(person);
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformated id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
