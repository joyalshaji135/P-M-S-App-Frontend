import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Dummy Data Generator Method
const createDummyTask = ({
  id,
  taskTitle,
  taskDescription,
  taskStatus = 'Pending',
  taskHours,
  taskTakenTime = 0,
  startDate,
  endDate,
  resourceId,
  projectId,
  taskModule
}) => ({
  id,
  taskTitle,
  taskDescription,
  taskStatus,
  taskHours,
  taskTakenTime,
  percentageOfCompleted: Math.round((taskTakenTime / taskHours) * 100) || 0,
  startDate: new Date(startDate).toISOString(),
  endDate: new Date(endDate).toISOString(),
  resourceName: resourceId,
  project: projectId,
  taskModule
});

// Initial Dummy Data
const initialTasks = [
  createDummyTask({
    id: 1,
    taskTitle: 'API Integration',
    taskDescription: 'Integrate third-party payment gateway API',
    taskStatus: 'In Progress',
    taskHours: 15,
    taskTakenTime: 8,
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    resourceId: '67c7ecd97865c45ac8b983a8',
    projectId: '67c4a06dca86d94bd5785077',
    taskModule: 'Backend'
  }),
  createDummyTask({
    id: 2,
    taskTitle: 'UI Redesign',
    taskDescription: 'Redesign user dashboard interface',
    taskHours: 20,
    startDate: '2024-03-05',
    endDate: '2024-03-15',
    resourceId: '67c7ecd97865c45ac8b983a9',
    projectId: '67c4a06dca86d94bd5785078',
    taskModule: 'Frontend'
  })
];

// Resource and Project mappings
const resources = {
  '67c7ecd97865c45ac8b983a8': 'John Developer',
  '67c7ecd97865c45ac8b983a9': 'Sarah Designer'
};

const projects = {
  '67c4a06dca86d94bd5785077': 'E-commerce Platform',
  '67c4a06dca86d94bd5785078': 'Mobile App Redesign'
};

function TasksMb() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isEditing, setIsEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, x: -50 },
    drag: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
  };

  // Drag and drop handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTasks(items);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Date formatting
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Update task handler
  const handleUpdateTask = (id, field, value) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        [field]: value,
        percentageOfCompleted: field === 'taskTakenTime' 
          ? Math.round((value / task.taskHours) * 100) 
          : task.percentageOfCompleted
      } : task
    ));
  };

  // Add new dummy task
  const addDummyTask = () => {
    const newTask = createDummyTask({
      id: tasks.length + 1,
      taskTitle: `New Task ${tasks.length + 1}`,
      taskDescription: 'Sample task description',
      taskHours: 10,
      startDate: new Date(),
      endDate: new Date(Date.now() + 604800000), // +7 days
      resourceId: '67c7ecd97865c45ac8b983a8',
      projectId: '67c4a06dca86d94bd5785077',
      taskModule: 'General'
    });
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Task Management
        </motion.h1>
        <button
          onClick={addDummyTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Dummy Task
        </button>
      </div>

      {/* Task List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {currentTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                      >
                        <div className="bg-blue-50 px-5 py-4 border-b border-blue-100">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                              {task.taskTitle}
                            </h3>
                            <button
                              onClick={() => setIsEditing(task.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                              {task.taskModule}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {projects[task.project]}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <p className="text-gray-600 mb-4">
                            {task.taskDescription}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.taskStatus)} border`}>
                                {task.taskStatus}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(task.startDate)} - {formatDate(task.endDate)}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{task.taskTakenTime}h</span>
                                <span className="text-gray-500">/{task.taskHours}h</span>
                              </div>
                              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 rounded-full h-2"
                                  style={{ width: `${task.percentageOfCompleted}%` }}
                                ></div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                                {resources[task.resourceName]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination Controls */}
      <motion.div 
        className="mt-6 flex justify-center items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Next
        </button>
      </motion.div>

      {/* Edit Modal */}
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
                Update Task Progress
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title
                  </label>
                  <p className="px-4 py-2 bg-gray-100 rounded-lg">
                    {tasks.find(t => t.id === isEditing)?.taskTitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded-lg">
                      {formatDate(tasks.find(t => t.id === isEditing)?.startDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <p className="px-4 py-2 bg-gray-100 rounded-lg">
                      {formatDate(tasks.find(t => t.id === isEditing)?.endDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <p className="px-4 py-2 bg-gray-100 rounded-lg">
                    {tasks.find(t => t.id === isEditing)?.taskDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hours Spent
                    </label>
                    <input
                      type="number"
                      value={tasks.find(t => t.id === isEditing)?.taskTakenTime || ''}
                      onChange={(e) => 
                        handleUpdateTask(isEditing, 'taskTakenTime', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={tasks.find(t => t.id === isEditing)?.taskStatus}
                      onChange={(e) => 
                        handleUpdateTask(isEditing, 'taskStatus', e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TasksMb;