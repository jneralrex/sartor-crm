import { X } from "lucide-react";
import { useEffect, useState } from "react";

const AddBatchFormModal = ({ onClose, onAddBatch, initialBatch = null }) => {
  const [batch, setBatch] = useState(() => ({
    batchNumber: initialBatch?.batchNumber || "",
    quantity: initialBatch?.quantity || "",
    expiryDate: initialBatch ? new Date(initialBatch.expiryDate).toISOString().slice(0, 10) : "",
    sellingPrice: initialBatch?.sellingPrice || "",
    supplyPrice: initialBatch?.supplyPrice || "",
  }));

  useEffect(() => {
    if (initialBatch) {
      setBatch({
        batchNumber: initialBatch.batchNumber || "",
        quantity: initialBatch.quantity || "",
        expiryDate: initialBatch.expiryDate ? new Date(initialBatch.expiryDate).toISOString().slice(0, 10) : "",
        sellingPrice: initialBatch.sellingPrice || "",
        supplyPrice: initialBatch.supplyPrice || "",
      });
    }
  }, [initialBatch]);

  const handleChange = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  

  const handleAdd = () => {
    // Convert expiryDate to timestamp if it's a date string
    const batchToAdd = {
      ...batch,
      expiryDate: batch.expiryDate ? new Date(batch.expiryDate).getTime() : ""
    };
    onAddBatch(batchToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A]">Add A Batch</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleAdd(); }}>
          <Input label="Batch Number" placeholder="Product batch number" name="batchNumber" value={batch.batchNumber} onChange={handleChange} />
          <Input label="Product Quantity" placeholder="Quantity of Product" name="quantity" value={batch.quantity} onChange={handleChange} />
          <Input label="Expiry Date" placeholder="Enter Expiry Date" name="expiryDate" type="date" value={batch.expiryDate} onChange={handleChange} />
          <Input label="Selling Price" placeholder="Selling Price" name="sellingPrice" value={batch.sellingPrice} onChange={handleChange} />
          <Input label="Supply Price" placeholder="Supply Price" name="supplyPrice" value={batch.supplyPrice} onChange={handleChange} />

          <button
            type="submit"
            className="bg-primary_blue w-full text-white py-3 rounded-lg text-[16px] font-semibold"
          >
            Add
          </button>
        </form>

       

      </div>

        </div>
  );
};

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

export default AddBatchFormModal;