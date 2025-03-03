import React, { useState } from 'react';
import AddModal from './AddModal'; // Import the reusable modal

function CustomerTypeAd() {
  const [customerTypes, setCustomerTypes] = useState([
    {
      id: 1,
      name: 'Premium',
      description: 'High-value customers with exclusive benefits.',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Standard',
      description: 'Regular customers with basic benefits.',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Trial',
      description: 'Customers on a trial period.',
      status: 'Inactive',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCustomerType = (newCustomerType) => {
    const newId = customerTypes.length + 1;
    setCustomerTypes([...customerTypes, { id: newId, ...newCustomerType, status: 'Active' }]);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Customer Types</h1>

      {/* Add Customer Type Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Customer Type
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sl No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customerTypes.map((customerType, index) => (
              <tr key={customerType.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customerType.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customerType.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      customerType.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {customerType.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {/* View, Edit, Delete Buttons */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomerType}
        title="Add Customer Type"
      />
    </div>
  );
}

export default CustomerTypeAd;  