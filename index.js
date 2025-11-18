import express from "express";
import { createClient } from "redis";

const app = express();

// Create Redis client
const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect(); // Connect to Redis

// Root route - visit counter
app.get("/", async (req, res) => {
  let count = await client.get("visits");
  count = count ? parseInt(count) + 1 : 1;
  await client.set("visits", count);
  res.send(`👋 Hello! You are visitor number: ${count}`);
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
