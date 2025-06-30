// src/components/ReportFilter.js
import React, { useState } from 'react';
import axios from 'axios';

const ReportFilter = ({ onResults }) => {
  const [criteria, setCriteria] = useState({
    buyerName: '',
    sourceType: '',
    sale: '',
    stockClearing: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (criteria.buyerName) params.append('buyerName', criteria.buyerName);
    if (criteria.sourceType) params.append('sourceType', criteria.sourceType);
    if (criteria.sale) params.append('sale', criteria.sale);
    if (criteria.stockClearing) params.append('stockClearing', criteria.stockClearing);

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
    const res = await axios.get(`${apiUrl}/api/items/search?${params.toString()}`);
    onResults(res.data);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Filter Report</h3>
      <input name="buyerName" placeholder="Buyer Name" onChange={handleChange} />

      <select name="sourceType" onChange={handleChange}>
        <option value="">All Sources</option>
        <option value="SELLER">SELLER</option>
        <option value="OWN">OWN</option>
      </select>

      <select name="sale" onChange={handleChange}>
        <option value="">Sale?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <select name="stockClearing" onChange={handleChange}>
        <option value="">Stock Clearing?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ReportFilter;
