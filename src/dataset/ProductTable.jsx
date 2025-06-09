import pics from '../assets/images/stethoscope.png';

// components/ProductTable.jsx
const products = [
  {
    image: '../assets/images/stethoscope.png',
    name: 'Stethoscope ProCare 3000',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
   {
    image: '../assets/images/stethoscope.png',
    name: 'Wireless Hearing Aid A1',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
   {
    image: '../assets/images/stethoscope.png',
    name: 'Blood Glucose Monitor SmartCheck',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
   {
    image: '../assets/images/stethoscope.png',
    name: 'Ergonomic Keyboard MedAssist',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
   {
    image: '../assets/images/stethoscope.png',
    name: 'VisionPlus HD Eye Monitor',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
  {
    image: '../assets/images/stethoscope.png',
    name: 'Preccision Surgical Mouse',
    price: '₦150,000.00',
    orders: '174,001',
    totalPaid: '₦240,010,000',
  },
  // ... Add others
];

export default function ProductTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-[14px] sm:text-[16px] md:text-[20px] font-semibold mb-4 text-center md:text-start">Your Top Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="py-2 px-4 text-[13px] lg:text-[20px]">Product Name</th>
              <th className="py-2 px-4 text-[13px] lg:text-[20px]">Unit Price</th>
              <th className="py-2 px-4 text-[13px] lg:text-[20px]">Orders</th>
              <th className="py-2 px-4 text-[13px] lg:text-[20px]">Total Paid</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-3 px-4 flex items-center gap-2">
                  <img src={pics} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <span className='max-w-[150px] text-[14px] font-[sfpro] text-[#484848]'>{item.name}</span>
                </td>
                <td className="py-3 px-4 text-[14px] font-[sfpro] text-[#484848]">{item.price}</td>
                <td className="py-3 px-4 text-[14px] font-[sfpro] text-[#484848]">{item.orders}</td>
                <td className="py-3 px-4 text-[14px] font-[sfpro] text-[#484848]">{item.totalPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
