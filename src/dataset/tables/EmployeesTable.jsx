import { Download, Ellipsis, Plus } from 'lucide-react';
import search from '../../assets/images/search.png';
import { Menu } from '@headlessui/react'
import { useEffect, useState } from 'react';
import AssignEmployeeTask from '../../components/modals/employees/AssignEmployeeTask';
import EmployeeDetails from '../../components/modals/employees/EmployeeDetails';
import AddNewEmployeeModal from '../../components/modals/employees/AddNewEmployeeModal';
import { useToken } from '../../store/authStore';
import instance from '../../utils/axiosInstance';
import ConfirmModal from '../../components/ConfirmationPopUp';
import UniversalSearch from '../../components/UniversalSearch';
import EmployeeSkeletonRow from '../../components/EmployeeSkeletonRow';



const EmployeeTable = ({ activeTab }) => {

    const  token  = useToken();

  const [isAssignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setAssignEmployeeModalOpen] = useState(false);
  const [isEmployeeDetailsModalOpen, setEmployeeDetailsModalOpen] = useState(false);
  const [getAllEmployee, setGetAllEmployee] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const perPage = 100;


  const allEmp = async () => {
    setLoading(true);
    try {
      const res = await instance.get("users");
      const employeesArray = res.data?.data?.data || [];
      const total = res.data?.data?.pagination?.totalPages || 1;
      setGetAllEmployee(employeesArray);
      setTotalPages(total);
    } catch (error) {
      console.log(error);
      setGetAllEmployee([]); // fallback to prevent map error
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) {
      allEmp();
    }
  }, [token]);

    // 🔹 Filter employees based on tab
  const filteredEmployees = getAllEmployee.filter((emp) => {
    if (activeTab === "All Employees") return true;
    return emp.role?.toLowerCase() === activeTab.toLowerCase();
  });


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

  const confirmDelete = async () => {
    try {
      const res = await instance.delete(`user/delete`, {
        data: { id: employeeToDelete },
      });
      console.log(res)
      console.log("del", employeeToDelete)
      setIsConfirmOpen(false);
      setEmployeeToDelete(null);
      allEmp(); // Refresh list
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };



  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <UniversalSearch
            collection="user" 
            placeholder="Search by ID, name or email"
            onResults={(results) => {
              console.log('Search results:', results);
              setGetAllEmployee(results);
            }} auto={true}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleAddEmployee}><span><Plus /></span><span>Add Employee</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px] font-[sfpro]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
         <table className="w-full text-left text-sm bg-primary_white">
        <thead className="border-b text-primary_blue font-semibold md:text-[14px]">
          <tr>
            <th className="px-4 py-2">S/N</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Date Added</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <EmployeeSkeletonRow key={idx} />
            ))
          ) : filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] text-[#767676]">
                  {(currentPage - 1) * perPage + index + 1}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={emp.image}
                    alt={emp.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-[#484848] md:text-[14px] font-medium">
                      {emp.fullName}
                    </div>
                    <div className="text-xs text-[#A3A3A3]">
                      {emp.email}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#767676]">{emp.role}</td>
                <td className="px-4 py-3 text-[#767676]">
                  {emp.creationDateTime
                    ? new Date(emp.creationDateTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </td>
                <td className="px-4 py-3 text-[#767676]">{emp.phone}</td>
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

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-gray-100' : ''} group flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600`}
                                  onClick={() => {
                                    setEmployeeToDelete(emp._id);
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
                  </td>              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No employees found for {activeTab}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {getAllEmployee.length} of {perPage * totalPages}
        </span>
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

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action is irreversible."
      />
    </>
  );
};

export default EmployeeTable;
