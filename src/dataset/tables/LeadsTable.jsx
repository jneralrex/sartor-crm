import { Download, Ellipsis, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddLeadModal from '../../components/modals/leads/AddLeadModal';
import { Menu } from '@headlessui/react';
import LeadDetailsModal from '../../components/modals/leads/LeadDetailsModal';
import instance from '../../utils/axiosInstance';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';
import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';
import { useToken, useUserId } from '../../store/authStore';
import { paginationNormalizer } from '../../utils/pagination/paginationNormalizer';
import UniversalPagination from '../../components/UniversalPagination';

const LeadsTable = () => {
  const token = useToken();
  const userId = useUserId();

  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [isLeadDetailsModalOpen, setLeadDetailsModalOpen] = useState(false);
  const [getAllLeads, setGetAllLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
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


  const openAddLeadModal = () => {
    setEditingLeadId(null);
    setAddLeadModalOpen(true);
  };

  const openEditLeadModal = (id) => {
    setEditingLeadId(id);
    setAddLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setAddLeadModalOpen(false);
    setEditingLeadId(null);
  };

  const handleLeadDetailsModalToggle = (id) => {
    setSelectedLeadId(id);
    setLeadDetailsModalOpen(true);
  };

  const allLeads = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`leads?page=${page}&limit=${perPage}`);
      console.log('Fetched leads:', res);
      const paginationData = paginationNormalizer(res.data?.data?.pagination);
      setPagination(paginationData);

      const { leads } = res.data.data;
      setGetAllLeads(leads);
    } catch (error) {
      console.log(error);
      setPagination(paginationNormalizer());
    } finally {
      setLoading(false);
    }
  };



  const confirmDelete = async () => {
    if (!leadToDelete) return;
    try {
      await instance.delete(`lead/delete/${leadToDelete}`);
      allLeads(currentPage);
    } catch (error) {
      console.error('Failed to delete batch:', error);
    } finally {
      setIsConfirmOpen(false);
      setLeadToDelete(null);
    }
  };

  useEffect(() => {
  allLeads(currentPage);
}, [currentPage]);



  const filteredEmployees = searchActive ? searchResults : getAllLeads;


  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className="flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md">
          <UniversalSearch
            collection="lead"
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
                allLeads(1);
              }
            }}
            auto={true}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans"
            onClick={openAddLeadModal}
          >
            <Plus />
            <span>Add Leads</span>
          </button>
          <button className="flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md">
            <Download className="text-primary_white h-[16.67px]" />
            <span className="text-primary_white text-[14px] font-[sfpro]">Download csv</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
            ) : filteredEmployees.length > 0 ?
              (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp._id} className="border-b hover:bg-gray-50 text-start">
                    <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                      {searchActive
                        ? index + 1
                        : (currentPage - 1) * perPage + index + 1
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-xs md:text-[14px] text-[#484848]">{emp.name}</div>
                      <div className="text-xs text-[#484848]">{emp.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                      {Array.isArray(emp.contacts) && emp.contacts.length > 0
                        ? `${emp.contacts[0].name} - ${emp.contacts[0].phone}`
                        : '---'}
                    </td>
                    <td
                      className={`px-4 py-3 text-xs md:text-[14px] font-normal ${emp.status === 'New'
                        ? 'text-[#000068]'
                        : emp.status === 'Contacted'
                          ? 'text-[#FFB400]'
                          : emp.status === 'Closed Lost'
                            ? 'text-[#FF3B30]'
                            : emp.status === 'Qualified'
                              ? 'text-[#6666D2]'
                              : emp.status === 'Interested'
                                ? 'text-[#768B00]'
                                : emp.status === 'Hold'
                                  ? 'text-[#FF3B30]'
                                  : emp.status === 'In-Negotiation'
                                    ? 'text-[#A97B0E]'
                                    : emp.status === 'LPO Generated'
                                      ? 'text-[#1A1A1A]'
                                      : emp.status === 'Closed Won'
                                        ? 'text-[#00D743]'
                                        : emp.status === 'Payment Confirmed'
                                          ? 'text-[#D300D7]'
                                          : emp.status === 'Follow up'
                                            ? 'text-[#12D1E2]'
                                            : 'text-gray-500'
                        }`}
                    >
                      {emp.status}
                    </td>
                    <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                      {new Date(emp.creationDateTime).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.phone}</td>
                    <td className="px-4 py-3">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                          <Ellipsis />
                        </Menu.Button>

                        <Menu.Items className="absolute p-4 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                  onClick={() => handleLeadDetailsModalToggle(emp._id)}
                                >
                                  View Details
                                </button>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                  onClick={() => openEditLeadModal(emp._id)}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600`}
                                  onClick={() => {
                                    setLeadToDelete(emp._id);
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-500">
                    No Leads found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!searchActive && (
        <UniversalPagination
          pagination={pagination || {}}
          onPageChange={(page) => setCurrentPage(page)}
        />

      )}

      {/* Add/Edit Lead Modal */}
      {isAddLeadModalOpen && (
        <AddLeadModal
          leadId={editingLeadId}
          onClose={closeLeadModal}
          onSuccess={() => {
            allLeads(currentPage);
            closeLeadModal();
          }}
        />
      )}

      {/* Lead Details Modal */}
      {isLeadDetailsModalOpen && (
        <LeadDetailsModal onClose={() => setLeadDetailsModalOpen(false)} leadId={selectedLeadId} />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action is irreversible."
      />
    </>
  );
};

export default LeadsTable;
