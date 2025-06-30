// src/components/ItemForm.js
import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const ItemForm = ({ onAdd }) => {
  const [item, setItem] = useState({
    buyerName: '',
    materialName: '',
    materialType: '',
    sourceType: 'SELLER',
    buyingPrice: '',
    sellingPercentage: '',
    sale: false,
    salePercentage: '',
    stockClearing: false,
    stockClearingPrice: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem({
      ...item,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/items`, item);
      onAdd(response.data);
      setItem({
        buyerName: '',
        materialName: '',
        materialType: '',
        sourceType: 'SELLER',
        buyingPrice: '',
        sellingPercentage: '',
        sale: false,
        salePercentage: '',
        stockClearing: false,
        stockClearingPrice: '',
      });
    } catch (err) {
      alert('Error adding item');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }} autoComplete="off">
      <h2>Add New Item</h2>

      <input
        type="text"
        name="buyerName"
        placeholder="Buyer Name"
        value={item.buyerName}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        type="text"
        name="materialName"
        placeholder="Material Name"
        value={item.materialName}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        type="text"
        name="materialType"
        placeholder="Material Type"
        value={item.materialType}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <select name="sourceType" value={item.sourceType} onChange={handleChange}>
        <option value="SELLER">SELLER</option>
        <option value="OWN">OWN</option>
      </select>

      <input
        type="number"
        name="buyingPrice"
        placeholder="Buying Price"
        value={item.buyingPrice}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <input
        type="number"
        name="sellingPercentage"
        placeholder="adding %"
        value={item.sellingPercentage}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <label>
        <input
          type="checkbox"
          name="sale"
          checked={item.sale}
          onChange={handleChange}
        />
        Sale
      </label>

      {item.sale && (
        <input
          type="number"
          name="salePercentage"
          placeholder="discount %"
          value={item.salePercentage}
          onChange={handleChange}
          autoComplete="off"
        />
      )}

      <label>
        <input
          type="checkbox"
          name="stockClearing"
          checked={item.stockClearing}
          onChange={handleChange}
        />
        Stock Clearing
      </label>

      {item.stockClearing && (
        <input
          type="number"
          name="stockClearingPrice"
          placeholder="Stock Clearing Price"
          value={item.stockClearingPrice}
          onChange={handleChange}
          autoComplete="off"
        />
      )}

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
