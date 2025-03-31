import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../redux/store";
import { signOutSuccess as adminSignOut } from "../redux/slices/adminSlice";
import { signOutSuccess as ownerSignOut } from "../redux/slices/companyOwnerSlice";
import { signOutSuccess as managerSignOut } from "../redux/slices/teamManagersSlice";
import { signOutSuccess as memberSignOut } from "../redux/slices/teamMembersSlice";
import { getLoggedUser } from "../helper/auth";

function ProfileModal({ open, onClose, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const currentRole = useSelector(store.selectors.getCurrentRole);
  const userData = getLoggedUser();

  if (!open) return null;

  const handleLogout = () => {
    setShowConfirmModal(true);
  };

  const confirmLogout = () => {
    switch (currentRole) {
      case "admin":
        dispatch(adminSignOut());
        break;
      case "companyOwners":
        dispatch(ownerSignOut());
        break;
      case "teamManagers":
        dispatch(managerSignOut());
        break;
      case "teamMembers":
        dispatch(memberSignOut());
        break;
      default:
        console.error("Unknown role:", currentRole);
    }
    setShowConfirmModal(false);
    onClose();
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      {/* Profile Modal */}
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-end pt-16 pr-4 transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow-lg w-80 h-56 transition-all ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ zIndex: 1001 }}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Profile
            </h2>
            <div className="mt-2 p-2">
              <p className="my-2">
                <strong>Name:</strong> {userData?.name}
              </p>
              <p className="my-2">
                <strong>Email: </strong> {userData?.email}
              </p>
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={handleLogout}
                className="px-3 py-1 w-full bg-red-500 text-white h-10 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-1000">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex space-x-4 w-full">
                <button
                  onClick={cancelLogout}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileModal;