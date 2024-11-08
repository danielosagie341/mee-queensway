import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import sig from "../images/signature.png";
import queensway from "../images/queensway-logo.png";
import towerRoofing from "../images/tower-roofing-logo.png";

const QuotationApp = () => {
  const [quotationItems, setQuotationItems] = useState([
    {
      type: 'row',  // Type to differentiate between regular rows and subheadings
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
    const qty = parseFloat(totalQty.replace(/,/g, '')) || 0;
    const price = parseFloat(unitPrice.replace(/,/g, '')) || 0;
    return (qty * price).toLocaleString();
  };

  const updateItemData = (index, field, value) => {
    const updatedItems = [...quotationItems];
    updatedItems[index][field] = value;

    if (field === 'totalQty' || field === 'unitPrice') {
      updatedItems[index].value = calculateValue(
        field === 'totalQty' ? value : updatedItems[index].totalQty,
        field === 'unitPrice' ? value : updatedItems[index].unitPrice
      );
    }

    setQuotationItems(updatedItems);
  };

  const addRow = () => {
    setQuotationItems([
      ...quotationItems,
      {
        type: 'row',
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
    setQuotationItems([
      ...quotationItems,
      {
        type: 'subheading',
        heading: ''
      }
    ]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...quotationItems];
    updatedItems.splice(index, 1);
    setQuotationItems(updatedItems);
  };

  const calculateTotal = () => {
    return quotationItems
      .filter(item => item.type === 'row')
      .reduce((sum, item) => sum + (parseFloat(item.value.replace(/,/g, '')) || 0), 0)
      .toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto mb-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 shadow"
        >
          Print / Save as PDF
        </button>
      </div>

      <div id="quotation-form" className="max-w-6xl mx-auto bg-white shadow-lg">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="flex w-full justify-around items-center">
              <div><img src={queensway} alt="" /></div>
              <div className="text-center">
                <h1 className="text-green-700 font-bold text-2xl">QUEENSWAY ALUMINIUM COMPANY LIMITED</h1>
                <p className="text-sm text-gray-600">PLOT 9C INDUSTRIAL ESTATE P.O. BOX 1870, KADUNA-NIGERIA</p>
                <p className="text-sm text-gray-600">KM 8 FROM ZUMA ROCK, KADUNA EXPRESSWAY, SULEJA.</p>
              </div>
              <div><img src={towerRoofing} alt="" /></div>
            </div>
          </div>

          <div className="border-gray-400 border-2 p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <h2 className="text-lg font-bold mb-1">QUOTATION</h2>
                <p className="text-xs font-bold">MADE SUBJECT TO CONDITIONS SHOWN OVERLEAF</p>
              </div>
              <div>
                <div className="flex justify-between items-start mb-7">
                  <div>
                    <p className="font-bold mb-1">CUSTOMER'S NAME AND ADDRESS</p>
                    <input 
                      type="text"
                      className="w-full border border-gray-400 px-2 py-1 text-sm"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <p className="text-sm">page 1 of 1</p>
                </div>

                <div className="flex items-center mb-7">
                  <p className="mb-2 mr-3">Ref.: </p>
                  <input 
                    type="text"
                    className="w-full border border-gray-400 px-2 py-1 text-sm"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-7">
                  <div>
                    <p className="font-bold mb-1">QUOTATION DATE</p>
                    <input 
                      type="text"
                      className="w-full border border-gray-400 px-2 py-1 text-sm"
                      value={quotationDate}
                      onChange={(e) => setQuotationDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-bold mb-1">QUOTATION NO.</p>
                    <input 
                      type="text"
                      className="w-full border border-gray-400 px-2 py-1 text-sm"
                      value={quotationNo}
                      onChange={(e) => setQuotationNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

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
                  {quotationItems.map((item, index) => (
                    item.type === 'row' ? (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2">
                          <input
                            type="text"
                            className="w-full font-bold text-xs px-2"
                            value={item.description}
                            onChange={(e) => updateItemData(index, 'description', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center"
                            value={item.noOfPieces}
                            onChange={(e) => updateItemData(index, 'noOfPieces', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center"
                            value={item.length}
                            onChange={(e) => updateItemData(index, 'length', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center"
                            value={item.totalQty}
                            onChange={(e) => updateItemData(index, 'totalQty', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center"
                            value={item.uom}
                            onChange={(e) => updateItemData(index, 'uom', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center"
                            value={item.unitPrice}
                            onChange={(e) => updateItemData(index, 'unitPrice', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <input
                            type="text"
                            className="w-full text-sm text-center bg-gray-50"
                            readOnly
                            value={item.value}
                          />
                        </td>
                        <td className="border border-gray-400 p-1 print:hidden">
                          <button onClick={() => deleteItem(index)}>Delete</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index} className="bg-gray-100">
                        <td colSpan="7" className="border border-gray-400 p-2">
                          <input
                            type="text"
                            className="w-full font-bold px-2"
                            value={item.heading}
                            placeholder="Subheading"
                            onChange={(e) => updateItemData(index, 'heading', e.target.value)}
                          />
                        </td>
                        <td className="border border-gray-400 p-1 print:hidden">
                          <button onClick={() => deleteItem(index)}>Delete</button>
                        </td>
                      </tr>
                    )
                  ))}

                   <tr>
                    <td colSpan="6" className="text-right p-2 font-bold border border-gray-400">Basic Amount:</td>
                    <td className="border border-gray-400 p-2 text-right font-bold">{calculateTotal()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-4 print:hidden">
              <button onClick={addRow} className="mr-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 shadow">
                Add Row
              </button>
              <button onClick={addSubheadRow} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 shadow">
                Add Subheading
              </button>
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
