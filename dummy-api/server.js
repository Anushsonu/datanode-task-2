const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
const PORT = 3001;

app.use(cors()); // Add this line
app.use(express.json());

let data = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.get("/api/items", (req, res) => {
  res.json(data);
});

app.post("/api/items", (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map((item) =>
    item.id === itemId ? { ...item, ...updatedItem } : item
  );

  res.json(data.find((item) => item.id === itemId));
});

app.delete("/api/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  data = data.filter((item) => item.id !== itemId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
