import React from "react";

function ProfileModal({ open, onClose, user }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-end pt-16 pr-4 transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      style={{ zIndex: 1000 }} // Ensure overlay covers the sidebar too
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg w-80  h-56 transition-all ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ zIndex: 1001 }} // Ensure modal is above the overlay
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Profile</h2>
          <div className="mt-2 p-2 ">
            <p className=" my-2"><strong>Name:</strong> {user.name}</p>
            <p className="my-2"><strong>Email:</strong> {user.email}</p>
          </div>
          <div className="mt-2 flex justify-between">
            
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  console.log("Logging out...");
                  // Implement logout logic here
                }
              }}
              className="px-3 py-1 w-full bg-red-500 text-white h-10 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
