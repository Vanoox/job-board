import "./env.ts";
import express, { type Request, type Response } from "express";
import { db } from "./database.ts";
import type { Company } from "./db.d.ts";
import { sql } from "kysely";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const { rows: results } = await sql<Company[]>`select * from company`.execute(
    db,
  );
  res.send(results);
});

app.use((err: Error, req: Request, res: Response, next: unknown) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
