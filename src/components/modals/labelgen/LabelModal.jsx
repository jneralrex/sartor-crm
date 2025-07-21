import { X, ChevronLeft, FileText, QrCode, Download, Box, Calendar, Hash, Factory, Image as ImageIcon } from 'lucide-react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

const LabelModal = ({ label, onClose }) => {
  const [viewMode, setViewMode] = useState('details');
  const qrCodeRef = useRef(null);

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
    const canvas = await html2canvas(qrCodeRef.current);
    const link = document.createElement('a');
    link.download = `${label.product?.productName || 'label'}_qr_barcode.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const generateVerifyLink = () => `https://verify-sartor.vercel.app/`;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-lg min-w-[455px] rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {viewMode === 'details' ? (
              <>
                <FileText size={20} />
                Label Details
              </>
            ) : viewMode === 'qr' ? (
              <>
                <QrCode size={20} />
                QR Code & Barcode
              </>
            ) : (
              <>
                <ImageIcon size={20} />
                Product Label
              </>
            )}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {viewMode === 'details' && (
          <div className="space-y-4">
            {[
              { icon: <Hash size={16} />, label: 'Batch ID', value: label.batch?.batchNumber },
              { icon: <Box size={16} />, label: 'Stock Qty', value: label.batch?.quantity },
              { icon: <FileText size={16} />, label: 'Product Name', value: label.product?.productName },
              { icon: <Calendar size={16} />, label: 'Expiry Date', value: new Date(label.batch?.expiryDate).toLocaleDateString() },
              { icon: <Calendar size={16} />, label: 'Date Created', value: new Date(label.creationDateTime).toLocaleDateString() },
              { icon: <Factory size={16} />, label: 'Manufacturer', value: label.product?.manufacturer }
            ].map((item, idx) => (
              <div className="flex justify-between items-center" key={idx}>
                <span className="text-sm font-medium flex items-center gap-2">{item.icon}{item.label}</span>
                <span className="text-sm">{item.value || '—'}</span>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <ImageIcon size={16} /> Product Label
              </span>
              {label.image ? (
                <button onClick={() => setViewMode('label')} className="text-sm text-primary_blue underline">View Label</button>
              ) : (
                <span className="text-sm text-gray-500">No label available</span>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setViewMode('qr')} className="text-primary_blue text-sm underline flex items-center gap-1">
                <QrCode size={16} /> View QR Code
              </button>
            </div>
          </div>
        )}

        {viewMode === 'qr' && (
          <div className="space-y-6">
            <div ref={qrCodeRef} className="flex flex-col items-center bg-white p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">QR Code</h3>
              <QRCode value={generateVerifyLink()} size={128} />
              <h3 className="text-sm font-medium mb-2 mt-4">Barcode</h3>
              <Barcode value={generateVerifyLink()} width={1.5} height={50} displayValue={false} />
              <p className="text-xs mt-2 text-center text-gray-500">
                {label.product?.productName || 'Product Label'}
              </p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setViewMode('details')} className="flex items-center gap-2 text-primary_blue">
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={handleDownload} className="bg-primary_blue text-white px-4 py-2 rounded flex items-center gap-2">
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        )}

        {viewMode === 'label' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} /> Product Label</h3>
              <button onClick={() => setViewMode('details')} className="flex items-center gap-1 text-primary_blue">
                <ChevronLeft size={16} /> Back
              </button>
            </div>
            {label.image ? (
              <div className="bg-white p-4 rounded-lg flex justify-center">
                <img src={label.image} alt="Product Label" className="max-h-80 rounded" />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No label image available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelModal;
