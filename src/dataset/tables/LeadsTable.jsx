import { Download, Ellipsis, Option, OptionIcon, Plus, Thermometer } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState } from 'react';
import AddLeadModal from '../../components/modals/leads/AddLeadModal';
import { Menu } from '@headlessui/react'
import LeadDetailsModal from '../../components/modals/leads/LeadDetailsModal';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const LeadsTable = () => {
  const { token } = useAuth();

  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [isLeadDetailsModalOpen, setLeadDetailsModalOpen] = useState(false);
  const [getAllLeads, setGetAllLeads] = useState([]);
  const VITE_API_URL = import.meta.env.VITE_BASE_URL;
  const [selectedLeadId, setSelectedLeadId] = useState(null);


  const filteredEmployees = getAllLeads;


  const handleLeadModalToggle = () => {
    setAddLeadModalOpen((prev => !prev))
  }

const handleLeadDetailsModalToggle = (id) => {
  setSelectedLeadId(id);
  setLeadDetailsModalOpen(true);
};


  const allLeads = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}leads?page=1&limit=100`, {
        headers: {
          's-token': token,
        },
      });

      setGetAllLeads(res.data.data.leads);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    allLeads();
  }, [token]);

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
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleLeadModalToggle}><span><Plus /></span><span>Add Leads</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[14px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.userId}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-xs md:text-[14px] text-[#484848]">{emp.name}</div>
                  <div className="text-xs text-[#484848]">{emp.email}</div>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.source || '---'}</td>
                <td className={`px-4 py-3 text-xs md:text-[14px] font-normal ${emp.status === 'New'
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
                  }`}>
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
                      </div>
                    </Menu.Items>
                  </Menu>
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
      {isAddLeadModalOpen && <AddLeadModal onClose={handleLeadModalToggle} />}
      {isLeadDetailsModalOpen && ( <LeadDetailsModal  onClose={() => setLeadDetailsModalOpen(false)}  leadId={selectedLeadId}/>)}   
   </>
  );
};


export default LeadsTable
