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

        try {
            let response;

            if (productToEdit) {
                // Only send productName for update
                response = await instance.put(`product/edit/${productToEdit._id}`, {
                    productName: formData.productName,
                });
                console.log("Product Updated", response.data);
                if (onSuccess) {
                    onSuccess(response.data?.data || response.data); // Use whichever is available
                }


            } else {
                // Send full data for create
                response = await instance.post("product", formData);
                console.log("Product Created", response.data);
                if (onSuccess) {
                    onSuccess(response.data?.data || response.data); // Use whichever is available
                }


            }

            if (onSuccess) {
                onSuccess(response.data.data); // Make sure this matches the shape of your API response
            }

            // Reset form
            setFormData({
                productName: '',
                barcodeNumber: '',
                manufacturer: '',
                description: '',
                productImage: '',
            });

            onClose();
        } catch (error) {
            console.error("Error submitting product", error);
        }
    };


    console.log("Form Data:", formData);

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
                        disabled={uploading}
                        className={`w-full bg-blue-900 text-white py-3 rounded-lg font-semibold ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    // onClick={handleSubmit}
                    >
                        {productToEdit ? "Update Product" : "Create Product"}
                    </button>
                </form>
            </div>
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

export default CreateProductModal;
