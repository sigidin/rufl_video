import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Weather Proxy Endpoint
  app.get("/api/weather", async (req, res) => {
    const city = req.query.city || "Vladivostok";
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city as string)}?format=%t+%c`);
      if (!response.ok) {
        throw new Error(`wttr.in responded with status ${response.status}`);
      }
      const text = await response.text();
      const cleanText = text.trim();
      if (cleanText.startsWith("<!DOCTYPE html>") || cleanText.includes("<html") || cleanText.includes("<DOCTYPE")) {
        throw new Error("Received HTML from wttr.in instead of plain text");
      }
      res.json({ weather: cleanText });
    } catch (error: any) {
      console.warn("Weather API proxy error:", error.message);
      res.json({ weather: "" });
    }
  });

  // Tournify Proxy Endpoint
  app.get("/api/tournify-ryufl", async (req, res) => {
    try {
      const url = "https://tournify.ru/api/v1/tournaments/pervenstvo-primorskogo-kraya-po-futbolu-sredi-yunoshei-2012-goda-rozhdenie-u-15";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Tournify responded with ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Error in Tournify proxy:", error);
      res.status(500).json({ error: error.message || "Failed to load Tournify data" });
    }
  });

  // Vite static/middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
