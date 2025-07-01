import { Download, Ellipsis, Plus } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import ProductDetailsModal from '../../components/modals/product/ProductDetailsModal';



const ProductsTable = ({ }) => {
  const { token } = useAuth();
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductDetailsMOdalOpen, setProductDetailsMOdalOpen] = useState(false);


  const VITE_API_URL = import.meta.env.VITE_BASE_URL;

  const filteredProducts = getAllProducts;

  const allProducts = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}products?limit=all`, {
        headers: {
          's-token': token,
        },
      });

      console.log(res.data);
      setGetAllProducts(res.data.data.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    allProducts();
  }, [token]);


  const handleViewProductDetailModalToggle = (id) => {
    setSelectedProductId(id);
    setProductDetailsMOdalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" srcset="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex text-center items-center gap-1 text-[#1A1A1A] public-sans"  ><span><Plus /></span><span>Add Product </span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
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
            {filteredProducts.map((prod) => (
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
                    ? new Date(
                      Math.max(...prod.restocks.map(r => r.date))
                    ).toLocaleDateString()
                    : prod.expiryDate
                      ? new Date(prod.expiryDate).toLocaleDateString()
                      : 'N/A'}
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{prod.quantity}</td>
                <td className="px-4 py-3 ">
                  {/* Menu Dropdown */}
                  <div className="relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                        <button className="text-gray-500 hover:text-gray-700"><Ellipsis /></button>
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
                                //onClick={handleModalToggle}
                              >
                                Add Batch
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                //onClick={handleModalToggle}
                              >
                                Request A Restock
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

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Show 12 from 1400</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 border rounded text-gray-500">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <button className="px-2 py-1 border rounded">3</button>
          <span>...</span>
          <button className="px-2 py-1 border rounded">440</button>
        </div>
      </div>

      {/* Modal */}
{isProductDetailsMOdalOpen && (
  <ProductDetailsModal
    onClose={() => setProductDetailsMOdalOpen(false)}
    productId={selectedProductId}
  />
)}    </>
  )
}

export default ProductsTable;

