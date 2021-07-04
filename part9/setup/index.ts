import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.send({
      error: "malformatted parameters",
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmiReport = calculateBmi(height, weight);
  res.send({ height, weight, bmiReport });
});

app.use(express.json());

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    res.send({
      error: "malformatted parameters",
    });
  }
  if (!daily_exercises.every((n: any) => typeof n === "number")) {
    res.send({
      error: "malformatted parameters",
    });
  }
  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
