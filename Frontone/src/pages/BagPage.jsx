import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BagPage = () => {
  const [bagItems, setBagItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBag = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bag/bags", {
        withCredentials: true,
      });
      setBagItems(res.data.items);
      setTotalSum(res.data.totalSum);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch bag");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBag();
  }, []);

  const handlePurchase = async (item) => {
    try {
      // Purchase sweet
      await axios.post(
        `http://localhost:5000/api/sweets/${item.sweet}/purchase`,
        { quantity: item.quantity },
        { withCredentials: true }
      );

      // Remove from bag
      await axios.delete(`http://localhost:5000/api/bag/remove/${item._id}`, {
        withCredentials: true,
      });

      toast.success(`Purchased ${item.quantity} ${item.name}(s)`);
      fetchBag();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Purchase failed");
    }
  };

  if (loading) return <div className="text-center mt-10 text-white">Loading bag...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold text-white text-center mb-8">Your Bag</h2>

      {bagItems.length === 0 ? (
        <p className="text-center text-white text-lg">Your bag is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {bagItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-blue-800 text-white p-4 rounded-xl shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per piece: ${item.price}</p>
                  <p className="font-bold text-yellow-300">Total: ${item.totalPrice}</p>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handlePurchase(item)}
                >
                  Purchase
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right text-xl font-bold text-yellow-300">
            Grand Total: ${totalSum}
          </div>
        </>
      )}
    </div>
  );
};

export default BagPage;
