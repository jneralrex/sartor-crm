import { Download, Ellipsis, Plus } from 'lucide-react';
import search from '../../assets/images/search.png';
import { useState } from 'react';
import ProductDetailsModal from '../../components/modals/labelgen/ProductDetailsModal';

const allEmployees = [
  {
    id: 'BCH507-29',
    productName: 'MedSupply',
    stockQty: '120',
    qrCode: 'view',
    expDate: '2025-06-16',
    supplier: 'Blue Sky Co.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-30',
    productName: 'HealthGuard',
    stockQty: '85',
    qrCode: 'view',
    expDate: '2024-11-05',
    supplier: 'Green Leaf Ltd.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-31',
    productName: 'CarePlus',
    stockQty: '200',
    qrCode: 'view',
    expDate: '2023-12-20',
    supplier: 'HealthFirst Inc.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-32',
    productName: 'VitalAid',
    stockQty: '150',
    qrCode: 'view',
    expDate: '2025-01-15',
    supplier: 'Wellness Corp.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-33',
    productName: 'MediCare Pro',
    stockQty: '90',
    qrCode: 'view',
    expDate: '2024-08-30',
    supplier: 'Pharma Solutions',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-34',
    productName: 'HealthGuard Plus',
    stockQty: '75',
    qrCode: 'view',
    expDate: '2024-05-10',
    supplier: 'Care Essentials',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-35',
    productName: 'MediSupply Ultra',
    stockQty: '110',
    qrCode: 'view',
    expDate: '2025-03-25',
    supplier: 'Blue Sky Co.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-36',
    productName: 'CarePlus Advanced',
    stockQty: '130',
    qrCode: 'view',
    expDate: '2024-09-18',
    supplier: 'HealthFirst Inc.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-37',
    productName: 'VitalAid Max',
    stockQty: '95',
    qrCode: 'view',
    expDate: '2025-02-05',
    supplier: 'Wellness Corp.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-38',
    productName: 'MediCare Elite',
    stockQty: '80',
    qrCode: 'view',
    expDate: '2024-12-12',
    supplier: 'Pharma Solutions',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-39',
    productName: 'HealthGuard Pro',
    stockQty: '100',
    qrCode: 'view',
    expDate: '2025-04-22',
    supplier: 'Care Essentials',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-40',
    productName: 'MediSupply Plus',
    stockQty: '115',
    qrCode: 'view',
    expDate: '2024-07-28',
    supplier: 'Blue Sky Co.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-41',
    productName: 'CarePlus Ultra',
    stockQty: '105',
    qrCode: 'view',
    expDate: '2025-05-14',
    supplier: 'HealthFirst Inc.',
    manufacturer: '(847) 785-2310',
  },
  {
    id: 'BCH507-42',
    productName: 'VitalAid Pro',
    stockQty: '90',
    qrCode: 'view',
    expDate: '2024-10-30',
    supplier: 'Wellness Corp.',
    manufacturer: '(847) 785-2310',
  }
];

const LabelGenTable = ({ activeTab }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };


  const filteredEmployees =
    activeTab === 'All Employees'
      ? allEmployees
      : allEmployees.filter((emp) => emp.position === activeTab);
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
          <button className="bg-primary_white border px-2 py-2 rounded-md text-sm h-[40px] flex text-center items-center gap-1 text-[#1A1A1A] public-sans" onClick={handleModalToggle} ><span><Plus /></span><span>Upload Product Label</span></button>
          <buttton className='flex items-center bg-primary_blue h-[40px] w-[119px] justify-center rounded-md'><Download className='text-primary_white h-[16.67px]' /><span className='text-primary_white text-[12px]'>Download csv</span></buttton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm bg-primary_white">
          <thead className=" border-b text-primary_blue font-semibold text-xs md:text-[14px]">
            <tr className=''>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Stock Qty</th>
              <th className="px-4 py-2">QR code</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Manufacturer</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50 text-start">
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">

                  <div>
                    <div className="text-xs md:text-[14px] font-medium text-[#484848]">{emp.productName}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.stockQty}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.qrCode}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.expDate}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.supplier}</td>
                <td className="px-4 py-3 text-xs md:text-[14px] font-normal text-[#767676]">{emp.manufacturer}</td>
                <td className="px-4 py-3 ">
                  <button className="text-gray-500 hover:text-gray-700"><Ellipsis /></button>
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
      {isModalOpen && <ProductDetailsModal onClose={handleModalToggle} />}
    </>
  )
}

export default LabelGenTable
