import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ServiceCard from "../partials/addService/ServiceCard";
import CollaboratorCard from "../partials/addService/CollaboratorCard";
import api from "../services/api";
import { useForm } from "react-hook-form";

function Service() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddService = (data) => {
    console.log(data);
    api
      .post("/servicos", data)
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <form onSubmit={handleSubmit(handleAddService)}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="service-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome do Serviço
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="service-name"
                      {...register("nome", { required: true })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {/* {errors.nome && (
                      <span className="text-red-500">
                        Este campo é obrigatório
                      </span>
                    )} */}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="service-value"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Valor
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="service-value"
                      {...register("preco", { required: true })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {/* {errors.preco && (
                      <span className="text-red-500">
                        Este campo é obrigatório
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Adicionar Serviço
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Service;
