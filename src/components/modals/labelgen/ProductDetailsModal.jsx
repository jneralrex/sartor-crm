import { X, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useToken } from '../../../store/authStore';
import instance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ProductDetailsModal = ({ onClose }) => {
    const  token  = useToken();
  const [step, setStep] = useState(1); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    batchId: '',
    batchQuantity: '',
    manufacturer: '',
    supplier: '',
    expiryDate: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get('products?limit=all');
        setProducts(res.data.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [token]);

  useEffect(() => {
    if (selectedProduct) {
      const fetchBatches = async () => {
        try {
          const res = await instance.get(`product/batches/${selectedProduct}`);
          setBatches(res.data.data);
        } catch (error) {
          console.error('Error fetching batches:', error);
        }
      };
      fetchBatches();
    }
  }, [selectedProduct, token]);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setSelectedBatch(null);
  };

  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedProduct  && selectedBatch) {
      setStep(2);
    } else {
      setStep(2);
    }
  };

  let currentNumber = 100; 

function generateCustomId(prefix = 'SNP') {
  currentNumber++;
  return `${prefix}${currentNumber}`;
}

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sku = generateCustomId()
    
    try {
      const labelData = {
        product: selectedProduct,
        batch: selectedBatch,
      };
      
      const labelResponse = await instance.post('label', labelData);
      const labelId = labelResponse.data.data._id;
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append('images', selectedFile);
        formData.append('batch_id', selectedBatch);
        formData.append('label_id', labelId);
        formData.append('sku', sku);
        formData.append('product_name', products.find(p => p._id === selectedProduct)?.productName || '');
        
        await instance.post('label/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      toast.success("Label added successfully");
      onClose(); 
    } catch (error) {
      toast.error('Error creating label, try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg min-w-[455px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <div>
            <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">
              {step === 1 ? 'Select Product' : step === 2 ? 'Batch Details' : 'Upload Label Image'}
            </h2>
            <p className='text-xs font-semibold text-[#767676]'>
              {step === 1 ? 'Select a product to view available batches' : 
               step === 2 ? 'Provide batch details for authenticity' : 
               'Upload product label image for verification'}
            </p>
          </div>
          <button onClick={onClose} className="">
            <X />
          </button>
        </div>

        {step === 1 && (
          <div className="mt-5">
            <label className='font-medium text-[14px] text-[#1A1A1A] block mb-2'>
              Select Product
              <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                <select
                  value={selectedProduct || ''}
                  onChange={handleProductChange}
                  className="bg-transparent outline-none w-full text-sm"
                >
                  <option value="">Select product</option>
                  {products?.map(item => (
                    <option key={item._id} value={item._id} >
                      {item.productName}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            {selectedProduct && (
              <label className='font-medium text-[14px] text-[#1A1A1A] block mt-4 mb-2'>
                Select Batch
                <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                  <select
                    value={selectedBatch || ''}
                    onChange={handleBatchChange}
                    className="bg-transparent outline-none w-full text-sm"
                  >
                    <option value="">Select batch</option>
                    {batches?.map(batch => (
                      <option key={batch._id} value={batch._id}>
                        {batch.batchNumber} {batch.manufacturer}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            )}

            <button
              className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] mt-6"
              onClick={handleNext}
              disabled={!selectedProduct || !selectedBatch}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5">
            <div className="border-2 border-dashed border-[#E4E4E7] rounded-lg p-6 text-center">
              <input
                type="file"
                id="label-upload"
                accept="image/png, image/jpeg, application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="label-upload" className="cursor-pointer">
                {previewUrl ? (
                  <div className="mb-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-60 mx-auto"
                    />
                    <p className="text-sm mt-2 text-[#767676]">Click to change image</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium mb-2">Upload Product Label</p>
                    <p className="text-xs text-[#767676] mb-4">Upload formats: png, jpg or pdf</p>
                    <button
                      type="button"
                      className="bg-[#F5F5F5] text-[#1A1A1A] px-4 py-2 rounded-lg text-sm"
                    >
                      Upload image
                    </button>
                  </>
                )}
              </label>
            </div>

            {previewUrl && (
              <div className="mt-4 p-4 bg-[#F5F5F5] rounded-lg">
                <p className="font-medium text-sm">{products.find(p => p._id === selectedProduct)?.productName || 'Product'}</p>
                <p className="text-xs text-[#767676] mt-1">{products.find(p => p._id === selectedProduct)?.description || 'none'}</p>
                <p className="text-xs mt-2 text-red-500">WARNING: FLAMMABLE, FOR EXTERNAL USE ONLY</p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-2 text-primary_blue border border-primary_blue w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]"
              >
                <ChevronLeft size={20} /> Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px] disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : 'Proceed'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModal;