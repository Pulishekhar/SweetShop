import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddSweetPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, price, quantity } = formData;

    if (!name || !category || !price || !quantity) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/sweets/add",
        formData,
        { withCredentials: true } // make sure cookies/auth are sent
      );

      if (res.status === 201) {
        toast.success("Sweet added successfully!");
        setFormData({ name: "", category: "", price: "", quantity: "" });
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log("Error adding sweet:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Sweet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Adding..." : "Add Sweet"}
        </button>
      </form>
    </div>
  );
};

export default AddSweetPage;
