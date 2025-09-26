import React, { useEffect, useState } from "react";
import { getAllSweets, addSweet, updateSweet, deleteSweet, restockSweet } from "../api/sweets";

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });

  const fetchSweets = async () => {
    const res = await getAllSweets();
    setSweets(res.data);
  };

  useEffect(() => { fetchSweets(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addSweet(form);
    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  };

  const handleDelete = async (id) => { await deleteSweet(id); fetchSweets(); };
  const handleRestock = async (id) => { const qty = prompt("Enter quantity to restock"); await restockSweet(id, Number(qty)); fetchSweets(); };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="border p-1 rounded"/>
        <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category:e.target.value})} className="border p-1 rounded"/>
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price:e.target.value})} className="border p-1 rounded"/>
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity:e.target.value})} className="border p-1 rounded"/>
        <button type="submit" className="bg-green-500 text-white px-2 rounded">Add</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map(s => (
            <tr key={s._id} className="border">
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>{s.price}</td>
              <td>{s.quantity}</td>
              <td className="flex gap-2">
                <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDelete(s._id)}>Delete</button>
                <button className="bg-blue-500 text-white px-2 rounded" onClick={() => handleRestock(s._id)}>Restock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
