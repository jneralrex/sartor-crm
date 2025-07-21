import { Download, Ellipsis, Plus, X, ChevronLeft, FileText, Calendar, Box, Factory, Hash, Barcode as BarcodeIcon, QrCode, Image as ImageIcon } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useEffect, useState, useRef } from 'react';
import ProductDetailsModal from '../../components/modals/labelgen/ProductDetailsModal';
import { useAuth } from '../../context/AuthContext';
import instance from '../../utils/axiosInstance';
import { Menu } from '@headlessui/react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import LabelModal from '../../components/modals/labelgen/LabelModal';

const LabelGenTable = () => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getAllBatch, setGetAllBatch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [viewMode, setViewMode] = useState('details');
  const qrCodeRef = useRef(null);
  const perPage = 100;

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allBatch = async (page = 1) => {
    try {
      const res = await instance.get(`labels?page=${page}&limit=${perPage}`);
      setGetAllBatch(res.data.data.data);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBatch(currentPage);
  }, [currentPage, token]);

  const handleViewDetails = (label) => {
    setSelectedLabel(label);
    setViewMode('details');
  };

  const handleViewQR = (label) => {
    setSelectedLabel(label);
    setViewMode('qr');
  };

  const generateVerifyLink = () => {
    return `https://verify-sartor.vercel.app/`;
  };

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;

    try {
      const canvas = await html2canvas(qrCodeRef.current);
      const link = document.createElement('a');
      link.download = `${selectedLabel.product?.productName || 'label'}_qr_barcode.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-3 mt-20">
        <div className='flex items-center gap-2 w-[252px] md:min-w-[235px] border-primary_grey px-3 py-2 bg-primary_white rounded-md'>
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Search by ID, name or email"
            className="bg-transparent rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex text-center items-center gap-1 text-[#1A1A1A] public-sans"
            onClick={handleModalToggle}
          >
            <Plus size={16} />
            <span>Upload Product Label</span>
          </button>
          <button className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'>
            <Download size={16} className='text-primary_white' />
            <span className='text-primary_white text-[12px]'>Download csv</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border relative">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className="border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Stock Qty</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">QR code</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Manufacturer</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getAllBatch) && getAllBatch.map((batch) => (
              <tr key={batch._id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {batch.batch?.batchNumber || '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs md:text-[14px] font-medium text-[#484848]">
                    {batch.product?.productName || '—'}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {batch.batch?.quantity || '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(batch.status)}`}>
                    {batch.status || '—'}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  <button
                    onClick={() => handleViewQR(batch)}
                    className="text-primary_blue underline flex items-center gap-1"
                  >
                    <QrCode size={14} /> View
                  </button>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {batch.batch?.expiryDate ? new Date(batch.batch.expiryDate).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {batch.batch?.supplier?.name || '—'}
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">
                  {batch.product?.manufacturer || '—'}
                </td>
                <td className="px-4 py-3 relative">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-black hover:bg-gray-100">
                      <Ellipsis />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} flex items-center w-full px-4 py-2 text-sm`}
                              onClick={() => handleViewDetails(batch)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
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

      {isModalOpen && <ProductDetailsModal onClose={handleModalToggle} />}
      
      {/* {selectedLabel && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-primary_white p-6 shadow-lg min-w-[455px] rounded-xl">
            <div className='flex items-center justify-between mb-4'>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {viewMode === 'details' ? (
                  <>
                    <FileText size={20} />
                    <span>Label Details</span>
                  </>
                ) : (
                  <>
                    <QrCode size={20} />
                    <span>QR Code & Barcode</span>
                  </>
                )}
              </h2>
              <button
                onClick={() => setSelectedLabel(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {viewMode === 'details' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Hash size={16} />
                    Batch ID
                  </span>
                  <span className="text-sm">{selectedLabel.batch?.batchNumber || '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Box size={16} />
                    Stock Qty
                  </span>
                  <span className="text-sm">{selectedLabel.batch?.quantity || '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <FileText size={16} />
                    Product Name
                  </span>
                  <span className="text-sm">{selectedLabel.product?.productName || '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} />
                    Expiry Date
                  </span>
                  <span className="text-sm">
                    {selectedLabel.batch?.expiryDate ? new Date(selectedLabel.batch.expiryDate).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} />
                    Date Created
                  </span>
                  <span className="text-sm">
                    {selectedLabel.creationDateTime ? new Date(selectedLabel.creationDateTime).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Factory size={16} />
                    Manufacturer
                  </span>
                  <span className="text-sm">{selectedLabel.product?.manufacturer || '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <ImageIcon size={16} />
                    Product Label
                  </span>
                  {selectedLabel?.image ? (
                    <button
                      onClick={() => setViewMode('label')}
                      className="text-sm text-primary_blue underline"
                    >
                      View Label
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">No label available</span>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setViewMode('qr')}
                    className="text-primary_blue text-sm underline flex items-center gap-1"
                  >
                    <QrCode size={16} />
                    View QR Code
                  </button>
                </div>
              </div>
            ) : viewMode === 'qr' ? (
              <div className="space-y-6" >
                <div className="flex flex-col items-center bg-white p-4 rounded-lg" ref={qrCodeRef}>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    QR Code
                  </h3>
                  <QRCode
                    value={generateVerifyLink()}
                    size={128}
                    className="mb-4"
                  />
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    Barcode
                  </h3>
                  <Barcode
                    value={generateVerifyLink()}
                    width={1.5}
                    height={50}
                    displayValue={false}
                  />
                  <p className="text-xs mt-2 text-center text-gray-500">
                    {selectedLabel.product?.productName || 'Product Label'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setViewMode('details')}
                    className="flex items-center gap-2 text-primary_blue"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-primary_blue text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ImageIcon size={20} />
                    Product Label
                  </h3>
                  <button
                    onClick={() => setViewMode('details')}
                    className="flex items-center gap-1 text-primary_blue"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                </div>
                {selectedLabel?.image ? (
                  <div className="bg-white p-4 rounded-lg flex justify-center">
                    <img
                      src={selectedLabel.image}
                      alt="Product Label"
                      className="max-h-80 rounded"
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No label image available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}  */}

      {selectedLabel && <LabelModal label={selectedLabel} onClose={() => setSelectedLabel(null)} />}
    </>
  )
}

export default LabelGenTable