import React, { useEffect, useState } from "react";
import instance from "../../../utils/axiosInstance";

const CreateStocks = ({ onClose, onSuccess, stockToEdit = null }) => {
  const [form, setForm] = useState({
    contactNumber: "",
    address: "",
    notes: "",
    level: "",
    lastStock: "",
    status: "",
    product: "",
    customer: "",
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(stockToEdit);

  // ---------------------------
  // LOAD PRODUCTS
  // ---------------------------
  const allProducts = async () => {
    try {
      const res = await instance.get("products");
      const arr = res.data?.data?.data || [];
      setProducts(arr);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  // ---------------------------
  // LOAD CUSTOMERS
  // ---------------------------
  const allCustomer = async () => {
    try {
      const res = await instance.get("customers");
      const arr = res.data?.data?.customers || [];
      console.log("customer", res)
      setCustomers(arr);
    } catch (err) {
      console.error("Failed to load customers:", err);
    }
  };

  // ---------------------------
  // PREFILL FORM IF EDITING
  // ---------------------------
  useEffect(() => {
    allProducts();
    allCustomer();

    if (isEdit) {
      setForm({
        contactNumber: stockToEdit.contactNumber || "",
        address: stockToEdit.address || "",
        notes: stockToEdit.notes || "",
        level: stockToEdit.level || "",
        lastStock: stockToEdit.lastStock || "",
        status: stockToEdit.status || "",
        product: stockToEdit.product || "",
        customer: stockToEdit.customer || "",
      });
    }
  }, []);

  // ---------------------------
  // HANDLE INPUT
  // ---------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      if (isEdit) {
        res = await instance.put(
          `stock/edit/${stockToEdit._id}`,
          form
        );
      } else {
        res = await instance.post("stock", form);
      }

      onSuccess(res.data.data);
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Stock" : "Create Stock"}
          </h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col gap-1">
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="">Select Status</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Product</label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.productName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Customer</label>
            <select
              name="customer"
              value={form.customer}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.lead.name}
                </option>
              ))}
            </select>
          </div>

          {/* TEXT INPUTS */}
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border rounded p-2 w-full"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded p-2 w-full"
          />

          <input
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Warehouse Level"
            className="border rounded p-2 w-full"
          />

          <input
            name="lastStock"
            value={form.lastStock}
            onChange={handleChange}
            placeholder="Last Stock"
            className="border rounded p-2 w-full"
          />

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="border rounded p-2 w-full"
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-primary_blue text-white text-center"
          >
            {loading ? "Saving..." : isEdit ? "Update Stock" : "Create Stock"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStocks;
