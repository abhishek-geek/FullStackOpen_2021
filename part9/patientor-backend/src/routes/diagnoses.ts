import express from "express";
import diagnoseServices from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("get diagnose");

  res.send(diagnoseServices.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
