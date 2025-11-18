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
    supplier: "",
    products: [{ product: "", quantity: "" }],
  });

  // Derived total quantity
  const totalQuantity = form.products.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0
  );

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get("products");
        setProducts(res.data?.data?.data || []);
        console.log(products)
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

  // Handle supplier change
  const handleSupplierChange = (e) => {
    setForm((prev) => ({
      ...prev,
      supplier: e.target.value,
    }));
  };

  // Handle product row change
  const handleProductChange = (index, field, value) => {
    setForm((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index][field] = value;

      return { ...prev, products: updatedProducts };
    });
  };

  // Add new product row
  const addProductRow = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { product: "", quantity: "" }],
    }));
  };

  // Remove product row
  const removeProductRow = (index) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  // Prevent selecting the same product twice
  const usedProducts = form.products.map((p) => p.product);

  // Submit form
  const handleSubmit = async () => {
    if (!form.supplier) {
      toast.error("Please pick a supplier.");
      return;
    }

    const invalid = form.products.some(
      (p) => !p.product || !p.quantity || Number(p.quantity) <= 0
    );

    if (invalid) {
      toast.error("Please fill in all product fields properly.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier: form.supplier,
        products: form.products,
      };

      const res = await instance.post("/restock", payload);

      if (res.data?.status) {
        toast.success("Restock request submitted!");
        onClose();
      } else {
        toast.error(res.data?.message || "Unexpected error.");
      }
    } catch (error) {
      console.error("Restock request failed:", error);

      const apiError =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to submit restock request.";

      toast.error(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[600px] max-h-[95vh] overflow-y-auto rounded-xl p-6 space-y-4 hide-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Request Restock</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        {/* Supplier Select */}
        <label className="block">
          <span className="text-sm font-medium mb-1 block">Supplier</span>
          <select
            className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 outline-none"
            value={form.supplier}
            onChange={handleSupplierChange}
          >
            <option value="">Select Supplier</option>

            {Array.isArray(suppliers) &&
              suppliers
                .filter((s) => s?._id)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
          </select>
        </label>

        {/* Product Rows */}
        <div className="space-y-3">
          {form.products.map((row, index) => (
            <div key={index} className="flex gap-3 items-center">
              {/* Product Select */}
              <select
                className="bg-[#F5F5F5] rounded-lg flex-1 h-[48px] px-3 outline-none"
                value={row.product}
                onChange={(e) =>
                  handleProductChange(index, "product", e.target.value)
                }
              >
                <option value="">Product</option>

                {products
                  .filter((p) => {
                    if (!p?._id) return false;
                    return (
                      !usedProducts.includes(p._id) || row.product === p._id
                    );
                  })
                  .map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.productName}
                    </option>
                  ))}
              </select>

              {/* Quantity */}
              <input
                type="number"
                placeholder="Qty"
                className="bg-[#F5F5F5] rounded-lg w-[120px] h-[48px] px-3 outline-none"
                value={row.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
              />

              {/* Remove */}
              {form.products.length > 1 && (
                <button
                  onClick={() => removeProductRow(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add product button */}
        <button
          className="mt-2 border border-primary_blue text-primary_blue py-2 rounded-lg w-full"
          onClick={addProductRow}
        >
          + Add Another Product
        </button>

        {/* Total quantity */}
        <div className="text-right text-sm text-gray-600">
          Total Quantity: <b>{totalQuantity}</b>
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Restock"}
        </button>
      </div>
    </div>
  );
};

export default RequestRestockModal;
