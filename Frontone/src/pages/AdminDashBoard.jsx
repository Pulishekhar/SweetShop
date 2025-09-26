import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [sweetId, setSweetId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [restockQty, setRestockQty] = useState("");

  // add sweet
  const handleAddSweet = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/sweets/add",
        formData,
        { withCredentials: true }
      );
      toast.success("Sweet added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding sweet");
    }
  };

  // update sweet
  const handleUpdateSweet = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/sweets/update/${sweetId}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Sweet updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating sweet");
    }
  };

  // delete sweet
  const handleDeleteSweet = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sweets/delete/${sweetId}`,
        { withCredentials: true }
      );
      toast.success("Sweet deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting sweet");
    }
  };

  // restock sweet
  const handleRestockSweet = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/sweets/${sweetId}/restock`,
        { quantity: restockQty },
        { withCredentials: true }
      );
      toast.success("Sweet restocked successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error restocking sweet");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-pink-200 to-yellow-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-800">
        Admin Dashboard
      </h1>

      {/* Sweet form */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">
            Add / Update Sweet
          </h2>
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Sweet Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Sweet ID (for update/delete/restock)"
            value={sweetId}
            onChange={(e) => setSweetId(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={handleAddSweet}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Add Sweet
            </button>
            <button
              onClick={handleUpdateSweet}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Update Sweet
            </button>
          </div>
        </div>

        {/* Delete + Restock */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">
            Delete / Restock Sweet
          </h2>
          <button
            onClick={handleDeleteSweet}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl mb-4 w-full"
          >
            Delete Sweet
          </button>

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Restock Quantity"
            type="number"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
          />
          <button
            onClick={handleRestockSweet}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl w-full"
          >
            Restock Sweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
