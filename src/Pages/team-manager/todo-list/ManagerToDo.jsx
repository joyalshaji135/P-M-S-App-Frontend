import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

function ManagerTodo() {
  const [todos, setTodos] = useState([]); // Initialize todos as an empty array
  const [searchText, setSearchText] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Fetch todos from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('todosMg')) || [];
    setTodos(storedData);
    setFilteredTodos(storedData);
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchValue) ||
        todo.description.toLowerCase().includes(searchValue) ||
        todo.status.toLowerCase().includes(searchValue)
    );
    setFilteredTodos(filtered);
  };

  // Handle delete functionality
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    localStorage.setItem('todosMg', JSON.stringify(updatedTodos)); // Update localStorage
  };

  // Table columns
  const columns = [
    {
      name: 'Sl No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : row.status === 'In Progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {/* View Button */}
          <Link to={`/team-manager/to-do/view/${row.id}`}>
            <button className="text-blue-600 hover:text-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>

          {/* Edit Button */}
          <Link to={`/team-manager/to-do/edit/${row.id}`}>
            <button className="text-yellow-600 hover:text-yellow-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </Link>

          {/* Delete Button */}
          <button
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDeleteTodo(row.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage To-Dos</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search to-dos..."
            value={searchText}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Add Button */}
          <Link
            to="/team-manager/to-do/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Add To-Do
          </Link>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredTodos}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default ManagerTodo;