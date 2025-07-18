import { Download, Ellipsis, Plus } from 'lucide-react';
import search from '../../assets/images/search.png';
import { Menu } from '@headlessui/react'
import { useEffect, useState } from 'react';
import AssignEmployeeTask from '../../components/modals/employees/AssignEmployeeTask';
import EmployeeDetails from '../../components/modals/employees/EmployeeDetails';
import AddNewEmployeeModal from '../../components/modals/employees/AddNewEmployeeModal';
import { useAuth } from '../../context/AuthContext';
import instance from '../../utils/axiosInstance';



const EmployeeTable = ({ }) => {

  const { token } = useAuth();

  const [isAssignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setAssignEmployeeModalOpen] = useState(false);
  const [isEmployeeDetailsModalOpen, setEmployeeDetailsModalOpen] = useState(false);
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const perPage = 100;


  const filteredEmployees = getAllEmployee;

  const allEmp = async () => {
    try {
      const res = await instance.get("users");

      console.log(res);

      setTotalPages(totalPages || 1);

      setGetAllEmployee(res.data.data);


    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (token) {
      allEmp();
    }
  }, [token]);

  const handleAssignTaskModalToggle = () => {
    setAssignTaskModalOpen((prev) => !prev);
  };

  const handleAddEmployee = () => {
    setAssignEmployeeModalOpen((prev) => !prev);
  };
  const openEmployeeDetailsModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setEmployeeDetailsModalOpen(true);
  };

  const closeEmployeeDetailsModal = () => {
    setEmployeeDetailsModalOpen(false);
    setSelectedEmployeeId(null);
  };


  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" srcset="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleAddEmployee}><span><Plus /></span><span>Add Employee</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold md:text-[14px] ">
            <tr className=''>
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {(currentPage - 1) * perPage + index + 1}
                </td>      <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={emp.image}
                    alt={emp.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className=" text-[#484848] md:text-[14px] font-medium">{emp.fullName}</div>
                    <div className="text-xs text-[#A3A3A3] text-[12px] font-medium">{emp.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 md:text-[14px] font-normal text-[#767676]">{emp.role}</td>
                <td className="px-4 py-3 md:text-[14px] font-normal text-[#767676]">
                  {emp.creationDateTime
                    ? new Date(emp.creationDateTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                    : 'N/A'}
                </td>
                <td className="px-4 py-3 md:text-[14px] font-normal text-[#767676]">{emp.phone}</td>
                <td className="px-4 py-3 ">
                  {/* Menu Dropdown */}
                  <div className="relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                        <button className="text-gray-500 hover:text-gray-700"><Ellipsis /></button>

                      </Menu.Button>

                      <Menu.Items className="absolute p-4 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100' : ''
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => openEmployeeDetailsModal(emp._id)}
                              >
                                View Details
                              </button>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100' : ''
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={handleAssignTaskModalToggle}
                              >
                                Assign Task
                              </button>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? 'bg-gray-100' : ''
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                                onClick={() => {
                                  setEmployeeToEdit(emp);
                                  setIsEditEmployeeModalOpen(true);
                                }}
                              >
                                Edit
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
      {/* modals */}
      {isAssignTaskModalOpen && <AssignEmployeeTask onClose={handleAssignTaskModalToggle} />}
      {isEmployeeDetailsModalOpen && (
        <EmployeeDetails employeeId={selectedEmployeeId} onClose={closeEmployeeDetailsModal} />
      )}
      {isAssignEmployeeModalOpen && (
        <AddNewEmployeeModal
          onClose={handleAddEmployee}
          onSuccess={(newEmployee) => {
            allEmp();
          }}
        />
      )}


      {isEditEmployeeModalOpen && (
        <AddNewEmployeeModal
          onClose={() => setIsEditEmployeeModalOpen(false)}
          employeeToEdit={employeeToEdit}
          onSuccess={(updatedEmployee) => {
            allEmp();
            setIsEditEmployeeModalOpen(false);
          }}
        />
      )}


    </>
  );
};

export default EmployeeTable;
