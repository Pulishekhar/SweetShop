import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const gradients = [
  "bg-gradient-to-br from-pink-400 via-pink-300 to-yellow-200",
  "bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400",
  "bg-gradient-to-br from-green-400 via-lime-400 to-yellow-300",
  "bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300",
  "bg-gradient-to-br from-red-400 via-orange-300 to-yellow-300",
  "bg-gradient-to-br from-cyan-400 via-blue-300 to-indigo-300",
];

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bag, setBag] = useState([]);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/sweets/all");
      setSweets(res.data);
    } catch (error) {
      console.log("Error fetching sweets:", error);
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
    fetchBag();
  }, []);

  const openModal = (sweet) => {
    setSelectedSweet(sweet);
    setQuantity(1);
    setModalOpen(true);
  };

  // Fetch user's bag from backend
  const fetchBag = async () => {
    try {
      const res = await axios.get("/api/bag/bags", { withCredentials: true });
      setBag(res.data.items);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bag");
    }
  };

  const addToBag = async () => {
    if (!quantity || quantity <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    try {
      const res = await axios.post(
        "/api/bag/addBag",
        {
          sweetId: selectedSweet._id,
          name: selectedSweet.name,
          price: selectedSweet.price,
          quantity,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(`${quantity} ${selectedSweet.name} added to bag`);
        setBag((prev) => [...prev, res.data.bagItem]); // update local bag
        setModalOpen(false);
      }
    } catch (error) {
      console.log("Error adding to bag:", error);
      toast.error(error.response?.data?.message || "Failed to add to bag");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 relative">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
        Available Sweets
      </h2>

      {loading ? (
        <p className="text-center text-white">Loading sweets...</p>
      ) : sweets.length === 0 ? (
        <p className="text-center text-white">No sweets available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sweets.map((sweet, index) => {
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={sweet._id}
                className={`card ${gradient} shadow-xl rounded-3xl transform hover:scale-105 transition-all duration-300 text-white`}
              >
                <div className="card-body flex flex-col justify-between min-h-[300px]">
                  <div>
                    <h3 className="card-title text-2xl">{sweet.name}</h3>
                    <p className="mb-1">
                      Category:{" "}
                      <span className="badge badge-secondary">{sweet.category}</span>
                    </p>
                    <p className="mb-1">Price: ${sweet.price}</p>
                    <p>Quantity: {sweet.quantity}</p>
                  </div>
                  <button
                    onClick={() => openModal(sweet)}
                    disabled={sweet.quantity === 0}
                    className={`btn mt-4 rounded-full font-bold ${
                      sweet.quantity === 0
                        ? "btn-disabled"
                        : "btn-primary hover:bg-yellow-400 text-black"
                    }`}
                  >
                    {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedSweet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-blue-800 text-white rounded-2xl p-6 w-80 text-center relative shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">{selectedSweet.name}</h3>
            <p className="mb-4 text-lg">
              Price per piece: <span className="font-semibold">${selectedSweet.price}</span>
            </p>

            <div className="flex items-center justify-center mb-4 space-x-4">
              <button
                className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-blue-800"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-xl font-bold px-4">{quantity}</span>
              <button
                className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-blue-800"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <p className="mb-6 text-lg font-semibold">
              Total: <span className="text-yellow-300">${selectedSweet.price * quantity}</span>
            </p>

            <div className="flex justify-between">
              <button className="btn btn-error btn-sm" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={addToBag}>
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Bag Preview */}
      {bag.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-xl w-64">
          <h4 className="font-bold mb-2">Your Bag</h4>
          {bag.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-1">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${item.totalPrice}</span>
            </div>
          ))}
          <button
            className="btn btn-sm btn-primary mt-2 w-full"
            onClick={() => (window.location.href = "/bag")}
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
