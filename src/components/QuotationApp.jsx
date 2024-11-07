import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import sig from "../images/signature.png";
import queensway from "../images/queensway-logo.png";
import towerRoofing from "../images/tower-roofing-logo.png";

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

 const [subheading, setSubheading] = useState([
    { heading: 'subheading', index: 0 },
  ]);
  const [customerName, setCustomerName] = useState('FIFTEEN CAPITAL');
  const [ref, setRef] = useState('CHIEF MATHEW (MARKETING MANAGER)');
  const [quotationDate, setQuotationDate] = useState('28/06/2024');
  const [quotationNo, setQuotationNo] = useState('CSL S0305');

  const calculateValue = (totalQty, unitPrice) => {
    // Remove commas from numbers and convert to float
    const qty = parseFloat(totalQty.replace(/,/g, '')) || 0;
    const price = parseFloat(unitPrice.replace(/,/g, '')) || 0;
    return (qty * price).toLocaleString();
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
    
   const updateSubheadingData = (index, newHeading) => {
    const updatedData = [...subheading];
    updatedData[index].heading = newHeading;
    setSubheading(updatedData);
  }

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

 const addSubheadRow = () => {
    setSubheading([
      ...subheading,
      {
        heading: '',
        index: subheading.length
      }
    ]);
  };

    
    const deleteRow = (index) => {
        const updatedData = [...quotationData];
        updatedData.splice(index, 1);
        setQuotationData(updatedData);
    };

    const deleteSubheadingRow = (index) => {
        const updatedData = [...subheading];
        updatedData.splice(index, 1);
        setSubheading(updatedData);
    };

  const calculateTotal = () => {
    return quotationData
      .reduce((sum, row) => sum + (parseFloat(row.value.replace(/,/g, '')) || 0), 0)
      .toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Export Button - will be hidden in print */}
      <div className="max-w-6xl mx-auto mb-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 shadow"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Quotation Form */}
      <div id="quotation-form" className="max-w-6xl mx-auto bg-white shadow-lg">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
                <div className="flex w-full justify-around items-center">
                    <div className="">
                        <img src={queensway} alt="" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-green-700 font-bold text-2xl">QUEENSWAY ALUMINIUM COMPANY LIMITED</h1>
                        <p className="text-sm text-gray-600">PLOT 9C INDUSTRIAL ESTATE P.O. BOX 1870, KADUNA-NIGERIA</p>
                        <p className="text-sm text-gray-600">KM 8 FROM ZUMA ROCK, KADUNA EXPRESSWAY, SULEJA.</p>
                    </div>
                    <div className="">
                        <img src={towerRoofing} alt="" />
                    </div>
                </div>
          </div>

          <div className="border-gray-400 border-2 p-5">
            {/* Title and Customer Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <h2 className="text-lg font-bold mb-1">QUOTATION</h2>
                <p className="text-xs font-bold">MADE SUBJECT TO CONDITIONS SHOWN OVERLEAF</p>
              </div>
              <div>
                <div className="flex justify-between items-start mb-7">
                  <div>
                    <p className="font-bold mb-1">CUSTOMER'S NAME AND ADDRESS</p>
                    <div className="relative">
                      <input 
                        type="text"
                        className="w-full min-h-10 flex items-center border border-gray-400 px-2 py-1 text-sm"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="text-sm">page 1 of 1</p>
                </div>
                              
                <div className='flex items-center mb-7'>
                    <p className="mb-2 mr-3">Ref.: </p>
                    <input 
                        type="text"
                        className="w-full min-h-10 flex items-center border border-gray-400 px-2 py-1 text-sm"
                        value={ref}
                        onChange={(e) => setRef(e.target.value)}
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-7">
                  <div>
                    <p className="font-bold mb-1">QUOTATION DATE</p>
                    <input 
                      type="text"
                      className="w-full min-h-10 flex items-center border border-gray-400 px-2 py-1 text-sm"
                      value={quotationDate}
                      onChange={(e) => setQuotationDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold mb-1">QUOTATION NO.</p>
                    <input 
                      type="text"
                      className="w-full min-h-10 flex items-center border border-gray-400 px-2 py-1 text-sm"
                      value={quotationNo}
                      onChange={(e) => setQuotationNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
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
                  </tr>
                </thead>
                <tbody>
                    {subheading.map((row, index) => (
                           <tr>
                                <td colSpan={8} className="border border-gray-400 p-2 bg-gray-100 text-left font-bold">
                                    <div className="flex items-center justify-between">
                                    <input
                                        type="text"
                                        className="w-full font-bold text-xs min-h-8 flex items-center focus:outline-none px-2"
                                        value={row.heading}
                                        onChange={(e) => updateSubheadingData(row.index, e.target.value)}
                                    />
                                    <button
                                        className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 text-sm print:hidden"
                                        onClick={() => deleteSubheadingRow(row.index)}
                                    >
                                        Delete
                                    </button>
                                    </div>
                                </td>
                                </tr>
                            ))}
                                  
                    {quotationData.map((row, index) => (
                    <React.Fragment key={index}>
                      
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
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-center focus:outline-none"
                            value={row.noOfPieces}
                            onChange={(e) => updateRowData(index, 'noOfPieces', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-center focus:outline-none"
                            value={row.length}
                            onChange={(e) => updateRowData(index, 'length', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-center focus:outline-none"
                            value={row.totalQty}
                            onChange={(e) => updateRowData(index, 'totalQty', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-center focus:outline-none"
                            value={row.uom}
                            onChange={(e) => updateRowData(index, 'uom', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="border border-gray-400 p-1">
                        <div className="flex items-center justify-end">
                          <input
                            type="text"
                            className="w-full text-sm min-h-8 flex items-center text-right focus:outline-none px-2"
                            value={row.unitPrice}
                            onChange={(e) => updateRowData(index, 'unitPrice', e.target.value)}
                          />
                        </div>
                      </td>
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
                        <td className="border border-gray-400 p-1 print:hidden">
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
                  <tr className=' print:hidden'>
                    <td colSpan="7" className="text-right p-2 min-h-0">
                      <button
                        className="px-4 py-2 mr-3 bg-green-700 text-white rounded hover:bg-green-800 text-sm"
                        onClick={addRow}
                      >
                        Add Row
                    </button>
                                          
                      <button
                        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-green-800 text-sm"
                        onClick={addSubheadRow}
                      >
                        Add subheading Row
                    </button>
                                          

                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="text-right p-2 font-bold border border-gray-400">Basic Amount:</td>
                    <td className="border border-gray-400 p-2 text-right font-bold">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className='flex flex-col justify-between items-start'>
                    <div>
                        <p className="mb-2">PROJECT:</p>
                        <p className="mb-2">TERM OF PAYMENT:- Cash Basic -</p>
                        <p className="mb-2">Estimated Delievery Ex-Factory: Days from receipt of order</p>
                        <p className="mb-2">REMARKS: (i) Quotation Valid for 7 days</p>
                        <p className="ml-14">(ii) Thickness tolerance as per SON</p>
                    </div>
                    
                    <div>
                        <p className='flex items-end mb-5'>
                            Agreed By 
                            <p className='border-black border-b-2 w-80 h-2 ml-3 border-dashed'></p>
                        </p>   
                                      
                        <p className='flex items-end mb-5'>
                            Signature 
                            <p className='border-black border-b-2 w-80 h-2 ml-3 border-dashed'></p>
                        </p>   
                                      
                        <p className='flex items-end mb-5'>
                            Date 
                            <p className='border-black border-b-2 w-96 h-2 ml-3 border-dashed'></p>
                        </p>   
                                      
                    </div>
                </div>
                <div className="text-center -mr-20">
                    <div className="mb-40 flex items-center justify-around">
                        <p>Prepared By</p>
                        <small  className="ml-7 font-bold"> lawal</small>
                    </div>
                  <p className="mb-8">Your's Faithfully,</p>
                    <p className="">for QUEENSWAY ALUMINIUM CO LTD</p>
                    <div className='flex justify-end mr-16'><img className='scale-50 border-black border-b-2 border-dashed' src={sig} alt="signature" /></div>
                  <p className="">Marketing Manager / Sales Executive</p>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">VAT REGD NO: KDV - 1600 240567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationApp;