// components/modals/product/EditProductModal.jsx
import React from 'react';

const EditProductModal = ({ onClose, productToEdit }) => {
  if (!productToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <p className="text-sm">Edit form for: <strong>{productToEdit.productName}</strong></p>
        {/* You can reuse CreateProductModal with productToEdit prop if they share UI */}
      </div>
    </div>
  );
};

export default EditProductModal;
