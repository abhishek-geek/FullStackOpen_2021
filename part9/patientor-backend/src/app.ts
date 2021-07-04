import express from "express";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

export default app;
