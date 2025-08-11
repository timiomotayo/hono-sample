import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const clientIP = c.req.header("CF-Connecting-IP") || c.req.header("x-forwarded-for") || "unknown";
  const userAgent = c.req.header("user-agent") || "unknown";
  const country = c.req.header("CF-IPCountry") || "unknown";
  const city = c.req.header("CF-IPCity") || "unknown";
  const colo = c.req.header("CF-Ray")?.split("-")[1] || "unknown";
  const tlsVersion = c.req.header("CF-Visitor") ? JSON.parse(c.req.header("CF-Visitor") || "{}").scheme === "https" ? "TLS" : "HTTP" : "unknown";
  
  return c.json({
    clientIP,
    userAgent,
    location: {
      country,
      city,
      colo
    },
    tlsVersion,
    timestamp: new Date().toISOString()
  });
});

export default app;
