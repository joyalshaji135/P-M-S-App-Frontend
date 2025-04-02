import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTaskById } from '../../../api/pages-api/team-manager-api/project-task-api/TMProjectTaskApi';

function ViewTasksMg() {
  const { id } = useParams(); // Get the id from the URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from getProjectTaskById api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProjectTaskById(id);
        if (response.success && response.taskRole) {
          setTask(response.taskRole);
        } else {
          console.error('Task not found');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex-1 p-6 overflow-y-auto">Loading...</div>;
  }

  if (!task) {
    return <div className="flex-1 p-6 overflow-y-auto">Task not found</div>;
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Task Details</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Task Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Code</label>
            <p className="text-gray-900 font-medium">{task.code || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <p className="text-gray-900 font-medium">{task.taskName || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <p className="text-gray-900 font-medium">{task.taskTitle || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name Alias</label>
            <p className="text-gray-900 font-medium">{task.nameAlias || 'N/A'}</p>
          </div>

          {/* Task Module */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Module</label>
            <div className="mt-1">
              <p className="text-gray-900 font-medium">{task.taskModule?.name || 'N/A'}</p>
              <p className="text-gray-500 text-sm">{task.taskModule?.code || ''}</p>
            </div>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <p className="text-gray-900 font-medium">{formatDate(task.startDate)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <p className="text-gray-900 font-medium">{formatDate(task.endDate)}</p>
          </div>

          {/* Time Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
            <p className="text-gray-900 font-medium">{task.taskHours || 'N/A'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Taken</label>
            <p className="text-gray-900 font-medium">{task.taskTakenTime || 'N/A'}</p>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Completion</label>
            <div className="mt-1">
              <p className="text-gray-900 font-medium">
                {task.percentageOfCompleted ? `${task.percentageOfCompleted}%` : 'N/A'}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${task.percentageOfCompleted}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              task.taskStatus === 'Completed'
                ? 'bg-green-100 text-green-800'
                : task.taskStatus === 'In Progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {task.taskStatus || 'N/A'}
            </span>
          </div>

          {/* Resource Information */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Assigned Resource</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900 font-medium">{task.resourceName?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 font-medium">{task.resourceName?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900 font-medium">{task.resourceName?.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <p className="text-gray-900 font-medium capitalize">{task.resourceName?.role?.replace('-', ' ') || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <p className="text-gray-900 font-medium">{task.project?.projectName || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <p className="text-gray-900 font-medium">{task.project?.industry || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900 font-medium">{task.project?.projectStatus || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900 font-medium">{task.project?.description || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Created By */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Created By</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900 font-medium">{task.createdBy?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 font-medium">{task.createdBy?.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <p className="text-gray-900 font-medium">{formatDate(task.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Updated At</label>
                <p className="text-gray-900 font-medium">{formatDate(task.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Task Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
            <div className="mt-1 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-900 whitespace-pre-line">
                {task.taskDescription || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTasksMg;