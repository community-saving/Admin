import React from 'react';

import { formatDate } from './reportUtils';



const UserReportModal = ({ 

  isOpen, 

  onClose, 

  user, 

  deposits, 

  loans 

}) => {

  if (!isOpen) return null;

  

  return (

    <div className="fixed inset-0 z-50 overflow-y-auto">

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 transition-opacity" aria-hidden="true">

          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>

        </div>

        

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">

                {user.name}'s Report

              </h3>

              <button

                type="button"

                className="text-gray-400 hover:text-gray-500 focus:outline-none"

                onClick={onClose}

              >

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />

                </svg>

              </button>

            </div>

            

            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-gray-50 p-4 rounded-lg">

                <p className="text-sm text-gray-500">Email</p>

                <p className="text-base font-medium">{user.email || 'N/A'}</p>

              </div>

              <div className="bg-gray-50 p-4 rounded-lg">

                <p className="text-sm text-gray-500">Phone</p>

                <p className="text-base font-medium">{user.phone || 'N/A'}</p>

              </div>

            </div>

            

            <div className="mb-6">

              <h4 className="text-md font-medium text-gray-900 mb-3">Deposits</h4>

              {deposits.length === 0 ? (

                <p className="text-gray-500">No deposits found</p>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                      <tr>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Amount

                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Date

                        </th>

                      </tr>

                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">

                      {deposits.map((deposit, index) => (

                        <tr key={index}>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                            ${deposit.amount.toFixed(2)}

                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                            {formatDate(deposit.timestamp)}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

            

            <div>

              <h4 className="text-md font-medium text-gray-900 mb-3">Loans</h4>

              {loans.length === 0 ? (

                <p className="text-gray-500">No loans found</p>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                      <tr>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Amount

                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Date

                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                          Status

                        </th>

                      </tr>

                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">

                      {loans.map((loan, index) => (

                        <tr key={index}>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                            ${loan.amount.toFixed(2)}

                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                            {formatDate(loan.timestamp)}

                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">

                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${

                              loan.paid 

                                ? 'bg-green-100 text-green-800' 

                                : 'bg-red-100 text-red-800'

                            }`}>

                              {loan.paid ? 'PAID' : 'UNPAID'}

                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};



export default UserReportModal;