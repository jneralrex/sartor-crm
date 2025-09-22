import { Download, Ellipsis, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { useToken } from '../../store/authStore';
import ProductDetailsModal from '../../components/modals/product/ProductDetailsModal';
import CreateProductModal from '../../components/modals/product/CreateProductModal';
import AddBatchWrapperModal from '../../components/modals/product/AddBatchModal';
import instance from '../../utils/axiosInstance';
import ViewBatchesByProduct from '../../components/modals/product/ViewBatchesByProduct';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';
import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';
import { paginationNormalizer } from '../../utils/pagination/paginationNormalizer';
import UniversalPagination from '../../components/UniversalPagination';

const ProductsTable = () => {
  const token = useToken();
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailsModalOpen, setProductDetailsModalOpen] = useState(false);
  const [isModalCreateProductModalOpen, setIsModalCreateProductModalOpen] = useState(false);
  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [addBatchProductId, setAddBatchProductId] = useState(null);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isViewBatchesOpen, setIsViewBatchesOpen] = useState(false);
  const [viewBatchProductId, setViewBatchProductId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  // syncing currentPage with backend pagination
  useEffect(() => {
    if (pagination?.currentPage) {
      setCurrentPage(pagination.currentPage);
    }
  }, [pagination]);

  const allProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`products?page=${page}&limit=${perPage}`);
      const products = res.data?.data?.data || [];
      const paginationData = paginationNormalizer(res.data?.data?.pagination);

      setGetAllProducts(products);
      setPagination(paginationData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setPagination(paginationNormalizer());
    } finally {
      setLoading(false);
    }
  };


  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await instance.delete(`product/delete/${productToDelete}`);
      allProducts(currentPage);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    allProducts(currentPage);
  }, [currentPage, token]);

  const handleViewProductDetailModalToggle = (id) => {
    setSelectedProductId(id);
    setProductDetailsModalOpen(true);
  };

  const handleAddBatchModalToggle = (productId) => {
    setAddBatchProductId(productId);
    setIsAddBatchModalOpen(true);
  };

  // search or normal
  const productsToRender = searchActive ? searchResults : getAllProducts;

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className="flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md">
          <UniversalSearch
            collection="product"
            searchPath="products"
            placeholder="Search by ID, name or email"
            onResults={(results, query) => {
              if (query) {
                setSearchActive(true);
                setSearchResults(results);
                setCurrentPage(1);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                allProducts(1);
              }
            }}
            auto={true}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex text-center items-center gap-1 text-[#1A1A1A]"
            onClick={() => setIsModalCreateProductModalOpen(true)}
          >
            <Plus /> Add Product
          </button>
          <button className="flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md">
            <Download className="text-primary_white h-[16.67px]" />
            <span className="text-primary_white text-[12px]">Download CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">S/N</th>
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
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
            ) : (
              productsToRender.map((prod, index) => (
                <tr key={prod._id} className="border-b hover:bg-gray-50 text-start">
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                    {searchActive
                      ? index + 1
                      : (currentPage - 1) * perPage + index + 1
                    }
                  </td>

                  <td className="px-4 py-3 flex items-center gap-2">
                    <div className="text-xs md:text-[14px] font-medium text-[#484848] flex items-center gap-2">
                      <input type="checkbox" /> {prod.productName}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                    {Array.isArray(prod.batches) && prod.batches.length > 0
                      ? [...new Set(prod.batches.map((b) => b?.supplier?.name).filter(Boolean))].join(', ')
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.status || 'N/A'}</td>
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.sellingPrice}</td>
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                    {Array.isArray(prod.restocks) && prod.restocks.length > 0
                      ? new Date(Math.max(...prod.restocks.map((r) => new Date(r.date)))).toLocaleDateString()
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
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                  onClick={() => {
                                    setProductToEdit(prod);
                                    setIsEditProductModalOpen(true);
                                  }}
                                >
                                  Edit
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
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                  onClick={() => handleViewBatches(prod._id)}
                                >
                                  View Batches
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-red-200 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-500`}
                                  onClick={() => {
                                    setProductToDelete(prod._id);
                                    setIsConfirmOpen(true);
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!searchActive && (
        <UniversalPagination
          pagination={pagination || {}}
          onPageChange={(page) => allProducts(page)}
        />
      )}


      {/* Modals */}
      {isProductDetailsModalOpen && (
        <ProductDetailsModal
          onClose={() => setProductDetailsModalOpen(false)}
          productId={selectedProductId}
        />
      )}

      {isModalCreateProductModalOpen && (
        <CreateProductModal
          onClose={() => setIsModalCreateProductModalOpen(false)}
          onSuccess={() => allProducts(currentPage)}
        />
      )}

      {isEditProductModalOpen && (
        <CreateProductModal
          onClose={() => setIsEditProductModalOpen(false)}
          productToEdit={productToEdit}
          onSuccess={(updatedProduct) => {
            setGetAllProducts((prev) =>
              prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
            );
          }}
        />
      )}

      {isAddBatchModalOpen && (
        <AddBatchWrapperModal
          onClose={() => setIsAddBatchModalOpen(false)}
          productId={addBatchProductId}
        />
      )}

      {isViewBatchesOpen && (
        <ViewBatchesByProduct
          productId={viewBatchProductId}
          onClose={() => setIsViewBatchesOpen(false)}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action is irreversible."
      />
    </>
  );
};

export default ProductsTable;
