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
import { paginationNormalizer } from '../../utils/pagination/paginationNormalizer';
import UniversalPagination from '../../components/UniversalPagination';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



const EmployeeTable = ({ activeTab }) => {

  const token = useToken();

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
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [pagination, setPagination] = useState();


  const perPage = 100;


  useEffect(() => {
    if (pagination?.currentPage) {
      setCurrentPage(pagination.currentPage);
    }
  }, [pagination]);

  const allEmp = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`users?${page}&limit=${perPage}`);
      console.log(res);
      const employeesArray = res.data?.data?.data || [];
      const paginationData = paginationNormalizer(res.data?.data?.pagination);
      setGetAllEmployee(employeesArray);
      setPagination(paginationData);
    } catch (error) {
      console.log(error);
      setGetAllEmployee([]);
      setPagination(paginationNormalizer());

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) {
      allEmp(currentPage);
    }
  }, [currentPage, token]);

  const empToRender = searchActive ? searchResults : getAllEmployee;

  // Apply tab filter on empToRender
  const filteredEmployees = empToRender.filter((emp) => {
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
      allEmp();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const convertToCSV = (getAllEmployee = []) => {
    if (!getAllEmployee.length) return '';

    const headers = [
      'Name',
      'Position',
      'Date Added',
      'Phone Number',
    ];


    const rows = getAllEmployee.map((employee) => [
      employee?.fullName || '',
      employee?.role || '',
      employee?.creationDateTime
        ? new Date(employee.creationDateTime).toLocaleDateString()
        : '',
      employee?.phone || '',
    ]);


    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) =>
            `"${String(cell).replace(/"/g, '""')}"`
          )
          .join(',')
      ),
    ].join('\n');

    return csvContent;
  };

  const downloadPDF = () => {
    const employeeToDownload = searchActive ? searchResults : getAllEmployee;

    if (!employeeToDownload.length) return;

    const doc = new jsPDF('landscape');

    doc.setFontSize(16);
    doc.text('Employees Report', 14, 15);

    const tableColumn = [
      'Name',
      'Position',
      'Date Added',
      'Phone Number',
    ];


    const tableRows = employeeToDownload.map((employee) => [
      employee?.fullName || '',
      employee?.role || '',
      employee?.creationDateTime
        ? new Date(employee.creationDateTime).toLocaleDateString()
        : '',
      employee?.phone || '',
    ]);


    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 0, 104] },
    });

    doc.save(`employees-${Date.now()}.pdf`);
  };

  const downloadCSV = () => {
    const employeeToDownload = searchActive ? searchResults : getAllEmployee;

    if (!employeeToDownload.length) return;

    const csv = convertToCSV(employeeToDownload);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `commissions-${Date.now()}.csv`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };



  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3">
        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <UniversalSearch
            collection="user"
            searchPath="users"
            placeholder="Search by ID, name or email"
            onResults={(results, query) => {
              if (query) {
                setSearchResults(results || []);
                setSearchActive(true);
                setCurrentPage(1);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                allEmp(1);
              }
            }}
            auto={true}
          />


        </div>
        <div className="flex gap-2">
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm max-w-[148px] md:w-[160px] h-[40px] flex text-center items-center gap-1 md:gap-2 text-[#1A1A1A] public-sans" onClick={handleAddEmployee}><span><Plus /></span><span>Add Employee</span></button>
          <div className="flex gap-2">
            <button
              onClick={downloadCSV}
              className="flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md"
            >
              <Download className="text-primary_white h-[16.67px]" />
              <span className="text-primary_white text-[12px]">
                Download CSV
              </span>
            </button>

            <button
              onClick={downloadPDF}
              className="flex items-center bg-[#000068] h-[40px] w-[119px] justify-center rounded-md"
            >
              <Download className="text-primary_white h-[16.67px]" />
              <span className="text-primary_white text-[12px]">
                Download PDF
              </span>
            </button>
          </div>        </div>
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
              Array.from({ length: 8 }).map((_, idx) => <EmployeeSkeletonRow key={idx} />)
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
                  </td>
                </tr>
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

      {/* pagination */}
      {pagination && (
        <UniversalPagination
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}


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
