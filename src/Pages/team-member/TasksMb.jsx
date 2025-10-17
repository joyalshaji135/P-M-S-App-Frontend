import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit, FiFile, FiX, FiArrowRight } from 'react-icons/fi';
import { getLoggedUser } from '../../helper/auth';
import axios from 'axios'; // or your preferred HTTP client
import { getClientTaskById, updateProjectTask } from '../../api/pages-api/team-member-api/project-task-api/MTProjectTaskApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TasksMb() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // Status options
  const statusOptions = ['Not Started', 'In Progress', 'Completed', 'On Hold'];
  const userData = getLoggedUser();
  const userId = userData._id;
  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await getClientTaskById(userId);
        if (response.success) {
          setTasks(response.taskAssigned);
          setFilteredTasks(response.taskAssigned);
        } else {
          setError('Failed to fetch tasks');
        }
      } catch (err) {
        setError(err.message || 'Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter and search logic
  useEffect(() => {
    const filtered = tasks.filter(task => {
      const matchesSearch = task?.taskName.toLowerCase().includes(searchText.toLowerCase()) || 
                          task?.taskDescription.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filter === 'all' || task?.taskStatus === filter;
      
      return matchesSearch && matchesFilter;
    });
    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [searchText, filter, tasks]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    }
  };

  // Get priority badge style
  const getPriorityBadge = (priority) => {
    // You can implement this based on your actual priority field if available
    return 'bg-blue-100 text-blue-600';
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in progress': return 'bg-blue-100 text-blue-600';
      case 'not started': return 'bg-gray-100 text-gray-600';
      case 'on hold': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle edit button click
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditedTask({
      taskStatus: task.taskStatus,
      percentageOfCompleted: task.percentageOfCompleted
    });
    setEditMode(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Create payload with backend-expected field names
      const backendData = {
        taskStatus: editedTask.taskStatus,
        percentageOfCompleted: editedTask.percentageOfCompleted
      };
      console.log(selectedTask._id) 
      // Make API call first
      const response = await updateProjectTask(selectedTask._id, backendData);
  
      if (response.success) {
        // Update local state with API response data
        const updatedTasks = tasks.map(task => 
          task._id === selectedTask._id ? response.updatedTask : task
        );
  
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setEditMode(false);
        setSelectedTask(response.updatedTask); // Update detailed view
        toast.success(response.message || 'Task updated successfully');
        // redirect to task pag
        navigate('/team-member/tasks');
      } else {
        throw new Error(response.message || 'Failed to update task');
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update task. Please check your data.");
      // Optional: Revert local changes
      const originalTasks = tasks.map(task => 
        task._id === selectedTask._id ? selectedTask : task
      );
      setTasks(originalTasks);
      setFilteredTasks(originalTasks);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: name === 'percentageOfCompleted' ? parseInt(value) : value
    }));
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Task Management
      </motion.h1>

      {/* Filters and Search */}
      <motion.div 
        className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Tasks
            </button>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
            {searchText && (
              <button
                onClick={() => setSearchText('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tasks Grid */}
      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          No tasks found matching your criteria
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {currentItems.map((task) => (
                <motion.div
                  key={task?._id}
                  variants={cardVariants}
                  animate="visible"
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="px-5 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {task?.taskName}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`px-2 py-1 ${getStatusBadge(task?.taskStatus)} text-xs rounded-full`}>
                            {task?.taskStatus}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task?.taskModule?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {task?.taskDescription || 'No description provided'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {task?.project?.projectName}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {task?.resourceName?.name}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{task?.percentageOfCompleted}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${task?.percentageOfCompleted}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                      <span>Start: {formatDate(task?.startDate)}</span>
                      <span>End: {formatDate(task?.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Details <FiArrowRight className="ml-1" />
                    </button>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    >
                      <FiEdit size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <motion.div 
            className="mt-6 flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
            >
              Next
            </button>
          </motion.div>
        </>
      )}

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedTask(null);
              setEditMode(false);
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedTask.taskTitle}
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={`px-2 py-1 ${getStatusBadge(selectedTask.taskStatus)} text-xs rounded-full`}>
                        {selectedTask.taskStatus}
                      </span>
                      <span className="text-xs text-gray-500">
                        {selectedTask.taskModule?.name}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTask(null);
                      setEditMode(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedTask.taskDescription || 'No description provided'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Project:</span> {selectedTask.project?.projectName}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Assigned To:</span> {selectedTask.resourceName?.name}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Start Date:</span> {formatDate(selectedTask.startDate)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">End Date:</span> {formatDate(selectedTask.endDate)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Estimated Hours:</span> {selectedTask.taskHours}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Time Taken:</span> {selectedTask.taskTakenTime}
                      </p>
                    </div>
                  </div>
                  
                  {/* Editable Task Status and Progress */}
                  <div className="md:col-span-2 border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Task Status</h3>
                    
                    {editMode ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="taskStatus"
                            value={editedTask.taskStatus}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                          >
                            {statusOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              name="percentageOfCompleted"
                              min="0"
                              max="100"
                              value={editedTask.percentageOfCompleted}
                              onChange={handleInputChange}
                              className="w-full"
                            />
                            <span className="text-sm font-medium text-gray-700 w-12 text-center">
                              {editedTask.percentageOfCompleted}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <p className={`inline-block ${getStatusBadge(selectedTask.taskStatus)} px-3 py-1 rounded-full text-sm`}>
                            {selectedTask.taskStatus}
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                          <div className="flex items-center gap-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 flex-1">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${selectedTask.percentageOfCompleted}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-12 text-center">
                              {selectedTask.percentageOfCompleted}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                          <button
                            onClick={() => {
                              setEditedTask({
                                taskStatus: selectedTask.taskStatus,
                                percentageOfCompleted: selectedTask.percentageOfCompleted
                              });
                              setEditMode(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                          >
                            <FiEdit className="mr-2" /> Edit Status
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedTask(null);
                    setEditMode(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksMb;