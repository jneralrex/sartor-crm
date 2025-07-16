import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../../assets/images/search.png';
import { Menu } from '@headlessui/react'
import { useEffect, useState } from 'react';
import LpoDetailsModal from '../../components/modals/lpos/LpoDetailsModal';
import CreateLpoModal from '../../components/modals/lpos/CreateLpoModal';
import { useAuth } from '../../context/AuthContext';
import instance from '../../utils/axiosInstance';
import EditLpoModal from '../../components/modals/lpos/EditLpoModal';



const LposTable = () => {
  const { token } = useAuth();
  const [getAllLpos, setGetAllLpos] = useState([]);
  const [isViewLpoModalOpen, setViewLpoModalOpen] = useState(false);
  const [isCreateLopModalOpen, setCreateLpoModal] = useState(false);
  const [selectedLpoId, setSelectedLpoId] = useState(null);
  const [selectedLpo, setSelectedLpo] = useState(null);
  const [isEditLpoModalOpen, setEditLpoModalOpen] = useState(false);


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 100;

  const filteredLPOs = getAllLpos;

  const allLPOs = async (page = 1) => {
    try {
      const res = await instance.get(`lpos?page=${page}&limit=${perPage}`);

      const { data, totalPages } = res.data.data;
      console.log(res.data);
      setGetAllLpos(res.data.data.lpos);
      setTotalPages(totalPages || 1);


    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20 ">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" srcset="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
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
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLPOs.map((lpo, index) => (
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
        ${lpo.status === 'Delivered'
                    ? ' text-[#00D743]'
                    : lpo.status === 'In Transit'
                      ? ' text-[#000068]'
                      : lpo.status === 'Processing'
                        ? ' text-[#FFB400]'
                        : lpo.status === 'Sorted'
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
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100 rounded-md' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => {
                                  setSelectedLpo(lpo);
                                  setEditLpoModalOpen(true);
                                }}
                              >
                                Edit LPO
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


      {isViewLpoModalOpen && <LpoDetailsModal onClose={() => setViewLpoModalOpen(false)} lpoId={selectedLpoId} />}
      {isCreateLopModalOpen && <CreateLpoModal onClose={handleCreateLpoModal} />}
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

    </>
  );
};

export default LposTable;
