
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToken } from "../../../store/authStore";
import instance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestRestockModal = ({ onClose }) => {
  const token = useToken();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product: "",
    supplier: "",
    quantity: "",
  });

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get("products");
        console.log(res)
        setProducts(res.data.data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [token]);

  // Fetch all suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await instance.get("suppliers?limit=all");
        setSuppliers(res.data?.data?.data || []);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };

    fetchSuppliers();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async () => {
    const { product, supplier, quantity } = form;
    if (!product || !supplier || !quantity) return;

    setLoading(true);
    try {
      const payload = [
        {
          product,
          supplier,
          quantity,
        },
      ];

     const res = await instance.post("/restock", payload);
    if (res.data?.status) {
      toast.success(res.data?.message || "Restock request submitted!");
      onClose(); 
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Restock request failed:", error);
    toast.error("Failed to submit restock request.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-auto rounded-xl p-6 space-y-4 hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Request Restock</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <div className="space-y-4">
          {/* Product */}
          <label className="block">
            <span className="block text-[#1A1A1A] font-medium text-sm mb-1">Product</span>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </label>

          {/* Supplier */}
          <label className="block">
            <span className="block text-[#1A1A1A] font-medium text-sm mb-1">Supplier</span>
            <select
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>

          {/* Quantity */}
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={form.quantity}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="button"
            disabled={!form.product || !form.supplier || !form.quantity || loading}
            onClick={handleSubmit}
            className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Restock"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Input component
const Input = ({ label, placeholder, name, value, onChange, type = "text" }) => (
  <label className="block">
    <span className="block text-[#1A1A1A] font-medium text-sm mb-1">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
    />
  </label>
);

export default RequestRestockModal;