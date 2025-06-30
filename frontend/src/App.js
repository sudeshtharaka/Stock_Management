import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ReportFilter from './components/ReportFilter';

import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const fetchItems = async () => {
    const res = await axios.get(`${apiUrl}/api/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleSearchResults = (filteredItems) => {
    setItems(filteredItems);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Clothing Shop Stock Management</h1>
      <ItemForm onAdd={handleAddItem} />
      <ReportFilter onResults={handleSearchResults} />
      <ItemList items={items} />
    </div>
  );
}

export default App;
