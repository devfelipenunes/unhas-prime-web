import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import api from "../services/api";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

// Estilos para os modais
const modalStyles = {
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
};

function Collaborators() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);
  const [showEditCollaboratorModal, setShowEditCollaboratorModal] =
    useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [collaboratorToDelete, setCollaboratorToDelete] = useState(null);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = () => {
    api
      .get("/collaborators")
      .then((response) => {
        setCollaborators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCollaborator = (data) => {
    api
      .post("/collaborators", data)
      .then((response) => {
        toast.success(response.data.message);
        fetchCollaborators();
        reset();
        setShowAddCollaboratorModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCollaborator = () => {
    api
      .delete(`/collaborators/${collaboratorToDelete.id}`)
      .then((response) => {
        toast.success(response.data.message);
        fetchCollaborators();
        setShowDeleteConfirmationModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditCollaborator = (data) => {
    api
      .put(`/collaborators/${collaboratorToEdit.id}`, data)
      .then((response) => {
        toast.success(response.data.message);
        fetchCollaborators();
        setShowEditCollaboratorModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Colaboradores
            </h1>
            <div className="w-full max-w-9xl mx-auto">
              <ul className="flex items-center justify-between mt-12">
                <li>Nome</li>
                <li>Ações</li>
              </ul>
              <ul>
                {collaborators.map((collaborator) => (
                  <li key={collaborator.id}>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {collaborator.nome}
                      </p>
                      <div>
                        <button
                          onClick={() => {
                            setCollaboratorToEdit(collaborator);
                            setShowEditCollaboratorModal(true);
                          }}
                          className="ml-2 btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setCollaboratorToDelete(collaborator);
                            setShowDeleteConfirmationModal(true);
                          }}
                          className="ml-2 btn bg-red-500 hover:bg-red-600 text-white"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAddCollaboratorModal(true)}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-4"
              >
                Adicionar Colaborador
              </button>
            </div>
          </div>

          <Modal
            isOpen={showAddCollaboratorModal}
            style={modalStyles}
          >
            <form onSubmit={handleSubmit(handleAddCollaborator)}>
              <label htmlFor="collaborator-name">Nome do Colaborador</label>
              <input
                type="text"
                id="collaborator-name"
                {...register("nome", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div className="flex justify-center space-x-2 mt-11">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Adicionar Colaborador
                </button>
                <button
                  onClick={() => setShowAddCollaboratorModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>

          <Modal
            isOpen={showEditCollaboratorModal}
            style={modalStyles}
          >
            <form onSubmit={handleSubmit(handleEditCollaborator)}>
              <label htmlFor="collaborator-name">Nome do Colaborador</label>
              <input
                type="text"
                id="collaborator-name"
                defaultValue={collaboratorToEdit ? collaboratorToEdit.nome : ""}
                {...register("nome", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <div className="flex justify-center space-x-2 mt-11">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Atualizar Colaborador
                </button>
                <button
                  onClick={() => setShowEditCollaboratorModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>

          <Modal
            isOpen={showDeleteConfirmationModal}
            style={modalStyles}
          >
            <p>
              Deseja realmente excluir o colaborador{" "}
              {collaboratorToDelete && collaboratorToDelete.nome}?
            </p>
            <div className="flex justify-center space-x-2 mt-11">
              <button
                onClick={handleDeleteCollaborator}
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

export default Collaborators;
