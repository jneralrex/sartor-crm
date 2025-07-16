import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { X } from 'lucide-react';
import instance from '../../../utils/axiosInstance';

const ProductDetailsModal = ({ onClose, productId }) => {
  const { token } = useAuth();

  const [singleProduct, setSingleProduct] = useState({});


  useEffect(() => {
    if (!productId) return;

    const getSingleProduct = async () => {
      try {
        const res = await instance.get(`product/${productId}`);

        console.log(res);
        setSingleProduct(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [token, productId]);

  console.log(singleProduct)
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg w-[90%] max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <span className='text[#1A1A1A] font-semibold text-[20px] text-start w-full'>Product Details </span>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        <div className="py-4 rounded-md items-center grid grid-cols-2 gap-x-10 md:gap-x-44 gap-y-4">

          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Product Name
            <span className='text-[#484848] mt-2 w-[150px]'>
              {singleProduct?.productName || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Product ID
            <span className='text-[#484848] mt-2 w-[150px]'>
              {singleProduct?.batchId || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Supplier
            <span className='text-[#484848] mt-2'>
              {singleProduct?.batch?.supplier?.name || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Barcode
            <span className='text-[#484848] mt-2'>
              {singleProduct?.barcodeNumber || 'NA'}
            </span>
          </label>
           <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Manufacturer
            <span className='text-[#484848] mt-2'>
              {singleProduct?.manufacturer || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Unit Price
            <span className='text-[#484848] mt-2'>
              {singleProduct?.unitPrice || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Selling Price
            <span className='text-[#484848] mt-2'>
              {singleProduct?.sellingPrice || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Buying Price
            <span className='text-[#484848] mt-2'>
              {singleProduct?.buyingPrice || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Quantity
            <span className='text-[#484848] mt-2'>
              {singleProduct?.quantity || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Last Restock
            <span className='text-[#484848] mt-2'>
              {Array.isArray(singleProduct.restocks) && singleProduct.restocks.length > 0
                ? new Date(Math.max(...singleProduct.restocks.map(r => r.creationDateTime))).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : singleProduct?.creationDateTime
                  ? new Date(singleProduct.creationDateTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  : 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Expiry Date
            <span className='text-[#484848] mt-2'>
              {singleProduct?.expiryDate
                ? new Date(singleProduct.expiryDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Batch ID
            <span className='text-[#484848] mt-2'>
              {singleProduct?.batchId || 'NA'}
            </span>
          </label>
          <label className="flex flex-col text-[#A3A3A3] p-1 text-[14px]">
            Description
            <span className='text-[#484848] mt-2'>
              {singleProduct?.description || 'NA'}
            </span>
          </label>
        </div>


      </div>
    </div>
  )
}

export default ProductDetailsModal
