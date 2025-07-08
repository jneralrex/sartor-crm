import { X, Plus } from "lucide-react";
import { useState,useEffect } from "react";
import AddBatchFormModal from "./AddBatchFormModal";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const AddBatchWrapperModal = ({ onClose, productId }) => {
  const { token } = useAuth();
  const VITE_API_URL = import.meta.env.VITE_BASE_URL;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}product/${productId}`, {
          headers: { 's-token': token }
        });
        setProductDetails(res.data.data);
        setForm(form => ({
          ...form,
          product: res.data.data._id, // or productName if you want to show name
        }));
      } catch (err) {
        setProductDetails(null);
      }
    };
    fetchProduct();
  }, [productId, token]);


  const [showAddForm, setShowAddForm] = useState(false);
  const [batches, setBatches] = useState([]);
  
  const [form, setForm] = useState({
    manufacturer: "",
    product: "",
    invoiceNumber: "",
    supplier: "",
    image: "",
    receipt: ""
  });

  // Handler to add a batch from the form modal
  const handleAddBatch = (batch) => {
    setBatches(prev => [...prev, batch]);
    setShowAddForm(false);
  };

  // Handler for main form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for submit all
  const handleSubmit = () => {
    const payload = {
      ...form,
      batch: batches
    };
    // TODO: Make API call here
    console.log("Submitting:", payload);
    // onClose(); // Optionally close modal after submit
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Batch</h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>

          {/* Product preview */}
          <div className="flex items-start gap-4 bg-[#F5F5F5] p-4 rounded-lg mb-4">
  <div className="w-[48px] h-[48px] bg-gray-300 rounded-lg" />
  <div>
    <p className="font-semibold text-[#1A1A1A]">
      {productDetails?.productName || "Product Name"}
    </p>
    <p className="text-xs text-[#666]">
      {productDetails?.description || "No description"}
    </p>
  </div>
</div>

          {/* Inputs */}
          <div className="space-y-4">
            <Input label="Manufacturers" placeholder="Manufacturers Name" name="manufacturer" value={form.manufacturer} onChange={handleChange} />
            <Input label="Invoice Number" placeholder="Invoice Number" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} />
            {/* <Input label="Product ID" placeholder="Product ID" name="product" value={form.product} onChange={handleChange} disabled/> */}
            <Input label="Supplier ID" placeholder="Supplier ID" name="supplier" value={form.supplier} onChange={handleChange} />
            

               {/* Uploads */}
            <div className="flex gap-4">
              <UploadBox label="Upload Image" />
              <UploadBox label="Upload Receipt" />
            </div>

            
            {/* Add Batch trigger */}
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="text-[#999] items-center gap-2 text-[16px] font-medium w-full text-center flex justify-center"
            >
              <Plus size={18} /> Add Batch
            </button>

            {/* List of batches */}
            {batches.map((batch, idx) => (
              <div key={idx} className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center mt-2">
                <div>
                  <p className="text-[#1A1A1A] font-semibold">BN:{batch.batchNumber}</p>
                  <p className="text-xs text-[#666]">Exp: {new Date(batch.expiryDate).toLocaleDateString()}</p>
                  <p className="text-xs text-[#666]">Qty: {batch.quantity}pcs</p>
                </div>
                <div className="flex gap-3 items-center">
                  <button onClick={() => setBatches(batches.filter((_, i) => i !== idx))}><X className="text-red-500" size={18} /></button>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="space-y-2">
              <SummaryRow label="Total Qty:" value={batches.reduce((sum, b) => sum + Number(b.quantity || 0), 0)} />
              <SummaryRow label="Total Supply Price:" value={batches.reduce((sum, b) => sum + Number(b.supplyPrice || 0), 0)} />
              <SummaryRow label="Total Selling Price:" value={batches.reduce((sum, b) => sum + Number(b.sellingPrice || 0), 0)} />
            </div>

            {/* Submit button */}
            <button
              className="bg-primary_blue w-full text-white py-3 rounded-lg text-[16px] font-semibold"
              onClick={handleSubmit}
              type="button"
              disabled={batches.length === 0}
            >
              Submit All Batches
            </button>
          </div>
        </div>
      </div>

      {/* Nested Modal */}
      {showAddForm && <AddBatchFormModal onClose={() => setShowAddForm(false)} onAddBatch={handleAddBatch} />}
    </>
  );
};

const Input = ({ label, placeholder, name, value, onChange }) => (
  <label className="block">
    <span className="block text-[#1A1A1A] font-medium text-sm mb-1">{label}</span>
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
    />
  </label>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-sm font-medium text-[#1A1A1A]">
    <span>{label}</span>
    <span>{value ?? '-'}</span>
  </div>
);


const UploadBox = ({ label }) => (
  <div className="flex-1 text-center bg-[#F5F5F5] h-[72px] flex items-center justify-center text-xs text-[#999] border border-[#ccc] rounded-lg">
    Click to Upload or Drag and drop here
  </div>
);
export default AddBatchWrapperModal;