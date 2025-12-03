import { Download, Ellipsis, Plus,  } from 'lucide-react';
import { Menu } from '@headlessui/react'
import { useEffect, useState } from 'react';
import LpoDetailsModal from '../../components/modals/lpos/LpoDetailsModal';
import CreateLpoModal from '../../components/modals/lpos/CreateLpoModal';
import { useRole, useToken, useUserId } from '../../store/authStore';
import instance from '../../utils/axiosInstance';
import EditLpoStatusModal from '../../components/modals/lpos/EditLpoStatusModal';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';
import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';
import { paginationNormalizer } from '../../utils/pagination/paginationNormalizer';
import UniversalPagination from '../../components/UniversalPagination';
import EditLpoModal from '../../components/modals/lpos/EditLpoModal';



const LposTable = () => {
  const token = useToken();
  const userId = useUserId();
  const [getAllLpos, setGetAllLpos] = useState([]);
  const [isViewLpoModalOpen, setViewLpoModalOpen] = useState(false);
  const [isCreateLopModalOpen, setCreateLpoModal] = useState(false);
  const [selectedLpoId, setSelectedLpoId] = useState(null);
  const [selectedLpo, setSelectedLpo] = useState(null);
  const [isEditLpoModalOpen, setEditLpoModalOpen] = useState(false);
  const [isEditLpoStatusModalOpen, setIsEditLpoStatusModalOpen] = useState(false);
  const [lpoToDelete, setLpoToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);


  const perPage = 100;

  const role = useRole();
  const isSuperAdmin = role === 'Super-Admin';



  
  const allLPOs = async (page = 1) => {
    setLoading(true);

    try {
      const res = await instance.get(`lpos?page=${page}&limit=${perPage}`);
      // const res = await instance.get(`lpo/user/${userId}?page=${page}&limit=${perPage}`,)
      const { data, totalPages } = res.data.data;
      console.log(res);
      setGetAllLpos(res.data.data.lpos);
      console.log("All LPOs",getAllLpos)
      const paginationData = paginationNormalizer(
        res.data?.pagination || res.data?.data?.pagination || res.data?.data?.data?.pagination
      );
      setPagination(paginationData);


    } catch (error) {
      setError("Please try again, Failed to fetch LPOs:" + " " + error.message || error.response.data.message || error.response.message )
      console.log(error);
      setPagination(paginationNormalizer());
      
    } finally {
      setLoading(false);
    }
  };
  
  
  const confirmDelete = async () => {
    if (!lpoToDelete) return;
    try {
      await instance.delete(`lpo/delete/${lpoToDelete}`);
      allLPOs();
    } catch (error) {
      console.error('Failed to delete batch:', error);
      toast.error("Failed to delete batch.");
    } finally {
      setIsConfirmOpen(false);
      setLpoToDelete(null);
    }
  };
  
  
  useEffect(() => {
    allLPOs(currentPage);
  }, [currentPage, token]);
  
  const handleViewLpoModalToggle = (id) => {
    setSelectedLpoId(id);
    setViewLpoModalOpen(true);
  };
  
  const handleCreateLpoModal = () => {
    setCreateLpoModal((prev => !prev))
  }
  const filteredLPOs = searchActive ? searchResults : getAllLpos;

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20 ">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <UniversalSearch
            collection="LPOs"
            searchPath="lpos"
            placeholder="Search"
            onResults={(results, query, paginationData) => {
              if (query) {

                setSearchResults(results || []);
                setSearchActive(true);
                setCurrentPage(paginationData);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                allLPOs(1);

              }
            }}
            auto={true}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleCreateLpoModal}><span><Plus /></span><span>Create LPO</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px] text-[12px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">LPO Status</th>
              <th className="px-4 py-2">Date Created</th>
              <th className="px-4 py-2">Terms</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
            ) : filteredLPOs.length > 0 ?
              (filteredLPOs.map((lpo, index) => (
                <tr key={lpo._id} className="border-b hover:bg-gray-50 text-start">
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>                <td className="px-4 py-3 flex items-center gap-2 ">
                    <div>
                      <div className="text-[#484848] font-medium text-xs md:text-[14px]">
                        {lpo.lead?.name || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">
                    {lpo.lead?.address || 'N/A'}
                  </td>
                  <td className={`px-4 py-3 text-xs md:text-xs md:text-[14px] 
        ${lpo.status === 'Supplied/Delivered'
                      ? ' text-[#00D743]'
                      : lpo.status === 'Paid'
                        ? ' text-[#000068]'
                        : lpo.status === 'In-Transit'
                          ? ' text-[#FFB400]'
                          : lpo.status === 'Packed'
                            ? ' text-[#9191FF]'
                            : lpo.status === 'Cancelled'
                              ? ' text-[#FF3B30]'
                              : ' text-gray-500'
                    }
      `}>{lpo.status}</td>
                  <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">
                    {lpo.creationDateTime ? new Date(lpo.creationDateTime).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-[#767676] text-xs md:text-[14px] font-normal">
                    {/* If you have an amount field, use it. Otherwise, show terms or N/A */}
                    {lpo.amount || lpo.terms || 'N/A'}
                  </td>
                  <td className="px-4 py-3 ">
                    {/* Menu Dropdown */}
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
                                  onClick={() => handleViewLpoModalToggle(lpo._id)}
                                >
                                  View Details
                                </button>
                              )}
                            </Menu.Item>
                            {isSuperAdmin && (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                      onClick={() => {
                                        setSelectedLpo(lpo);
                                        setEditLpoModalOpen(true);
                                      }}
                                    >
                                      Edit Status
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                      onClick={() => {
                                        setSelectedLpo(lpo);
                                        setIsEditLpoStatusModalOpen(true);
                                      }}
                                    >
                                      Edit LPO
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${active ? 'bg-red-200 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600`}
                                      onClick={() => {
                                        setLpoToDelete(lpo._id);
                                        setIsConfirmOpen(true);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </>
                            )}
                          </div>
                        </Menu.Items>
                      </Menu>

                    </div>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>)}
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


      {isViewLpoModalOpen && 
      <LpoDetailsModal 
      onClose={() => setViewLpoModalOpen(false)} 
      lpoId={selectedLpoId} 
       onSuccess={(updatedLpo) => {
            setGetAllLpos(prev =>
              prev.map(item => (item._id === updatedLpo._id ? updatedLpo : item))
            );
          }}
      />}

      {isCreateLopModalOpen && <CreateLpoModal 
      onClose={handleCreateLpoModal} 
      onSuccess={
        allLPOs}
      />}

      {isEditLpoStatusModalOpen && (
        <EditLpoStatusModal
          lpo={selectedLpo}
          onClose={() => setIsEditLpoStatusModalOpen(false)}
          onSuccess={(updatedLpo) => {
            setGetAllLpos(prev =>
              prev.map(item => (item._id === updatedLpo._id ? updatedLpo : item))
            );
          }}
        />

      )}

      {isEditLpoModalOpen && (
        <EditLpoModal
          lpo={selectedLpo}
          onClose={() => setEditLpoModalOpen(false)}
          onSuccess={(updatedLpo) => {
            setGetAllLpos(prev =>
              prev.map(item => (item._id === updatedLpo._id ? updatedLpo : item))
            );
          }}
        />

      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete LPO"
        message="Are you sure you want to delete this lpo? This action is irreversible."
      />

    </>
  );
};

export default LposTable;
