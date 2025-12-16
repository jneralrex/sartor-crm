import React, { useState, useEffect } from 'react';
import instance from "../../../utils/axiosInstance"

const CreateProductModal = ({ onClose, onSubmit, onSuccess, productToEdit = null }) => {
    const [formData, setFormData] = useState({
        productName: '',
        barcodeNumber: '',
        manufacturer: '',
        description: '',
        productImage: '',
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState(null);
    const [priceSuggestion, setPriceSuggestion] = useState(null);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);


    useEffect(() => {
        if (productToEdit) {
            setFormData((prev) => ({
                productName: productToEdit.productName || '',
                barcodeNumber: productToEdit.barcodeNumber || '',
                manufacturer: productToEdit.manufacturer || '',
                description: productToEdit.description || '',
                productImage: productToEdit.productImage || '',
            }));
            if (productToEdit.productImage) {
                setPreview(productToEdit.productImage);
            }
        }
    }, [productToEdit]);


    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
            setUploading(true);
            setUploadProgress(0);

            const formDataCloud = new FormData();
            formDataCloud.append("file", file);
            formDataCloud.append("upload_preset", "ml_default");

            // Use XMLHttpRequest for progress tracking
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.cloudinary.com/v1_1/dwua55lnu/image/upload");

            xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(percent);
                }
            });

            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status === 200 && response.secure_url) {
                    setFormData((prev) => ({ ...prev, productImage: response.secure_url }));
                    setPreview(response.secure_url);
                } else {
                    console.error("Cloudinary error:", response);
                }
                setUploading(false);
            };

            xhr.onerror = () => {
                console.error("Upload failed");
                setUploading(false);
            };

            xhr.send(formDataCloud);

        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };




    const validate = () => {
        let newErrors = {};

        // Always validate productName
        if (!formData.productName?.trim()) {
            newErrors.productName = "Product name is required";
        }

        // Only validate the rest if not editing (i.e., it's a create request)
        if (!productToEdit) {
            if (!formData.barcodeNumber?.trim()) newErrors.barcodeNumber = "Barcode is required";
            if (!formData.manufacturer?.trim()) newErrors.manufacturer = "Manufacturer is required";
            if (!formData.description?.trim()) newErrors.description = "Description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            let response;

            if (productToEdit) {
                response = await instance.put(`product/edit/${productToEdit._id}`, {
                    productName: formData.productName,
                });
            } else {
                response = await instance.post("product", formData);
            }

            if (onSuccess) {
                onSuccess(response.data?.data || response.data);
            }

            setSnackbar({
                type: 'success',
                message: productToEdit ? 'Product updated successfully!' : 'Product created successfully!',
            });
            setTimeout(() => {
                setSnackbar(null);
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error submitting product", error);
            setSnackbar({
                type: 'error',
                message: error?.response?.data?.message || 'Something went wrong while submitting the product.',
            });
            setTimeout(() => setSnackbar(null), 3000);
        } finally {
            setLoading(false);
        }
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


    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{productToEdit ? "Edit Product" : "Create Product"}</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Product Name" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} error={errors.productName} />
                    <Input label="Manufacturer" name="manufacturer" placeholder="Manufacturer Name" value={formData.manufacturer} onChange={handleChange} error={errors.manufacturer} />
                    <Input label="Barcode Number" name="barcodeNumber" placeholder="Barcode Number" value={formData.barcodeNumber} onChange={handleChange} error={errors.barcodeNumber} />
                    <Input label="Description" name="description" type="textarea" placeholder="Product description here" value={formData.description} onChange={handleChange} error={errors.description} />

                    <div>
                        <label className="block text-sm font-medium mb-1">Add Image</label>
                        <div
                            className="border border-dashed border-gray-400 p-4 rounded bg-gray-50 text-center cursor-pointer"
                            onClick={() => document.getElementById('product-image-input').click()}
                        >
                            <input
                                id="product-image-input"
                                type="file"
                                name="productImage"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                            {!preview && <p className="text-sm text-gray-500">Click to upload or drag and drop</p>}
                            {preview && (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 w-32 h-32 object-contain mx-auto"
                                    />
                                    {uploading && (
                                        <div className="mt-2 text-sm text-blue-600 text-center">
                                            Uploading... {uploadProgress}%
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className={`bg-primary_blue text-white w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                {productToEdit ? "Updating Product..." : "Creating Product..."}
                            </>
                        ) : (
                            productToEdit ? "Update Product" : "Create Product"
                        )}
                    </button>
                </form>
            </div>
            {snackbar && (
                <div className={`absolute top-5 right-5 px-4 py-3 rounded-md text-sm shadow-md z-50 
    ${snackbar.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                    {snackbar.message}
                </div>
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
                            <SummaryRow label="Average Selling Price" value={priceSuggestion.batchStatistics?.suggestedSellingPrice ? `₦${priceSuggestion.batchStatistics?.suggestedSellingPrice.toFixed(2)}` : '-'} />
                            <SummaryRow label="Markup % Used" value={priceSuggestion.batchStatistics?.markupPercentage ? `${((priceSuggestion.batchStatistics?.markupPercentage * 100) - 100).toFixed(2)}%` : '-'} />
                        </div>

                        <hr className="my-4" />

                        <h4 className="font-medium mb-2">Selling Price Per Batch:</h4>
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

        </div>
    );
};

const Input = ({ label, name, type = "text", value, onChange, placeholder, error }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        {type === "textarea" ? (
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border p-2 rounded bg-gray-50"
            />
        ) : (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border p-2 rounded bg-gray-50"
            />
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-sm font-medium">
    <span>{label}</span>
    <span>{value ?? '-'}</span>
  </div>
);

export default CreateProductModal;
