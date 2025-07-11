import { Download, Ellipsis, Plus } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { useAuth } from '../../context/AuthContext';
import ProductDetailsModal from '../../components/modals/product/ProductDetailsModal';
import CreateProductModal from '../../components/modals/product/CreateProductModal';
import AddBatchWrapperModal from '../../components/modals/product/AddBatchModal';
import instance from '../../utils/axiosInstance';

const ProductsTable = () => {
  const { token } = useAuth();
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailsMOdalOpen, setProductDetailsMOdalOpen] = useState(false);
  const [isModalCreateProductModalOpen, setIsModalCreateProductModalOpen] = useState(false);
  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [addBatchProductId, setAddBatchProductId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const allProducts = async (page = 1) => {
    try {
      const res = await instance.get(`products?page=${page}&limit=${perPage}`);
      const { data, totalPages } = res.data.data;

      setGetAllProducts(data);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allProducts(currentPage);
  }, [currentPage, token]);

  const handleCreateProduct = async (formData) => {
    try {
      const res = await instance.post("product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Product created:", res);
      setIsModalCreateProductModalOpen(false);
      allProducts(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewProductDetailModalToggle = (id) => {
    setSelectedProductId(id);
    setProductDetailsMOdalOpen(true);
  };

  const handleAddBatchModalToggle = (productId) => {
    setAddBatchProductId(productId);
    setIsAddBatchModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex text-center items-center gap-1 text-[#1A1A1A]"
            onClick={() => setIsModalCreateProductModalOpen(true)}
          >
            <Plus /> Add Product
          </button>
          <button className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'>
            <Download className='text-primary_white h-[16.67px]' />
            <span className='text-primary_white text-[12px]'>Download CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Last Restock</th>
              <th className="px-4 py-2">QTY</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllProducts.map((prod) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod._id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="text-xs md:text-[14px] font-medium text-[#484848] flex items-center gap-2">
                    <input type="checkbox" /> {prod.productName}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.batch?.supplier?.name || 'N/A'}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.status || 'N/A'}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.sellingPrice}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {Array.isArray(prod.restocks) && prod.restocks.length > 0
                    ? new Date(Math.max(...prod.restocks.map(r => new Date(r.date)))).toLocaleDateString()
                    : prod.expiryDate
                      ? new Date(prod.expiryDate).toLocaleDateString()
                      : 'N/A'}
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.quantity}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                        <Ellipsis />
                      </Menu.Button>
                      <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => handleViewProductDetailModalToggle(prod._id)}
                              >
                                View Details
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => handleAddBatchModalToggle(prod._id)}
                              >
                                Add Batch
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            className="px-2 py-1 border rounded text-gray-500"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded ${currentPage === i + 1 ? 'bg-primary_blue text-white' : ''}`}
            >
              {i + 1}
            </button>
          )).slice(0, 5)}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            className="px-2 py-1 border rounded text-gray-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {isProductDetailsMOdalOpen && (
        <ProductDetailsModal
          onClose={() => setProductDetailsMOdalOpen(false)}
          productId={selectedProductId}
        />
      )}
      {isModalCreateProductModalOpen && (
        <CreateProductModal
          onClose={() => setIsModalCreateProductModalOpen(false)}
          onSubmit={handleCreateProduct}
        />
      )}
      {isAddBatchModalOpen && (
        <AddBatchWrapperModal
          onClose={() => setIsAddBatchModalOpen(false)}
          productId={addBatchProductId}
        />
      )}
    </>
  );
};

export default ProductsTable;
