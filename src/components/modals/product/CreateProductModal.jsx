// import React, { useState } from 'react';

// const CreateProductModal = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     batch: '',
//     barcodeNumber: '',
//     quantity: '',
//     unitPrice: '',
//     buyingPrice: '',
//     sellingPrice: '',
//     expiryDate: '',
//     description: '',
//     productImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
//       <div className="bg-white w-[90%] max-w-[500px] max-h-[95vh] overflow-y-scroll rounded-xl p-6 space-y-4 hide-scrollbar">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Create Product</h2>
//           <button onClick={onClose} className="text-2xl">&times;</button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input label="Product Name" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} />
//           <Input label="Batch Number" name="batch" value={formData.batch} onChange={handleChange} />
//           <Input label="Barcode Number" name="barcodeNumber" value={formData.barcodeNumber} onChange={handleChange} />
//           <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
//           <Input label="Unit Price" name="unitPrice" type="number" value={formData.unitPrice} onChange={handleChange} />
//           <Input label="Buying Price" name="buyingPrice" type="number" value={formData.buyingPrice} onChange={handleChange} />
//           <Input label="Selling Price" name="sellingPrice" type="number" value={formData.sellingPrice} onChange={handleChange} />
//           <Input label="Expiry Date" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
//           <Input label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />

//           <div>
//             <label className="block text-sm font-medium mb-1">Add Image</label>
//             <input
//               type="file"
//               name="productImage"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full border p-2 rounded bg-gray-50"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold"
//           >
//             Create Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Input = ({ label, name, type = "text", value, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border p-2 rounded bg-gray-50"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border p-2 rounded bg-gray-50"
//       />
//     )}
//   </div>
// );

// export default CreateProductModal;

import React, { useState, useEffect } from 'react';

const CreateProductModal = ({ onClose, onSubmit, productToEdit = null }) => {
    const [formData, setFormData] = useState({
        productName: '',
        barcodeNumber: '',
        manufacturer: '',
        description: '',
        // batch: '',
        // quantity: '',
        // unitPrice: '',
        // buyingPrice: '',
        // sellingPrice: '',
        // expiryDate: '',
        productImage: null,
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    // Prefill when editing
    useEffect(() => {
        if (productToEdit) {
            setFormData({ ...productToEdit, productImage: null }); // Don't prefill image
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, [name]: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear validation error on change
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        let newErrors = {};
        // if (!formData.productName.trim()) newErrors.productName = "Product name is required";
        // if (!formData.barcodeNumber.trim()) newErrors.barcodeNumber = "Barcode is required";
        if (!formData.quantity) newErrors.quantity = "Quantity is required";
        // if (!formData.unitPrice) newErrors.unitPrice = "Unit price is required";
        // if (!formData.sellingPrice) newErrors.sellingPrice = "Selling price is required";
        // if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit(formData); // Hook to API
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
                    {/* <Input label="Batch Number" name="batch" placeholder="Batch Number" value={formData.batch} onChange={handleChange} />
                    <Input label="Barcode Number" name="barcodeNumber" placeholder="Barcode" value={formData.barcodeNumber} onChange={handleChange} error={errors.barcodeNumber} />
                    <Input label="Quantity" name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} error={errors.quantity} />
                    <Input label="Unit Price" name="unitPrice" type="number" placeholder="Unit Price" value={formData.unitPrice} onChange={handleChange} error={errors.unitPrice} /> */}
                    {/* <Input label="Buying Price" name="buyingPrice" type="number" placeholder="Buying Price" value={formData.buyingPrice} onChange={handleChange} />
                    <Input label="Selling Price" name="sellingPrice" type="number" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} error={errors.sellingPrice} />
                    <Input label="Expiry Date" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} error={errors.expiryDate} /> */}
                    <Input label="Description" name="description" type="textarea" placeholder="Product description here" value={formData.description} onChange={handleChange} />

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
                            {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-contain mx-auto" />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold"
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

