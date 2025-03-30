import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Generate initial dummy data
const initialTasks = [
  {
    id: 1,
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the entire project including API specifications and user guides.',
    status: 'In Progress',
    createdAt: new Date('2023-05-15')
  },
  {
    id: 2,
    title: 'Review team performance',
    description: 'Analyze quarterly performance metrics and prepare review reports for team members.',
    status: 'Pending',
    createdAt: new Date('2023-05-18')
  },
  {
    id: 3,
    title: 'Update security protocols',
    description: 'Implement new security measures and update all systems with the latest patches.',
    status: 'Completed',
    createdAt: new Date('2023-05-10')
  }
];

function TasksMb() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isEditing, setIsEditing] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, x: -50 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  // Handle status updates
  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Update existing task
  const handleUpdateTask = () => {
    // In a real app, you would save to an API here
    setIsEditing(null);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        My Tasks
      </motion.h1>

      {/* Edit Task Modal (only appears when editing) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Task
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={tasks.find(t => t.id === isEditing)?.title || ''}
                    onChange={(e) => 
                      setTasks(tasks.map(task => 
                        task.id === isEditing ? 
                        { ...task, title: e.target.value } : task
                      ))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={tasks.find(t => t.id === isEditing)?.description || ''}
                    onChange={(e) => 
                      setTasks(tasks.map(task => 
                        task.id === isEditing ? 
                        { ...task, description: e.target.value } : task
                      ))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 min-h-[120px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={tasks.find(t => t.id === isEditing)?.status || 'Pending'}
                    onChange={(e) => 
                      setTasks(tasks.map(task => 
                        task.id === isEditing ? 
                        { ...task, status: e.target.value } : task
                      ))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateTask}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks Grid */}
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            No tasks available
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="bg-blue-50 px-5 py-4 border-b border-blue-100">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {task.title}
                      </h3>
                      <button
                        onClick={() => setIsEditing(task.id)}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Edit task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div 
                      className={`mb-4 ${expandedTask === task.id ? '' : 'line-clamp-3'} text-gray-600 cursor-pointer`}
                      onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    >
                      {task.description || 'No description provided'}
                      {task.description?.length > 100 && (
                        <span className="text-blue-600 ml-1">
                          {expandedTask === task.id ? 'Show less' : '...Read more'}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)} border`}>
                        {task.status}
                      </span>
                      
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 bg-blue-50 border-t border-blue-100 text-xs text-gray-500 flex justify-between">
                    <span>Task ID: {task.id}</span>
                    <span>{task.createdAt.toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksMb;