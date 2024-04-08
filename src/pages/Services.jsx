import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../services/api";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ServiceCard from "../partials/service/ServiceCard";

function Service() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddService = (data) => {
    api
      .post("/servicos", data)
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
        reset();
        setShowAddServiceModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteService = () => {
    api
      .delete(`/servicos/${serviceToDelete.id}`)
      .then((response) => {
        toast.success(response.data.message);
        setShowDeleteConfirmationModal(false);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditService = (data) => {
    api
      .put(`/servicos/${serviceToEdit.id}`, data)
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
        setShowEditServiceModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = () => {
    api
      .get("/servicos")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  function handleEditServiceModal(service) {
    setShowEditServiceModal(true);
    setServiceToEdit(service);
  }

  function handleDeleteServiceModal(service) {
    setShowDeleteConfirmationModal(true);
    setServiceToDelete(service);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <ServiceCard
              data={services}
              handleEditService={handleEditServiceModal}
              handleDeleteService={handleDeleteServiceModal}
            />

            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-4"
              >
                Adicionar Serviço
              </button>
            </div>
          </div>
          <Modal
            isOpen={showAddServiceModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: 300,
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
            <form onSubmit={handleSubmit(handleAddService)}>
              <label htmlFor="service-name">Nome do Serviço</label>
              <input
                type="text"
                id="service-name"
                {...register("nome", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <label htmlFor="service-value">Valor</label>
              <input
                type="text"
                id="service-value"
                {...register("preco", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div className="flex justify-center space-x-2 mt-11 ">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Adicionar Serviço
                </button>
                <button
                  onClick={() => setShowAddServiceModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
          <Modal
            isOpen={showEditServiceModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: 300,

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
            <form
              className="space-y-6"
              onSubmit={handleSubmit(handleEditService)}
            >
              <div>
                <label htmlFor="service-name">Nome do Serviço</label>
                <input
                  type="text"
                  id="service-name"
                  placeholder={serviceToEdit?.nome}
                  {...register("nome", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label htmlFor="service-value">Valor</label>
                <input
                  type="text"
                  id="service-value"
                  placeholder={serviceToEdit?.preco}
                  {...register("preco", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex justify-center space-x-2 mt-11 ">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Adicionar Serviço
                </button>
                <button
                  onClick={() => setShowEditServiceModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>

          <Modal
            isOpen={showDeleteConfirmationModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: 300,
                height: 200,
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
            <p className="text-center">
              Deseja realmente excluir o serviço{" "}
              {serviceToDelete && serviceToDelete.nome}?
            </p>
            <div className="flex justify-center space-x-2 mt-11">
              <button
                onClick={handleDeleteService}
                className="btn bg-red-500 hover:bg-red-600 text-white"
              >
                Sim
              </button>
              <button
                onClick={() => setShowDeleteConfirmationModal(false)}
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancelar
              </button>
            </div>
          </Modal>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default Service;
