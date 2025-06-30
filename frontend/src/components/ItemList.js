// src/components/ItemList.js
import React from 'react';

const ItemList = ({ items = [] }) => {
  return (
    <div>
      <h2>Items List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Code</th>
            <th>Buyer</th>
            <th>Material</th>
            <th>Type</th>
            <th>Source Type</th>
            <th>Buying Price</th>
            <th>adding %</th>
            <th>Selling Price</th>
            <th>Sale</th>
            <th>Stock Clearing</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>{item.buyerName}</td>
              <td>{item.materialName}</td>
              <td>{item.materialType}</td>
              <td>{item.sourceType}</td>
              <td>{item.buyingPrice}</td>
              <td>{item.sellingPercentage}%</td>
              <td>{item.sellingPrice}</td>
              <td>{item.sale ? `Yes (${item.salePercentage}%)` : 'No'}</td>
              <td>{item.stockClearing ? `Yes (${item.stockClearingPrice})` : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
