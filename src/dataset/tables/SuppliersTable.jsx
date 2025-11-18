import React, { useEffect, useState } from "react";
import { Download, Ellipsis, Plus } from "lucide-react";
import { Menu } from "@headlessui/react";
import instance from "../../utils/axiosInstance";
import EmployeeSkeletonRow from "../../components/EmployeeSkeletonRow";
import CreateSupplierModal from "../../components/modals/supplier/CreateSupplierModal";
import RequestRestockModal from "../../components/modals/supplier/RequestRestockModal";
import SupplierDetailModal from "../../components/modals/supplier/SupplierDetailModal";
import { paginationNormalizer } from "../../utils/pagination/paginationNormalizer";
import UniversalSearch from "../../components/UniversalSearch";
import UniversalPagination from "../../components/UniversalPagination";

const SuppliersTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createSupplier, setCreateSupplier] = useState(false);
  const [requestRestock, setRequestRestock] = useState(false);
  const [viewSupplierId, setViewSupplierId] = useState(null);
  const [pagination, setPagination] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [supplierToEdit, setSupplierToEdit] = useState(null);



  const perPage = 100;

  const handleCreateSupplier = () => {
    setCreateSupplier((prev) => !prev);
  };

  const handleRequestRestock = () => {
    setRequestRestock((prev) => !prev);
  }


  const fetchSuppliers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`/suppliers?page=${page}&limit=${perPage}`);
      console.log("Suppliers response:", res);
      const supplierData = res.data?.data?.data || [];
      setSuppliers(supplierData);
      const paginationData = paginationNormalizer(
        res.data?.pagination || res.data?.data?.pagination || res.data?.data?.data?.pagination
      );
      setPagination(paginationData);
    } catch (error) {
      setPagination(paginationNormalizer());

      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSuppliers(currentPage);
  }, [currentPage]);

  const filteredSuppliers = searchActive ? searchResults : suppliers;


  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <h2 className="text-lg font-semibold text-primary_blue">
          Suppliers
        </h2>
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <UniversalSearch
            collection="supplier"
            searchPath="suppliers"
            placeholder="Search"
            onResults={(results, query, paginationData) => {
              if (query) {

                setSearchResults(results || []);
                setSearchActive(true);
                setCurrentPage(paginationData);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                fetchSuppliers(1);

              }
            }}
            auto={true}
          />
        </div>

        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleCreateSupplier}><span><Plus /></span><span>Add Supplier</span></button>
          {/* <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[168px] md:w-[500px] h-[40px] flex text-center items-center gap-1 text-[#1A1A1A] public-sans" onClick={handleRequestRestock}><span><Plus /></span><span>Request A Restock</span></button> */}
          <button className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <EmployeeSkeletonRow key={idx} />
              ))
            ) : filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier, index) => (
                <tr
                  key={supplier._id}
                  className="border-b hover:bg-gray-50 text-start"
                >
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {supplier.name}
                  </td>
                 
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {supplier.contactName} ({supplier.contactRole})
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {supplier.contactNumber || supplier.phone}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {supplier.email}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {supplier.address}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {new Date(supplier.creationDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                        <Ellipsis />
                      </Menu.Button>
                      <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setViewSupplierId(supplier._id)}
                                className={`${active ? "bg-gray-100 rounded-md" : ""
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                              >
                                View Details
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? "bg-gray-100 rounded-md" : ""
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={handleRequestRestock}
                              >
                                Request A Restock
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? "bg-gray-100 rounded-md" : ""} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => {
                                  setSupplierToEdit(supplier);
                                  setCreateSupplier(true);
                                }}
                              >
                                Edit Supplier
                              </button>
                            )}
                          </Menu.Item>

                        </div>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-red-500">
                  No Suppliers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        {pagination && (
          <UniversalPagination
            pagination={pagination}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

      </div>
      {createSupplier && (
        <CreateSupplierModal
          onClose={handleCreateSupplier}
          onSuccess={(newSupplier) => {
            fetchSuppliers();
          }}
        />
      )}

      {createSupplier && (
        <CreateSupplierModal
          onClose={() => {
            setCreateSupplier(false);
            setSupplierToEdit(null);
          }}
          onSuccess={fetchSuppliers}
          editMode={!!supplierToEdit}
          supplierToEdit={supplierToEdit}
        />
      )}


      {requestRestock && (
        <RequestRestockModal
          onClose={handleRequestRestock}
          onSuccess={(newRequest) => {
            fetchSuppliers();
          }}
        />
      )}

      {viewSupplierId && (
        <SupplierDetailModal
          supplierId={viewSupplierId}
          onClose={() => setViewSupplierId(null)}
        />
      )}


    </>
  );
};

export default SuppliersTable;
