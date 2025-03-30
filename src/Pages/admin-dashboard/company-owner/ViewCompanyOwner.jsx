import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyOwnerById } from '../../../api/pages-api/admin-dashboard-api/company-owner-api/CompanyOwnerApi';

function ViewCompanyOwner() {
  const { id } = useParams(); // Get the id from the URL
  const [owner, setOwner] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyOwnerById(id);
        setOwner(data.companyOwner);
      } catch (error) {
        console.error('Error fetching company owner:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        View Company Owner
      </h1>

      <div class="flex flex-col sm:flex-row gap-4 p-4">
       <div class="flex-1 bg-blue-500 text-white p-6 rounded-lg">
          <fieldset className=" flex-1  border border-gray-300 p-4 rounded-md">
            <legend className="text-xl font-medium  px-2">
              <b>Personal Information</b>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><b>Name: </b> {owner.name}</p>
              <p><b>Role: </b> {owner.role}</p>
              <p><b>Email: </b>{owner.email}</p>
              <p><b>Phone: </b> {owner.phone}</p>
               <p>
                <b>Date of Birth: </b> 
                 {new Date(owner.dateOfBirth).toLocaleDateString("en-GB")} 
              </p>

              <p><b>Gender:</b> {owner.gender}</p>
            </div>
          </fieldset>
       </div >

        <div class="flex-1 bg-green-500 text-white p-6 rounded-lg">
        <fieldset className=" flex-1  border border-gray-300 p-4 rounded-md">
          <legend className="text-xl font-medium  px-2">
           <b> Preferences</b>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><b>Newsletter: </b> {owner.preferences.newsletter ? "Subscribed" : "Not Subscribed"}</p>
            <p></p>
            <p><b>Notifications: </b> {owner.preferences.notifications ? "Enabled" : "Disabled"}</p>
            <p></p>
            <p><b>Status: </b>{owner.status? "Active" : "Inactive"}</p>
          </div>
        </fieldset>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 p-4">
       <div class="flex-1 text-white p-6 rounded-lg">
          <fieldset className=" flex-1  border border-gray-300 p-4 rounded-md">
            <legend className="text-xl font-semibold text-gray-700 px-2">
             <b> Address</b>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900">
              <p><b>State:<br/></b>{owner.address.street}</p>
              <p><b>District:<br/></b> {owner.address.district}</p>
              <p><b>City:<br/> </b>{owner.address.city}</p>
              <p><b>Street:<br/></b> {owner.address.street}</p>
              <p><b>ZipCode:<br/></b>  {owner.address.zipCode}</p>
              
            </div>
          </fieldset>
       </div >

        <div class="flex-1  text-white p-6 rounded-lg">
        <fieldset className=" flex-1  border border-gray-300 p-4 rounded-md">
          <legend className="text-xl font-semibold text-gray-700 px-3">
             <b>Company Details</b>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-900">
            <p><b>Company Name:<br/></b>{owner.company.name}</p>
            <p><b> Company Email:<br/></b> {owner.preferences.notifications ? "Enabled" : "Disabled"}</p>
            <p><b> Registration Number:<br/> </b>{owner.company.registrationNumber}</p>
            <p><b> Website:<br/></b> {owner.company.website}</p>
            <p><b>  Company Phone:<br/> </b>{owner.company.phone}</p>
            <p><b> Industry:<br/></b> {owner.company.industry}</p>
          </div>
        </fieldset>
        </div>
      </div>
     
    </div>
  );
}

export default ViewCompanyOwner;