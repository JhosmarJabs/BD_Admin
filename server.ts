import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const db = new Database("floreria.db");

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    date TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    client TEXT,
    total REAL,
    status TEXT,
    date TEXT
  );

  CREATE TABLE IF NOT EXISTS backups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    time TEXT,
    size TEXT,
    user TEXT
  );
`);

// Seed data if empty
const salesCount = db.prepare("SELECT COUNT(*) as count FROM sales").get() as { count: number };
if (salesCount.count === 0) {
  db.prepare("INSERT INTO sales (amount, date) VALUES (?, ?)").run(4250.00, new Date().toISOString());
  
  const orders = [
    ['#ORD-7281', 'Ana García', 120.00, 'Entregado', new Date().toISOString()],
    ['#ORD-7282', 'Carlos Ruiz', 45.50, 'Pendiente', new Date().toISOString()],
    ['#ORD-7283', 'Elena Sanz', 300.00, 'En camino', new Date().toISOString()],
    ['#ORD-7284', 'Marcos Polo', 85.00, 'Cancelado', new Date().toISOString()],
    ['#ORD-7285', 'Lucía M.', 62.00, 'Entregado', new Date().toISOString()],
  ];
  const insertOrder = db.prepare("INSERT INTO orders (id, client, total, status, date) VALUES (?, ?, ?, ?, ?)");
  orders.forEach(o => insertOrder.run(...o));

  const backups = [
    ['02 Mar 2026', '03:00 AM', '18.5 MB', 'Sistema (Auto)'],
    ['01 Mar 2026', '11:20 PM', '17.2 MB', 'Admin_Bautista'],
  ];
  const insertBackup = db.prepare("INSERT INTO backups (date, time, size, user) VALUES (?, ?, ?, ?)");
  backups.forEach(b => insertBackup.run(...b));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/stats", (req, res) => {
    const todaySales = db.prepare("SELECT SUM(amount) as total FROM sales WHERE date >= date('now', 'start of day')").get() as { total: number };
    const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Pendiente'").get() as { count: number };
    const newClients = 12; // Mocked for now

    res.json({
      salesToday: todaySales.total || 4250.00,
      pendingOrders: pendingOrders.count,
      newClients,
      dbSize: "20 MB",
      totalRecords: 84293
    });
  });

  app.get("/api/orders/recent", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY date DESC LIMIT 5").all();
    res.json(orders);
  });

  app.get("/api/backups", (req, res) => {
    const backups = db.prepare("SELECT * FROM backups ORDER BY id DESC").all();
    res.json(backups);
  });

  app.post("/api/backups", (req, res) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    const stmt = db.prepare("INSERT INTO backups (date, time, size, user) VALUES (?, ?, ?, ?)");
    stmt.run(dateStr, timeStr, "19.2 MB", "Admin_Bautista");
    
    res.json({ success: true });
  });

  app.delete("/api/backups/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM backups WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.get("/api/export/sales", (req, res) => {
    const sales = db.prepare("SELECT * FROM sales").all();
    const csv = "id,amount,date\n" + sales.map((s: any) => `${s.id},${s.amount},${s.date}`).join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=ventas.csv");
    res.send(csv);
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
