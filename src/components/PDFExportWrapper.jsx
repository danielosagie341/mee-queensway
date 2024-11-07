import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import sig from "../images/signature.png";

const QuotationApp = () => {
  const [quotationData, setQuotationData] = useState([
    {
      description: '0.55mm thick Alum Rotating sheet',
      noOfPieces: '1',
      length: '1',
      totalQty: '63',
      uom: 'MTR',
      unitPrice: '11864',
      value: '747432'
    }
  ]);

  const [customerName, setCustomerName] = useState('FIFTEEN CAPITAL');
  const [ref, setRef] = useState('CHIEF MATHEW (MARKETING MANAGER)');
  const [quotationDate, setQuotationDate] = useState('28/06/2024');
  const [quotationNo, setQuotationNo] = useState('CSL S0305');

  const calculateValue = (totalQty, unitPrice) => {
    // Remove commas from numbers and convert to float
    const qty = parseFloat(totalQty.replace(/,/g, '')) || 0;
    const price = parseFloat(unitPrice.replace(/,/g, '')) || 0;
    return isNaN(qty) ? price.toLocaleString() : (qty * price).toLocaleString();
  };

  const updateRowData = (index, field, value) => {
    const updatedData = [...quotationData];
    updatedData[index][field] = value;
    
    // Automatically calculate value when totalQty or unitPrice changes
    if (field === 'totalQty' || field === 'unitPrice') {
      updatedData[index].value = calculateValue(
        field === 'totalQty' ? value : updatedData[index].totalQty,
        field === 'unitPrice' ? value : updatedData[index].unitPrice
      );
    }
    
    setQuotationData(updatedData);
  };

  const addRow = () => {
    setQuotationData([
      ...quotationData,
      {
        description: '',
        noOfPieces: '',
        length: '',
        totalQty: '',
        uom: '',
        unitPrice: '',
        value: ''
      }
    ]);
  };

  const deleteRow = (index) => {
    const updatedData = [...quotationData];
    updatedData.splice(index, 1);
    setQuotationData(updatedData);
  };

  const calculateTotal = () => {
    return quotationData
      .reduce((sum, row) => sum + (parseFloat(row.value.replace(/,/g, '')) || 0), 0)
      .toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ... (previous content) ... */}

      <div id="quotation-form" className="max-w-6xl mx-auto bg-white shadow-lg">
        <div className="p-8">
          {/* ... (previous content) ... */}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-[40%]">Description</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-12">No. Of Pieces</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-20">Length</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-24">Total Qty</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-20">UoM</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-28">Unit Price</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-32">Value</th>
                  <th className="border border-gray-400 p-2 bg-gray-50 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {quotationData.map((row, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && row.description.trim() === '' && (
                      <tr>
                        <td colSpan={8} className="border border-gray-400 p-2 bg-gray-100 text-left font-bold">
                          Subheading
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="border border-gray-400">
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full font-bold text-xs min-h-8 flex items-center focus:outline-none px-2"
                            value={row.description}
                            onChange={(e) => updateRowData(index, 'description', e.target.value)}
                          />
                        </div>
                      </td>
                      {/* ... (previous content) ... */}
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-end">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-right focus:outline-none px-2"
                            value={row.value}
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 text-sm"
                            onClick={() => deleteRow(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot>
                <tr className='print:hidden'>
                  <td colSpan="8" className="text-right p-2 min-h-0">
                    <button
                      className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 text-sm"
                      onClick={addRow}
                    >
                      Add Row
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="text-right p-2 font-bold border border-gray-400">Basic Amount:</td>
                  <td className="border border-gray-400 p-2 text-right font-bold">{calculateTotal()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* ... (previous content) ... */}
        </div>
      </div>
    </div>
  );
};

export default QuotationApp;