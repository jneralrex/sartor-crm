import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductLabelModal from './ProductLabelModal';
import { useAuth } from '../../../context/AuthContext';
import instance from '../../../utils/axiosInstance';

const ProductDetailsModal = ({ onClose }) => {
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([{ product: '' }]); // Start with one selection

  // Pagination state
  const [getAllProducts, setGetAllProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const perPage = 100;

  const allProducts = async (page = 1) => {
    try {
      const res = await instance.get(`products?page=${page}&limit=${perPage}`);
      console.log(res);
      const { data, totalPages } = res.data.data;

      setGetAllProducts(data);
      // setTotalPages(totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allProducts(currentPage);
  }, [currentPage, token]);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProductField = () => {
    setProducts(prev => [...prev, { product: '' }]);
  };
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-primary_white p-6 shadow-lg max-w-[455px] h-[550px] rounded-xl overflow-y-scroll hide-scrollbar">
        <div className='flex items-center justify-between'>
          <div>
            <h2 className="text-sm md:text-[20px] font-semibold text-[#1A1A1A] mb-1">Product Details</h2>
            <p className='text-xs font-semibold text-[#767676]'>The following data servers as proof of authenticity for this product</p>
          </div>
          <button
            onClick={onClose}
            className=""
          >
            <X />
          </button>
        </div>
        <div>

          <form className='flex flex-col gap-5 mt-5'>
            {products.map((prod, idx) => (
              <div key={idx} className=" rounded-lg p-3">
                <label className='font-medium text-[14px] text-[#1A1A1A]'>
                  Select Product
                  <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                    <select
                      value={prod.product}
                      onChange={(e) => handleChange(idx, "product", e.target.value)}
                      className="bg-transparent outline-none w-full text-sm"
                    >
                      <option value="">Select product</option>
                      {getAllProducts.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.productName} - ₦{(item.unitPrice || item.sellingPrice || 0).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
            ))}
            {products.map((prod, idx) => (
              <div key={idx} className=" rounded-lg p-3">
                <label className='font-medium text-[14px] text-[#1A1A1A]'>
                  Select Batch
                  <div className='mt-1 bg-[#F5F5F5] rounded-lg h-[48px] p-4 flex items-center w-full'>
                    <select
                      value={prod.product}
                      onChange={(e) => handleChange(idx, "product", e.target.value)}
                      className="bg-transparent outline-none w-full text-sm"
                    >
                      <option value="">Select product</option>
                      {getAllProducts.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.productName} - ₦{(item.unitPrice || item.sellingPrice || 0).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
            ))}

            {/* <button
              type="button"
              className="text-blue-600 text-sm underline"
              onClick={addProductField}
            >
              + Add Another Product
            </button> */}

            <button
              className="bg-primary_blue text-[#FCFCFD] w-full py-3 rounded-lg text-[16px] font-semibold h-[52px]"
              onClick={(e) => {
                e.preventDefault();
                handleModalToggle(); // Or pass selected products
                console.log("Selected products:", products);
              }}
            >
              Proceed with details
            </button>
          </form>

        </div>
      </div>
      {/* Modal */}
      {isModalOpen && <ProductLabelModal onCloseModal={handleModalToggle} />}
    </div>
  );
};

export default ProductDetailsModal;
