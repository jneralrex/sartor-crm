import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AddBatchFormModal from "./AddBatchFormModal";
import { useToken } from '../../../store/authStore';
import instance from "../../../utils/axiosInstance";

const AddBatchWrapperModal = ({ productId, onClose, editData, onBatchUpdated }) => {
  const token = useToken();
  const [productDetails, setProductDetails] = useState(null);
  const [getAllSuppliers, setGetAllSuppliers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [batches, setBatches] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [receiptPreview, setReceiptPreview] = useState("");
  const [editingBatch, setEditingBatch] = useState(null);
  const [loading, setLoading] = useState(false);

  const [priceSuggestion, setPriceSuggestion] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);

  // form state
  const [form, setForm] = useState({
    manufacturer: "",
    product: "",
    invoiceNumber: "",
    supplier: "",
    image: "",
    receipt: ""
  });

  // fetch product details once
  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await instance.get(`product/${productId}`);
        setProductDetails(res.data.data);
        setForm((f) => ({
          ...f,
          product: res.data.data._id,
          manufacturer: res.data.data.manufacturer || ""
        }));
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [productId, token]);

  // if editData passed, populate form and batches
  useEffect(() => {
    if (!editData) return;
    setForm({
      manufacturer: editData.manufacturer || "",
      product: productId,
      invoiceNumber: editData.invoiceNumber || "",
      supplier: editData.supplier?._id || "",
      image: editData.image || "",
      receipt: editData.receipt || ""
    });
    setBatches([editData]);
    setImagePreview(editData.image || "");
    setReceiptPreview(editData.receipt || "");
  }, [editData, productId]);

  // fetch suppliers
  useEffect(() => {
    const allSupplier = async () => {
      try {
        const res = await instance.get("suppliers?limit=all");
        const suppliers = res.data?.data?.data || [];
        setGetAllSuppliers(Array.isArray(suppliers) ? suppliers : []);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
        setGetAllSuppliers([]);
      }
    };
    allSupplier();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setShowAddForm(true);
  };

  const handleAddBatchClick = () => {
    setEditingBatch(null);
    setShowAddForm(true);
  };

  // fetch price suggestion from backend (uses saved data on server; call after successful POST/PUT)
  const fetchPriceSuggestion = async () => {
    if (!productId) return;
    if (!batches || batches.length === 0) {
      console.warn("No batches to request price suggestion for.");
      return;
    }

    try {
      setIsFetchingSuggestion(true);

      const payload = {
        invoiceNumber: form.invoiceNumber,
        supplier: form.supplier,
        manufacturer: form.manufacturer,
        batches: batches.map((batch) => ({
          batchNumber: batch.batchNumber,
          quantity: Number(batch.quantity),
          expiryDate: batch.expiryDate,
          manufactureDate: batch.manufactureDate
        }))
      };

      const res = await instance.get(`/product/price/suggestion/${productId}`, payload);
      console.log(res)

      if (res.data?.data) {
        setPriceSuggestion(res.data.data);
        setShowPriceModal(true);
      } else {
        console.warn("Price suggestion returned no data", res);
      }
    } catch (error) {
      // server may return 400 if it wants server-saved batches — this call is now done AFTER save, so should succeed.
      console.error("Failed to fetch price suggestion:", error);
    } finally {
      setIsFetchingSuggestion(false);
    }
  };

  // final submit: create/update batch(es), then request price suggestion
  const handleSubmit = async () => {
    if (!batches || batches.length === 0) {
      console.warn("No batches to submit.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        image: imagePreview,
        receipt: receiptPreview,
        batch: batches
      };

      let res;
      if (editData?._id) {
        // If editing a single existing batch
        res = await instance.put(`batch/edit/${editData._id}`, {
          ...payload,
          ...batches[0]
        });

        if (onBatchUpdated && typeof onBatchUpdated === "function") {
          onBatchUpdated(res.data?.data);
        }
      } else {
        // Create new batches
        res = await instance.post("batch", payload);
      }

      // After successful save, fetch price suggestion (server has persisted batches)
      await fetchPriceSuggestion();

      // optionally keep the wrapper open so user can see suggestion modal;
      // If you prefer to close wrapper immediately, call onClose() here.
      // onClose();
    } catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-auto rounded-xl p-6 space-y-4 hide-scrollbar">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{editData ? "Edit Batch" : "Add Batch"}</h2>
            <button onClick={onClose}><X /></button>
          </div>

          {/* Product preview */}
          <div className="flex items-start gap-4 bg-[#F5F5F5] p-4 rounded-lg mb-4">
            <img src={productDetails?.productImage} className="w-[48px] h-[48px] bg-gray-300 rounded-lg" alt="product" />
            <div>
              <p className="font-semibold text-[#1A1A1A]">{productDetails?.productName || "Product Name"}</p>
              <p className="text-xs text-[#666]">{productDetails?.description || "No description"}</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <label className="block">
              <span className="block text-[#1A1A1A] font-medium text-sm mb-1">Manufacturer</span>
              <input
                type="text"
                name="manufacturer"
                value={form.manufacturer}
                readOnly
                className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none text-gray-500 cursor-not-allowed"
              />
            </label>

            <Input label="Invoice Number" placeholder="Invoice Number" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} />

            <div>
              <label className="block text-[#1A1A1A] font-medium text-sm mb-1">Supplier</label>
              <select
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
              >
                <option value="">Select Supplier</option>
                {getAllSuppliers.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>

            {/* Uploads */}
            <div className="flex gap-4">
              <UploadBox label="Upload Image" onUpload={(url) => { setImagePreview(url); setForm(f => ({ ...f, image: url })); }} fileUrl={imagePreview} setFileUrl={setImagePreview} />
              <UploadBox label="Upload Receipt" onUpload={(url) => { setReceiptPreview(url); setForm(f => ({ ...f, receipt: url })); }} fileUrl={receiptPreview} setFileUrl={setReceiptPreview} />
            </div>

            {/* Add Batch trigger */}
            <button type="button" onClick={handleAddBatchClick} className="text-[#999] items-center gap-2 text-[16px] font-medium w-full text-center flex justify-center">
              <Plus size={18} /> Add Batch
            </button>

            {/* Batch list */}
            {batches.map((batch, idx) => (
              <div key={idx} className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center mt-2">
                <div>
                  <p className="text-[#1A1A1A] font-semibold">BN:{batch.batchNumber}</p>
                  <p className="text-xs text-[#666]">Exp: {batch.expiryDate ? new Date(batch.expiryDate).toLocaleDateString() : '-'}</p>
                  <p className="text-xs text-[#666]">Qty: {batch.quantity}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <button onClick={() => setBatches(prev => prev.filter((_, i) => i !== idx))}><X className="text-red-500" size={18} /></button>
                  <button onClick={() => handleEditBatch(batch)} className="text-blue-500">Edit</button>
                </div>
              </div>
            ))}

            {/* Submit */}
            <button
              type="button"
              disabled={batches.length === 0 || loading}
              onClick={handleSubmit}
              className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {loading ? "Submitting..." : editData ? "Update Batch" : "Submit All Batches"}
            </button>
          </div>
        </div>
      </div>

      {/* AddBatchFormModal */}
      {showAddForm && (
        <AddBatchFormModal
          onClose={() => setShowAddForm(false)}
          initialBatch={editingBatch}
          onAddBatch={(batch) => {
            // convert expiryDate to timestamp if it's a date string (the form already does that)
            const normalized = {
              ...batch,
              quantity: batch.quantity,
              expiryDate: batch.expiryDate,
            };

            if (editingBatch) {
              setBatches(prev => prev.map(b => b._id === editingBatch._id ? normalized : b));
            } else {
              setBatches(prev => [...prev, normalized]);
            }
            setShowAddForm(false);
            setEditingBatch(null);
            // don't call price suggestion here — we'll call it after final submit
          }}
        />
      )}

      {/* Price Suggestion Modal */}
      {showPriceModal && priceSuggestion && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-[480px] text-left shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Price Suggestion</h3>

            <div className="space-y-2 text-sm">
              <SummaryRow label="Product" value={priceSuggestion.product?.name} />
              <SummaryRow label="Total Batches" value={priceSuggestion.batchStatistics?.totalBatches} />
              <SummaryRow label="Total Quantity" value={priceSuggestion.batchStatistics?.totalQuantity} />
              <SummaryRow label="Average Cost Price" value={priceSuggestion.batchStatistics?.averageCostPrice ? `₦${priceSuggestion.batchStatistics?.averageCostPrice.toFixed(2)}` : '-'} />
              <SummaryRow label="Suggested Selling Price" value={priceSuggestion.batchStatistics?.suggestedSellingPrice ? `₦${priceSuggestion.batchStatistics?.suggestedSellingPrice.toFixed(2)}` : '-'} />
              <SummaryRow label="Markup % Used" value={priceSuggestion.batchStatistics?.markupPercentage ? `${((priceSuggestion.batchStatistics?.markupPercentage * 100) - 100).toFixed(2)}%` : '-'} />
            </div>

            <hr className="my-4" />

            <h4 className="font-medium mb-2">Per Batch Prices:</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {priceSuggestion.batches?.map((b, i) => (
                <div key={i} className="text-sm bg-[#F5F5F5] rounded p-2 flex justify-between items-center">
                  <span>{b.batchNumber}</span>
                  <span className="text-green-600 font-semibold">₦{(b.sellingPrice ?? 0).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowPriceModal(false);
                onClose();
              }}
              className="mt-4 bg-primary_blue text-white px-6 py-2 rounded-md font-semibold w-full"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* Loading for suggestion */}
      {isFetchingSuggestion && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-sm text-[#666] mb-2">Calculating price suggestion...</p>
            <div className="loader w-6 h-6 mx-auto" />
          </div>
        </div>
      )}
    </>
  );
};

// Small Input component used above
const Input = ({ label, placeholder, name, value, onChange }) => (
  <label className="block">
    <span className="block text-[#1A1A1A] font-medium text-sm mb-1">{label}</span>
    <input type="text" placeholder={placeholder} name={name} value={value} onChange={onChange}
      className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none" />
  </label>
);

// UploadBox placed outside the component to prevent re-definition on each render
const UploadBox = ({ label, onUpload, fileUrl, setFileUrl }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setDone(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dwua55lnu/image/upload");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    });

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (res.secure_url) {
        onUpload(res.secure_url);
        setFileUrl(res.secure_url);
        setDone(true);
      }
      setLoading(false);
    };

    xhr.onerror = () => {
      console.error("Upload failed");
      setLoading(false);
    };

    xhr.send(formData);
  };

  return (
    <label className="relative flex-1 bg-[#F5F5F5] h-[72px] flex flex-col items-center justify-center text-xs text-[#999] border border-[#ccc] rounded-lg cursor-pointer overflow-hidden">
      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {fileUrl ? (
        <img src={fileUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
      ) : loading ? (
        <div className="text-center text-sm">
          <div className="loader w-5 h-5 mx-auto mb-1" />
          <span>{progress}%</span>
        </div>
      ) : done ? (
        <span className="text-green-600">Done ✅</span>
      ) : (
        label
      )}
    </label>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-sm font-medium">
    <span>{label}</span>
    <span>{value ?? '-'}</span>
  </div>
);

export default AddBatchWrapperModal;
