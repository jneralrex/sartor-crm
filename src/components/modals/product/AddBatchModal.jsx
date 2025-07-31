import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import AddBatchFormModal from "./AddBatchFormModal";
import { useAuth } from "../../../context/AuthContext";
import instance from "../../../utils/axiosInstance";

const AddBatchWrapperModal = ({ productId, onClose, editData, onBatchUpdated }) => {
  const { token } = useAuth();
  const [productDetails, setProductDetails] = useState(null);
  const [getAllSuppliers, setGetAllSuppliers] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [batches, setBatches] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [receiptPreview, setReceiptPreview] = useState("");
  const [editingBatch, setEditingBatch] = useState(null);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await instance.get(`product/${productId}`);
        console.log("prodct", res)
        setProductDetails(res.data.data);
        setForm((form) => ({
          ...form,
          product: res.data.data._id,
          manufacturer: res.data.data.manufacturer, // ← set from API response
        }));
      } catch (err) {
        setProductDetails(null);
      }
    };
    fetchProduct();
  }, [productId, token]);


  useEffect(() => {
    if (editData) {
      setForm({
        manufacturer: editData.manufacturer || "",
        product: productId,
        invoiceNumber: editData.invoiceNumber || "",
        supplier: editData.supplier?._id || "",
        image: editData.image || "",
        receipt: editData.receipt || "",
      });

      setBatches([editData]);
      setImagePreview(editData.image || "");
      setReceiptPreview(editData.receipt || "");
    }
  }, [editData]);


  const [form, setForm] = useState({
    manufacturer: "",
    product: "",
    invoiceNumber: "",
    supplier: "",
    image: "",
    receipt: ""
  });

  // Function to upload files to Cloudinary
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
          onUpload(res.secure_url); // Save to form
          setFileUrl(res.secure_url); // Save preview
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



  // const handleAddBatch = (batch) => {
  //   setBatches(prev => [...prev, batch]);

  //   // Populate form fields with latest batch values (optional)
  //   setForm(prev => ({
  //     ...prev,
  //     quantity: batch.quantity || prev.quantity,
  //     supplyPrice: batch.supplyPrice || prev.supplyPrice,
  //     sellingPrice: batch.sellingPrice || prev.sellingPrice,
  //   }));

  //   setShowAddForm(false);
  // };

  // Handler for main form fields

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for submit all
  // const handleSubmit = async () => {
  //   try {
  //     let imageUrl = "";
  //     let receiptUrl = "";

  //     if (imageFile) {
  //       imageUrl = await uploadToCloudinary(imageFile);
  //     }

  //     if (receiptFile) {
  //       receiptUrl = await uploadToCloudinary(receiptFile);
  //     }

  //     const payload = {
  //       ...form,
  //       image: imageUrl,
  //       receipt: receiptUrl,
  //       batch: batches,
  //     };

  //     console.log("Final payload:", payload);

  //     // ✅ Send this payload to your backend
  //     const res = await instance.post("/batch", payload);

  //     console.log(res)

  //     onClose();
  //   } catch (error) {
  //     console.error("Submit failed", error);
  //   }
  // };


  const handleSubmit = async () => {

    setLoading(true);
    try {
      const payload = {
        ...form,
        image: imagePreview,
        receipt: receiptPreview,
        batch: batches,
      };

      if (editData?._id) {
        const res = await instance.put(`batch/edit/${editData._id}`, {
          ...payload,
          ...batches[0],
        });

        if (onBatchUpdated && typeof onBatchUpdated === 'function') {
          onBatchUpdated({ ...res.data.data });
        }

      } else {
        let imageUrl = "";
        let receiptUrl = "";

        if (imageFile) {
          imageUrl = await uploadToCloudinary(imageFile);
        }

        if (receiptFile) {
          receiptUrl = await uploadToCloudinary(receiptFile);
        }

        const newPayload = {
          ...form,
          image: imageUrl,
          receipt: receiptUrl,
          batch: batches,
        };

        await instance.post("batch", newPayload);
      }

      onClose();
    } catch (error) {
      console.error("Submit failed", error);
    }
    finally {
      setLoading(false);
    }
  };



  const allSupplier = async () => {
    try {
      const res = await instance.get("suppliers?limit=all");
      console.log("Supplier response:", res.data);

      const suppliers = res.data?.data?.data; // 🛠️ fixed line
      if (Array.isArray(suppliers)) {
        setGetAllSuppliers(suppliers);
      } else {
        console.error("Suppliers is not an array:", suppliers);
        setGetAllSuppliers([]);
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      setGetAllSuppliers([]);
    }
  };

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setShowAddForm(true);
  };

  const handleAddBatchClick = () => {
    setEditingBatch(null);
    setShowAddForm(true);
  };


  useEffect(() => {
    allSupplier();
  }, [token]);

  console.log(form);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold"> {editData ? "Edit Batch" : "Add Batch"}</h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>

          {/* Product preview */}
          <div className="flex items-start gap-4 bg-[#F5F5F5] p-4 rounded-lg mb-4">
            <img src={productDetails?.productImage} className="w-[48px] h-[48px] bg-gray-300 rounded-lg" />
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
            {/* <Input label="Product ID" placeholder="Product ID" name="product" value={form.product} onChange={handleChange} disabled/> */}
            <div>
              <label className="block text-[#1A1A1A] font-medium text-sm mb-1">Supplier</label>
              <select
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="bg-[#F5F5F5] rounded-lg w-full h-[48px] px-4 text-sm outline-none"
              >
                <option value="">Select Supplier</option>
                {getAllSuppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>


            {/* Uploads */}
            <div className="flex gap-4">
              <UploadBox
                label="Upload Image"
                onUpload={(url) => setForm((prev) => ({ ...prev, image: url }))}
                fileUrl={imagePreview}
                setFileUrl={setImagePreview}
              />

              <UploadBox
                label="Upload Receipt"
                onUpload={(url) => setForm((prev) => ({ ...prev, receipt: url }))}
                fileUrl={receiptPreview}
                setFileUrl={setReceiptPreview}
              />

            </div>


            {/* Add Batch trigger */}
            <button
              type="button"
              onClick={handleAddBatchClick}
              className="text-[#999] items-center gap-2 text-[16px] font-medium w-full text-center flex justify-center"
            >
              <Plus size={18} /> Add Batch
            </button>

            {batches.map((batch, idx) => (
              <div key={idx} className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center mt-2">
                <div>
                  <p className="text-[#1A1A1A] font-semibold">BN:{batch.batchNumber}</p>
                  <p className="text-xs text-[#666]">Exp: {new Date(batch.expiryDate).toLocaleDateString()}</p>
                  <p className="text-xs text-[#666]">Qty: {batch.quantity}pcs</p>
                </div>
                <div className="flex gap-3 items-center">
                  <button onClick={() => setBatches(batches.filter((_, i) => i !== idx))}><X className="text-red-500" size={18} /></button>
                  <button onClick={() => handleEditBatch(batch)} className="text-blue-500">Edit</button> {/* Add edit button */}
                </div>
              </div>
            ))}




            {/* Submit button */}
            <button
              type="button"
              disabled={batches.length === 0 || isUploadingImage || isUploadingReceipt || loading}
              onClick={handleSubmit}
              className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {editData ? "Updating Batch..." : "Submitting..."}
                </>
              ) : (
                editData ? "Update Batch" : "Submit All Batches"
              )}
            </button>


          </div>
        </div>
      </div>

      {/* Nested Modal */}
      {/* {showAddForm && <AddBatchFormModal onClose={() => setShowAddForm(false)} onAddBatch={handleAddBatch} />} */}

      {showAddForm && (
        <AddBatchFormModal
          onClose={() => setShowAddForm(false)}
          onAddBatch={(batch) => {
            if (editingBatch) {
              setBatches(prev =>
                prev.map(b => b._id === editingBatch._id ? batch : b)
              );
            } else {
              setBatches(prev => [...prev, batch]);
            }
            setShowAddForm(false);
            setEditingBatch(null);
          }}
          initialBatch={editingBatch}
        />
      )}
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




export default AddBatchWrapperModal;