import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ServiceCard from '../partials/addService/ServiceCard';
import CollaboratorCard from '../partials/addService/CollaboratorCard';
import api from '../services/api';

function AddService() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleCollaboratorSelect = (collaboratorId) => {
    setSelectedCollaborator(collaboratorId);
  };

  const handleAddService = () => {

    api
      .post("/sales", {
        collaboratorId: selectedCollaborator,
        servicoId: selectedService,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto space-y-9">
            <ServiceCard 
              selectedService={selectedService}
              handleServiceSelect={handleServiceSelect}
            />
            <CollaboratorCard 
              selectedCollaborator={selectedCollaborator}
              handleCollaboratorSelect={handleCollaboratorSelect}
            />
            <div
            className='flex justify-center'
            >
              <button
              onClick={handleAddService}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Adicionar Serviço</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddService;
