import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewToDoMb() {
  const { id } = useParams(); // Get to-do ID from URL
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  // Fetch to-do details from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosMember')) || [];
    const selectedTodo = storedTodos.find((todo) => todo.id === parseInt(id));
    if (selectedTodo) {
      setTodo(selectedTodo);
    } else {
      navigate('/member/to-do'); // Redirect if to-do not found
    }
  }, [id, navigate]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View To-Do</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* To-Do Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">{todo.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">{todo.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">{todo.status}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate('/member/to-do')}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewToDoMb;