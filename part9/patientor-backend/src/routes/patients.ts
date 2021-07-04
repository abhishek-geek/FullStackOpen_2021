/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("get patient");

  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const patient = patientService.findById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient Entry is not found" });
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const entry = toNewEntry(req.body);
    console.log(entry);

    const patient = patientService.update(id, entry);
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).send({ error: "Patient Entry is not found" });
    }
  } catch (e) {
    console.log("ops");

    res.status(400).send({ error: e.message });
  }
});

router.post("/", (req, res) => {
  const newEntry = toNewPatientEntry(req.body);
  const addedEntry = patientService.addEntry(newEntry);
  console.log(addedEntry);

  res.json(addedEntry);
});

export default router;
