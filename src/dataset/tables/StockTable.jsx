import React, { useEffect, useState } from "react";
import { Download, Ellipsis, Plus } from "lucide-react";
import { Menu } from "@headlessui/react";
import instance from "../../utils/axiosInstance";

import UniversalSearch from "../../components/UniversalSearch";
import EmployeeSkeletonRow from "../../components/EmployeeSkeletonRow";
import { paginationNormalizer } from "../../utils/pagination/paginationNormalizer";
import UniversalPagination from "../../components/UniversalPagination";

// Modals
import CreateStocks from "../../components/modals/stocks/CreateStocks";
import StockDetails from "../../components/modals/stocks/StocksDetails";

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedStockId, setSelectedStockId] = useState(null);
  const [stockToEdit, setStockToEdit] = useState(null);

  // ---------------------------------
  // FETCH STOCKS
  // ---------------------------------
  const fetchStocks = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`stocks?page=${page}&perPage=${perPage}`);
      const list = res.data?.data?.data || [];
      const paginationData = paginationNormalizer(res.data?.data?.pagination);

      setStocks(list);
      setPagination(paginationData);
      console.log(res)
    } catch (err) {
      setError("Failed to fetch stocks: " + (err.message || "Please try again"));
      setPagination(paginationNormalizer());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(currentPage);
  }, [currentPage]);

  // View Details Modal
  const handleViewStock = (id) => {
    setSelectedStockId(id);
    setIsDetailsModalOpen(true);
  };

  const stocksToRender = searchActive ? searchResults : stocks;

  // ---------------------------------
  // RENDER
  // ---------------------------------
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">

        {/* Search */}
        <div className="flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md">
          <UniversalSearch
            collection="stocks"
            searchPath="stocks"
            placeholder="Search"
            auto={true}
            onResults={(results, query, paginationData) => {
              if (query) {
                setSearchActive(true);
                setSearchResults(results || []);
                setCurrentPage(paginationData?.currentPage || 1);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                fetchStocks(1);
              }
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex items-center gap-1 text-[#1A1A1A]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus /> Add Stocks
          </button>

          <button className="flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md">
            <Download className="text-primary_white h-[16.67px]" />
            <span className="text-primary_white text-[12px]">Download CSV</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Last Stock</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(8)].map((_, idx) => <EmployeeSkeletonRow key={idx} />)
            ) : stocksToRender.length > 0 ? (
              stocksToRender.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {searchActive
                      ? index + 1
                      : (currentPage - 1) * perPage + index + 1}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="text-xs md:text-[14px] font-medium text-[#484848]">
                      {item?.product?.productName || "N/A"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.customer?.lead?.name || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.status}
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.lastStock || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.contactNumber}
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.address}
                  </td>

                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {item?.level}
                  </td>

                  <td className="px-4 py-3">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md">
                        <Ellipsis />
                      </Menu.Button>

                      <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg p-2 rounded-md ring-1 ring-black/5">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100" : ""
                              } w-full text-left px-4 py-2 text-sm rounded-md`}
                              onClick={() => handleViewStock(item._id)}
                            >
                              View Details
                            </button>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100" : ""
                              } w-full text-left px-4 py-2 text-sm rounded-md`}
                              onClick={() => {
                                setStockToEdit(item);
                                setIsEditModalOpen(true);
                              }}
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-red-500 text-sm"
                >
                  {error || "No stocks found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <UniversalPagination
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {/* Modals */}
      {isDetailsModalOpen && (
        <StockDetails
          onClose={() => setIsDetailsModalOpen(false)}
          stockId={selectedStockId}
        />
      )}

      {isCreateModalOpen && (
        <CreateStocks
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => fetchStocks(currentPage)}
        />
      )}

      {isEditModalOpen && (
        <CreateStocks
          stockToEdit={stockToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={(updated) => {
            setStocks((prev) =>
              prev.map((s) => (s._id === updated._id ? updated : s))
            );
          }}
        />
      )}
    </>
  );
};

export default StockTable;
