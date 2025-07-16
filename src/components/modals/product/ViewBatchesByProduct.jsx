import React, { useEffect, useState } from 'react';
import instance from '../../../utils/axiosInstance';

const ViewBatchesByProduct = ({ productId, onClose }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchBatches = async () => {
      try {
        const res = await instance.get(`/product/batches/${productId}`);
        console.log(res.data)
        setBatches(res.data.data);
      } catch (err) {
        console.error('Failed to fetch batches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [productId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Product Batches</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-600 hover:text-black">&times;</button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading batches...</p>
        ) : batches.length === 0 ? (
          <p className="text-gray-500 text-sm">No batches found for this product.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-3 border">Batch No.</th>
                <th className="py-2 px-3 border">Qty</th>
                <th className="py-2 px-3 border">Supply Price (₦)</th>
                <th className="py-2 px-3 border">Selling Price (₦)</th>
                <th className="py-2 px-3 border">Expiry Date</th>
                <th className="py-2 px-3 border">Manufacturer</th>
                <th className="py-2 px-3 border">Supplier</th>
                <th className="py-2 px-3 border">Invoice</th>
                {/* <th className="py-2 px-3 border">Receipt</th> */}
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border">{batch.batchNumber}</td>
                  <td className="py-2 px-3 border">{batch.quantity}</td>
                  <td className="py-2 px-3 border">{batch.supplyPrice?.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{batch.sellingPrice?.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{formatDate(batch.expiryDate)}</td>
                  <td className="py-2 px-3 border">{batch.manufacturer || 'N/A'}</td>
                  <td className="py-2 px-3 border">
                    {batch.supplier?.name || 'N/A'}
                  </td>
                  <td className="py-2 px-3 border">
                    {/* <a href={batch.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View Image
                    </a> */}
                    {batch.invoiceNumber }
                  </td>
                  {/* <td className="py-2 px-3 border">
                    <a href={batch.receipt} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Download PDF
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewBatchesByProduct;
