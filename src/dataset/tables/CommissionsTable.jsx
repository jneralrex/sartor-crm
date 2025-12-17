import { Download, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import instance from "../../utils/axiosInstance";
import EmployeeSkeletonRow from "../../components/EmployeeSkeletonRow";
import ConfirmModal from "../../components/ConfirmationPopUp";
import { useToken } from "../../store/authStore";
import { paginationNormalizer } from "../../utils/pagination/paginationNormalizer";
import UniversalPagination from "../../components/UniversalPagination";
import UniversalSearch from "../../components/UniversalSearch";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CommissionsTable = () => {
  const token = useToken();
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const perPage = 100;


  // syncing currentPage with backend pagination
  useEffect(() => {
    if (pagination?.currentPage) {
      setCurrentPage(pagination.currentPage);
    }
  }, [pagination]);

  const fetchCommissions = async (page = 1) => {
    setLoading(true);
    try {
      const res = await instance.get(`/commission/?page${page}limit=${perPage}`);
      console.log("Commission response:", res);

      const commissionData = res.data?.data?.data;

      const commissionArray = Array.isArray(commissionData)
        ? commissionData
        : commissionData
          ? [commissionData]
          : [];

      setCommissions(commissionArray);
      const paginationData = paginationNormalizer(
        res.data?.pagination || res.data?.data?.pagination || res.data?.data?.data?.pagination
      );
      setPagination(paginationData);
    } catch (error) {
      setPagination(paginationNormalizer());

      console.error("Error fetching commissions:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCommissions();
  }, [token]);

  const convertToCSV = (commissions = []) => {
    if (!commissions.length) return '';

    const headers = [
      'Role',
      'Price',
      'Status',
      'Date Created',
    ];

    const rows = commissions.map((commission) => [
      commission?.role || '',
      commission?.price || '',
      commission?.status || '',
      commission?.creationDateTime
        ? new Date(commission.creationDateTime).toLocaleDateString()
        : '',
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
    const commissionsToDownload = searchActive ? searchResults : commissions;

    if (!commissionsToDownload.length) return;

    const doc = new jsPDF('landscape');

    doc.setFontSize(16);
    doc.text('Commissions Report', 14, 15);

    const tableColumn = [
      'Role',
      'Price',
      'Status',
      'Date Created',
    ];

    const tableRows = commissionsToDownload.map((commission) => [
      commission?.role || '',
      commission?.price || '',
      commission?.status || '',
      commission?.creationDateTime
        ? new Date(commission.creationDateTime).toLocaleDateString()
        : '',
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 0, 104] },
    });

    doc.save(`commissions-${Date.now()}.pdf`);
  };

  const downloadCSV = () => {
    const commissionsToDownload = searchActive ? searchResults : commissions;

    if (!commissionsToDownload.length) return;

    const csv = convertToCSV(commissionsToDownload);
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

  const commissionToRender = searchActive ? searchResults : commissions;

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <h2 className="text-lg font-semibold text-primary_blue">
          Commissions
        </h2>

        <div className='flex items-center gap-2 w-[252px] md:max-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          {/* <UniversalSearch
            collection="commission"
            searchPath="commissions"
            placeholder="Search"
            onResults={(results, query, paginationData) => {
              if (query) {

                setSearchResults(results || []);
                setSearchActive(true);
                setCurrentPage(paginationData);
              } else {
                setSearchActive(false);
                setSearchResults([]);
                fetchCommissions(1);

              }
            }}
            auto={true}
          /> */}
        </div>
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
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date Created</th>
              {/* <th className="px-4 py-2">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <EmployeeSkeletonRow key={idx} />
              ))
            ) : commissionToRender.length > 0 ? (
              commissionToRender.map((commission, index) => (
                <tr
                  key={commission._id}
                  className="border-b hover:bg-gray-50 text-start"
                >
                  <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {commission.role}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {commission.price}
                  </td>
                  <td
                    className={`px-4 py-3 text-xs md:text-[14px] font-medium ${commission.status === true || commission.status === "true"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {commission.status === true || commission.status === "true" ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-[14px] text-[#484848]">
                    {new Date(commission.creationDateTime).toLocaleDateString()}
                  </td>
                  {/* <td className="px-4 py-3">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black">
                        <Ellipsis />
                      </Menu.Button>
                      <Menu.Items className="absolute p-2 right-0 z-[99] w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? "bg-gray-100 rounded-md" : ""
                                  } group flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-900`}
                              // onClick={() => {
                              //   setCommissionToDelete(commission._id);
                              //   setIsConfirmOpen(true);
                              // }}
                              >
                                View Details
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">
                  No Commissions Found
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
    </>
  );
};

export default CommissionsTable;
