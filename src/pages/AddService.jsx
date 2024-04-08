import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ServiceCard from "../partials/addService/ServiceCard";
import CollaboratorCard from "../partials/addService/CollaboratorCard";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

function AddService() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleCollaboratorSelect = (collaboratorId) => {
    setSelectedCollaborator(collaboratorId);
  };

  const handleAddService = () => {
    api
      .post("/sales", {
        collaboratorId: selectedCollaborator.id,
        servicoId: selectedService,
        paymentMethod: selectedPaymentMethod,
        collaboratorPercentage: selectedCollaborator.percentage,
      })
      .then((response) => {
        toast.success("Adicionado com sucesso!");
        setSelectedService(null);
        setSelectedCollaborator(null);
        setSelectedPaymentMethod("");
        setShowAddServiceModal(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(selectedCollaborator);

  const handleButtonClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  function handleAddServiceModal() {
    setShowAddServiceModal(true);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

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
            <div className="flex justify-center">
              <button
                onClick={handleAddServiceModal}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Adicionar Serviço
              </button>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
      <Modal
        isOpen={showAddServiceModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "90%",
            margin: "auto",
            height: "250px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
          },
        }}
      >
        <p>Selecione o método de pagamento:</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => handleButtonClick("Pix")}
            className={`btn ${
              selectedPaymentMethod === "Pix"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white`}
          >
            Pix
          </button>
          <button
            onClick={() => handleButtonClick("Crédito")}
            className={`btn ${
              selectedPaymentMethod === "Crédito"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white`}
          >
            Crédito
          </button>
          <button
            onClick={() => handleButtonClick("Débito")}
            className={`btn ${
              selectedPaymentMethod === "Débito"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } text-white`}
          >
            Débito
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddService}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Salvar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddService;
