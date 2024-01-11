import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all items
    axios
      .get("http://localhost:3001/api/items")
      .then((response) => setItems(response.data)) // <-- Potential source of the error
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const addItem = () => {
    // Add a new item
    axios
      .post("http://localhost:3001/api/items", { name: "New Item" })
      .then((response) => setItems([...items, response.data]))
      .catch((error) => console.error("Error adding new item:", error));
  };

  const updateItem = (id, newName) => {
    // Update an item
    axios
      .put(`http://localhost:3001/api/items/${id}`, { name: newName })
      .then((response) => {
        setItems(items.map((item) => (item.id === id ? response.data : item)));
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const deleteItem = (id) => {
    // Delete an item
    axios
      .delete(`http://localhost:3001/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="App">
      <h1>React App with Dummy API</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => updateItem(item.id, `Updated ${item.name}`)}>
              Update
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
